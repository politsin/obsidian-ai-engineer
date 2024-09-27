export interface AiSettings {
  hello: string;
  openAI: {
    apiKey: string;
    baseUrl: string;
    steam: boolean;
    models: string[];
  };
}

export const DEFAULTS: AiSettings = {
  hello: "world",
  openAI: {
    baseUrl: "https://api.openai.com/v1",
    apiKey: "",
    steam: true,
    models: [],
  },
};
