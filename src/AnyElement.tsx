import {type AbstractLogElement, NodeElement, TextElement} from "./backend/log_tree.ts";
import {RenderNodeElement} from "./RenderNodeElement.tsx";
import {RenderTextElement} from "./RenderTextElement.tsx";

interface Props {
    element: AbstractLogElement;
}

export default function AnyElement({element}: Props) {
    switch (element.type()) {
        case NodeElement.s_type():
            return <RenderNodeElement node={element as NodeElement}/>
        case TextElement.s_type():
            return <RenderTextElement textElement={element as TextElement}/>
        default:
            console.error("Unrecognized type");
            return <></>
    }
}