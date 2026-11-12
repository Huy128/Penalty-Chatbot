import { MOCK_XML } from './mockXml';

/**
 * Backend communication layer. Once the OpenAPI doc is available, only this file needs
 * to change (endpoint, request body, response shape); the UI stays the same.
 */

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

export interface GenerateResult {
  /** Message reply in the chat panel. */
  reply: string;
  /** XML for diagram rendering. */
  xml: string;
}


export async function generateDiagram(rule: string): Promise<GenerateResult> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 1200));
    return { reply: 'Generated a BPMN choreography diagram for your penalty rule. (mock data)', xml: MOCK_XML };
  }

  const res = await fetch(`${BASE_URL}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rule }),
  });
  if (!res.ok) throw new Error(`Backend returned error ${res.status}`);

  const data = await res.json();
  return { reply: data.reply ?? 'Diagram generated.', xml: data.xml };
}
