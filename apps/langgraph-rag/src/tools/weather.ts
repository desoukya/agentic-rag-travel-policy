export interface WeatherLookupInput {
  latitude: number;
  longitude: number;
}

export async function getWeather(_input: WeatherLookupInput) {
  return {
    nextStep: "Implement real-time weather lookup for LangGraph tool execution."
  };
}
