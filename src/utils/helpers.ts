export const getSpeciesColor = (species: string) => {
  switch (species.toLowerCase()) {
    case "human":
      return "border-t-4 border-blue-500";

    case "droid":
      return "border-t-4 border-gray-500";

    case "wookiee":
      return "border-t-4 border-amber-700";

    case "rodian":
      return "border-t-4 border-green-500";

    case "hutt":
      return "border-t-4 border-purple-500";

    default:
      return "border-t-4 border-slate-400";
  }
};