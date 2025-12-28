import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root")!;

// Hydrate for pre-rendered content (react-snap), render for client-side
if (rootElement.hasChildNodes()) {
  // Pre-rendered HTML exists, hydrate instead of render
  hydrateRoot(rootElement, <App />);
} else {
  // No pre-rendered content, do a full render
  createRoot(rootElement).render(<App />);
}

// Signal to react-snap that page is ready for snapshot
declare global {
  interface Window {
    snapSaveState?: () => Record<string, unknown>;
  }
}

if (typeof window !== 'undefined') {
  window.snapSaveState = () => ({});
}
