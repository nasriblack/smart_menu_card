import React, { useState } from "react";
import { menuData } from "./data/menuData";
import { Utensils } from "lucide-react";
import { Questionnaire } from "./components/Questionnaire";

function App() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(true);
  const [userAnswers, setUserAnswers] = useState<Record<string, string> | null>(
    null
  );

  const handleQuestionnaireComplete = (answers: Record<string, string>) => {
    setUserAnswers(answers);
    setShowQuestionnaire(false);
    console.log("User answers:", answers);
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      {/* Hero Section */}
      <div className="bg-[#2c2c2c] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Utensils className="mx-auto mb-6" size={48} />
          <h1 className="text-5xl font-bold mb-4 font-serif">
            La Maison Délice
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto italic">
            Experience the art of fine dining with our carefully curated menu
          </p>
        </div>
      </div>

      {/* Questionnaire or Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {showQuestionnaire ? (
          <Questionnaire onComplete={handleQuestionnaireComplete} />
        ) : (
          <>
            {userAnswers && (
              <div className="mb-12 text-center">
                <button
                  onClick={() => setShowQuestionnaire(true)}
                  className="text-[#d4af37] hover:text-[#2c2c2c] transition-colors duration-300"
                >
                  ← Start Over
                </button>
              </div>
            )}
            {menuData.map((category) => (
              <div key={category.id} className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-serif text-[#2c2c2c] relative inline-block">
                    {category.name}
                    <div className="absolute left-0 right-0 h-0.5 bg-[#d4af37] bottom-0 transform -translate-y-2"></div>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-2xl shadow-xl bg-white transform transition-all duration-300 hover:-translate-y-2"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-2xl font-serif text-[#2c2c2c] group-hover:text-[#d4af37] transition-colors duration-300">
                            {item.name}
                          </h3>
                          <span className="text-xl font-serif text-[#d4af37]">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {!showQuestionnaire && (
        <>
          <footer className="bg-[#2c2c2c] text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-gray-400">
                Open daily from 11:00 AM to 11:00 PM
              </p>
              <p className="text-gray-400 mt-2">
                123 Gourmet Street, Culinary City
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
