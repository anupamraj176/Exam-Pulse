import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600">
          Tailwind Working 🚀
        </h1>
        <p className="mt-3 text-gray-500">React + Tailwind test component</p>
      </div>
    </div>
  );
}

export default App;
