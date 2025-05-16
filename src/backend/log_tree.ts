import {type NodeWidgetData, NodeWidgetTypeName} from "./interface.ts";

export abstract class AbstractTreeWidget {
    path: string[];
    children: Map<string, AbstractTreeWidget>;
    created: number;

    protected constructor(path: string[]) {
        this.path = path;
        this.children = new Map();
        this.created = Date.now();
    }

    id(): string {
        return this.path[this.path.length - 1];
    }

    getWidget(path: string[]): AbstractTreeWidget | undefined {
        if (path.length === 0) {
            return this;
        }
        else {
            return this.children.get(path[0])?.getWidget(path.slice(1));
        }
    }

    addWidget(so_far_path: string[], path: string[], widget: AbstractTreeWidget) {
        if (path.length === 1) {
            this.children.set(path[0], widget);
        }
        else {
            const child = this.children.get(path[0]);
            if (child) {
                so_far_path.push(path[0]);
                child.addWidget(so_far_path, path.slice(1), widget);
            }
            else {
                so_far_path.push(path[0]);
                const nn = new NodeWidget(structuredClone(so_far_path), {card: false});
                nn.addWidget(so_far_path, path.slice(1), widget)
                this.children.set(path[0], nn);
            }
        }
    }

    deleteWidget(path: string[]) {
        if (path.length === 1) {
            this.children.delete(path[0]);
        } else {
            this.children.get(path[0])?.deleteWidget(path.slice(1));
        }
    }

    clearWidgets() {
        this.children.clear();
    }

    abstract updateData(new_data: any): void;

    static rootElement(): AbstractTreeWidget {
        return new RootElement([]);
    }

    abstract type(): string;

    setHandled() {};
}

export class RootElement extends AbstractTreeWidget {
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

export class NodeWidget extends AbstractTreeWidget {
    card: boolean;

    constructor(path: string[], data: NodeWidgetData) {
        super(path);
        this.card = data.card;
    }

    type(): string {
        return NodeWidgetTypeName;
    }

    updateData(new_data: NodeWidgetData): void {
        this.card = new_data.card;
    }
}