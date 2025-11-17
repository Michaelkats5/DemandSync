import React, { useState, useRef, useEffect } from "react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your restaurant operations assistant. I can help you with inventory management, purchase orders, receiving shipments, prep lists, bar management, forecasting, and more. Ask me anything like 'What do I need to order for the weekend?' or 'Show me all low-stock items'. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY || ""}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are an AI assistant for a restaurant inventory, purchasing, forecasting, and operations platform. Your job is to answer questions, guide managers through workflows, and retrieve or calculate information across all modules including Inventory, Purchase Orders, Receiving, Prep Lists, Bar Management, Forecasts, and Reports.

Your capabilities include:

Understanding natural language questions from restaurant managers, chefs, bartenders, and owners.

Pulling real or simulated data for items, vendors, counts, usage, pricing, traffic, sales, and labor.

Explaining step-by-step how to perform tasks such as creating purchase orders, entering inventory, uploading Excel sheets, or using AI photo scanning for bottle counts.

Auto-generating insights such as low stock alerts, over-par items, suggested orders, variance explanations, and cost-saving recommendations.

Responding conversationally with concise, accurate, and operationally useful answers.

The chatbot should be able to:

Answer queries like "What do I need to order for the weekend?", "Why is our pour cost high?", "Show me all low-stock items", "Create a PO from par levels", or "Upload this Excel file and update the counts".

Guide workflows such as receiving shipments, entering counts, fixing errors, creating prep lists, or checking vendor performance.

Analyze AI-scanned shelf images for liquor and produce, calculate current quantities, and compare against expected inventory.

Provide explanations for discrepancies, overuse, spoilage, shrink, and variance.

Forecast traffic, usage, and next-week demand using last year's patterns, economic trends, and local activity.

Maintain data consistency across all modules and reference the latest updated information.

Tone:

Clear, helpful, accurate.

No technical jargon unless asked.

Prioritize operational efficiency and real-world restaurant workflows.

The goal is to create a fully conversational operational assistant that helps restaurants run more efficiently by handling inventory, purchasing, receiving, forecasting, prep, and bar management tasks in real time.`
            },
            ...messages,
            userMessage
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = {
        role: "assistant",
        content: data.choices[0].message.content
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm sorry, I'm having trouble connecting right now. Please check your API key configuration or try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
        .chatbot-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
        }

        .chatbot-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9, #38bdf8);
          color: white;
          border: none;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .chatbot-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(14, 165, 233, 0.5);
        }

        .chatbot-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 400px;
          height: 600px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chatbot-header {
          background: linear-gradient(135deg, #0ea5e9, #38bdf8);
          color: white;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chatbot-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }

        .chatbot-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          transition: background 0.2s;
        }

        .chatbot-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .chatbot-message {
          display: flex;
          flex-direction: column;
          max-width: 80%;
        }

        .chatbot-message.user {
          align-self: flex-end;
        }

        .chatbot-message.assistant {
          align-self: flex-start;
        }

        .message-bubble {
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          line-height: 1.5;
        }

        .message-bubble.user {
          background: linear-gradient(135deg, #0ea5e9, #38bdf8);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message-bubble.assistant {
          background: #f3f4f6;
          color: #1f2937;
          border-bottom-left-radius: 4px;
        }

        .chatbot-input-area {
          padding: 16px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 8px;
        }

        .chatbot-input {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid #dbeafe;
          border-radius: 8px;
          font-size: 14px;
          resize: none;
          font-family: inherit;
        }

        .chatbot-input:focus {
          outline: none;
          border-color: #0ea5e9;
        }

        .chatbot-send {
          padding: 10px 20px;
          background: linear-gradient(135deg, #0ea5e9, #38bdf8);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .chatbot-send:hover:not(:disabled) {
          opacity: 0.9;
        }

        .chatbot-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .loading-indicator {
          display: flex;
          gap: 4px;
          padding: 12px 16px;
        }

        .loading-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #9ca3af;
          animation: bounce 1.4s infinite ease-in-out;
        }

        .loading-dot:nth-child(1) {
          animation-delay: -0.32s;
        }

        .loading-dot:nth-child(2) {
          animation-delay: -0.16s;
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }

        @media (max-width: 480px) {
          .chatbot-window {
            width: calc(100vw - 48px);
            height: calc(100vh - 120px);
            bottom: 80px;
            right: 24px;
          }
        }
      `}</style>

      <div className="chatbot-container">
        {isOpen && (
          <div className="chatbot-window">
            <div className="chatbot-header">
              <h3>Restaurant Assistant</h3>
              <button className="chatbot-close" onClick={() => setIsOpen(false)}>×</button>
            </div>
            <div className="chatbot-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`chatbot-message ${msg.role}`}>
                  <div className={`message-bubble ${msg.role}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="chatbot-message assistant">
                  <div className="loading-indicator">
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="chatbot-input-area">
              <textarea
                className="chatbot-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                rows="1"
                disabled={isLoading}
              />
              <button
                className="chatbot-send"
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
              >
                Send
              </button>
            </div>
          </div>
        )}
        <button className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
          💬
        </button>
      </div>
    </>
  );
}

