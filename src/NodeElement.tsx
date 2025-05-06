import type {NodeElement} from "./node_element.ts";
import {useState} from "react";

export function RenderNodeElement(nodeElement: NodeElement) {
    const [a, setA] = useState(0);

    return <div key={nodeElement.id.toString()}>
        <h3 onClick={() => {setA(a + 1);}}>{nodeElement.id} - {a}</h3>
        <div className="d-flex flex-row">
            <div style={{width: "20px", height: "auto"}}>
                <div className="d-flex flex-row h-100 w-100">
                    <div className={"h-100"} style={{width: "4px", color: "gray"}}></div>
                    <div className={"h-100"} style={{width: "1px", backgroundColor: "gray"}}></div>
                </div>
            </div>

            <div>
                {[...nodeElement.children].map(([, v]) => v.render())}
            </div>
        </div>
    </div>;
}