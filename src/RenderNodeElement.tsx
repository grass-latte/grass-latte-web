import {type ReactNode, useState} from "react";
import type {NodeElement} from "./backend/log_tree.ts";
import AnyElement from "./AnyElement.tsx";

interface Props {
    node: NodeElement;
}

export function RenderNodeElement({node}: Props): ReactNode {
    const [a, setA] = useState(0);

    return <div key={node.id.toString()}>
        <h3 onClick={() => {setA(a + 1);}}>{node.id} - {a}</h3>
        <div className="d-flex flex-row">
            <div style={{width: "20px", height: "auto"}}>
                <div className="d-flex flex-row h-100 w-100">
                    <div className={"h-100"} style={{width: "4px", color: "gray"}}></div>
                    <div className={"h-100"} style={{width: "1px", backgroundColor: "gray"}}></div>
                </div>
            </div>

            <div>
                {[...node.children].map(([i, v]) => <AnyElement key={i} element={v}/>)}
            </div>
        </div>
    </div>;
}