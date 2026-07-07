"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const GREETING =
  "Hello! I'm your AI assistant. How can I help you today?";

export function AiChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>(
    [{ role: "bot", text: GREETING }]
  );

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMsg },
      {
        role: "bot",
        text: "Thanks for reaching out! A member of our team will get back to you shortly. In the meantime, feel free to explore our products or create an account to get started.",
      },
    ]);
    setInput("");
  };

  return (
    <div id="ai-chatbot" className="fixed bottom-6 right-6 z-[300]">
      {open && (
        <div className="mb-4 flex w-[min(380px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-bg-surface shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan">
                <MessageCircle size={16} className="text-white" />
              </div>
              <p className="font-inter text-sm font-medium text-text-heading">
                AI Assistant
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/40 transition-colors hover:text-text-heading"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex max-h-72 flex-col gap-3 overflow-y-auto p-5">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`rounded-xl px-4 py-3 font-inter text-sm leading-relaxed ${
                  msg.role === "bot"
                    ? "bg-white/[0.05] text-text-body"
                    : "ml-auto max-w-[85%] bg-brand-purple/20 text-text-heading"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2 border-t border-white/[0.07] p-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask us anything..."
              className="flex-1 rounded-xl border border-white/[0.07] bg-bg px-4 py-2.5 font-inter text-sm text-text-heading placeholder:text-white/25 focus:border-brand-purple/50 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSend}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple to-brand-cyan text-white transition-opacity hover:opacity-90"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan text-white shadow-lg transition-transform hover:scale-105"
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
