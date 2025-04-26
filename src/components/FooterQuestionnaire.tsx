import React from "react";
import { Question } from "../data/menuData";
import { ChevronLeft } from "lucide-react";

type Props = {
  handlePrevious: () => void;
  currentQuestion: number;
  questions: Question[];
};

const FooterQuestionnaire = ({
  handlePrevious,
  currentQuestion,
  questions,
}: Props) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={handlePrevious}
        className={`flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors
                ${currentQuestion === 0 ? "invisible" : ""}`}
        disabled={currentQuestion === 0}
        aria-label="Previous question"
      >
        <ChevronLeft size={20} />
        Previous
      </button>
      <div className="flex gap-2">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === currentQuestion ? "bg-[#d4af37]" : "bg-gray-200"
            }`}
            aria-current={i === currentQuestion ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
};

export default FooterQuestionnaire;
