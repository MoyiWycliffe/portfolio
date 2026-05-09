import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from "@vercel/analytics/react"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementsByTagName('body')).render(
  <StrictMode>
  <App />
  <Analytics />
</StrictMode>
)

