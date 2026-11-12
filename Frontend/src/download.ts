/** Download the current BPMN XML as a file. */
export function downloadXml(xml: string) {
  const url = URL.createObjectURL(new Blob([xml], { type: 'application/xml' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'choreography.bpmn';
  a.click();
  URL.revokeObjectURL(url);
}

/** Download the diagram as an SVG image. */
export function downloadSvg(svg: string) {
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'choreography.svg';
  a.click();  
  URL.revokeObjectURL(url);
}
