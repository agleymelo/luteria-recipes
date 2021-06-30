import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./theme/ThemeProvider";
import { AuthContextProvider } from "./context/AuthContext";

import { Routes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
