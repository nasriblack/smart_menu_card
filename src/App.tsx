/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { menuData } from "./data/menuData";
import { Questionnaire } from "./components/Questionnaire";
import { useAiRecommendation } from "./api/useOpenRouterImageIa";
import { cleaningJsonFunction } from "./utils/cleanedJsonString";
import animationLoader from "./lotties/loading_animation.json";
import FooterComponent from "./components/app/FooterComponent";
import MenuComponent from "./components/app/MenuComponent";
import LoadingLottie from "./components/app/LoadingLottie";
import BottomMenuComponent from "./components/app/BottomMenuComponent";
import HeaderMenuComponent from "./components/app/HeaderMenuComponent";
import HeroSection from "./components/app/HeroSection";

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
      <HeroSection />

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
              <LoadingLottie defaultOptions={defaultOptions} />
            ) : (
              <div className="bg-[#2c2c2c] text-white">
                {/* Recommendations Header - only show when we have recommendations */}
                <HeaderMenuComponent
                  hasRecommendations={hasRecommendations}
                  showFullMenu={showFullMenu}
                />

                <MenuComponent
                  filteredMenu={filteredMenu}
                  getFilteredItems={getFilteredItems}
                  isProposition={isProposition}
                  isSuggestion={isSuggestion}
                  showFullMenu
                />
                <BottomMenuComponent
                  hasRecommendations={hasRecommendations}
                  setShowFullMenu={setShowFullMenu}
                  setShowQuestionnaire={setShowQuestionnaire}
                  setSkipClicked={setSkipClicked}
                  showFullMenu={showFullMenu}
                  toggleFullMenu={toggleFullMenu}
                />
              </div>
            )}
          </>
        )}
      </div>

      {!showQuestionnaire && <FooterComponent />}
    </div>
  );
}

export default App;
