import React from "react";

type Props = {
  hasRecommendations: boolean;
  showFullMenu: boolean;
};

const HeaderMenuComponent = ({ hasRecommendations, showFullMenu }: Props) => {
  return (
    <>
      {hasRecommendations && !showFullMenu && (
        <div className="text-center py-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-[#d4af37] mb-2">
            Our Recommendations for You
          </h2>
          <p className="text-gray-300 mb-6">
            Based on your preferences, we think you'll love these selections
          </p>
        </div>
      )}
    </>
  );
};

export default HeaderMenuComponent;
