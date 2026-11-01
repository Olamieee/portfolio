import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// No <StrictMode>: its dev-only double mount runs the WebGL backgrounds' cleanup
// (WEBGL_lose_context) and then re-mounts onto the same, now-lost context.
createRoot(document.getElementById('root')!).render(<App />)
