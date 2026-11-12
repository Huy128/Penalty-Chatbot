import { useEffect, useRef, useState } from 'react';
import ChatPanel, { type Message } from './components/ChatPanel';
import DiagramViewer from './components/DiagramViewer';
import { generateDiagram } from './api/client';
import { downloadXml, downloadSvg } from './download';  

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [xml, setXml] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const nextId = useRef(1);
  const modelerRef = useRef<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);

  const addMessage = (role: Message['role'], text: string) =>
    setMessages((prev) => [...prev, { id: nextId.current++, role, text }]);

  const handleSend = async (rule: string) => {
    addMessage('user', rule);
    setLoading(true);
    try {
      const result = await generateDiagram(rule);
      addMessage('bot', result.reply);
      setXml(result.xml);
    } catch (e) {
      addMessage('error', e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadXml = async () => {
    if (!modelerRef.current) return;
    const { xml: currentXml } = await modelerRef.current.saveXML({ format: true });
    downloadXml(currentXml);
    setMenuOpen(false);
  };

  const handleDownloadSvg = async () => {
    if (!modelerRef.current) return;
    const { svg } = await modelerRef.current.saveSVG();
    downloadSvg(svg);
    setMenuOpen(false);
  };

  const handleClear = () => {
    if (!window.confirm('Clear the current diagram? Unsaved changes will be lost.')) return;
    setXml(null);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!downloadRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="app">
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <ChatPanel messages={messages} loading={loading} onSend={handleSend} onCollapse={() => setCollapsed(true)} />
      </aside>

      <main className="main">
        {collapsed && (
          <button className="expand-btn" onClick={() => setCollapsed(false)} title="Show chat panel" aria-label="Show chat panel">
            »
          </button>
        )}

        <label className="upload-btn" htmlFor="xml-file" title="Open a BPMN file">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 16V4" />
            <path d="M7 9l5-5 5 5" />
            <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
          </svg>
        </label>

        <button
          className="clear-btn"
          disabled={!xml}
          onClick={handleClear}
          title="Clear diagram"
          aria-label="Clear diagram"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M8 6V4h8v2" />
            <path d="M6 6l1 14h10l1-14" />
          </svg>
        </button>

        <input
          id="xml-file"
          type="file"
          accept=".bpmn,.xml"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) file.text().then(setXml);
            e.target.value = '';
          }}
        />

        <DiagramViewer xml={xml} loading={loading} modelerRef={modelerRef} />

        <div className="download-wrap" ref={downloadRef}>
          {menuOpen && (
            <div className="download-menu">
              <button onClick={handleDownloadSvg}>Download SVG</button>
              <button onClick={handleDownloadXml}>Download XML</button>
            </div>
          )}
          <button
            className="download-btn"
            disabled={!xml}
            onClick={() => setMenuOpen((open) => !open)}
            title="Download"
            aria-label="Download"
          >
            ⬇
          </button>
        </div>

      </main>
    </div>
  );
}
