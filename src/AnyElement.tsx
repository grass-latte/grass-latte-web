import {type AbstractLogElement, NodeElement} from "./backend/log_tree.ts";
import {RenderNodeElement} from "./render/RenderNodeElement.tsx";
import {RenderTextElement} from "./render/RenderTextElement.tsx";
import {TextElement} from "./backend/text_element.ts";
import {ProgressElement} from "./backend/progress_element.ts";
import {RenderProgressElement} from "./render/RenderProgressElement.tsx";

interface Props {
    element: AbstractLogElement;
}

export default function AnyElement({element}: Props) {
    switch (element.type()) {
        case NodeElement.s_type():
            return <RenderNodeElement node={element as NodeElement}/>
        case TextElement.s_type():
            return <RenderTextElement textElement={element as TextElement}/>
        case ProgressElement.s_type():
            return <RenderProgressElement progressElement={element as ProgressElement}/>
        default:
            console.error("Unrecognized type");
            return <></>
    }
}