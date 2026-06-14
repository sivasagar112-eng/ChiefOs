"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = {
  id: string;
  role: "user" | "model";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      content: "Hello! I am ChiefOS, your AI Chief of Staff. How can I assist you with your business today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Create history array without the new message for context
      const history = messages.map(m => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content, history }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");

      const data = await res.json();
      
      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: data.response,
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: "Sorry, I encountered an error communicating with the server. Please check your API key and try again.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]" style={{ backgroundColor: 'var(--bg-dark)' }}>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 max-w-4xl mx-auto ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-blue-600" : "bg-zinc-800 border border-zinc-700"}`}>
              {msg.role === "user" ? <User size={20} color="white" /> : <Bot size={20} color="white" />}
            </div>
            
            <div className={`p-4 rounded-2xl max-w-[80%] ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-zinc-800 border border-zinc-700 text-zinc-200"}`}>
              {msg.role === "user" ? (
                <p>{msg.content}</p>
              ) : (
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4 max-w-4xl mx-auto">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-zinc-800 border border-zinc-700">
              <Bot size={20} color="white" />
            </div>
            <div className="p-4 rounded-2xl bg-zinc-800 border border-zinc-700 text-zinc-200 flex items-center gap-2">
              <Loader2 className="animate-spin" size={20} />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-zinc-900 border-t border-zinc-800">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask ChiefOS about revenue, tasks, or insights..."
            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-full py-4 pl-6 pr-16 focus:outline-none focus:border-blue-500 transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
        <p className="text-center text-zinc-500 text-xs mt-3">
          ChiefOS can make mistakes. Verify important business intelligence.
        </p>
      </div>
    </div>
  );
}
