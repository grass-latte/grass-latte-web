import type {WsEvent} from "./websockets.ts";
import {type AbstractTreeWidget, NodeWidget} from "./log_tree.ts";
import {TextWidget} from "./text_widget.ts";
import {ProgressWidget} from "./progress_widget.ts";
import {ButtonWidget} from "./button_widget.ts";
import {
    ButtonWidgetTypeName,
    type DeletePacket,
    type HandledPacket,
    NodeWidgetTypeName, ProgressWidgetTypeName,
    SendTypesSchema, TextWidgetTypeName,
    type WidgetPacket
} from "./interface.ts";

export function handlePacket(queue: WsEvent[], tree: AbstractTreeWidget) {
    for (const event of queue) {
        const obj = JSON.parse(event.data);
        const result = SendTypesSchema.safeParse(obj);
        if (result.success) {
            const data = result.data;
            switch (data.type) {
                case "widget":
                    handleWidget(data.data, tree);
                    break;
                case "delete":
                    handleDelete(data.data, tree);
                    break;
                case "clear":
                    handleClear(tree);
                    break;
                case "handled":
                    handleHandled(data.data, tree);
                    break;
                default:
                    console.warn(`Unhandled packet type ${obj.type}`);
            }
        }
        else {
            console.error(obj);
            console.error(`Invalid packet: ${JSON.stringify(result.error)}`);
        }
    }
}

function handleWidget(data: WidgetPacket, tree: AbstractTreeWidget) {
    const existing = tree.getWidget(data.path);
    if (existing && existing.type() == data.widget.type) {
        existing.updateData(data.widget.data);
        return;
    }

    let widget: AbstractTreeWidget;
    const widget_data = data.widget;

    switch (widget_data.type) {
        case NodeWidgetTypeName:
            widget = new NodeWidget(data.path, widget_data.data);
            break;
        case TextWidgetTypeName:
            widget = new TextWidget(data.path, widget_data.data);
            break;
        case ProgressWidgetTypeName:
            widget = new ProgressWidget(data.path, widget_data.data);
            break;
        case ButtonWidgetTypeName:
            widget = new ButtonWidget(data.path, widget_data.data);
            break;
        default:
            console.warn(`Unhandled widget type ${data.widget.type}`);
            return;
    }

    tree.addWidget([], data.path, widget);
}

function handleDelete(data: DeletePacket, tree: AbstractTreeWidget) {
    tree.deleteWidget(data.path);
}

function handleClear(tree: AbstractTreeWidget) {
    tree.clearWidgets();
}

function handleHandled(data: HandledPacket, tree: AbstractTreeWidget) {
    tree.getWidget(data.path)?.setHandled();
}