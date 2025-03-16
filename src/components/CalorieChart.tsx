import React, { useMemo } from 'react';
import { FoodData } from '../types';

interface CalorieChartProps {
  dailyLog: FoodData[];
}

const CalorieChart: React.FC<CalorieChartProps> = ({ dailyLog }) => {
  // Group foods by name and sum calories
  const foodCalorieData = useMemo(() => {
    const foodMap = new Map<string, number>();
    
    dailyLog.forEach(food => {
      const currentCalories = foodMap.get(food.name) || 0;
      foodMap.set(food.name, currentCalories + food.calories);
    });
    
    // Convert to array and sort by calories (descending)
    return Array.from(foodMap.entries())
      .map(([name, calories]) => ({ name, calories }))
      .sort((a, b) => b.calories - a.calories);
  }, [dailyLog]);

  // Calculate max calories for scaling the bars
  const maxCalories = useMemo(() => {
    if (foodCalorieData.length === 0) return 100;
    return Math.max(...foodCalorieData.map(item => item.calories));
  }, [foodCalorieData]);

  // Get total calories
  const totalCalories = useMemo(() => {
    return dailyLog.reduce((sum, food) => sum + food.calories, 0);
  }, [dailyLog]);

  // Calculate nutrient totals
  const nutrientTotals = useMemo(() => {
    return dailyLog.reduce((totals, food) => {
      return {
        carbs: totals.carbs + food.nutrients.carbs,
        protein: totals.protein + food.nutrients.protein,
        fat: totals.fat + food.nutrients.fat,
      };
    }, { carbs: 0, protein: 0, fat: 0 });
  }, [dailyLog]);

  // Calculate percentages for macronutrients
  const macroPercentages = useMemo(() => {
    const total = nutrientTotals.carbs * 4 + nutrientTotals.protein * 4 + nutrientTotals.fat * 9;
    if (total === 0) return { carbs: 0, protein: 0, fat: 0 };
    
    return {
      carbs: Math.round((nutrientTotals.carbs * 4 / total) * 100),
      protein: Math.round((nutrientTotals.protein * 4 / total) * 100),
      fat: Math.round((nutrientTotals.fat * 9 / total) * 100),
    };
  }, [nutrientTotals]);

  if (dailyLog.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No data available. Add foods to your daily log to see statistics.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Calorie Distribution by Food</h3>
        <div className="space-y-3">
          {foodCalorieData.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>
                <span>{Math.round(item.calories)} cal</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${(item.calories / maxCalories) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Macronutrient Breakdown</h3>
        <div className="flex h-6 w-full rounded-full overflow-hidden">
          <div 
            className="bg-blue-500 h-full" 
            style={{ width: `${macroPercentages.carbs}%` }}
            title={`Carbs: ${macroPercentages.carbs}%`}
          ></div>
          <div 
            className="bg-red-500 h-full" 
            style={{ width: `${macroPercentages.protein}%` }}
            title={`Protein: ${macroPercentages.protein}%`}
          ></div>
          <div 
            className="bg-yellow-500 h-full" 
            style={{ width: `${macroPercentages.fat}%` }}
            title={`Fat: ${macroPercentages.fat}%`}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            <span>Carbs {macroPercentages.carbs}%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
            <span>Protein {macroPercentages.protein}%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
            <span>Fat {macroPercentages.fat}%</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Daily Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Calories</p>
            <p className="text-2xl font-bold text-green-600">{Math.round(totalCalories)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Foods Logged</p>
            <p className="text-2xl font-bold text-green-600">{dailyLog.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Carbs</p>
            <p className="text-xl font-bold text-blue-500">{nutrientTotals.carbs.toFixed(1)}g</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Protein</p>
            <p className="text-xl font-bold text-red-500">{nutrientTotals.protein.toFixed(1)}g</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Fat</p>
            <p className="text-xl font-bold text-yellow-500">{nutrientTotals.fat.toFixed(1)}g</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieChart;