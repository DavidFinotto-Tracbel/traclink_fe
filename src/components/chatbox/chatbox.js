import "./chatbox.css";
import "../../normal.css";
import traclogo from "../../static/img/chatbox/tracgpt.PNG";

export default function Chatbox() {
  return (
    <div className="chatbox-body">
      <div className="chat-input-holder">
        <textarea
          className="chat-input-textarea"
          placeholder="Digite sua mensagem"
        ></textarea>
      </div>
      <div className="chat-log">
        <div className="chat-message">
          <div className="avatar">
            <img src={traclogo} className="avatar-img"></img>
          </div>
          <div className="message">Hello, world!</div>
        </div>
      </div>
    </div>
  );
}
