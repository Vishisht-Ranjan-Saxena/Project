import React, { useEffect, useState } from "react"
import { io } from "socket.io-client"

const Chat = () => {
  const url = "http://localhost:5000"
  const [socket, setSocket] = useState(io(url, { autoConnect: false }))
  const [msgText, setMsgText] = useState("")

  useEffect(() => {
    socket.connect()
  }, [])

  const sendMessage = () => {
    socket.emit("sendmsg", msgText)
  }

  return (
    <div className="container">
      <input
        className="form-control"
        onChange={(e) => {
          setMsgText(e.target.value)
        }}
      />
      <button className="btn btn-primary" onClick={sendMessage}>
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  )
}

export default Chat