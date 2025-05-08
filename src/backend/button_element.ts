import {AbstractLogElement} from "./log_tree.ts";

export class ButtonElement extends AbstractLogElement {
    text: string
    card: boolean;
    handled: boolean = true;

    constructor(path: string[], data: any) {
        super(path);
        this.text = data.text;
        this.card = data.card;
    }

    updateData(new_data: any): void {
        this.text = new_data.text;
        this.card = new_data.card;
    }

    setHandled() {
        this.handled = true;
    }

    static s_type(): string {
        return "button";
    };

    type(): string {
        return ButtonElement.s_type();
    }
}