import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import { AuthProvider } from "./contexts/AuthContext"
import { ToastContextProvider } from "./contexts/ToastContext"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContextProvider>
          <Router />
        </ToastContextProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
