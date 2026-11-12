import { useEffect, useRef, type RefObject } from 'react';

import Modeler from 'chor-js/lib/Modeler';
import 'chor-js/node_modules/bpmn-js/dist/assets/diagram-js.css';
import 'chor-js/node_modules/bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import 'chor-js/assets/icons/include/css/choreography-embedded.css';
import 'chor-js/assets/styles/chor-js.css';

interface Props {
  xml: string | null;
  loading: boolean;
  modelerRef: RefObject<any>;
}

/**
 * Diagram area. Renders the BPMN choreography XML with chor-js.
 */
export default function DiagramViewer({ xml, loading, modelerRef }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modelerRef.current = new Modeler({ container: containerRef.current });
    return () => modelerRef.current?.destroy();
  }, []);

  useEffect(() => {
    if (!modelerRef.current) return;
    if (xml) {
      modelerRef.current.importXML(xml).catch((e: unknown) => console.error('import lỗi', e));
    } else {
      modelerRef.current.clear();
    }
  }, [xml]);

  return (
    <div className="viewer">
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      {!xml && !loading && (
        <div className="viewer-overlay">
          <div className="empty-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="12" height="12" rx="1" />
              <rect x="9" y="9" width="12" height="12" rx="1" fill="#eef0f5" />
            </svg>
          </div>
          <h2>No diagram yet</h2>
          <p>
            Describe a penalty rule in the chat panel and submit it — the generated BPMN choreography diagram
            will appear here.
          </p>
        </div>
      )}

      {loading && (
        <div className="viewer-overlay translucent">
          <div className="spinner" />
          <p>Generating diagram…</p>
        </div>
      )}
    </div>
  );
}
