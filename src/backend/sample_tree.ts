import {AbstractLogElement, NodeElement} from "./log_tree.ts";
import {TextElement} from "./text_element.ts";
import {ProgressElement} from "./progress_element.ts";

export function sampleTree() {
    const tree = AbstractLogElement.rootElement();
    tree.addElement(["Alpha", "Bravo", "Charlie"], new NodeElement("Charlie", {card: false}));
    tree.addElement(["Alpha", "Bravo", "Xray"], new TextElement("Xray", {text: "5", card: true}));
    tree.addElement(["Alpha", "Bravo", "Delta"], new NodeElement("Delta", {card: false}));

    tree.addElement(["Alpha", "Bravo", "Hotel"], new TextElement("Hotel", {text: "", card: false}));
    tree.addElement(["Alpha", "Bravo", "Hotel", "Whiskey"], new TextElement("Whiskey", {text: "whiskey", card: false}));
    tree.addElement(["Alpha", "Bravo", "Juliet"], new ProgressElement("Juliet", {text: "", progress: 0.4, card: true}));
    tree.addElement(["Alpha", "Bravo", "Quebec"], new ProgressElement("Quebec", {text: "- Q", progress: 1.0, card: true}));

    return tree;
}