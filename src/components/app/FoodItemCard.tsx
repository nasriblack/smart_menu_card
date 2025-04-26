/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  item: any;
  showFullMenu: boolean;
  itemIsProposition: any;
  itemIsSuggestion: any;
};

const FoodItemCard = ({
  item,
  showFullMenu,
  itemIsProposition,
  itemIsSuggestion,
}: Props) => {
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
        <p className="mt-2 text-sm text-gray-400">{item.description}</p>

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
};

export default FoodItemCard;
