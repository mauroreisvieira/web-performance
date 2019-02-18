export class LazyImage extends HTMLElement {
    static get observedAttributes() {
        return ['src', 'width', 'height'];
    }

    constructor() {
        super();

        this.loaded = false;
        this.src = null;
        this.img = new Image();
        console.log(this.childNodes);
        this.img.onload = () => {
            this.loaded = true;
            for (const child of this.childNodes) {
                child.remove();
            }
            this.appendChild(this.img);
        }
    }

    set visible(visible) {
        console.log('visible', visible);
        console.log(this.src);
        if (!this.src || !visible || this.loaded) return;
        this.img.src = this.src;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('name', name);
        switch(name) {
            case 'src':
                if (oldValue === newValue) break;
                this.src = newValue;
                this.loaded = false;
                break;
            case 'width':
                this.img.style.width = this.style.width = `${newValue}px`;
                break;
            case 'height':
                this.img.style.height = this.style.height = `${newValue}px`;
                break;
        }
    }
}
