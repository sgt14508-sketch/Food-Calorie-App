export interface Result {
  food: string;
  confidence: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion_g?: number;
  alternatives?: string[];
}

export function setResult(r: Result, imageDataUrl: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("lastResult", JSON.stringify(r));
  sessionStorage.setItem("lastImage", imageDataUrl);
}

export function getResult(): { result: Result | null; image: string | null } {
  if (typeof window === "undefined") return { result: null, image: null };
  const r = sessionStorage.getItem("lastResult");
  const img = sessionStorage.getItem("lastImage");
  return {
    result: r ? JSON.parse(r) : null,
    image: img || null,
  };
}