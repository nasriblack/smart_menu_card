import { menuData } from "../data/menuData";

export const formatMenuForAI = () => {
  return menuData
    .map((category) => {
      const categoryHeader = `Category: ${category.name}\n${category.subtitle}`;
      const items = category.items
        .map((item) => `• ${item.name} - ${item.description} ($${item.price})`)
        .join("\n");

      return `${categoryHeader}\n${items}`;
    })
    .join("\n\n");
};
