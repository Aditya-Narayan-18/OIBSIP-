import { useState } from "react";

export default function TemperatureConverter() {
  const [tempInput, setTempInput] = useState("");
  const [unit, setUnit] = useState("celsius");
  const [convertedTemp, setConvertedTemp] = useState(null);
  const [convertedUnit, setConvertedUnit] = useState("");
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const isValidNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);

  const convertTemperature = () => {
    if (!isValidNumber(tempInput)) {
      setError("Please enter a valid number.");
      setConvertedTemp(null);
      return;
    }

    setError("");
    const temp = parseFloat(tempInput);
    let result = 0;
    let targetUnit = "";

    switch (unit) {
      case "celsius":
        result = (temp * 9) / 5 + 32;
        targetUnit = "Fahrenheit";
        break;
      case "fahrenheit":
        result = ((temp - 32) * 5) / 9;
        targetUnit = "Celsius";
        break;
      case "kelvin":
        result = temp - 273.15;
        targetUnit = "Celsius";
        break;
    }

    setConvertedTemp(result.toFixed(2));
    setConvertedUnit(targetUnit);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: darkMode ? "#1f2937" : "#f9fafb",
        color: darkMode ? "white" : "black",
        transition: "all 0.3s ease",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2rem",
          borderRadius: "12px",
          backgroundColor: darkMode ? "#111827" : "#ffffff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Temp Wizard</h1>
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />{" "}
            Dark Mode
          </label>
        </div>

        <input
          type="text"
          placeholder="Enter temperature"
          value={tempInput}
          onChange={(e) => setTempInput(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "1rem",
            marginBottom: "1rem",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "1rem" }}>
          <label>
            <input
              type="radio"
              name="unit"
              value="celsius"
              checked={unit === "celsius"}
              onChange={() => setUnit("celsius")}
            />{" "}
            Celsius
          </label>
          <label>
            <input
              type="radio"
              name="unit"
              value="fahrenheit"
              checked={unit === "fahrenheit"}
              onChange={() => setUnit("fahrenheit")}
            />{" "}
            Fahrenheit
          </label>
          <label>
            <input
              type="radio"
              name="unit"
              value="kelvin"
              checked={unit === "kelvin"}
              onChange={() => setUnit("kelvin")}
            />{" "}
            Kelvin
          </label>
        </div>

        <button
          onClick={convertTemperature}
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "1rem",
            fontWeight: "bold",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Convert
        </button>

        {error && <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>{error}</p>}

        {convertedTemp !== null && (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              textAlign: "center",
              backgroundColor: darkMode ? "#374151" : "#e5e7eb",
              borderRadius: "8px",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            Converted: {convertedTemp}° {convertedUnit}
          </div>
        )}
      </div>
    </div>
  );
}
