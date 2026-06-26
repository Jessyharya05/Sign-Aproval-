import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './context/AppContext'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import DocumentsPage from './pages/DocumentsPage'
import DocumentEditor from './pages/DocumentEditor'
import DocumentComplete from './pages/DocumentComplete'
import VerifyPage from './pages/VerifyPage'
import SettingsPage from './pages/SettingsPage'

function ProtectedRoute({ children }) {
  const { user, isVerified } = useApp()
  if (!user || !isVerified) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/documents" element={<ProtectedRoute><DocumentsPage /></ProtectedRoute>} />
      <Route path="/documents/:id" element={<ProtectedRoute><DocumentEditor /></ProtectedRoute>} />
      <Route path="/documents/:id/complete" element={<ProtectedRoute><DocumentComplete /></ProtectedRoute>} />
      <Route path="/verify" element={<ProtectedRoute><VerifyPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
