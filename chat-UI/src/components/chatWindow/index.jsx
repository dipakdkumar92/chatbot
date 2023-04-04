import { useState } from "react";
import { ws } from "../../config";

const Chat = () => {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    try {
      if (message !== "") {
        const arr = [];
        ws.send(message);
        ws.onmessage = ((e) => {
          if (e.data && message.length > 0) {
            arr.push({ type: "search", message: message })
            arr.push({ type: "reply", message: e.data });
            setMessages([...messages, ...arr]);
            setMessage("");
          }
        })
      }
    } catch (e) {
      console.log("here is error", e)
    }
  };

  const handleChange = (value) => {
    setMessage("")
    if (value.length > 0)
      setMessage(value)
  }

  return (
    <div className="container">
      <div className="message-list">
      {console.log("messages", messages)}
        {messages.length ?
          (
            <div>
              {messages.map((item) => {
                return <div className={`${item.type === "search" ? "search-message" : "reply-message"}`}>{item.message}</div>
              })}
            </div>
          ) : ""}
      </div>
      <div className="chat-container">
        <div className="input-chat-container ">
          <form onSubmit={(e) => sendMessage(e)}>
            <input
              className="input-chat"
              type="text"
              placeholder="Chat message ..."
              onChange={(e) => handleChange(e.target.value)}
              value={message}
            ></input>
            <button type="submit" className="submit-chat">
              <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;