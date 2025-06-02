import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.sass";
import { AuthProvider } from "./contexts/authContext.jsx";

createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <App />
    </AuthProvider>
);
