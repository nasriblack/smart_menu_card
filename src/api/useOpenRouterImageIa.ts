/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { formatMenuForAI } from "../utils/formatMenuForAI";

export const useAiRecommendation = () => {
  return useMutation({
    mutationFn: async ({ preference, taste, occasion }: any) => {
      console.log("checking the payload", {
        preference,
        taste,
        occasion,
      });
      const preferencesText = `I'm looking for ${preference.toLowerCase()}, I prefer something ${taste.toLowerCase()}, and this is for a ${occasion.toLowerCase()}.`;
      console.log("cheecking the preferences", preferencesText);
      const formattedMenu = formatMenuForAI();

      console.log("checking the menutext", formattedMenu);
      const body = {
        model: "google/gemini-flash-1.5",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful restaurant assistant. Based on the user's preferences, recommend 2–3 food or drink items from the menu. Always include complementary suggestions. Return your response as a JSON object with two keys: 'suggestions' (an array of selected food or drink items), and 'propositions' (an array of complementary food or drink names). If the user selects food, suggest complementary drinks. If the user selects drinks, suggest complementary food (like desserts or pastries). Do not include descriptions or explanations—just the names in arrays.",
          },
          {
            role: "user",
            content: preferencesText,
          },
          {
            role: "user",
            content: `Here is the full menu:\n${formattedMenu}`,
          },
          {
            role: "user",
            content: "What do you suggest I order?",
          },
        ],
      };
      console.log("checking the body", body);
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY_OPEN_ROUTER}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      return data.choices[0].message.content;
    },
  });
};
