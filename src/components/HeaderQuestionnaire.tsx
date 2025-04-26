import React from "react";
import { Question } from "../data/menuData";
import { X } from "lucide-react";

type Props = {
  skipQuestionnaire: () => void;
  questions: Question[];
  currentQuestion: number;
  question: Question;
};

const HeaderQuestionnaire = ({
  skipQuestionnaire,
  questions,
  question,
  currentQuestion,
}: Props) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif text-[#2c2c2c]">
          Let us help you decide
        </h2>
        <button
          onClick={skipQuestionnaire}
          className="text-gray-500 hover:text-gray-700 flex items-center gap-2 transition-colors duration-300"
          aria-label="Skip questionnaire"
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
  );
};

export default HeaderQuestionnaire;
