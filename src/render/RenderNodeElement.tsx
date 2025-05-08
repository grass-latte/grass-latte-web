import {type ReactNode, useState} from "react";
import AnyElement from "../AnyElement.tsx";
import type {NodeElement} from "../backend/log_tree.ts";
import {CaretDown, CaretRight} from "react-bootstrap-icons";
import {AnimatePresence, motion} from "framer-motion";

interface Props {
    node: NodeElement;
}

export function RenderNodeElement({node}: Props): ReactNode {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen((prev) => !prev);


    return <div key={node.id.toString()} className="w-auto mb-2">
        <h3 className="mb-0" onClick={toggle}>{isOpen ? <CaretDown/> : <CaretRight/>} {node.id}</h3>
        <AnimatePresence initial={false}>
            {isOpen && <motion.div className="d-flex flex-row"
                                   key="content"
                                   initial={{ height: 0 }}
                                   animate={{ height: "auto" }}
                                   exit={{ height: 0 }}
                                   transition={{ duration: 0.1, ease: "easeInOut" }}
                                   style={{ overflow: "hidden" }}>
                <div style={{width: "30px", height: "auto"}}>
                    <div className="d-flex flex-row h-100 w-100">
                        <div className={"h-100"} style={{width: "4px"}}></div>
                        <div className={"h-100"} style={{width: "1px", borderLeft: "1px dashed gray"}}></div>
                    </div>
                </div>

                <div className="flex-grow-1">
                    {node.children.size > 0 && <div className="mb-2"></div>}
                    {[...node.children].map(([i, v]) => <AnyElement key={i} element={v}/>)}
                </div>
            </motion.div>}
        </AnimatePresence>
    </div>;
}