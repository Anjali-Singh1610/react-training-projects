import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CarAnimation from './CarAnimation'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CarAnimation />
  </StrictMode>,
)
