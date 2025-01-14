const API_KEYS = {
  HUGGINGFACE: "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",
  AIMLAPI: "2ed027904a2947efa218958a67074d20",
  GOOGLE_GEMINI: "AIzaSyC7kq-OM5VO3shwj0aQHUze6t-wQ5vn04s",
};

const API_URLS = {
  GOOGLE_GEMINI:
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
  FALCON_7B_INSTRUCT:
    "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
  DIFFUSION:
    "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
};

export const AI_RESPONSE = {
  START_PROMPT: "aiResponse.prompt",
  API_KEYS: API_KEYS,
  API_URLS: API_URLS,
};
