import React, { useState, useEffect, useRef } from "react";
import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import { Send, Bot, User } from "lucide-react";

const AIChat = () => {
    const [messages, setMessages] = useState([
        { role: "ai", content: "Hi! I'm Ansh's AI assistant. Ask me anything about his projects, skills, or experience!" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            if (response.ok && data.response) {
                setMessages((prev) => [...prev, { role: "ai", content: data.response }]);
            } else {
                const errorContent = data.detail || "Sorry, I encountered an error.";
                setMessages((prev) => [...prev, { role: "ai", content: errorContent }]);
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages((prev) => [...prev, { role: "ai", content: "I couldn't connect to the AI server. Is the backend running on port 8000?" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="chat-window bg-[#1e1e1e] flex flex-col"
            style={{
                width: "450px",
                height: "600px",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
            }}
        >
            {/* Header */}
            <div id="window-header" className="flex items-center px-4 py-2 bg-[#2d2d2d] border-b border-white/5">
                <WindowControls target="aiChat" />
                <h2 className="text-white text-sm font-medium ml-4">AI Assistant</h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-blue-600 ml-2" : "bg-purple-600 mr-2"}`}>
                                {msg.role === "user" ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                            </div>
                            <div className={`p-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-blue-500 text-white rounded-tr-none" : "bg-[#333] text-gray-200 rounded-tl-none"}`}>
                                {msg.content}
                            </div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-[#333] p-3 rounded-2xl rounded-tl-none animate-pulse">
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-[#2d2d2d] border-t border-white/5">
                <div className="flex items-center bg-[#1e1e1e] rounded-full px-4 py-2 border border-white/10 focus-within:border-blue-500/50 transition-colors">
                    <input
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none text-white text-sm"
                        placeholder="Ask me anything..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        className="ml-2 text-blue-500 hover:text-blue-400 transition-colors disabled:opacity-50"
                        disabled={loading}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WindowWrapper(AIChat, "aiChat");
