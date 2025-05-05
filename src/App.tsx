import { useState } from 'react'
import './App.css'

function App() {
    const [text, setText] = useState("-")

    const ws = new WebSocket("ws://localhost:3030/ws");

    ws.onmessage = (event) => {
        setText(event.data)
    };

    ws.onopen = () => console.log("Connected to Rust WebSocket");
    ws.onclose = () => console.log("Disconnected");

    return <>
        <h1>{text}</h1>
    </>
}

export default App
