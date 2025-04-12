import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 'preference',
    text: 'What are you in the mood for today?',
    options: ['Drinks', 'Coffee', 'Desserts', 'I\'m not sure']
  },
  {
    id: 'taste',
    text: 'Do you prefer something...',
    options: ['Sweet', 'Refreshing', 'Rich & Bold', 'Light & Subtle']
  },
  {
    id: 'occasion',
    text: 'What\'s the occasion?',
    options: ['Casual Meeting', 'Quick Break', 'Special Celebration', 'Just Browsing']
  }
];

interface QuestionnaireProps {
  onComplete: (answers: Record<string, string>) => void;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (answer: string) => {
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: answer
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 mx-1 rounded-full ${
                index <= currentQuestion ? 'bg-[#d4af37]' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <h3 className="text-2xl font-serif text-[#2c2c2c] mb-2">{question.text}</h3>
      </div>

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className="w-full text-left px-6 py-4 rounded-xl border-2 border-gray-100 hover:border-[#d4af37] 
                     hover:bg-[#fff8e7] transition-all duration-300 group flex justify-between items-center"
          >
            <span className="text-lg text-gray-700 group-hover:text-[#2c2c2c]">{option}</span>
            <ChevronRight className="text-gray-400 group-hover:text-[#d4af37] transition-colors duration-300" />
          </button>
        ))}
      </div>
    </div>
  );
};