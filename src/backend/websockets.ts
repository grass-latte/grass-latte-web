import {type Dispatch, type SetStateAction, useEffect, useMemo, useRef, useState} from "react";

export class WsEvent {
    data: string;
    constructor(data: string) {
        this.data = data;
    }
}

class WsGroup {
    ws: WebSocket;
    queue: WsEvent[];
    setDummy?: Dispatch<SetStateAction<boolean>>;
    setDummyTo?: boolean;
    wasConnected: boolean;

    constructor(ws: WebSocket) {
        this.ws = ws;
        this.queue = [];
        this.wasConnected = false;
        this.bindWsCallbacks();
    }

    bindWsCallbacks() {
        this.ws.onmessage = (e: MessageEvent) => { this.onEvent(e) };
        this.ws.onopen = () => {
            console.log(`${this.ws.url} connected`);
            this.wasConnected = true;
            this.ws.send("Hello");
        };
        this.ws.onclose = () => {
            if (this.wasConnected) console.log(`${this.ws.url} disconnected`);
            this.wasConnected = false;
        };
    }

    reconnect() {
        if (this.ws.readyState === WebSocket.CONNECTING || this.ws.readyState === WebSocket.OPEN) {
            return;
        }
        this.ws = new WebSocket(this.ws.url);
        this.bindWsCallbacks();
    }

    onEvent(event: MessageEvent) {
        this.setDummy!(this.setDummyTo!);
        this.queue.push(new WsEvent(event.data));
    }

    dispose() {
        this.ws.close();
    }
}

function initialWebSockets(portStart: number, portEnd: number) {
    const websockets = [];
    for (let i = portStart; i <= portEnd; i++) {
        const ws = new WebSocket(`ws://localhost:${i}`);
        const wsg = new WsGroup(ws);
        websockets.push(wsg);
    }
    return websockets;
}

export function useWebSockets(): WsEvent[] {
    const [dummy, setDummy] = useState(false);

    const [portStart, portEnd] = useMemo(() => {
        return document.getElementById("port-marker-he9RYeXH5Psd7vcKOzWs")?.innerText?.split("-")?.map(
            (e) => parseInt(e)
        ) ?? (console.warn("Using default ports"), [3030, 3040]);
    }, []);

    const websockets = useRef<WsGroup[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            websockets.current.forEach((ws) => ws.reconnect());
        }, 1000);

        return () => {
            clearInterval(interval);
            websockets.current.forEach((ws) => ws.dispose());
        }
    }, []);

    if (websockets.current.length === 0) {
        websockets.current = initialWebSockets(portStart, portEnd);
    }
    websockets.current.forEach((ws) => {
        ws.setDummy = setDummy;
        ws.setDummyTo = !dummy;
    });

    let queue: WsEvent[] = [];
    for (const wsg of websockets.current) {
        queue = queue.concat(wsg.queue);
        wsg.queue = [];
    }

    return queue;
}