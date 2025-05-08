import type {WsEvent} from "./websockets.ts";
import {type AbstractLogElement, NodeElement} from "./log_tree.ts";
import {TextElement} from "./text_element.ts";
import {ProgressElement} from "./progress_element.ts";
import {ButtonElement} from "./button_element.ts";

export function handlePacket(queue: WsEvent[], tree: AbstractLogElement) {
    for (const event of queue) {
        const obj = JSON.parse(event.data);
        switch (obj.type) {
            case "element":
                handleElement(obj.data, tree);
                break;
            case "delete":
                handleDelete(obj.data, tree);
                break;
            case "clear":
                handleClear(obj.data, tree);
                break;
            case "handled":
                handleHandled(obj.data, tree);
                break;
            default:
                console.warn(`Unhandled packet type ${obj.type}`);
        }
    }
}

function handleElement(data: any, tree: AbstractLogElement) {
    const existing = tree.getElement(data.path);
    if (existing && existing.type() == data.element.type) {
        existing.updateData(data.element.data);
        return;
    }

    let element: AbstractLogElement;

    switch (data.element.type) {
        case NodeElement.s_type():
            element = new NodeElement(data.path, data.element.data);
            break;
        case TextElement.s_type():
            element = new TextElement(data.path, data.element.data);
            break;
        case ProgressElement.s_type():
            element = new ProgressElement(data.path, data.element.data);
            break;
        case ButtonElement.s_type():
            element = new ButtonElement(data.path, data.element.data);
            break;
        default:
            console.warn(`Unhandled element type ${data.element.type}`);
            return;
    }

    tree.addElement([], data.path, element);
}

function handleDelete(data: any, tree: AbstractLogElement) {
    tree.deleteElement(data.path);
}

function handleClear(data: any, tree: AbstractLogElement) {
    tree.clearElement(data.path);
}

function handleHandled(data: any, tree: AbstractLogElement) {
    tree.getElement(data.path)?.changeHandled();
}