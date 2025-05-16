import {AbstractTreeWidget} from "./log_tree.ts";

export class ProgressWidget extends AbstractTreeWidget {
    progress: number;
    card: boolean;
    text: string | undefined;

    constructor(path: string[], data: any) {
        super(path);
        this.progress = data.progress;
        this.card = data.card;
        this.text = data.text;
    }

    updateData(new_data: any): void {
        this.progress = new_data.progress;
        this.card = new_data.card;
        this.text = new_data.text;
    }

    static s_type(): string {
        return "progress";
    };

    type(): string {
        return ProgressWidget.s_type();
    }
}
