import {type ReactNode} from "react";
import AnyElement from "../AnyElement.tsx";
import type {ProgressElement} from "../backend/progress_element.ts";
import {ProgressBar} from "react-bootstrap";
import OptionalCard from "../Components/OptionalCard.tsx";

interface Props {
    progressElement: ProgressElement;
}

export function RenderProgressElement({progressElement}: Props): ReactNode {
    const clampedValue = Math.min(100, Math.max(0, progressElement.progress * 100));
    const roundedValue = Math.round(clampedValue * 10) / 10;

    return <OptionalCard card={progressElement.card} title={progressElement.text}>
        <ProgressBar now={roundedValue} label={`${roundedValue}%`}/>
        <div className="d-flex flex-row">
            <div style={{width: "30px", height: "auto"}}></div>
            <div>
                {[...progressElement.children].map(([i, v]) => <AnyElement key={i} element={v}/>)}
            </div>
        </div>
    </OptionalCard>;
}
