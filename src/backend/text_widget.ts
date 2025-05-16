import {AbstractTreeWidget} from "./log_tree.ts";

export class TextWidget extends AbstractTreeWidget {
    text: string
    card: boolean;

    constructor(path: string[], data: any) {
        super(path);
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
        return TextWidget.s_type();
    }
}