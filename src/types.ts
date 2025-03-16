export interface NutrientInfo {
  carbs: number;
  protein: number;
  fat: number;
  saturatedFat: number;
  cholesterol: number;
  sodium: number;
  fiber: number;
  potassium: number;
  sugars: number;
}

export interface FoodData {
  name: string;
  calories: number;
  servingSize: string;
  nutrients: NutrientInfo;
  timestamp: string;
}

export interface ExerciseInfo {
  name: string;
  icon: string;
  duration: number;
  description: string;
}