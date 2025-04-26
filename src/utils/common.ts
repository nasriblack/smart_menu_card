/* eslint-disable @typescript-eslint/no-explicit-any */
export const checkItemState = (itemName: any, response: any, state: string) => {
  const propositions = response?.propositions?.includes(itemName);
  const suggestions = response?.suggestions?.includes(itemName);
  if (state === "propositions") return propositions;
  if (state === "suggestions") return suggestions;
};
