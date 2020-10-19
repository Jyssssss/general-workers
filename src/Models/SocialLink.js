import Link from "./Link"

class SocialLink extends Link {
    constructor(name, url, path) {
        super(name, url);
        this.path = path;
    }
}

export default SocialLink