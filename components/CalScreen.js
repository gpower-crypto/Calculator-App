import { useState } from "react";
import CalDisplay from "./CalDisplay";

export default function App() {
  // useState variables
  const [memoryStatement, setMemoryStatement] = useState(""); // store the memory statement
  const [calculationStatement, setCalculationStatement] = useState(""); // store the current calculation statement
  const [resultStatus, setResultStatus] = useState(false); // indicate whether a calculation has been performed and the result is shown
  const [answerValue, setAnswerValue] = useState(0); // store the current answer value
  const [readyToReplace, setReadyToReplace] = useState(true); // checks if current number is ready to be replaced
  const [memoryValue, setMemoryValue] = useState(0); // store the memory value
  const [operatorValue, setOperatorValue] = useState(0); // store the operator value

  function buttonPressed(value) {
    if (Number.isInteger(Number(value))) {
      handleNumber(value);
    } else {
      if (value === "C") {
        clearValues();
      } else if (value === "=") {
        calculateSolution();
      } else if (value === "+/-") {
        negateAnswerValue();
      } else if (value === ".") {
        handleDecimalPoint();
      } else {
        handleOperator(value);
      }
    }
  }

  function handleNumber(value) {
    if (readyToReplace) {
      setCalculationStatement(value);
      setAnswerValue(value);
      setReadyToReplace(false);
    } else {
      setCalculationStatement(calculationStatement + value);
      setAnswerValue(answerValue + value);
    }
    setResultStatus(false);
  }

  function clearValues() {
    setCalculationStatement(""); // clear the calculation statement
    setMemoryStatement(""); // clear the memory statement
    setAnswerValue(0); // reset the answer value
    setMemoryValue(0); // reset the memory value
    setOperatorValue(0); // reset the operator value
    setReadyToReplace(true); // set readyToReplace to true
  }

  function calculateSolution() {
    if (answerValue !== 0) {
      setResultStatus(true);
      let solution = performCalculation(); // calculate the result

      // round the solution to the 5th decimal place if it has more than 5 decimal places
      const decimalPlaces = solution.toString().split(".")[1]?.length || 0;
      if (decimalPlaces > 5) {
        solution = solution.toFixed(5);
      }

      setAnswerValue(solution); // set the result as the answer value
      setMemoryStatement(calculationStatement); // store the entire calculation statement in memory
      setCalculationStatement(solution); // set the result as the new calculation statement
      setMemoryValue(0); // reset the memory value
      setOperatorValue(0); // reset the operator value
      setReadyToReplace(true); // set readyToReplace to true
    }
  }

  function negateAnswerValue() {
    if (answerValue) {
      setCalculationStatement(-answerValue); // negate the answer value
      setAnswerValue(-answerValue); // set the negated value as the answer value
    }
  }

  function handleDecimalPoint() {
    if (
      answerValue === 0 ||
      resultStatus ||
      !String(answerValue).includes(".")
    ) {
      if (!resultStatus) {
        if (answerValue === 0) {
          setCalculationStatement(calculationStatement + 0 + ".");
        } else {
          setCalculationStatement(calculationStatement + ".");
        }
      } else {
        setCalculationStatement(0 + ".");
        setResultStatus(false);
      }
      setReadyToReplace(false);
      setAnswerValue(answerValue + ".");
    }
  }

  function handleOperator(value) {
    if (calculationStatement !== "" && answerValue !== 0) {
      if (operatorValue !== 0) {
        let solution = performCalculation(); // calculate the result
        setMemoryValue(solution); // store the result as the memory value
      } else {
        setMemoryValue(calculationStatement); // store the current calculation statement as the memory value
      }
      setAnswerValue(0); // reset the answer value
      setReadyToReplace(false);
      setOperatorValue(value); // set the operator value
      if (!resultStatus) {
        setCalculationStatement(calculationStatement + value);
      } else {
        setCalculationStatement(answerValue + value);
        setResultStatus(false);
      }
    }
  }

  function performCalculation() {
    const previous = parseFloat(memoryValue);
    const current = parseFloat(answerValue);
    switch (operatorValue) {
      case "+":
        return previous + current;
      case "-":
        return previous - current;
      case "x":
        return previous * current;
      case "/":
        return previous / current;
      case "%":
        return previous % current;
      default:
        return 0;
    }
  }

  return (
    <CalDisplay
      memoryStatement={memoryStatement}
      calculationStatement={calculationStatement}
      buttonPressed={buttonPressed}
    />
  );
}
