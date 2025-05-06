import {useWebSockets} from "./backend/websockets.ts";
import {AbstractLogElement} from "./backend/log_tree.ts";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import {handlePacket} from "./backend/handle_packet.ts";
import AnyElement from "./AnyElement.tsx";
import DisconnectedWarning from "./DisconnectedWarning.tsx";


export default function App() {
    const [queue, isConnected] = useWebSockets();

    const [tree, setTree] = useState(AbstractLogElement.rootElement());

    if (queue.length !== 0) {
        handlePacket(queue, tree);
        setTree(tree);
    }

    return <>
        <AnyElement element={tree}/>
        {!isConnected && <DisconnectedWarning/>}
    </>
}
