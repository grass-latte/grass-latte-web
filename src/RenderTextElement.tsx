import {type ReactNode} from "react";
import {TextElement} from "./backend/log_tree.ts";
import AnyElement from "./AnyElement.tsx";

interface Props {
    textElement: TextElement;
}

export function RenderTextElement({textElement}: Props): ReactNode {
    return <div key={textElement.id.toString()}>
        <p className={textElement.children.size == 0 ? "mb-2" : "mb-0"}>{textElement.text}</p>
        <div className="d-flex flex-row">
            <div style={{width: "30px", height: "auto"}}></div>
            <div>
                {[...textElement.children].map(([i, v]) => <AnyElement key={i} element={v}/>)}
            </div>
        </div>
    </div>;
}