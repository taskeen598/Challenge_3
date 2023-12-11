import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

function App() {
  const [number, setNumber] = useState(null);
  const [isRenderingStopped, setRenderingStopped] = useState(false);

  useEffect(() => {
    RandomNumber();
    const intervalId = setInterval(() => {
      RandomNumber();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const RandomNumber = async () => {
    try {
      const response = await fetch("http://localhost:1126/api/random");
      if (response.ok) {
        const data = await response.json();
        setNumber(data.data.numberRandom);
        console.log(data.data.numberRandom)
        if (data.data.numberRandom < 0) {
          console.warn("Negative number detected!");
          return setRenderingStopped(true);
          
        }
      } else {
        console.error("Failed to fetch");
      }
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  return (
    <div className="bg-[#001974] vh-100 d-flex justify-content-center align-items-center">
      <div className="text-white bg-[#4B5C9D] border border-[#5C6BA5] border-lg w-[250px] h-[300px] d-flex justify-content-center align-items-center text-bold text-5xl rounded-3xl text-center">
        {isRenderingStopped ? "Negative number! Refresh it" : (number !== null ? number : "Loading...")}
      </div>
    </div>
  );
}

export default App;