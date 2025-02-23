import React, { useState, useRef, useEffect } from "react";

const SecretCodeInput = ({ handleDigit, title, isSecret = false, id = "default" }) => {
  const [code, setCode] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);

  // Réinitialiser le code quand l'ID change
  useEffect(() => {
    setCode(Array(6).fill(""));
  }, [id]);

  const handleInputChange = (index, value) => {
    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to the next input if available
      if (index < 5) {
        inputsRef.current[index + 1]?.focus();
      } else {
        handleComplete(newCode.join(""));
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);

      // Move to the previous input if available
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text");
    if (/^\d{6}$/.test(pasteData)) {
      const newCode = pasteData.split("");
      setCode(newCode);

      // Focus the last input
      inputsRef.current[5]?.focus();
      handleComplete(pasteData);
    }
    e.preventDefault();
  };

  const handleComplete = (completeCode) => {
    // Add any action here after the code is complete
  };

  useEffect(() => {
    handleDigit(code.join(''))
  }, [code, handleDigit])

  const getDisplayValue = (digit) => {
    return isSecret && digit ? '*' : digit;
  };

  return (
      <>
        <p style={{fontWeight: 400, marginBottom: '10px'}}>{title}</p>
        <div onPaste={handlePaste} style={{ display: "flex", gap: "8px" }}>
          {code.map((digit, index) => (
              <input
                  key={`${id}-${index}`}
                  type="text"
                  value={getDisplayValue(digit)}
                  maxLength={1}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputsRef.current[index] = el)}
                  style={{
                    width: "40px !important",
                    height: "40px",
                    textAlign: "center",
                    fontSize: "18px",
                    padding: "0px",
                    borderRadius: "10px"
                  }}
              />
          ))}
        </div>
      </>
  );
};

export default SecretCodeInput;