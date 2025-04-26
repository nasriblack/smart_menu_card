/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { menuData } from "./data/menuData";
import { Utensils } from "lucide-react";
import { Questionnaire } from "./components/Questionnaire";
import { useAiRecommendation } from "./api/useOpenRouterImageIa";
import { cleaningJsonFunction } from "./utils/cleanedJsonString";

import Lottie from "react-lottie";
import animationLoader from "./lotties/loading_animation.json";

function App() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(true);
  const [skipClicked, setSkipClicked] = useState(false);
  const [showFullMenu, setShowFullMenu] = useState(false);

  const { data, isPending, mutateAsync } = useAiRecommendation();
  const response = cleaningJsonFunction(data);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationLoader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleQuestionnaireComplete = (answers: any) => {
    setShowQuestionnaire(false);

    // Only call API if we have actual answers (not skipped)
    if (Object.keys(answers).length > 0) {
      mutateAsync(answers);
    } else {
      setSkipClicked(true);
    }
  };

  // Toggle showing full menu
  const toggleFullMenu = () => {
    setShowFullMenu(!showFullMenu);
  };

  // Function to determine which menu items to display
  const getFilteredMenuItems = () => {
    if (skipClicked || showFullMenu) {
      // Show all menu items when skipped or full menu is requested
      return menuData;
    } else if (
      response?.suggestions?.length ||
      response?.propositions?.length
    ) {
      // Filter menu items based on AI suggestions and propositions
      return menuData
        .filter((category) =>
          category.items.some(
            (item) =>
              response.suggestions?.includes(item.name) ||
              response.propositions?.includes(item.name)
          )
        )
        .sort((a: any, b: any) => {
          const aIsSuggestion = response.suggestions?.includes(a.name);
          const bIsSuggestion = response.suggestions?.includes(b.name);

          if (aIsSuggestion && !bIsSuggestion) return 1;
          if (!aIsSuggestion && bIsSuggestion) return -1;
          return 0;
        });
    } else {
      // If no suggestions, show all
      return menuData;
    }
  };

  // Function to filter individual items in a category
  const getFilteredItems = (categoryItems: any) => {
    if (skipClicked || showFullMenu) {
      // Show all items when skipped or full menu is requested
      return categoryItems;
    } else if (
      response?.suggestions?.length ||
      response?.propositions?.length
    ) {
      // Filter and then sort the items
      return categoryItems.filter(
        (item: any) =>
          response.suggestions?.includes(item.name) ||
          response.propositions?.includes(item.name)
      );
    } else {
      return categoryItems;
    }
  };

  // Helper function to check if an item is a proposition
  const isProposition = (itemName: any) => {
    return response?.propositions?.includes(itemName);
  };

  // Helper function to check if an item is a suggestion
  const isSuggestion = (itemName: any) => {
    return response?.suggestions?.includes(itemName);
  };

  const filteredMenu = getFilteredMenuItems();

  const hasRecommendations =
    response?.suggestions?.length > 0 || response?.propositions?.length > 0;

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
            {isPending ? (
              <div className="text-white text-center py-12">
                <Lottie options={defaultOptions} height={400} width={400} />
              </div>
            ) : (
              <div className="bg-[#2c2c2c] text-white">
                {/* Recommendations Header - only show when we have recommendations */}
                {hasRecommendations && !showFullMenu && (
                  <div className="text-center py-8 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-serif text-[#d4af37] mb-2">
                      Our Recommendations for You
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Based on your preferences, we think you'll love these
                      selections
                    </p>
                  </div>
                )}

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
                          {getFilteredItems(category.items).map((item: any) => {
                            const itemIsProposition = isProposition(item.name);
                            const itemIsSuggestion = isSuggestion(item.name);

                            return (
                              <div
                                key={item.id}
                                className={`flex justify-between items-start group items-center gap-5 group ${
                                  !showFullMenu && itemIsProposition
                                    ? "border-l-4 border-teal-500 pl-2"
                                    : !showFullMenu && itemIsSuggestion
                                    ? "border-l-4 border-[#d4af37] pl-2"
                                    : ""
                                }`}
                              >
                                <img
                                  src={
                                    item.image ||
                                    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=2070"
                                  }
                                  width={50}
                                  height={50}
                                  className={`w-20 h-20 rounded-full object-cover border-2 
                                    ${
                                      itemIsProposition
                                        ? "group-hover:border-teal-500"
                                        : "group-hover:border-[#f5d76e]"
                                    }
                                    ${
                                      !showFullMenu && itemIsProposition
                                        ? "border-teal-500"
                                        : !showFullMenu && itemIsSuggestion
                                        ? "border-[#d4af37]"
                                        : "border-gray-600"
                                    }
                                  `}
                                  alt={item.name}
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-5">
                                    <h3
                                      className={`text-xl font-medium transition-colors duration-300 
                                      ${
                                        itemIsProposition
                                          ? "group-hover:text-teal-500"
                                          : "group-hover:text-yellow-500"
                                      }
                                      ${
                                        !showFullMenu && itemIsProposition
                                          ? "text-teal-500"
                                          : !showFullMenu && itemIsSuggestion
                                          ? "text-[#d4af37]"
                                          : ""
                                      }
                                    `}
                                    >
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

                                  {/* Recommendation badges */}
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {/* Show badge when suggestion in full menu view */}
                                    {itemIsSuggestion && (
                                      <span className="inline-block bg-[#d4af37] text-[#2c2c2c] text-xs px-2 py-1 rounded-full font-medium">
                                        Recommended
                                      </span>
                                    )}

                                    {/* Show "Pairs well with your meal" for propositions in recommendation view */}
                                    {showFullMenu && itemIsProposition && (
                                      <span className="inline-block bg-teal-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                        Pairs Well With Your Meal
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div className="mb-12 text-center flex justify-center space-x-6">
                  <button
                    onClick={() => {
                      setShowQuestionnaire(true);
                      setSkipClicked(false);
                      setShowFullMenu(false);
                    }}
                    className="text-[#d4af37] hover:text-[#2c2c2c] hover:bg-[#d4af37] py-2 px-4 rounded transition-colors duration-300"
                  >
                    ← Start Over
                  </button>

                  {/* View Full Menu button - only show when we have recommendations and not already showing full menu */}
                  {hasRecommendations && !showFullMenu && (
                    <button
                      onClick={toggleFullMenu}
                      className="text-white hover:text-[#d4af37] border border-[#d4af37] py-2 px-6 rounded transition-colors duration-300 font-serif"
                    >
                      View Full Menu
                    </button>
                  )}

                  {/* View Recommendations button - only show when viewing full menu and we have recommendations */}
                  {hasRecommendations && showFullMenu && (
                    <button
                      onClick={toggleFullMenu}
                      className="text-white hover:text-[#d4af37] border border-[#d4af37] py-2 px-6 rounded transition-colors duration-300 font-serif"
                    >
                      View Recommendations
                    </button>
                  )}
                </div>
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
