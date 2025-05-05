import {AbstractLogElement} from "./backend/log_tree.ts";
import type {ReactNode} from "react";

export class NodeElement extends AbstractLogElement {
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    render(id: string): ReactNode {
        return <div id={id.toString()}>
            <h3>{this.name}</h3>
            {[...this.children].map(([k, v]) => v.render(k))}
        </div>;
    }
}