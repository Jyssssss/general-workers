class SocialElementHandler {
    constructor(links) {
        this.links = links;
    }

    element(element) {
        // Remove display: none.
        element.removeAttribute("style");

        this.links.forEach(link => {
            element.append(`
            <a href="${link.url}" target="_blank">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <title>${link.name}</title>
                    <path d="${link.path}" />
                </svg>
            </a>`, { html: true });
        });
    }
}

export default SocialElementHandler