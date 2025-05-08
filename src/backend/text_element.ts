import {AbstractLogElement} from "./log_tree.ts";

export class TextElement extends AbstractLogElement {
    text: string
    card: boolean;

    constructor(id: string, data: any) {
        super(id);
        this.text = data.text;
        this.card = data.card;
    }

    updateData(new_data: any): void {
        this.text = new_data.text;
        this.card = new_data.card;
    }

    static s_type(): string {
        return "text";
    };

    type(): string {
        return TextElement.s_type();
    }
}