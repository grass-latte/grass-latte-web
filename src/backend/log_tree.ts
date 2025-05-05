import {NodeElement} from "../NodeElement.tsx";
import * as React from "react";

export abstract class AbstractLogElement extends React.Component {
    id: string;
    children: Map<string, AbstractLogElement>;
    created: number;

    protected constructor(id: string) {
        super({});
        this.id = id;
        this.children = new Map();
        this.created = Date.now();
    }

    addElement(path: string[], element: AbstractLogElement) {
        if (path.length === 1) {
            this.children.set(path[0], element);
        }
        else {
            const child = this.children.get(path[0]);
            if (child) {
                child.addElement(path.slice(1), element);
            }
            else {
                const nn = new NodeElement(path[0]);
                nn.addElement(path.slice(1), element)
                this.children.set(path[0], nn);
            }
        }
    }

    deleteElement(path: string[]) {
        if (path.length === 1) {
            this.children.delete(path[0]);
        }
        else {
            this.children.get(path[0])?.deleteElement(path.slice(1));
        }
    }

    static rootElement(): AbstractLogElement {
        return new NodeElement("root");
    }
}