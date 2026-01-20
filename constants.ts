
import { Planet, QuizQuestion } from './types';

export const INITIAL_PLANETS: Planet[] = [
  {
    id: '1',
    name: 'Mercury',
    distance: '57.9 million km',
    size: '4,879 km',
    temperature: '167°C',
    fact: 'Mercury is the smallest planet in our solar system and the closest to the Sun.',
    color: 'from-gray-400 to-gray-600',
    orbitSpeed: 8,
    orbitSize: 100,
    diameter: 12
  },
  {
    id: '2',
    name: 'Venus',
    distance: '108.2 million km',
    size: '12,104 km',
    temperature: '464°C',
    fact: 'Venus is the hottest planet in our solar system, with a thick, toxic atmosphere.',
    color: 'from-orange-300 to-yellow-600',
    orbitSpeed: 12,
    orbitSize: 140,
    diameter: 20
  },
  {
    id: '3',
    name: 'Earth',
    distance: '149.6 million km',
    size: '12,742 km',
    temperature: '15°C',
    fact: 'Earth is our home planet and the only world known to harbor life.',
    color: 'from-blue-400 to-green-500',
    orbitSpeed: 20,
    orbitSize: 190,
    diameter: 22
  },
  {
    id: '4',
    name: 'Mars',
    distance: '227.9 million km',
    size: '6,779 km',
    temperature: '-65°C',
    fact: 'Mars is a dusty, cold, desert world with a very thin atmosphere.',
    color: 'from-red-500 to-red-800',
    orbitSpeed: 30,
    orbitSize: 240,
    diameter: 18
  },
  {
    id: '5',
    name: 'Jupiter',
    distance: '778.6 million km',
    size: '139,820 km',
    temperature: '-110°C',
    fact: 'Jupiter is more than twice as massive as the other planets of our solar system combined.',
    color: 'from-orange-200 to-orange-400',
    orbitSpeed: 50,
    orbitSize: 310,
    diameter: 45
  },
  {
    id: '6',
    name: 'Saturn',
    distance: '1.4 billion km',
    size: '116,460 km',
    temperature: '-140°C',
    fact: 'Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system.',
    color: 'from-yellow-200 to-yellow-500',
    orbitSpeed: 70,
    orbitSize: 390,
    diameter: 38
  },
  {
    id: '7',
    name: 'Uranus',
    distance: '2.9 billion km',
    size: '50,724 km',
    temperature: '-195°C',
    fact: 'Uranus is an ice giant that rotates at a nearly 90-degree angle from the plane of its orbit.',
    color: 'from-cyan-300 to-cyan-500',
    orbitSpeed: 100,
    orbitSize: 460,
    diameter: 30
  },
  {
    id: '8',
    name: 'Neptune',
    distance: '4.5 billion km',
    size: '49,244 km',
    temperature: '-201°C',
    fact: 'Neptune is dark, cold, and whipped by supersonic winds, the eighth and most distant planet.',
    color: 'from-blue-600 to-indigo-800',
    orbitSpeed: 140,
    orbitSize: 520,
    diameter: 28
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Saturn", "Jupiter", "Neptune"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "Which planet has the most famous ring system?",
    options: ["Uranus", "Neptune", "Saturn", "Jupiter"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "Which planet is closest to the Sun?",
    options: ["Mercury", "Venus", "Earth", "Mars"],
    correctAnswer: 0
  },
  {
    id: 5,
    question: "Which planet is known for its Great Red Spot?",
    options: ["Mars", "Jupiter", "Saturn", "Uranus"],
    correctAnswer: 1
  }
];
