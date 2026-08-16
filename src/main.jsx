import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import AuthProvider from './Context/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// ১. প্রথমে একটি ইনস্ট্যান্স তৈরি করে নিন
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ২. এখানে ছোট হাতের queryClient পাস করতে হবে */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)