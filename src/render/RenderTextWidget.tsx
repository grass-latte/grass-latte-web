import {type ReactNode} from "react";
import {TextWidget} from "../backend/text_widget.ts";
import OptionalCard from "../Components/OptionalCard.tsx";

interface Props {
    textElement: TextWidget;
}

export function RenderTextWidget({textElement}: Props): ReactNode {
    return <OptionalCard use_card_text card={textElement.card} title={textElement.id()} child_widgets={textElement.children}>
        <p className="m-0">{textElement.text}</p>
    </OptionalCard>;
}