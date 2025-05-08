export abstract class AbstractLogElement {
    path: string[];
    children: Map<string, AbstractLogElement>;
    created: number;

    protected constructor(path: string[]) {
        this.path = path;
        this.children = new Map();
        this.created = Date.now();
    }

    id(): string {
        return this.path[this.path.length - 1];
    }

    getElement(path: string[]): AbstractLogElement | undefined {
        if (path.length === 0) {
            return this;
        }
        else {
            return this.children.get(path[0])?.getElement(path.slice(1));
        }
    }

    addElement(so_far_path: string[], path: string[], element: AbstractLogElement) {
        if (path.length === 1) {
            this.children.set(path[0], element);
        }
        else {
            const child = this.children.get(path[0]);
            if (child) {
                so_far_path.push(path[0]);
                child.addElement(so_far_path, path.slice(1), element);
            }
            else {
                so_far_path.push(path[0]);
                const nn = new NodeElement(so_far_path, {card: false});
                nn.addElement(so_far_path, path.slice(1), element)
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

    clearElement() {
        this.children.clear();
    }

    abstract updateData(new_data: any): void;

    static rootElement(): AbstractLogElement {
        return new RootElement([]);
    }

    abstract type(): string;

    setHandled() {};
}

export class RootElement extends AbstractLogElement {
    constructor(path: string[]) {
        super(path);
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

    constructor(path: string[], data: any) {
        super(path);
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