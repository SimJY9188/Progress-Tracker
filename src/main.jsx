import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProgressTracker from './ProgressTracker.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProgressTracker />
  </StrictMode>,
)
