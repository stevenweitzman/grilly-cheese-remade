import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root")!;

// Hydrate for pre-rendered content, render for client-side
if (rootElement.hasChildNodes()) {
  createRoot(rootElement).render(<App />);
} else {
  createRoot(rootElement).render(<App />);
}

// Signal to react-snap that page is ready
if (typeof window !== 'undefined') {
  (window as any).snapSaveState = () => ({});
}
