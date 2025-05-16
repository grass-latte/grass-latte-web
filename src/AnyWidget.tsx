import {type AbstractTreeWidget, NodeWidget} from "./backend/log_tree.ts";
import {RenderNodeWidget} from "./render/RenderNodeWidget.tsx";
import {RenderTextWidget} from "./render/RenderTextWidget.tsx";
import {TextWidget} from "./backend/text_widget.ts";
import {ProgressWidget} from "./backend/progress_widget.ts";
import {RenderProgressWidget} from "./render/RenderProgressWidget.tsx";
import {ButtonWidget} from "./backend/button_widget.ts";
import {RenderButtonWidget} from "./render/RenderButtonWidget.tsx";

interface Props {
    widget: AbstractTreeWidget;
}

export default function AnyWidget({widget}: Props) {
    switch (widget.type()) {
        case NodeWidget.s_type():
            return <RenderNodeWidget node={widget as NodeWidget}/>
        case TextWidget.s_type():
            return <RenderTextWidget textElement={widget as TextWidget}/>
        case ProgressWidget.s_type():
            return <RenderProgressWidget progressElement={widget as ProgressWidget}/>
        case ButtonWidget.s_type():
            return <RenderButtonWidget buttonElement={widget as ButtonWidget}/>
        default:
            console.error("Unrecognized type");
            return <></>
    }
}