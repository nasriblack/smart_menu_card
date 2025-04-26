import React, { useState } from "react";
import { questions } from "../data/menuData";
import HeaderQuestionnaire from "./HeaderQuestionnaire";
import ContentQuestionnaire from "./ContentQuestionnaire";
import FooterQuestionnaire from "./FooterQuestionnaire";

interface QuestionnaireProps {
  onComplete: (answers: Record<string, string>) => void;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
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
    // Pass empty object to indicate we're skipping
    onComplete({});
  };

  const question = questions[currentQuestion];

  return (
    <div>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* HEADER COMPONENT */}
        <HeaderQuestionnaire
          currentQuestion={currentQuestion}
          question={question}
          questions={questions}
          skipQuestionnaire={skipQuestionnaire}
        />

        {/* QUESTIONS COMPONENT */}

        <ContentQuestionnaire
          answers={answers}
          handleAnswer={handleAnswer}
          question={question}
        />

        {/* FOOTER COMPONENT */}

        <FooterQuestionnaire
          currentQuestion={currentQuestion}
          handlePrevious={handlePrevious}
          questions={questions}
        />
      </div>
    </div>
  );
};
