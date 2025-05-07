import {type ReactNode} from "react";
import type {NodeElement} from "./backend/log_tree.ts";
import AnyElement from "./AnyElement.tsx";

interface Props {
    node: NodeElement;
}

export function RenderNodeElement({node}: Props): ReactNode {
    return <div key={node.id.toString()}>
        <h3>{node.id}</h3>
        <div className="d-flex flex-row">
            <div style={{width: "30px", height: "auto"}}>
                <div className="d-flex flex-row h-100 w-100">
                    <div className={"h-100"} style={{width: "4px"}}></div>
                    <div className={"h-100"} style={{width: "1px", borderLeft: "1px dashed gray"}}></div>
                </div>
            </div>

            <div>
                {[...node.children].map(([i, v]) => <AnyElement key={i} element={v}/>)}
            </div>
        </div>
    </div>;
}