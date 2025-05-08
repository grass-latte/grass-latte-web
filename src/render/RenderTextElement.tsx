import {type ReactNode} from "react";
import {TextElement} from "../backend/text_element.ts";
import OptionalCard from "../Components/OptionalCard.tsx";

interface Props {
    textElement: TextElement;
}

export function RenderTextElement({textElement}: Props): ReactNode {
    return <OptionalCard use_card_text card={textElement.card} title={textElement.id()} child_elements={textElement.children}>
        <p className="m-0">{textElement.text}</p>
    </OptionalCard>;
}