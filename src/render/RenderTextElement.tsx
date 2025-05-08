import {type ReactNode} from "react";
import AnyElement from "../AnyElement.tsx";
import {TextElement} from "../backend/text_element.ts";
import OptionalCard from "../Components/OptionalCard.tsx";

interface Props {
    textElement: TextElement;
}

export function RenderTextElement({textElement}: Props): ReactNode {
    return <OptionalCard card={textElement.card} title={textElement.card ? textElement.id : undefined}>
        <p className={textElement.children.size == 0 ? "mb-2" : "mb-0"}>{textElement.text}</p>
        <div className="d-flex flex-row">
            <div style={{width: "30px", height: "auto"}}></div>
            <div>
                {[...textElement.children].map(([i, v]) => <AnyElement key={i} element={v}/>)}
            </div>
        </div>
    </OptionalCard>;
}