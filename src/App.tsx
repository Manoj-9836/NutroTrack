import React, { useState, useEffect } from 'react';
import { Search, Flame, Info, Activity, BarChart3 } from 'lucide-react';
import FoodSearch from './components/FoodSearch';
import NutritionDisplay from './components/NutritionDisplay';
import ExerciseRecommendations from './components/ExerciseRecommendations';
import CalorieChart from './components/CalorieChart';
import { FoodData } from './types';
import './App.css';

// Nutritionix API credentials
const NUTRITIONIX_APP_ID = '0d9c4717';
const NUTRITIONIX_API_KEY = '6966e9928eee8834e555d88a94178aaf';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [foodData, setFoodData] = useState<FoodData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dailyLog, setDailyLog] = useState<FoodData[]>([]);
  const [activeTab, setActiveTab] = useState<string>('search');

  useEffect(() => {
    // Load daily log from localStorage on component mount
    const savedLog = localStorage.getItem('dailyLog');
    if (savedLog) {
      try {
        setDailyLog(JSON.parse(savedLog));
      } catch (err) {
        console.error('Error parsing saved log:', err);
        localStorage.removeItem('dailyLog');
      }
    }
  }, []);

  useEffect(() => {
    // Save daily log to localStorage whenever it changes
    localStorage.setItem('dailyLog', JSON.stringify(dailyLog));
  }, [dailyLog]);

  const searchFood = async (query: string) => {
    if (!query.trim()) return;
    
    // Add "1" in front of the query if it's just a food name without quantity
    const processedQuery = /^\d+/.test(query) ? query : `1 ${query}`;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': NUTRITIONIX_APP_ID,
          'x-app-key': NUTRITIONIX_API_KEY,
        },
        body: JSON.stringify({ query: processedQuery }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch nutrition data: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.foods && data.foods.length > 0) {
        const foodItem = data.foods[0];
        const processedData: FoodData = {
          name: foodItem.food_name,
          calories: foodItem.nf_calories,
          servingSize: foodItem.serving_qty + ' ' + foodItem.serving_unit,
          nutrients: {
            carbs: foodItem.nf_total_carbohydrate,
            protein: foodItem.nf_protein,
            fat: foodItem.nf_total_fat,
            saturatedFat: foodItem.nf_saturated_fat || 0,
            cholesterol: foodItem.nf_cholesterol || 0,
            sodium: foodItem.nf_sodium || 0,
            fiber: foodItem.nf_dietary_fiber || 0,
            potassium: foodItem.nf_potassium || 0,
            sugars: foodItem.nf_sugars || 0,
          },
          timestamp: new Date().toISOString(),
        };
        
        setFoodData(processedData);
      } else {
        setError('No food information found');
      }
    } catch (err) {
      console.error('API Error:', err);
      setError('Error fetching nutrition data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addToDaily = () => {
    if (foodData) {
      setDailyLog([...dailyLog, foodData]);
      // Optional: Clear the current food data after adding to log
      // setFoodData(null);
    }
  };

  const removeFromDaily = (index: number) => {
    const updatedLog = [...dailyLog];
    updatedLog.splice(index, 1);
    setDailyLog(updatedLog);
  };

  const getTotalCalories = () => {
    return dailyLog.reduce((total, food) => total + food.calories, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-green-600 to-teal-500 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-center">
          <Flame className="text-orange-300 mr-2" size={32} />
          <h1 className="text-3xl font-bold">NutroTrack</h1>
        </div>
      </header>

      <div className="container mx-auto p-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="flex border-b">
            <button 
              className={`flex-1 py-3 px-4 font-medium flex items-center justify-center ${activeTab === 'search' ? 'bg-green-50 text-green-600 border-b-2 border-green-500' : 'text-gray-600'}`}
              onClick={() => setActiveTab('search')}
            >
              <Search size={18} className="mr-2" /> Search
            </button>
            <button 
              className={`flex-1 py-3 px-4 font-medium flex items-center justify-center ${activeTab === 'daily' ? 'bg-green-50 text-green-600 border-b-2 border-green-500' : 'text-gray-600'}`}
              onClick={() => setActiveTab('daily')}
            >
              <Activity size={18} className="mr-2" /> Daily Log
            </button>
            <button 
              className={`flex-1 py-3 px-4 font-medium flex items-center justify-center ${activeTab === 'stats' ? 'bg-green-50 text-green-600 border-b-2 border-green-500' : 'text-gray-600'}`}
              onClick={() => setActiveTab('stats')}
            >
              <BarChart3 size={18} className="mr-2" /> Stats
            </button>
          </div>

          {activeTab === 'search' && (
            <div className="p-4">
              <FoodSearch 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                searchFood={searchFood} 
                loading={loading}
              />
              
              {error && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md my-4">
                  <p>{error}</p>
                </div>
              )}
              
              {foodData && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {foodData.name.charAt(0).toUpperCase() + foodData.name.slice(1)} 
                      <span className="ml-2 text-green-600">{Math.round(foodData.calories)} Calories</span>
                    </h2>
                    <button 
                      onClick={addToDaily}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      Add to Daily Log
                    </button>
                  </div>
                  
                  {foodData.nutrients.sodium > 400 && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4">
                      <Info size={18} className="inline mr-2" />
                      This food contains a high amount of sodium. High sodium causes severe dehydration and water retention.
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <NutritionDisplay foodData={foodData} />
                    <ExerciseRecommendations calories={foodData.calories} />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'daily' && (
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Daily Food Log</h2>
                <div className="text-lg font-medium">
                  Total: <span className="text-green-600">{Math.round(getTotalCalories())} Calories</span>
                </div>
              </div>
              
              {dailyLog.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No foods logged today. Search for foods to add them to your daily log.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {dailyLog.map((food, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">{food.name.charAt(0).toUpperCase() + food.name.slice(1)}</p>
                        <p className="text-sm text-gray-500">{food.servingSize}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-green-600 mr-3">{Math.round(food.calories)} cal</span>
                        <button 
                          onClick={() => removeFromDaily(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Calorie Intake Statistics</h2>
              <CalorieChart dailyLog={dailyLog} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;