'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User, Loader2, Trash2, Copy, Check } from 'lucide-react';
import Image from 'next/image';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function TwinTwo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize session on mount with twin2 prefix
  useEffect(() => {
    const initSession = () => {
      const storedSessionId = sessionStorage.getItem('chat_session_id_twin2');
      if (storedSessionId) {
        setSessionId(storedSessionId);
      } else {
        const newSessionId = `twin2_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setSessionId(newSessionId);
        sessionStorage.setItem('chat_session_id_twin2', newSessionId);
      }
    };
    initSession();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          session_id: sessionId || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Update session ID if provided by backend
      if (data.session_id && data.session_id !== sessionId) {
        setSessionId(data.session_id);
        sessionStorage.setItem('chat_session_id_twin2', data.session_id);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || data.message || 'No response received',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
    const newSessionId = `twin2_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
    sessionStorage.setItem('chat_session_id_twin2', newSessionId);
  };

  const copyMessage = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="bg-slate-800/50 border-b border-purple-500/20 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex-shrink-0">
            <Image
              src="/avatar.jpg"
              alt="Richard"
              width={40}
              height={40}
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100">Digital Twin Assistant</h3>
            <p className="text-xs text-slate-400">
              {messages.length > 0 ? `${messages.length} messages` : 'Start a conversation'}
            </p>
          </div>
        </div>
        
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 text-red-400 text-sm transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Messages Container */}
      <div className="h-[600px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-900/30 to-slate-900/50 custom-scrollbar">
        {messages.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4">
              <Image
                src="/avatar.jpg"
                alt="Richard"
                width={80}
                height={80}
                className="rounded-full object-cover w-full h-full border-2 border-purple-500/30 shadow-lg"
              />
            </div>
            <h3 className="text-xl font-semibold text-slate-200 mb-2">
              Welcome!
            </h3>
            <p className="text-slate-400 max-w-md mx-auto">
              Ask me anything about Richard's background, experience, or skills!
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            } animate-fadeIn`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 flex-shrink-0">
                <Image
                  src="/avatar.jpg"
                  alt="Richard"
                  width={32}
                  height={32}
                  className="rounded-full object-cover shadow-lg w-full h-full"
                />
              </div>
            )}
            
            <div
              className={`group max-w-[75%] rounded-2xl p-4 ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg'
                  : 'bg-slate-800/70 text-slate-100 border border-purple-500/20 shadow-md'
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                <span className="text-xs opacity-60">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {message.role === 'assistant' && (
                  <button
                    onClick={() => copyMessage(message.content, message.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
                    title="Copy message"
                  >
                    {copiedId === message.id ? (
                      <Check className="w-3 h-3 text-green-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start animate-fadeIn">
            <div className="w-8 h-8 flex-shrink-0">
              <Image
                src="/avatar.jpg"
                alt="Richard"
                width={32}
                height={32}
                className="rounded-full object-cover shadow-lg w-full h-full"
              />
            </div>
            <div className="bg-slate-800/70 border border-purple-500/20 rounded-2xl p-4 shadow-md">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                <span className="text-sm text-slate-400">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error Display */}
      {error && (
        <div className="px-6 pb-2">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm flex items-center space-x-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-slate-800/50 border-t border-purple-500/20 p-4">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about Richard's experience, projects, or skills..."
            className="flex-1 bg-slate-900/50 border border-purple-500/20 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-xl px-6 py-3 flex items-center justify-center gap-2 transition-all shadow-lg disabled:shadow-none min-w-[100px]"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span className="font-medium">Send</span>
              </>
            )}
          </button>
        </div>
        
        <p className="text-xs text-slate-500 mt-2 text-center">
          Powered by AI • Session: {sessionId.slice(0, 12)}...
        </p>
      </div>
    </div>
  );
}
