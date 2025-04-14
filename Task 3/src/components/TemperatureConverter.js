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
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-md mx-auto mt-12 p-6 rounded-2xl shadow-md space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Temp Wizard</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Dark Mode</span>
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </div>
        </div>

        <input
          className="border rounded w-full p-2 text-lg"
          placeholder="Enter temperature"
          value={tempInput}
          onChange={(e) => setTempInput(e.target.value)}
        />

        <div className="flex justify-around">
          <label>
            <input type="radio" name="unit" value="celsius" checked={unit === "celsius"} onChange={() => setUnit("celsius")} /> Celsius
          </label>
          <label>
            <input type="radio" name="unit" value="fahrenheit" checked={unit === "fahrenheit"} onChange={() => setUnit("fahrenheit")} /> Fahrenheit
          </label>
          <label>
            <input type="radio" name="unit" value="kelvin" checked={unit === "kelvin"} onChange={() => setUnit("kelvin")} /> Kelvin
          </label>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={convertTemperature}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Convert
        </motion.button>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {convertedTemp !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mt-4 p-4 bg-green-100 rounded text-center">
              <p className="text-xl font-semibold">
                Converted: {convertedTemp}° {convertedUnit}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
