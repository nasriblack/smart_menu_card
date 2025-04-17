export const cleaningJsonFunction = (response: string) => {
  // Step 1: Remove the ```json and ``` markers
  const cleanedJsonString = response?.replace(/```json\s*|\s*```/g, "") ?? "";

  // Step 2: Parse the cleaned JSON string into an object
  const data = cleanedJsonString && JSON.parse(cleanedJsonString);

  return data;
};
