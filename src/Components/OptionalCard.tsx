import type {ReactNode} from "react";
import {Card, CardBody, CardText, CardTitle} from "react-bootstrap";
import type {AbstractLogElement} from "../backend/log_tree.ts";
import AnyElement from "../AnyElement.tsx";

interface Props {
    card: boolean,
    use_card_text?: boolean,
    title?: string,
    child_elements?: Map<string, AbstractLogElement>
    children?: ReactNode,
}

export default function OptionalCard({card, use_card_text, title, child_elements, children}: Props) {
    if (card) {
        return <Card className="w-auto mb-2">
            <CardBody>
                {title && <CardTitle>{title}</CardTitle>}
                {use_card_text ? <CardText>{children}</CardText> : children}
                {child_elements && child_elements.size > 0 && <div className="d-flex flex-row">
                    <div style={{width: "30px", height: "auto"}}>
                        <div className="d-flex flex-row h-100 w-100">
                            <div className={"h-100"} style={{width: "4px"}}></div>
                            <div className={"h-100"} style={{width: "1px", borderLeft: "1px dashed gray"}}></div>
                        </div>
                    </div>
                    <div>
                        {[...child_elements].map(([i, v]) => <AnyElement key={i} element={v}/>)}
                    </div>
                </div>}
            </CardBody>
        </Card>;
    }
    else {
        return <><div className="d-flex flex-row">
            {title && <p className="m-0">{title}:&nbsp;</p>}
            <div>{children}</div>
        </div>
            {child_elements && child_elements.size > 0 && <div className="d-flex flex-row mb-2">
                <div style={{width: "30px", height: "auto"}}>
                    <div className="d-flex flex-row h-100 w-100">
                        <div className={"h-100"} style={{width: "4px"}}></div>
                        <div className={"h-100"} style={{width: "1px", borderLeft: "1px dashed gray"}}></div>
                    </div>
                </div>
                <div className="flex-grow-1">
                    <div className="mb-1"></div>
                    {[...child_elements].map(([i, v]) => <AnyElement key={i} element={v}/>)}
                </div>
            </div>}
        </>;
    }
}