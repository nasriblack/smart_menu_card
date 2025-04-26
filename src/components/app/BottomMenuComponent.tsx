import React from "react";

type Props = {
  setShowQuestionnaire: (value: React.SetStateAction<boolean>) => void;
  setSkipClicked: (value: React.SetStateAction<boolean>) => void;
  setShowFullMenu: (value: React.SetStateAction<boolean>) => void;
  hasRecommendations: boolean;
  showFullMenu: boolean;
  toggleFullMenu: () => void;
};

const BottomMenuComponent = ({
  setShowFullMenu,
  setShowQuestionnaire,
  setSkipClicked,
  hasRecommendations,
  showFullMenu,
  toggleFullMenu,
}: Props) => {
  return (
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
  );
};

export default BottomMenuComponent;
