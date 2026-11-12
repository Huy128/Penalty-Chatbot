import { useEffect, useRef, useState } from 'react';

export interface Message {
  id: number;
  role: 'user' | 'bot' | 'error';
  text: string;
}

interface Props {
  messages: Message[];
  loading: boolean;
  onSend: (text: string) => void;
  onCollapse: () => void;
}

export default function ChatPanel({ messages, loading, onSend, onCollapse }: Props) {
  const [input, setInput] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, loading]);

  const submit = () => {
    const text = input.trim();
    if (!text || loading) return;
    onSend(text);
    setInput('');
  };

  
  return (
    <div className="chat">
      <header className="chat-header">
        <h1>Penalty Chatbot</h1>
        <button className="icon-btn" onClick={onCollapse} title="Hide chat panel" aria-label="Hide chat panel">
          «
        </button>
      </header>

      <div className="chat-messages" ref={listRef}>
        {messages.length === 0 ? (
          <p className="chat-hint">
            Describe a penalty rule in natural language below and I&apos;ll turn it into a BPMN choreography diagram.
          </p>
        ) : (
          messages.map((m) => (
            <div key={m.id} className={`bubble ${m.role}`}>
              {m.text}
            </div>
          ))
        )}
        {loading && <div className="bubble bot typing">Generating…</div>}
      </div>

      <form
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe a penalty rule…"
          disabled={loading}
        />
        
        <button
          type="submit"
          className="round-btn send"
          disabled={loading || !input.trim()}
          title="Send"
          aria-label="Send"
        >
          ➤
        </button>
      </form>
    </div>
  );
}
