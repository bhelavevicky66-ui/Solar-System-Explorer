
import React, { useState } from 'react';
import { QuizQuestion, QuizScore } from '../types';
import { QUIZ_QUESTIONS } from '../constants';

interface QuizProps {
  onComplete: (score: QuizScore) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleStart = () => {
    if (username.trim()) {
      setQuizStarted(true);
    }
  };

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      const finalScore: QuizScore = {
        id: Math.random().toString(36).substr(2, 9),
        username: username,
        score: score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0),
        total: QUIZ_QUESTIONS.length,
        date: new Date().toLocaleDateString(),
      };
      setQuizFinished(true);
      onComplete(finalScore);
    }
  };

  if (!quizStarted) {
    return (
      <div className="max-w-md mx-auto bg-slate-900 border border-slate-700 p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold font-display text-white mb-4 text-center">Interstellar Quiz</h2>
        <p className="text-slate-400 text-center mb-8">Test your knowledge of the cosmos and earn your place among the stars.</p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Captain's Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-5 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleStart}
            disabled={!username.trim()}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all disabled:opacity-50"
          >
            Engage Engines
          </button>
        </div>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="max-w-md mx-auto bg-slate-900 border border-slate-700 p-8 rounded-3xl shadow-xl text-center">
        <div className="mb-6">
          <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
          </div>
          <h2 className="text-3xl font-bold font-display text-white">Mission Complete</h2>
          <p className="text-slate-400 mt-2">Well done, Captain {username}!</p>
        </div>
        <div className="text-5xl font-bold text-indigo-400 mb-8">
          {score} / {QUIZ_QUESTIONS.length}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all"
        >
          Return to Deck
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-slate-900 border border-slate-700 p-8 rounded-3xl shadow-xl">
      <div className="flex justify-between items-center mb-8">
        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
        <div className="h-1 flex-1 mx-4 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <h3 className="text-2xl font-semibold text-white mb-8">{currentQuestion.question}</h3>
      
      <div className="space-y-4 mb-8">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(index)}
            className={`w-full text-left p-5 rounded-2xl border transition-all ${
              selectedOption === index 
                ? 'bg-indigo-600/20 border-indigo-500 text-white' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className={`w-8 h-8 flex items-center justify-center rounded-lg ${selectedOption === index ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-400'} font-bold`}>
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={selectedOption === null}
        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? 'Finish Mission' : 'Next Sector'}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </button>
    </div>
  );
};

export default Quiz;
