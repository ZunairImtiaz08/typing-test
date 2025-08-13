const Timer = ({ timeLeft }) => {
  return (
    <div className="text-xl font-bold text-gray-700 dark:text-gray-200">
      Time Left: <span className="text-blue-500">{timeLeft}s</span>
    </div>
  );
};

export default Timer;
