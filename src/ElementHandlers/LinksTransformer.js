class LinksTransformer {
    constructor(links) {
        this.links = links;
    }

    element(element) {
        this.links.forEach(link => {
            element.append(`<a href="${link.url}" target="_blank">${link.name}</a>`, { html: true });
        });
    }
}

export default LinksTransformer