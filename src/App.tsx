/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { menuData } from "./data/menuData";
import { Utensils } from "lucide-react";
import { Questionnaire } from "./components/Questionnaire";
import { useAiRecommendation } from "./api/useOpenRouterImageIa";
import { cleaningJsonFunction } from "./utils/cleanedJsonString";

function App() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(true);
  const [userAnswers, setUserAnswers] = useState(null);
  const [skipClicked, setSkipClicked] = useState(false);

  const { data, isPending, mutateAsync } = useAiRecommendation();
  const response = cleaningJsonFunction(data);

  const handleQuestionnaireComplete = (answers: any) => {
    setUserAnswers(answers);
    setShowQuestionnaire(false);

    // Only call API if we have actual answers (not skipped)
    if (Object.keys(answers).length > 0) {
      mutateAsync(answers);
    } else {
      setSkipClicked(true);
    }
  };

  // Function to determine which menu items to display
  const getFilteredMenuItems = () => {
    if (skipClicked || !response?.suggestions?.length) {
      // Show all menu items when skipped or no suggestions
      return menuData;
    } else {
      // Filter menu items based on AI suggestions
      return menuData.filter((category) =>
        category.items.some(
          (item) =>
            response.suggestions.includes(item.name) ||
            response.propositions?.includes(item.name)
        )
      );
    }
  };

  // Function to filter individual items in a category
  const getFilteredItems = (categoryItems: any) => {
    if (skipClicked || !response?.suggestions?.length) {
      // Show all items when skipped or no suggestions
      return categoryItems;
    } else {
      // Show only suggested items
      return categoryItems.filter(
        (item: any) =>
          response.suggestions.includes(item.name) ||
          response.propositions?.includes(item.name)
      );
    }
  };

  const filteredMenu = getFilteredMenuItems();

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
            : "sm:px-0 px-8"
        }
      >
        {showQuestionnaire ? (
          <Questionnaire onComplete={handleQuestionnaireComplete} />
        ) : (
          <>
            {userAnswers && (
              <div className="mb-12 text-center">
                <button
                  onClick={() => {
                    setShowQuestionnaire(true);
                    setSkipClicked(false);
                  }}
                  className="text-[#d4af37] hover:text-[#2c2c2c] hover:bg-[#d4af37] py-2 px-4 rounded transition-colors duration-300"
                >
                  ← Start Over
                </button>
              </div>
            )}

            {isPending ? (
              <div className="text-white text-center py-12">
                <div className="animate-pulse text-2xl">
                  Loading recommendations...
                </div>
              </div>
            ) : (
              <div className="bg-[#2c2c2c] text-white">
                {filteredMenu.map((category) => (
                  <div key={category.id} className="relative">
                    {/* Background Section */}
                    <div
                      className="h-[35vh] bg-fixed bg-center bg-cover relative"
                      style={{
                        backgroundColor: !category.with_img
                          ? "#2c2c2c"
                          : undefined,
                        backgroundImage: category.with_img
                          ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${category.backgroundImage})`
                          : undefined,
                        backgroundPosition: "center 10%",
                      }}
                    >
                      {/* Text overlay */}
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
                    {getFilteredItems(category.items).length > 0 && (
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                          {getFilteredItems(category.items).map((item: any) => (
                            <div
                              key={item.id}
                              className="flex justify-between items-start group items-center gap-5 group"
                            >
                              <img
                                src={
                                  item.image ||
                                  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=2070"
                                }
                                width={50}
                                height={50}
                                className="w-20 h-20 rounded-full object-cover border-2 group-hover:border-[#f5d76e]"
                                alt={item.name}
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
            )}
          </>
        )}
      </div>

      {!showQuestionnaire && (
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
      )}
    </div>
  );
}

export default App;
