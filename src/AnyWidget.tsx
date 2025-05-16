import {type AbstractTreeWidget, NodeWidget} from "./backend/log_tree.ts";
import {RenderNodeWidget} from "./render/RenderNodeWidget.tsx";
import {RenderTextWidget} from "./render/RenderTextWidget.tsx";
import {TextWidget} from "./backend/text_widget.ts";
import {ProgressWidget} from "./backend/progress_widget.ts";
import {RenderProgressWidget} from "./render/RenderProgressWidget.tsx";
import {ButtonWidget} from "./backend/button_widget.ts";
import {RenderButtonWidget} from "./render/RenderButtonWidget.tsx";
import {
    ButtonWidgetTypeName,
    NodeWidgetTypeName,
    ProgressWidgetTypeName,
    TextWidgetTypeName
} from "./backend/interface.ts";

interface Props {
    widget: AbstractTreeWidget;
}

export default function AnyWidget({widget}: Props) {
    switch (widget.type()) {
        case NodeWidgetTypeName:
            return <RenderNodeWidget node={widget as NodeWidget}/>
        case TextWidgetTypeName:
            return <RenderTextWidget textElement={widget as TextWidget}/>
        case ProgressWidgetTypeName:
            return <RenderProgressWidget progressElement={widget as ProgressWidget}/>
        case ButtonWidgetTypeName:
            return <RenderButtonWidget buttonElement={widget as ButtonWidget}/>
        default:
            console.error("Unrecognized type");
            return <></>
    }
}