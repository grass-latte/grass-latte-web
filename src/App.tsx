import {useWebSockets} from "./backend/websockets.ts";
import {NodeElement} from "./NodeElement.tsx";
import {AbstractLogElement} from "./backend/log_tree.ts";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
    const queue = useWebSockets();
    queue.forEach((e) => console.log(e));

    const tree = AbstractLogElement.rootElement();
    tree.addElement(["yes", "no"], new NodeElement("hello"));

    return <>
        {tree.render("root")}
    </>
}
