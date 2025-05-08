export abstract class AbstractLogElement {
    id: string;
    children: Map<string, AbstractLogElement>;
    created: number;

    protected constructor(id: string) {
        this.id = id;
        this.children = new Map();
        this.created = Date.now();
    }

    getElement(path: string[]): AbstractLogElement | undefined {
        if (path.length === 0) {
            return this;
        }
        else {
            return this.children.get(path[0])?.getElement(path.slice(1));
        }
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
                const nn = new NodeElement(path[0], {card: false});
                nn.addElement(path.slice(1), element)
                this.children.set(path[0], nn);
            }
        }
    }

    deleteElement(path: string[]) {
        if (path.length === 1) {
            this.children.delete(path[0]);
        } else {
            this.children.get(path[0])?.deleteElement(path.slice(1));
        }
    }

    clearElement(path: string[]) {
        if (path.length === 0) {
            this.children.clear();
        }
        else {
            this.children.get(path[0])?.clearElement(path.slice(1));
        }
    }

    abstract updateData(new_data: any): void;

    static rootElement(): AbstractLogElement {
        return new RootElement("root");
    }

    abstract type(): string;
}

export class RootElement extends AbstractLogElement {
    constructor(id: string) {
        super(id);
    }

    static s_type(): string {
        return "root";
    };

    type(): string {
        return RootElement.s_type();
    }

    updateData(): void {}
}

export class NodeElement extends AbstractLogElement {
    card: boolean;

    constructor(id: string, data: any) {
        super(id);
        this.card = data.card;
    }

    static s_type(): string {
        return "node";
    };

    type(): string {
        return NodeElement.s_type();
    }

    updateData(new_data: any): void {
        this.card = new_data.card;
    }
}