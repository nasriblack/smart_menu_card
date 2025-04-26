import React from "react";
import { Question } from "../data/menuData";
import { ChevronRight } from "lucide-react";

type Props = {
  question: Question;
  answers: Record<string, string>;
  handleAnswer: (answer: string) => void;
};

const ContentQuestionnaire = ({ question, answers, handleAnswer }: Props) => {
  return (
    <div className="space-y-3">
      {question.options.map((option) => {
        const isSelected = answers[question.id] === option;

        return (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className={`w-full text-left px-6 py-4 rounded-xl border-2 ${
              isSelected ? "border-[#d4af37] bg-[#fff8e7]" : "border-gray-100"
            } hover:border-[#d4af37] hover:bg-[#fff8e7] transition-all duration-300 group flex justify-between items-center`}
            aria-selected={isSelected}
          >
            <span className="text-lg group-hover:text-[#2c2c2c]">{option}</span>
            <ChevronRight className="text-gray-400 group-hover:text-[#d4af37] transition-colors duration-300" />
          </button>
        );
      })}
    </div>
  );
};

export default ContentQuestionnaire;
