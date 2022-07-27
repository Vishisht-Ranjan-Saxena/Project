import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import './chat.css';

const Chat = () => {
  const url = "http://localhost:5000";
  const [socket, setSocket] = useState(io(url, { autoConnect: false }));

  const [msgText, setMsgText] = useState("");

  const [messageList, setMessageList] = useState([
      ]);

  useEffect(() => {
    socket.connect();
  }, []);

  const sendMessage = () => {

    const message = { text: msgText, sent: true, sendername:"Vishisht" };
    // emit function is used to send message
    socket.emit("sendmsg", message);

    setMessageList([...messageList, message]);
    setMsgText("");
  };

  socket.on("recmsg", (data) => {
    console.log(data);
    setMessageList([...messageList, data]);
    console.log(data);
  });

  const displayMessages = () => {
    return messageList.map(({ text, sent, sendername }) => (
      <div className={sent ? 'bubble-sent msg-bubble' : 'bubble-rec msg-bubble'}>
        <p className="msg-content">{text}</p>
        <p>{sendername}</p>
      </div>
    ));
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-4 text-center text-white border btn-rounded">Chat App</h1>
      <div className="card mt-5 mb-5">
        <div className="card-body">
          <div className="msg-area">{displayMessages()}
          </div>
        </div>
        <div className="card-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setMsgText(e.target.value)}
              value={msgText}
            />
            <button onClick={sendMessage} className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;