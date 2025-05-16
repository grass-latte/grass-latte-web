import {AbstractTreeWidget} from "./log_tree.ts";
import {type TextWidgetData, TextWidgetTypeName} from "./interface.ts";

export class TextWidget extends AbstractTreeWidget {
    text: string
    card: boolean;

    constructor(path: string[], data: TextWidgetData) {
        super(path);
        this.text = data.text;
        this.card = data.card;
    }

    updateData(new_data: TextWidgetData): void {
        this.text = new_data.text;
        this.card = new_data.card;
    }

    type(): string {
        return TextWidgetTypeName;
    }
}