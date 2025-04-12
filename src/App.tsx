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
    <div className="min-h-screen bg-[#2c2c2c]">
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
      <div
        className={
          showQuestionnaire
            ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            : "sm:px-0 px-8 "
        }
      >
        {showQuestionnaire ? (
          <Questionnaire
            onComplete={handleQuestionnaireComplete}
            setShowQuestionnaire={setShowQuestionnaire}
          />
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
            <div className="bg-[#2c2c2c] text-white">
              {menuData.map((category) => (
                <div key={category.id} className="relative">
                  {/* Fixed Background Section */}
                  <div
                    className="h-[35vh] bg-fixed bg-center bg-cover relative"
                    style={{
                      backgroundColor: !category.with_img
                        ? "#2c2c2c"
                        : undefined,
                      backgroundImage: category.with_img
                        ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${category.backgroundImage})`
                        : undefined,
                      backgroundPosition: "center 10%", // Show specific part of image
                    }}
                  >
                    {/* Fixed text overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <h2 className="text-5xl font-bold mb-4">
                        {category.name}
                      </h2>
                      <p className="text-xl italic text-gray-300">
                        - {category.subtitle} -
                      </p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  {category.items.length > 0 && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                        {category.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between items-start group items-center gap-5"
                          >
                            <img
                              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=2070"
                              width={50}
                              height={50}
                              className="w-20 h-20 rounded-full object-cover border-2 border-[#f5d76e]"
                              alt="Picture of the author"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-5">
                                <h3 className="text-xl font-medium group-hover:text-yellow-500 transition-colors duration-300">
                                  {item.name}
                                </h3>
                                <div className="flex-1 mx-4 border-b border-dotted border-gray-600"></div>
                                <span className="text-xl font-medium text-yellow-500">
                                  ${item.price}
                                </span>
                              </div>
                              <p className="mt-2 text-sm text-gray-400">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
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
