import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'
const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
if (
  root.hasChildNodes() &&
  root.dataset.route === (window.location.pathname.replace(/\/+$/, '') || '/')
)
  hydrateRoot(root, app)
else createRoot(root).render(app)
if (import.meta.env.PROD) {
  import('@vercel/analytics').then(({ inject }) => inject())
}
