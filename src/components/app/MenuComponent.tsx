/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuCategory } from "../../data/menuData";
import FoodItemCard from "./FoodItemCard";
import PictureCategoryMenuList from "./PictureCategoryMenuList";

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
          <PictureCategoryMenuList category={category} />

          {/* Menu Items */}
          {getFilteredItems(category.items).length > 0 && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {getFilteredItems(category.items).map((item: any) => {
                  const itemIsProposition = isProposition(item.name);
                  const itemIsSuggestion = isSuggestion(item.name);

                  return (
                    <FoodItemCard
                      item={item}
                      itemIsProposition={itemIsProposition}
                      itemIsSuggestion={itemIsSuggestion}
                      showFullMenu={showFullMenu}
                      key={item.id}
                    />
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
