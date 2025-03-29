import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Attach the React app to the DOM
createRoot(document.getElementById("root")!).render(<App />);
