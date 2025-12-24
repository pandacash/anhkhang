export type Player = {
  id: string;
  name: string;
  grade: number;
  animal: 'elephant' | 'panda';
  diamonds: number;
};

export type Subject = 'math' | 'english';

export type Exercise = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
};

export type DailyStats = {
  date: string;
  diamonds: number;
};
