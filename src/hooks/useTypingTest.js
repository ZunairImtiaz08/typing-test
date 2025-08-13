import { useState, useEffect, useRef } from "react";

const useTypingTest = (text, duration = 60) => {
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [grossWPM, setGrossWPM] = useState(0);
  const [netWPM, setNetWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const timerRef = useRef(null);

  const startTest = () => {
    setIsActive(true);
    setInput("");
    setTimeLeft(duration);
    setGrossWPM(0);
    setNetWPM(0);
    setAccuracy(100);
  };

  const stopTest = () => {
    setIsActive(false);
    setInput("");
    setTimeLeft(duration);
    setGrossWPM(0);
    setNetWPM(0);
    setAccuracy(100);
  };


  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      calculateResults();
    }
    return () => clearTimeout(timerRef.current);
  }, [isActive, timeLeft]);

  const handleChange = (value) => {
    setInput(value);
    if (!isActive) startTest();
  };

  // const calculateResults = () => {
  //   const typedWords = input.trim().split(/\s+/);
  //   const originalWords = text.trim().split(/\s+/);

  //   let correctWordsCount = 0;
  //   let errorCount = 0;

  //   typedWords.forEach((word, i) => {
  //     if (word === originalWords[i]) {
  //       correctWordsCount++;
  //     } else {
  //       errorCount++;
  //     }
  //   });

  //   const grossWpm = Math.round((typedWords.length / duration) * 60);
  //   const netWpm = Math.max(
  //     Math.round((typedWords.length - errorCount) / duration * 60),
  //     0
  //   );

  //   const accuracy = typedWords.length > 0
  //     ? Math.round((correctWordsCount / typedWords.length) * 100)
  //     : 100;

  //   setGrossWPM(grossWpm);
  //   setNetWPM(netWpm); // use net speed instead of gross
  //   setAccuracy(accuracy);
  // };

  const calculateResults = () => {
    const typedWords = input.trim().split(/\s+/).filter(Boolean);
    const originalWords = text.trim().split(/\s+/).filter(Boolean);

    let i = 0; // typed index
    let j = 0; // original index
    let correctWords = 0;
    let errorCount = 0;

    while (i < typedWords.length && j < originalWords.length) {
      if (typedWords[i] === originalWords[j]) {
        // exact match → good
        correctWords++;
        i++;
        j++;
      } else if (j + 1 < originalWords.length && typedWords[i] === originalWords[j + 1]) {
        // user skipped exactly one original word
        errorCount++;   // count the skipped word as one error
        correctWords++; // the current typed word matches the next original
        i++;            // consumed typed[i]
        j += 2;         // skip original[j], align to original[j+1] + advance
      } else {
        // wrong word (substitution) → count error and move on
        errorCount++;
        i++;
        j++;
      }
    }

    // leftovers: extra typed words or untyped original words are errors
    if (i < typedWords.length) errorCount += (typedWords.length - i);
    if (j < originalWords.length) errorCount += (originalWords.length - j);

    // timing: use test duration (since this runs at the end of a fixed-length test)
    const grossWPM = Math.round((typedWords.length / duration) * 60);

    // net WPM = (typed - errors) per minute, never below 0
    const netWPM = Math.max(
      Math.round(((typedWords.length - errorCount) / duration) * 60),
      0
    );

    // word-level accuracy
    const accuracy = typedWords.length > 0
      ? Math.round((correctWords / typedWords.length) * 100)
      : 100;

    setGrossWPM(grossWPM);
    setNetWPM(netWPM);
    setAccuracy(accuracy);
  };


  return { input, handleChange, timeLeft, grossWPM, netWPM, accuracy, isActive, startTest, stopTest };
};

export default useTypingTest;