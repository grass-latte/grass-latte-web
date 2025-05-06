
export default function DisconnectedWarning() {
    return <div className="d-flex justify-content-center align-items-center align-content-center" style={{position: "absolute", left: "0", top: "0", width: "100vw", height: "100vh", backgroundColor: "#ba0000", opacity: 0.7}}>
        <h1 className="text-white" style={{fontSize: "100px"}}>No active connection</h1>
    </div>
}