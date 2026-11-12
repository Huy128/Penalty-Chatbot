import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { 
    port: 1284, 
    strictPort: true,
    fs: { allow: ['..', '../../Render_draw BPMN from BPMN XML'] },
  },
});
