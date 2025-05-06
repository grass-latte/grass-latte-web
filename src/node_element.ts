import {AbstractLogElement} from "./backend/log_tree.ts";
import {RenderNodeElement} from "./NodeElement.tsx";

export class NodeElement extends AbstractLogElement {
    constructor(id: string) {
        super(id);
    }

    render() {
        return RenderNodeElement(this);
    }
}