import {useWebSockets} from "./backend/websockets.ts";
import {AbstractTreeWidget} from "./backend/log_tree.ts";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import {handlePacket} from "./backend/handle_packet.ts";
import AnyWidget from "./AnyWidget.tsx";
import DisconnectedWarning from "./DisconnectedWarning.tsx";
import {SAMPLE_MODE} from "./backend/util.ts";
import {sampleTree} from "./backend/sample_tree.ts";

export default function App() {
    const [queue, isConnected] = useWebSockets();

    const [tree, setTree] = useState(SAMPLE_MODE ? sampleTree() : AbstractTreeWidget.rootElement());

    if (queue.length !== 0) {
        handlePacket(queue, tree);
        setTree(tree);
    }

    return <>
        {!isConnected && <DisconnectedWarning/>}
        <div className="container mt-3">
            {[...tree.children].map(([i, v]) => <AnyWidget key={i} widget={v}/>)}
        </div>
    </>
}
