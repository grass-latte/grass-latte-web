import type {WsEvent} from "./websockets.ts";
import {type AbstractLogElement, NodeElement} from "./log_tree.ts";

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
            default:
                console.warn(`Unhandled packet type ${obj.type}`);
        }
    }
}

function handleElement(data: any, tree: AbstractLogElement) {
    let element: AbstractLogElement;
    switch (data.element.type) {
        case NodeElement.s_type():
            element = new NodeElement(data.path[data.path.length - 1]);
            break;
        default:
            console.warn(`Unhandled element type ${data.element.type}`);
            return;
    }

    tree.addElement(data.path, element);
}

function handleDelete(data: any, tree: AbstractLogElement) {
    tree.deleteElement(data.path);
}