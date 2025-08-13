import sampleText from "./data/sampleText";
import useTypingTest from "./hooks/useTypingTest";
import Timer from "./components/Timer";
import TypingArea from "./components/TypingArea";
import Results from "./components/Results";

function App() {
  const { input, handleChange, timeLeft, grossWPM, netWPM, accuracy, isActive, startTest, stopTest } =
    useTypingTest(sampleText, 120);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Typing Test
      </h1>
      <Timer timeLeft={timeLeft} />
      <TypingArea
        text={sampleText}
        input={input}
        handleChange={handleChange}
        isActive={isActive}
      />

      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={isActive ? stopTest : startTest}
      >
        {isActive ? "Stop Test" : "Start New Test"}
      </button>
      {!isActive && timeLeft === 0 &&
        <Results
          grossWpm={grossWPM}
          netWpm={netWPM}
          accuracy={accuracy}
        />
      }
    </div>
  );
}

export default App;
