import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import './chat.css';

const Chat = () => {
  const url = "http://localhost:5000";
  const [socket, setSocket] = useState(io(url, { autoConnect: false }));

  const [msgText, setMsgText] = useState("");

  const [messageList, setMessageList] = useState([
    { text: "Hi, How are you?", sent: true },
    { text: "Hello", sent: false },
    { text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla labore reiciendis tempora asperiores beatae a ducimus nostrum modi repellendus sunt voluptatum corporis, ea neque possimus commodi veniam? Minima doloremque est, harum laborum mollitia voluptate, molestias tempore, deserunt accusamus iure libero magni aut omnis. Ipsum quibusdam id qui quam corrupti quasi?", sent: true },
  ]);

  useEffect(() => {
    socket.connect();
  }, []);

  const sendMessage = () => {

    const message = { text: msgText, sent: true };
    // emit function is used to send message
    socket.emit("sendmsg", message);

    setMessageList([...messageList, message]);
    setMsgText("");
  };

  socket.on("recmsg", (data) => {
    setMessageList([...messageList, data]);
    console.log(data);
  });

  const displayMessages = () => {
    return messageList.map(({ text, sent }) => (
      <div className={sent ? 'bubble-sent msg-bubble' : 'bubble-rec msg-bubble'}>
        <p className="msg-content">{text}</p>
      </div>
    ));
  };

  return (
    <div className="container">
      <h1>Chat App</h1>
      <div className="card">
        <div className="card-body">
          <div className="msg-area">{displayMessages()}</div>
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