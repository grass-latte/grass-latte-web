import {type AbstractLogElement, NodeElement} from "./backend/log_tree.ts";
import {RenderNodeElement} from "./RenderNodeElement.tsx";

interface Props {
    element: AbstractLogElement;
}

export default function AnyElement({element}: Props) {
    switch (element.type()) {
        case NodeElement.s_type():
            return <RenderNodeElement node={element}/>
        default:
            console.error("Unrecognized type");
            return <></>
    }
}