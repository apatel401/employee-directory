import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainContainer from './MainContainer.jsx'

import './main.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainContainer />
  </StrictMode>,
)
