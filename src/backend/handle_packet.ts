import type {WsEvent} from "./websockets.ts";
import {type AbstractTreeWidget, NodeWidget} from "./log_tree.ts";
import {TextWidget} from "./text_widget.ts";
import {ProgressWidget} from "./progress_widget.ts";
import {ButtonWidget} from "./button_widget.ts";

export function handlePacket(queue: WsEvent[], tree: AbstractTreeWidget) {
    for (const event of queue) {
        const obj = JSON.parse(event.data);
        switch (obj.type) {
            case "widget":
                handleWidget(obj.data, tree);
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

function handleWidget(data: any, tree: AbstractTreeWidget) {
    const existing = tree.getWidget(data.path);
    if (existing && existing.type() == data.widget.type) {
        existing.updateData(data.widget.data);
        return;
    }

    let widget: AbstractTreeWidget;

    switch (data.widget.type) {
        case NodeWidget.s_type():
            widget = new NodeWidget(data.path, data.widget.data);
            break;
        case TextWidget.s_type():
            widget = new TextWidget(data.path, data.widget.data);
            break;
        case ProgressWidget.s_type():
            widget = new ProgressWidget(data.path, data.widget.data);
            break;
        case ButtonWidget.s_type():
            widget = new ButtonWidget(data.path, data.widget.data);
            break;
        default:
            console.warn(`Unhandled widget type ${data.widget.type}`);
            return;
    }

    tree.addWidget([], data.path, widget);
}

function handleDelete(data: any, tree: AbstractTreeWidget) {
    tree.deleteWidget(data.path);
}

function handleClear(_data: any, tree: AbstractTreeWidget) {
    tree.clearWidgets();
}

function handleHandled(data: any, tree: AbstractTreeWidget) {
    tree.getWidget(data.path)?.setHandled();
}