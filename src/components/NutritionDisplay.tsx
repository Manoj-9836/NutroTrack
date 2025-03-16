import React from 'react';
import { FoodData } from '../types';

interface NutritionDisplayProps {
  foodData: FoodData;
}

// Food facts database
const foodFacts: Record<string, string[]> = {
  apple: [
    "Apples are rich in antioxidants that help protect cells from oxidative damage.",
    "The fiber in apples promotes gut health and may help lower cholesterol.",
    "Apples contain quercetin, which has anti-inflammatory and anti-allergy properties."
  ],
  banana: [
    "Bananas are high in potassium, which helps regulate heart function and blood pressure.",
    "The vitamin B6 in bananas helps with brain development and immune function.",
    "Bananas contain resistant starch that feeds beneficial gut bacteria."
  ],
  orange: [
    "Oranges are packed with vitamin C, supporting immune health and collagen production.",
    "The flavonoids in oranges have anti-inflammatory and antioxidant effects.",
    "Oranges contain hesperidin, which may help lower blood pressure and cholesterol."
  ],
  egg: [
    "Eggs are one of the most nutritionally complete foods, containing almost every essential nutrient.",
    "The choline in eggs is crucial for brain health and development.",
    "Eggs contain lutein and zeaxanthin, which promote eye health."
  ],
  chicken: [
    "Chicken is a lean protein source that helps build and maintain muscle mass.",
    "The B vitamins in chicken support energy metabolism and brain function.",
    "Chicken contains selenium, which plays a role in thyroid function and antioxidant defense."
  ],
  rice: [
    "Rice provides quick energy as it's easily digested carbohydrates.",
    "Brown rice contains lignans, which may reduce heart disease risk.",
    "Rice is naturally gluten-free, making it suitable for people with celiac disease."
  ],
  bread: [
    "Whole grain bread provides fiber that supports digestive health.",
    "The B vitamins in bread help convert food into energy.",
    "Fermented breads like sourdough may be easier to digest and have a lower glycemic index."
  ],
  milk: [
    "Milk is a complete protein containing all essential amino acids.",
    "The calcium in milk supports bone health and may help prevent osteoporosis.",
    "Milk contains tryptophan, which can help improve sleep quality."
  ],
  yogurt: [
    "Yogurt contains probiotics that support gut health and immune function.",
    "The calcium and phosphorus in yogurt help maintain strong bones and teeth.",
    "Fermented yogurt may be easier to digest for people with lactose intolerance."
  ],
  cheese: [
    "Cheese is rich in calcium, which is essential for bone health.",
    "The protein in cheese helps with muscle repair and immune function.",
    "Aged cheeses contain less lactose, making them suitable for some lactose-intolerant individuals."
  ],
  pizza: [
    "Pizza can provide a balance of carbohydrates, proteins, and fats in one meal.",
    "Tomato sauce on pizza contains lycopene, which may reduce cancer risk.",
    "Adding vegetable toppings increases the nutritional value with fiber and vitamins."
  ],
  pasta: [
    "Pasta provides complex carbohydrates that give sustained energy.",
    "Whole grain pasta contains more fiber, vitamins, and minerals than refined pasta.",
    "The glycemic index of pasta is lower when cooked al dente, causing a slower rise in blood sugar."
  ],
  potato: [
    "Potatoes are a good source of potassium, vitamin C, and vitamin B6.",
    "The resistant starch in cooled potatoes acts as a prebiotic for gut bacteria.",
    "Potatoes with skin provide more fiber and nutrients than peeled potatoes."
  ],
  avocado: [
    "Avocados are rich in heart-healthy monounsaturated fats.",
    "The high fiber content in avocados supports digestive health.",
    "Avocados contain more potassium than bananas, helping regulate blood pressure."
  ],
  salmon: [
    "Salmon is one of the best sources of omega-3 fatty acids, which support heart and brain health.",
    "The high-quality protein in salmon helps build and repair tissues.",
    "Salmon contains astaxanthin, a powerful antioxidant that gives it its pink color."
  ],
  broccoli: [
    "Broccoli is rich in sulforaphane, which may have cancer-fighting properties.",
    "The vitamin K in broccoli supports bone health and blood clotting.",
    "Broccoli contains more vitamin C than oranges by weight."
  ],
  spinach: [
    "Spinach is packed with iron, which helps transport oxygen throughout the body.",
    "The lutein and zeaxanthin in spinach support eye health.",
    "Spinach contains nitrates that may help lower blood pressure and improve athletic performance."
  ],
  chocolate: [
    "Dark chocolate contains flavanols that may improve blood flow and lower blood pressure.",
    "The theobromine in chocolate has a mild stimulant effect similar to caffeine.",
    "Chocolate contains phenylethylamine, which can trigger feelings of happiness."
  ],
  coffee: [
    "Coffee is rich in antioxidants that help fight inflammation.",
    "The caffeine in coffee can improve mental alertness and physical performance.",
    "Regular coffee consumption is associated with a lower risk of several diseases, including Parkinson's and type 2 diabetes."
  ],
  tea: [
    "Tea contains L-theanine, which promotes relaxation without drowsiness.",
    "The catechins in green tea have powerful antioxidant properties.",
    "Regular tea consumption is associated with better heart health and lower stress levels."
  ]
};

// Function to get facts for a food
const getFoodFacts = (foodName: string): string[] => {
  const normalizedName = foodName.toLowerCase();
  
  // Check for exact matches
  if (foodFacts[normalizedName]) {
    return foodFacts[normalizedName];
  }
  
  // Check for partial matches
  for (const key of Object.keys(foodFacts)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return foodFacts[key];
    }
  }
  
  // Default facts if no match found
  return [
    "A balanced diet includes a variety of foods from all food groups.",
    "Staying hydrated is essential for overall health and proper bodily functions.",
    "Portion control is important for maintaining a healthy weight."
  ];
};

const NutritionDisplay: React.FC<NutritionDisplayProps> = ({ foodData }) => {
  const foodFactsList = getFoodFacts(foodData.name);
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-800 text-white p-3">
        <h3 className="text-lg font-semibold">Nutritional Values</h3>
        <p className="text-sm text-gray-300">Serving Size: {foodData.servingSize}</p>
      </div>
      
      <table className="nutrition-table">
        <tbody>
          <tr>
            <td className="font-medium">Calories</td>
            <td className="text-right">{Math.round(foodData.calories)}</td>
          </tr>
          <tr>
            <td className="font-medium">Total Fat</td>
            <td className="text-right">{foodData.nutrients.fat.toFixed(1)}g</td>
          </tr>
          <tr>
            <td className="pl-6">Saturated Fat</td>
            <td className="text-right">{foodData.nutrients.saturatedFat.toFixed(1)}g</td>
          </tr>
          <tr>
            <td className="font-medium">Cholesterol</td>
            <td className="text-right">{foodData.nutrients.cholesterol.toFixed(1)}mg</td>
          </tr>
          <tr>
            <td className="font-medium">Sodium</td>
            <td className="text-right">{foodData.nutrients.sodium.toFixed(1)}mg</td>
          </tr>
          <tr>
            <td className="font-medium">Carbohydrates</td>
            <td className="text-right">{foodData.nutrients.carbs.toFixed(1)}g</td>
          </tr>
          <tr>
            <td className="pl-6">Dietary Fiber</td>
            <td className="text-right">{foodData.nutrients.fiber.toFixed(1)}g</td>
          </tr>
          <tr>
            <td className="pl-6">Sugars</td>
            <td className="text-right">{foodData.nutrients.sugars.toFixed(1)}g</td>
          </tr>
          <tr>
            <td className="font-medium">Protein</td>
            <td className="text-right">{foodData.nutrients.protein.toFixed(1)}g</td>
          </tr>
          <tr>
            <td className="font-medium">Potassium</td>
            <td className="text-right">{foodData.nutrients.potassium.toFixed(1)}mg</td>
          </tr>
        </tbody>
      </table>
      
      <div className="p-3 bg-gray-50">
        <h4 className="font-medium text-gray-700 mb-2">Nutrition Facts & Health Benefits</h4>
        <ul className="text-sm text-gray-600 space-y-2">
          {/* Conditional nutrition facts based on nutrient content */}
          {foodData.nutrients.fiber >= 5 && (
            <li>• High in fiber which aids digestion and helps maintain steady blood sugar levels.</li>
          )}
          {foodData.nutrients.protein >= 15 && (
            <li>• Good source of protein which helps build and repair tissues.</li>
          )}
          {foodData.nutrients.sodium >= 400 && (
            <li className="text-red-600">• High in sodium. Consider balancing with low-sodium foods.</li>
          )}
          {foodData.nutrients.saturatedFat >= 5 && (
            <li className="text-yellow-600">• Contains significant saturated fat. Consume in moderation.</li>
          )}
          {foodData.nutrients.potassium >= 300 && (
            <li>• Good source of potassium which helps maintain healthy blood pressure.</li>
          )}
          
          {/* Food-specific facts */}
          <li className="pt-2 font-medium">Food Facts:</li>
          {foodFactsList.map((fact, index) => (
            <li key={index}>• {fact}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NutritionDisplay;