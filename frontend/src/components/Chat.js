import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import './chat.css';

const Chat = () => {
  const url = "http://localhost:5000";
  const [socket, setSocket] = useState(io(url, { autoConnect: false }));

  const [msgText, setMsgText] = useState("");

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("user")))

  const [messageList, setMessageList] = useState([
      ]);

  useEffect(() => {
    socket.connect();
  }, []);

  // const messageList = await fetch('http://localhost:5000/chat/getchat', {
  //   method: 'GET',
  //   body : JSON.stringify(message),
  //   headers : {
  //       'Content-Type' : 'application/json'
  //   }
  // })

  const sendMessage = async () => {

    const message = { text: msgText, sent: true, sendername:currentUser.name, sendermail:currentUser.email };
    // emit function is used to send message
    socket.emit("sendmsg", message);

    setMessageList([...messageList, message]);
    setMsgText("");

    const response = await fetch('http://localhost:5000/chat/add',{
      method: 'POST',
      body : JSON.stringify({
        chatData: message,
    createdAt: new Date(),
    userId: currentUser._id
      }), //converting javascript object to json
      headers : {
        'Content-Type' : 'application/json'
      }
    })

  };

  socket.on("recmsg", (data) => {
    console.log(data);
    setMessageList([...messageList, data]);
    console.log(data);
  });

  const displayMessages = () => {
    return messageList.map(({ text, sent, sendername, sendermail }) => (
      <div className={sent ? 'bubble-sent msg-bubble' : 'bubble-rec msg-bubble'}>
        <p class="text-white-50">
          {sendername} ({sendermail}) :
          {/* <span class="text-end">fgjhjk</span> */}
        </p>
        <p className="chat msg-content">{text}</p>
      </div>
    ));
  };  // end of displayMessages

  return (
    <div className="chat container main pb-5">
      <div className="chat row mb-5 mt-5">
       
       <div className="chat col-md-4 pb-0 col-l">
          <div className="chat card mb-0 h-100">
            {/* list */}
          </div>
       </div>
       <div className="chat col-md-8 col-r">
          <div className="chat">
            {/* <h1 className="chat text-center text-white border btn-rounded">Chat App</h1> */}
            <div className="chat card h-100">
              <div className="chat card-body">
                <div className="chat msg-area">{displayMessages()}
                </div>
              </div>
              <div className="chat card-footer">
                <div className="chat input-group">
                  <input
                    type="text"
                    className="chat form-control"
                    onChange={(e) => setMsgText(e.target.value)}
                    value={msgText}
                  />
                  <button onClick={sendMessage} className="chat btn btn-primary">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
       </div>
       
      </div>
    </div>
  );
};

export default Chat;