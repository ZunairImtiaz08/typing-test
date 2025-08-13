const Results = ({ grossWpm, netWpm, accuracy }) => {
  return (
    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <p className="text-lg text-gray-700 dark:text-gray-200">
        Gross Speed: <span className="font-bold">{grossWpm}</span>
      </p>
      <p className="text-lg text-gray-700 dark:text-gray-200">
        Net Speed: <span className="font-bold">{netWpm}</span>
      </p>
      <p className="text-lg text-gray-700 dark:text-gray-200">
        Accuracy: <span className="font-bold">{accuracy}%</span>
      </p>
    </div>
  );
};

export default Results;
