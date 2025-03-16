import React from 'react';

interface ExerciseRecommendationsProps {
  calories: number;
}

const ExerciseRecommendations: React.FC<ExerciseRecommendationsProps> = ({ calories }) => {
  // Calculate exercise durations based on calories
  // These are approximate values for a 155-pound person
  const jogDuration = Math.round((calories / 100) * 10); // ~10 minutes of jogging burns ~100 calories
  const yogaDuration = Math.round((calories / 100) * 20); // ~20 minutes of yoga burns ~100 calories
  const weightLiftingDuration = Math.round((calories / 100) * 20); // ~20 minutes of weight lifting burns ~100 calories
  const swimmingDuration = Math.round((calories / 100) * 13); // ~13 minutes of swimming burns ~100 calories
  const cyclingDuration = Math.round((calories / 100) * 15); // ~15 minutes of cycling burns ~100 calories

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-800 text-white p-3">
        <h3 className="text-lg font-semibold">To burn {Math.round(calories)} calories you will have to</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        <div className="exercise-item">
          <div className="exercise-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v10"></path>
              <path d="M12 15V5"></path>
              <path d="M12 15l-3-3"></path>
              <path d="M12 15l3-3"></path>
              <path d="M5 21h14"></path>
              <path d="M6 18v3"></path>
              <path d="M18 18v3"></path>
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-700">Jog</h4>
            <p className="text-sm text-gray-600">You will have to jog for <span className="font-medium">{jogDuration} Minutes</span></p>
          </div>
        </div>
        
        <div className="exercise-item">
          <div className="exercise-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 20h16"></path>
              <path d="M12 16a4 4 0 0 1-4-4V6h8v6a4 4 0 0 1-4 4Z"></path>
              <path d="M12 12h-2"></path>
              <path d="M12 8V4"></path>
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-700">Do Power Yoga</h4>
            <p className="text-sm text-gray-600">You will have to Power Yoga for <span className="font-medium">{yogaDuration} Minutes</span></p>
          </div>
        </div>
        
        <div className="exercise-item">
          <div className="exercise-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2"></path>
              <path d="M6 12h12"></path>
              <path d="M6 12v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8"></path>
              <path d="M10 16h4"></path>
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-700">Gym Workout</h4>
            <p className="text-sm text-gray-600">You will have to lift weight for <span className="font-medium">{weightLiftingDuration} Minutes</span></p>
          </div>
        </div>
        
        <div className="exercise-item">
          <div className="exercise-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.5h-2.25c-1.5 0-2.25-.5-2.25-2.25v-1.5c0-1.75.75-2.25 2.25-2.25H22"></path>
              <path d="M2 16.5h2.25c1.5 0 2.25-.5 2.25-2.25v-1.5c0-1.75-.75-2.25-2.25-2.25H2"></path>
              <path d="M12 10v12"></path>
              <path d="M12 6V2"></path>
              <path d="M12 22c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8"></path>
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-700">Swimming</h4>
            <p className="text-sm text-gray-600">You will have to swim for <span className="font-medium">{swimmingDuration} Minutes</span></p>
          </div>
        </div>
        
        <div className="exercise-item">
          <div className="exercise-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M3 12h3"></path>
              <path d="M18 12h3"></path>
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-700">Cycling</h4>
            <p className="text-sm text-gray-600">You will have to cycle for <span className="font-medium">{cyclingDuration} Minutes</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseRecommendations;