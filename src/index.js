import Router from "./router"
import Link from "./Link"

const data = [
  new Link("Cloudflare", "https://www.cloudflare.com/"),
  new Link("Google", "https://www.google.com/"),
  new Link("Apple", "https://www.apple.com/")
];

const siteUrl = "https://static-links-page.signalnerve.workers.dev/";

async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json())
  }
  else if (contentType.includes("application/text")) {
    return await response.text()
  }
  else if (contentType.includes("text/html")) {
    return await response.text()
  }
  else {
    return await response.text()
  }
}

addEventListener("fetch", event => {
  const router = new Router();
  router.get("/links", () => new Response(JSON.stringify(data, null, 2), {
    headers: {
      "content-type": "application/json;charset=UTF-8"
    }
  }));

  router.get("/", async () => {
    const init = {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    }
    const response = await fetch(siteUrl, init);
    const results = await gatherResponse(response);
    return new Response(results, init);
  });

  event.respondWith(async function () {
    return await router.route(event.request);
  }());
})



