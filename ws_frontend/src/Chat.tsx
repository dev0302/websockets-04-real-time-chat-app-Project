import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";

// need to turn of strictMode in main.jsx otherwise one message will come twice.

function Chat() {
  const {roomId} = useParams();

  console.log(roomId);
  
  const [messages, setMessages] = useState(["Hey", "Heyy2"]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  function btnHandler() {

    const value = inputRef.current?.value;
    wsRef.current?.send(JSON.stringify(
      {
        "type": "chat",
        "payload": {
          "message": value
        }
      }
    ))
    
  }

  useEffect( () => {

    // const ws = new WebSocket("ws://localhost:8080");
    // for production
    const socketUrl = import.meta.env.VITE_API_URL
    const ws = new WebSocket(socketUrl)
    wsRef.current = ws;

    // ws.onmessage is an event handler that runs every time the server sends a message to the client over a WebSocket connection
    ws.onmessage = (e) => {
      setMessages(prev => [...prev, e.data]);
    };

    // ws.onopen is an event handler that runs once, when the WebSocket connection is successfully established between the client and the server.
    ws.onopen = () => {
      ws.send(JSON.stringify(
        {
          "type": "join",
          "payload": {
            roomId
          }
        }
      ))
    }
    

  },[] )

  return (
    <div className="h-screen w-full flex justify-center flex-col">
      
      {/* chatbox div */}
      <div className="MAINDIV w-11/12 h-[85%] m-auto flex flex-col justify-between">

        {/* chat box div */}
        <div className="h-[90%] border-2 border-gray-400/60 rounded-md flex flex-col gap-4 p-8">

          {/* message div */}
          {
            messages.map( (msg, i) => {
              return (
                <span key={i} className="bg-slate-500/20 py-2 px-4 rounded-md self-start inline-block">{msg}</span>
              )
            } )
          }
        
        </div>

        {/* send button */}
        <div className="flex gap-2">

          <input ref={inputRef} type="text" placeholder="Enter Text" />
          <button onClick={btnHandler} className="px-2 py-1 bg-blue-500 rounded-lg">Send</button>

        </div>

      </div>
    </div>
  )
}

export default Chat;