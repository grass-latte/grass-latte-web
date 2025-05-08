import type {ReactNode} from "react";
import {Card, CardBody, CardText, CardTitle} from "react-bootstrap";

interface Props {
    card: boolean,
    title?: string,
    children?: ReactNode,
}

export default function OptionalCard({card, title, children}: Props) {
    if (card) {
        return <Card>
            <CardBody>
                {title && <CardTitle>{title}</CardTitle>}
                <CardText>{children}</CardText>
            </CardBody>
        </Card>;
    }
    else {
        return <div className="d-flex flex-row">
            {title && <p>{title}</p>}
            <div>{children}</div>
        </div>;
    }
}