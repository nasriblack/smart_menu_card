/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { MenuCategory } from "../../data/menuData";

type Props = {
  filteredMenu: MenuCategory[];
  getFilteredItems: (categoryItems: any) => any;
  isProposition: (itemName: any) => any;
  isSuggestion: (itemName: any) => any;
  showFullMenu: boolean;
};

const MenuComponent = ({
  filteredMenu,
  getFilteredItems,
  isProposition,
  isSuggestion,
  showFullMenu,
}: Props) => {
  return (
    <>
      {filteredMenu.map((category) => (
        <div key={category.id} className="relative">
          {/* Background Section */}
          <div
            className="h-[35vh] bg-fixed bg-center bg-cover relative"
            style={{
              backgroundColor: !category.with_img ? "#2c2c2c" : undefined,
              backgroundImage: category.with_img
                ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${category.backgroundImage})`
                : undefined,
              backgroundPosition: "center 10%",
            }}
          >
            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h2 className="text-5xl font-bold mb-4">{category.name}</h2>
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
    </>
  );
};

export default MenuComponent;
