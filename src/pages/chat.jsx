import { useState } from "react";
import "./chat.css";
import ps from "../assets/prompt-submit.png";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSend = async () => {
        if (!input.trim() || loading) return;
    
        const newMessage = { type: "sent", text: input };
        setMessages((prev) => [...prev, newMessage]);
        setLoading(true);
        setError(null);
    
        try {
            console.log("Sending message to chatbot...");
    
            const response = await fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: input }),
            });
    
            const data = await response.json();
            console.log("Chatbot Response:", data);
    
            if (data.response) {
                const botMessage = { type: "received", text: data.response };
                setMessages((prev) => [...prev, botMessage]);
            } else {
                throw new Error("No response from chatbot");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setError("Error connecting to chatbot");
            setMessages((prev) => [...prev, { type: "received", text: "Error occurred." }]);
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    return (
        <div className="chat-main">
            <div className="chat-in">
                <div className="chat-in-1">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.type}`}>
                            <p>{msg.text}</p>
                        </div>
                    ))}
                    {loading && <div className="message received"><p>Thinking...</p></div>}
                </div>
                {error && <div className="error">{error}</div>}
                <div className="chat-in-2">
                    <div className="text-input">
                        <input
                            type="text"
                            placeholder="Ask a question..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            disabled={loading}
                        />
                        <img src={ps} alt="Send" onClick={handleSend} style={{ opacity: loading ? 0.5 : 1 }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
