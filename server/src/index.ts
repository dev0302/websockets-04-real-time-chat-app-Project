// https://petal-estimate-4e9.notion.site/Chat-app-1487dfd107358090af74d91494085834

// Are we creating express application ? No.
// We are creating a web socket server.

// Noo here creating a chat system

// 1. first import WebSocket
import { WebSocket, WebSocketServer } from "ws";

// 2. create a connection (these 2 lines are enough to create websocket)
const wss = new WebSocketServer( {port: 8080} );

// 5. Creating as interface of user so let we can do more things like to restrict messages of partical room to itself etc  
interface User {
    socket: WebSocket;
    room: string;
}

// 6. creating empty array of allSockets to append newly created here.
let allSockets: User[] = [];

// 3. now this step is something like we do app.post("/signup", (req,res) => {}) .... in express. But here in webSockets since theres no such thing "methods" so here we do just single this this "ws.on"
// now here it says wherenever someone is connecting to my socket then this function "(socket)=>{}" will get called with a refrence to a socket, which lets you talk to that person which is connected to it
// through this socket we can receive or send messages
wss.on("connection", (socket) => {

    console.log("User Connected");

    // 4. Now this is to handle when there come message to this socket from cleint.
    socket.on("message",(message) => {
        console.log("Message Received : " + message.toString() );

        // 7. now since message mei jo message arha vo string type ka hoga, we need to convert it into json. 
        const parsedMessage = JSON.parse(message as unknown as string);

        // 8. now see, we will be having incoming data of this type
        // {
        //     "type": "join",
        //     "payload": {
        //         "roomId": "123"
        //     }
        // }

        // 9. now see if type is join means a there a new entry of person i.e. we will append this socket into global allSocket[] array.
        if (parsedMessage.type == "join") {
            console.log("User Joined room " + parsedMessage.payload.roomId);
            
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        };

        // 10. and if the type if chat means that person wants to chat for that we will first findout the room of that person
        if (parsedMessage.type == "chat") {
            console.log("User wants to chat");

            let currentUserRoom = null;
            // const currentUserRoom = allSockets.find( (x) => x.socket == socket ).room
            for(let i=0; i<allSockets.length; i++) {
                if(allSockets[i]?.socket == socket){
                    currentUserRoom = allSockets[i]?.room;
                }
            }

            // and then when room is found now we need to send this message to all user of that room
            for(let i=0; i<allSockets.length; i++) {
                if(allSockets[i]?.room == currentUserRoom){
                    allSockets[i]?.socket.send(parsedMessage.payload.message);
                }
            }

        };
        
    });

    socket.on("close", () => {
        console.log("User disconnected");

        allSockets = allSockets.filter(
            (user) => user.socket !== socket
        );
    });
    
    
});