import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Dashboard from './pages/Dashboard'
import DashboardHeader from './components/DashboardHeader.jsx'
import ControlPanel from './components/ControlPanel.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   < DashboardHeader />
   <ControlPanel/>
    <Dashboard />

  </StrictMode>,
)
