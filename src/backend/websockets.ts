import {type Dispatch, type SetStateAction, useEffect, useMemo, useState} from "react";

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
            this.setDummy!(this.setDummyTo!);
        };
    }

    connected(): boolean {
        return this.ws.readyState === WebSocket.OPEN;
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

    send(path: string[], data: any) {
        if (this.connected()) {
            this.ws.send(JSON.stringify({path: path, data: data}));
            return true;
        }
        return false;
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

let websockets: WsGroup[] = []

export function sendWebSocket(path: string[], data: any) {
    return !websockets.every(ws => !ws.send(path, data));
}

export function useWebSockets(): [WsEvent[], boolean] {
    const [dummy, setDummy] = useState(false);

    const [portStart, portEnd] = useMemo(() => {
        return document.getElementById("port-marker-he9RYeXH5Psd7vcKOzWs")?.innerText?.split("-")?.map(
            (e) => parseInt(e)
        ) ?? (console.warn("Using default ports"), [3030, 3035]);
    }, []);

    useEffect(() => {
        let last_checked = 0;
        const interval = setInterval(() => {
            websockets[last_checked].reconnect();
            last_checked++;
            last_checked = last_checked % websockets.length;
        }, 500);

        return () => {
            clearInterval(interval);
            websockets.forEach((ws) => ws.dispose());
        }
    }, []);

    if (websockets.length === 0) {
        websockets = initialWebSockets(portStart, portEnd);
    }
    websockets.forEach((ws) => {
        ws.setDummy = setDummy;
        ws.setDummyTo = !dummy;
    });

    let queue: WsEvent[] = [];
    let connected = false;
    for (const wsg of websockets) {
        connected = connected || wsg.connected();
        queue = queue.concat(wsg.queue);
        wsg.queue = [];
    }

    return [queue, connected];
}