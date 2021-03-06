import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from './theme/ThemeProvider'
import { AuthContextProvider } from './context/AuthContext'

import { Routes } from './routes'

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
