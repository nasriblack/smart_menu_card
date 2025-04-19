import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: "preference",
    text: "What are you in the mood for today?",
    options: [
      "Drinks",
      "Snacks",
      "Main Course",
      "Coffee",
      "Desserts",
      "I'm not sure",
    ],
  },
  {
    id: "taste",
    text: "Do you prefer something...",
    options: ["Sweet", "Refreshing", "Rich & Bold", "Light & Subtle"],
  },
  {
    id: "occasion",
    text: "What's the occasion?",
    options: [
      "Casual Meeting",
      "Quick Break",
      "Special Celebration",
      "Just Browsing",
    ],
  },
];

interface QuestionnaireProps {
  onComplete: (answers: Record<string, string>) => void;
  setShowQuestionnaire: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({
  onComplete,
  setShowQuestionnaire,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (answer: string) => {
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: answer,
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(newAnswers);
    }
  };
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const skipQuestionnaire = () => {
    setShowQuestionnaire(false);
  };

  const question = questions[currentQuestion];

  return (
    <div>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-serif text-[#2c2c2c]">
              Let us help you decide
            </h2>
            <button
              onClick={skipQuestionnaire}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
            >
              Skip <X size={20} />
            </button>
          </div>
          <div className="flex justify-between mb-4">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 mx-1 rounded-full ${
                  index <= currentQuestion ? "bg-[#d4af37]" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <h3 className="text-2xl font-serif text-[#2c2c2c] mb-2">
            {question.text}
          </h3>
        </div>

        <div className="space-y-3">
          {question.options.map((option) => {
            const isCheckedAnswer1 = Object.values(answers).includes(option);

            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left px-6 py-4 rounded-xl border-2 ${
                  isCheckedAnswer1
                    ? "border-[#d4af37] bg-[#fff8e7]"
                    : "border-gray-100"
                } hover:border-[#d4af37] hover:bg-[#fff8e7] transition-all duration-300 group flex justify-between items-center`}
              >
                <span className="text-lg  group-hover:text-[#2c2c2c]">
                  {option}
                </span>
                <ChevronRight className="text-gray-400 group-hover:text-[#d4af37] transition-colors duration-300" />
              </button>
            );
          })}
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePrevious}
            className={`flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors
                ${currentQuestion === 0 ? "invisible" : ""}`}
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          <div className="flex gap-2">
            {Array(questions.length)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === currentQuestion ? "bg-[#d4af37]" : "bg-gray-200"
                  }`}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
