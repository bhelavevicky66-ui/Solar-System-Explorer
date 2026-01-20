
export interface Planet {
  id: string;
  name: string;
  distance: string; // e.g., "57.9 million km"
  size: string;     // e.g., "4,879 km"
  temperature: string; // e.g., "167°C"
  fact: string;
  color: string;    // CSS color/gradient
  orbitSpeed: number; // in seconds
  orbitSize: number; // in px or %
  diameter: number; // relative size for display
  gravity: string; // e.g. "3.7 m/s²"
  moons: number;
  rotationTime: string; // e.g. "24.6 hours"
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizScore {
  id: string;
  username: string;
  score: number;
  total: number;
  date: string;
}

export interface AdminCredentials {
  username: string;
  token: string | null;
}
