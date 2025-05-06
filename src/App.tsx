import {useWebSockets} from "./backend/websockets.ts";
import {AbstractLogElement} from "./backend/log_tree.ts";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NodeElement} from "./node_element.ts";


export default function App() {
    const queue = useWebSockets();
    queue.forEach((e) => console.log(e));

    const tree = AbstractLogElement.rootElement();
    tree.addElement(["1", "2", "3"], new NodeElement("hello"));

    tree.addElement(["1", "4"], new NodeElement("hello2"));

    return <>
        {tree.render()}
    </>
}
