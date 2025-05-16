import {AbstractTreeWidget} from "./log_tree.ts";
import {type ButtonWidgetData, ButtonWidgetTypeName} from "./interface.ts";

export class ButtonWidget extends AbstractTreeWidget {
    text: string
    card: boolean;
    handled: boolean = true;

    constructor(path: string[], data: ButtonWidgetData) {
        super(path);
        this.text = data.text;
        this.card = data.card;
    }

    updateData(new_data: ButtonWidgetData): void {
        this.text = new_data.text;
        this.card = new_data.card;
    }

    setHandled() {
        this.handled = true;
    }

    type(): string {
        return ButtonWidgetTypeName;
    }
}