"use client";
import styles from "./quizPage.module.css";
import questions from "./questions.json";
import ProgressBar from "../components/progressBar/progressBar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const question = questions[currentQuestion];

  //loads currentQuestion
  useEffect(() => {
    const stored = localStorage.getItem("currentQuestion");
    if (stored !== null) {
      setCurrentQuestion(parseInt(stored));
    }
  }, []);

  //saves currentQuestion on changes
  useEffect(() => {
    localStorage.setItem("currentQuestion", currentQuestion);
  }, [currentQuestion]);

  const [answers, setAnswers] = useState({});

  //updates answers and saves it on localstorage
  function handleAnswer(type) {
    const updated = { ...answers, [currentQuestion]: type };
    setAnswers(updated);
    localStorage.setItem("quizAnswers", JSON.stringify(updated));
  }

  //loads answers
  useEffect(() => {
    const saved = localStorage.getItem("quizAnswers");
    if (saved) {
      setAnswers(JSON.parse(saved));
    }
  }, []);

  function calculateResult(answers) {
    const typeCounts = {};

    Object.values(answers).forEach((type) => {
      if (!typeCounts[type]) typeCounts[type] = 0;
      typeCounts[type]++;
    });

    let topType = null;
    let maxCount = -1;

    for (const type in typeCounts) {
      if (typeCounts[type] > maxCount) {
        maxCount = typeCounts[type];
        topType = type;
      }
    }

    localStorage.setItem("quizResult", topType);
  }

  return (
    <div className={styles.wrapper}>
      <ProgressBar current={currentQuestion + 1} max={questions.length} />
      <div className={styles.content}>
        <div className={styles.card}>
          <h2>{question.question}</h2>
          <div className={styles.options}>
            {question.options.map((option, i) => (
              <label key={i} className={styles.option}>
                <input
                  type="radio"
                  name={`q${currentQuestion}`}
                  value={option.type}
                  checked={answers[currentQuestion] === option.type}
                  onChange={() => handleAnswer(option.type)}
                />
                {option.text}
              </label>
            ))}
          </div>

          <div className={styles.nav}>
            <button
              onClick={() =>
                setCurrentQuestion((prev) => Math.max(prev - 1, 0))
              }
              disabled={currentQuestion === 0}
            >
              ← Zurück
            </button>

            <button
              onClick={() => {
                if (currentQuestion < questions.length - 1) {
                  setCurrentQuestion(currentQuestion + 1);
                } else {
                  calculateResult(answers);
                  router.push("/endPage");
                }
              }}
            >
              {currentQuestion === questions.length - 1
                ? "Auswerten →"
                : "Weiter →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
