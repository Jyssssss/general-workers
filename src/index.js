import {
  linkData,
  socialLinkData,
  siteUrl,
  profileName,
  profileUrl
} from "./data"

import Router from "./Router"
import LinksTransformer from './ElementHandler/LinksTransformer'
import SocialElementHandler from "./ElementHandler/SocialElementHandler"

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
});

async function handleEvent(event) {
  const router = new Router();
  router.get("/links", () => new Response(JSON.stringify(linkData, null, 2), {
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
    const siteResponse = await fetch(siteUrl, init);
    const results = await gatherResponse(siteResponse);
    const response = new Response(results, init);
    return new HTMLRewriter()
      .on("div#profile", { element: element => element.removeAttribute("style") })
      .on("img#avatar", { element: element => element.setAttribute("src", profileUrl) })
      .on("h1#name", { element: element => element.setInnerContent(profileName) })
      .on("div#links", new LinksTransformer(linkData))
      .on("div#social", new SocialElementHandler(socialLinkData))
      .on("head > title", { element: element => element.setInnerContent(profileName) })
      .on("body", { element: element => element.setAttribute("style", "background-color: cadetblue") })
      .transform(response);
  });

  return router.route(event.request)
}

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