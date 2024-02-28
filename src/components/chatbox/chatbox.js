import "./chatbox.css";
import "../../normal.css";
import traclogo from "../../static/img/chatbox/tracgpt.PNG";
import user from "../../static/img/chatbox/user.png";
import { useState } from "react";
import IAService from "../../services/consult/consult";

export default function Chatbox() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    { user: "gpt", message: "Olá, como posso ajuda-lo hoje?" },
  ]);

  const iaService = new IAService();

  // Funcao que faz a comunicacao com o backend, e recebe os valores enviados pelo mesmo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setChatLog((currentChatLog) => [
      ...currentChatLog,
      { user: "me", message: input },
    ]);
    setInput("");
    setTimeout(() => {
      setChatLog((currentChatLog) => [
        ...currentChatLog,
        {
          user: "gpt",
          message: "Por favor aguarde, estou buscando a informação...",
        },
      ]);
    }, 1000);

    const response = await iaService.sendRequest({ user_request: input });

    let formattedMessage = "";
    if (Array.isArray(response[0].resultado)) {
      formattedMessage = response[0].resultado.map((el, index) => {
        return JSON.stringify(el);
      });
    }

    console.log(response);

    setChatLog((currentChatLog) => [
      ...currentChatLog.slice(0, currentChatLog.length - 1),
      { user: "gpt", message: formattedMessage },
    ]);
  };

  // Funcao que automatiza a renderizacao das mensagens enviadas pelo usuario e recebida pelo chatgpt
  const HandleExibition = ({ message }) => {
    return (
      <>
        <div
          className={`chat-message ${message.user === "gpt" ? "chatgpt" : ""}`}
        >
          <div className="chat-message-center">
            <div className="avatar">
              <img
                src={message.user == "gpt" ? traclogo : user}
                className="avatar-img"
              ></img>
            </div>
            <div className="message" style={{ "text-align": "justify" }}>
              {Array.isArray(message.message)
                ? message.message.map((el, index) => {
                    let formattedString = "";
                    const content = JSON.parse(el);
                    Object.entries(content).forEach(([key, value]) => {
                      formattedString += `${key}: ${value}\n`;
                    });

                    return <pre key={index}>{formattedString}</pre>;
                  })
                : message.message}
            </div>
          </div>
        </div>
      </>
    );
  };

  // JSX principal
  return (
    <div className="chatbox-body">
      <div className="chat-log">
        {chatLog.map((message, index) => (
          <HandleExibition key={index} message={message} />
        ))}
      </div>
      <div className="chat-input-holder">
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chat-input-textarea"
            placeholder="Digite sua mensagem"
            rows="1"
          ></input>
        </form>
      </div>
    </div>
  );
}
