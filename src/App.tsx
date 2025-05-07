import {useWebSockets} from "./backend/websockets.ts";
import {AbstractLogElement, NodeElement, TextElement} from "./backend/log_tree.ts";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import {handlePacket} from "./backend/handle_packet.ts";
import AnyElement from "./AnyElement.tsx";
import DisconnectedWarning from "./DisconnectedWarning.tsx";
import {SAMPLE_MODE} from "./backend/util.ts";

function sampleTree() {
    const tree = AbstractLogElement.rootElement();
    tree.addElement(["Alpha", "Bravo", "Charlie"], new NodeElement("Charlie"));
    tree.addElement(["Alpha", "Bravo", "Xray"], new TextElement("Xray", {text: "xray: 5"}));
    tree.addElement(["Alpha", "Bravo", "Delta"], new NodeElement("Delta"));

    tree.addElement(["Alpha", "Bravo", "Hotel"], new TextElement("Hotel", {text: "hotel:"}));
    tree.addElement(["Alpha", "Bravo", "Hotel", "Whiskey"], new TextElement("Whiskey", {text: "whiskey"}));

    return tree;
}

export default function App() {
    const [queue, isConnected] = useWebSockets();

    const [tree, setTree] = useState(SAMPLE_MODE ? sampleTree() : AbstractLogElement.rootElement());

    if (queue.length !== 0) {
        handlePacket(queue, tree);
        setTree(tree);
    }

    return <>
        <AnyElement element={tree}/>
        {!isConnected && !SAMPLE_MODE && <DisconnectedWarning/>}
    </>
}
