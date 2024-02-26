import Sidebar from "../../components/sidebar/sidebar";
import Chatbox from "../../components/chatbox/chatbox";
import "./layout.css";
import "../../normal.css";

export default function Layout() {
  return (
    <div className="layout-body">
      <Sidebar />
      <Chatbox />
    </div>
  );
}
