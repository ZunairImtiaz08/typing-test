const TypingArea = ({ text, input, handleChange, isActive }) => {
  return (
    <div className="w-full">
      <p className="mb-4 text-gray-700 dark:text-gray-300">{text}</p>
      <textarea
        className="w-full h-32 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        disabled={!isActive && input.length > 0}
        placeholder="Start typing here..."
      ></textarea>
    </div>
  );
};

export default TypingArea;
