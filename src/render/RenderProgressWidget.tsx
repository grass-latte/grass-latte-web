import {type ReactNode} from "react";
import type {ProgressWidget} from "../backend/progress_widget.ts";
import {ProgressBar} from "react-bootstrap";
import OptionalCard from "../Components/OptionalCard.tsx";

interface Props {
    progressElement: ProgressWidget;
}

export function RenderProgressWidget({progressElement}: Props): ReactNode {
    const clampedValue = Math.min(100, Math.max(0, progressElement.progress * 100));
    const roundedValue = Math.round(clampedValue * 10) / 10;

    return <OptionalCard card={progressElement.card} title={progressElement.id()} child_widgets={progressElement.children}>
        <ProgressBar
            now={roundedValue}
            label={`${roundedValue}%` + (progressElement.text ? ` ${progressElement.text}` : "")}
            variant={progressElement.progress >= 1.0 ? "success" : undefined}
        />
    </OptionalCard>;
}
