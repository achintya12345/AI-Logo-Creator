const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const AIDesignIdea = model.startChat({
      generationConfig,
      history: [
      ],
    });

    export const AILogoPrompt = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a text prompt to create Logo for Logo Title/Brand name : Indian Spice,with description: Spicy, with Color combination of Earthy Browns, also include the {logoIdea} and include Black And White Line Logos design idea and Referring to this Logo Prompt:Create a minimalist and modern logo design that is clean, simple, and visually appealing. The logo should be easy to recognize and remember, and it should be versatile enough to be used in a variety of contexts. Use a combination of typography and simple geometric shapes to create a visually striking and memorable design. The logo should be timeless and elegant, and it should convey a sense of professionalism and sophistication.  Give me result in JSON portal with prompt field only"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"prompt\": \"Create a minimalist and modern logo design for the brand \\\"Indian Spice\\\". The logo should evoke a sense of warmth and spiciness, utilizing a color palette of earthy browns. Incorporate {logoIdea}. Aim for a clean, simple, and visually appealing design that is easy to recognize and remember. The logo should be versatile enough to be used in a variety of contexts. Use a combination of typography and simple geometric shapes to create a visually striking and memorable design. Emphasize a timeless and elegant aesthetic, conveying a sense of professionalism and sophistication. Additionally, provide a Black and White Line Logos design variant for maximum versatility. Please provide multiple options.\"\n}\n```\n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
