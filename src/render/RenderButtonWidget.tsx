import {type ReactNode, useState} from "react";
import OptionalCard from "../Components/OptionalCard.tsx";
import type {ButtonWidget} from "../backend/button_widget.ts";
import {Button} from "react-bootstrap";
import {sendWebSocket} from "../backend/websockets.ts";

interface Props {
    buttonElement: ButtonWidget;
}

export function RenderButtonWidget({buttonElement}: Props): ReactNode {
    const [dummy, setDummy] = useState(0);

    return <OptionalCard card={buttonElement.card} title={buttonElement.card ? buttonElement.id() : undefined} child_widgets={buttonElement.children}>
        <Button className="w-100" disabled={!buttonElement.handled} onClick={() => {
            if (sendWebSocket(buttonElement.path, {type: "click", data: null})) {
                setDummy(dummy + 1);
                buttonElement.handled = false;
            }
        }}>{buttonElement.text}</Button>
    </OptionalCard>;
}