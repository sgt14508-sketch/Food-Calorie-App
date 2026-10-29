from transformers import pipeline
import torch

class FoodEstimator:
    def __init__(self):
        print("Loading food classification model...")
        self.classifier = pipeline(
            "image-classification",
            model="nateraw/food",
            device=0 if torch.cuda.is_available() else -1
        )
        print("Model loaded.")

        # Nutrition per 100g + typical serving size in grams
        self.nutrition = {
            "pizza":          {"cal": 266, "protein": 11, "carbs": 33, "fat": 10, "serving": 200},
            "hamburger":      {"cal": 295, "protein": 17, "carbs": 24, "fat": 14, "serving": 220},
            "sushi":          {"cal": 150, "protein": 9,  "carbs": 30, "fat": 1,  "serving": 180},
            "caesar_salad":   {"cal": 190, "protein": 10, "carbs": 8,  "fat": 14, "serving": 250},
            "apple_pie":      {"cal": 237, "protein": 2,  "carbs": 34, "fat": 11, "serving": 150},
            "grilled_salmon": {"cal": 208, "protein": 20, "carbs": 0,  "fat": 13, "serving": 180},
            "pasta":          {"cal": 158, "protein": 6,  "carbs": 31, "fat": 1,  "serving": 250},
            "rice":           {"cal": 130, "protein": 3,  "carbs": 28, "fat": 0.3, "serving": 200},
            "french_fries":   {"cal": 312, "protein": 3,  "carbs": 41, "fat": 15, "serving": 150},
            "ice_cream":      {"cal": 207, "protein": 4,  "carbs": 24, "fat": 11, "serving": 100},
        }

    def predict(self, image_path):
        results = self.classifier(image_path, top_k=3)
        top = results[0]
        food = top["label"].lower().replace(" ", "_")

        data = self.nutrition.get(
            food,
            {"cal": 150, "protein": 5, "carbs": 20, "fat": 5, "serving": 200}
        )
        factor = data["serving"] / 100

        return {
            "food": food.replace("_", " ").title(),
            "confidence": round(top["score"] * 100, 1),
            "portion_g": data["serving"],
            "calories": round(data["cal"] * factor),
            "protein": round(data["protein"] * factor, 1),
            "carbs": round(data["carbs"] * factor, 1),
            "fat": round(data["fat"] * factor, 1),
            "alternatives": [
                f"{r['label'].replace('_',' ').title()} ({round(r['score']*100,1)}%)"
                for r in results[1:3]
            ]
        }