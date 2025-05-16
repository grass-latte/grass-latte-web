import {AbstractTreeWidget} from "./log_tree.ts";
import {type ProgressWidgetData, ProgressWidgetTypeName} from "./interface.ts";

export class ProgressWidget extends AbstractTreeWidget {
    progress: number;
    card: boolean;
    text: string | undefined;

    constructor(path: string[], data: ProgressWidgetData) {
        super(path);
        this.progress = data.progress;
        this.card = data.card;
        this.text = data.text ?? undefined;
    }

    updateData(new_data: ProgressWidgetData): void {
        this.progress = new_data.progress;
        this.card = new_data.card;
        this.text = new_data.text ?? undefined;
    }

    type(): string {
        return ProgressWidgetTypeName;
    }
}
