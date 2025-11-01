import React, { useState } from "react";
import "./App.css";
import Header from "./Header";

function App() {
  const [esBlanco, setEsBlanco] = useState(true); 

  const cambiarColor = () => {
    setEsBlanco(!esBlanco); 
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: esBlanco ? "#ffffff" : "#656565ff", 
        minHeight: "100vh",
        transition: "background-color 0.5s ease",
      }}
    >
      <Header />
      <button
        onClick={cambiarColor}
        style={{
          margin: "20px",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Cambiar color
      </button>
    </div>
  );
}

export default App;
