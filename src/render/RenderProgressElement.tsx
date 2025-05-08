import {type ReactNode} from "react";
import type {ProgressElement} from "../backend/progress_element.ts";
import {ProgressBar} from "react-bootstrap";
import OptionalCard from "../Components/OptionalCard.tsx";

interface Props {
    progressElement: ProgressElement;
}

export function RenderProgressElement({progressElement}: Props): ReactNode {
    const clampedValue = Math.min(100, Math.max(0, progressElement.progress * 100));
    const roundedValue = Math.round(clampedValue * 10) / 10;

    return <OptionalCard card={progressElement.card} title={progressElement.id()} child_elements={progressElement.children}>
        <ProgressBar
            now={roundedValue}
            label={`${roundedValue}%` + (progressElement.text ? ` ${progressElement.text}` : "")}
            variant={progressElement.progress >= 1.0 ? "success" : undefined}
        />
    </OptionalCard>;
}
