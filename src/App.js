import Result from "./components/Result/Result";
import Header from "./components/Header/Header";
import UserInput from "./components/UserInput/UserInput";
import React from "react";

function App() {
  const yearlyData = [];
  const [userInput, setuserInput] = React.useState(null);

  const calculateHandler = (userInput) => {
    setuserInput(userInput);
  };

  if (userInput) {
    let currentSavings = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />
      <UserInput onCalculate={calculateHandler} />
      {!userInput && (
        <p style={{ textAlign: "center" }}>No data available yet!</p>
      )}
      {userInput && (
        <Result
          data={yearlyData}
          initialInvestment={userInput["current-savings"]}
        />
      )}
    </div>
  );
}

export default App;
