import {AbstractTreeWidget, NodeWidget} from "./log_tree.ts";
import {TextWidget} from "./text_widget.ts";
import {ProgressWidget} from "./progress_widget.ts";


export function sampleTree() {
    const tree = AbstractTreeWidget.rootElement();
    tree.addWidget([], ["Alpha", "Bravo", "Charlie"], new NodeWidget(["Alpha", "Bravo", "Charlie"], {card: false}));
    tree.addWidget([], ["Alpha", "Bravo", "Xray"], new TextWidget(["Alpha", "Bravo", "Xray"], {text: "5", card: true}));
    tree.addWidget([], ["Alpha", "Bravo", "Delta"], new NodeWidget(["Alpha", "Bravo", "Delta"], {card: false}));

    tree.addWidget([], ["Alpha", "Bravo", "Hotel"], new TextWidget(["Alpha", "Bravo", "Hotel"], {text: "", card: false}));
    tree.addWidget([], ["Alpha", "Bravo", "Hotel", "Whiskey"], new TextWidget(["Alpha", "Bravo", "Hotel", "Whiskey"], {text: "whiskey", card: false}));
    tree.addWidget([], ["Alpha", "Bravo", "Juliet"], new ProgressWidget(["Alpha", "Bravo", "Juliet"], {text: "", progress: 0.4, card: true}));
    tree.addWidget([], ["Alpha", "Bravo", "Quebec"], new ProgressWidget(["Alpha", "Bravo", "Quebec"], {text: "- Q", progress: 1.0, card: true}));
    return tree;
}