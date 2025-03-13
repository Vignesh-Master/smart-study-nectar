
import { format, subDays } from 'date-fns';

// Generate dates for the past n days
const generatePastDates = (days: number) => {
  return Array.from({ length: days }).map((_, i) => {
    const date = subDays(new Date(), days - i - 1);
    return format(date, 'MMM d');
  });
};

// Generate random scores between min and max
const generateRandomScores = (count: number, min: number, max: number) => {
  return Array.from({ length: count }).map(() => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};

// Performance data for charts
export const performanceData = {
  weekly: generatePastDates(7).map((date, index) => ({
    date,
    score: generateRandomScores(1, 60, 95)[0]
  })),
  monthly: generatePastDates(30).map((date, index) => {
    // Show only every 3rd date for readability
    return {
      date: index % 3 === 0 ? date : '',
      score: generateRandomScores(1, 55, 90)[0]
    };
  }),
  yearly: Array.from({ length: 12 }).map((_, i) => ({
    date: format(new Date(2023, i, 1), 'MMM'),
    score: generateRandomScores(1, 50, 85)[0]
  }))
};

// Subject data
export const subjectData = [
  {
    id: 's1',
    name: 'Mathematics',
    progress: 78,
    status: 'strong' as const,
    lastActivity: '2 days ago',
    strengthAreas: ['Algebra', 'Trigonometry'],
    weakAreas: ['Calculus', 'Statistics']
  },
  {
    id: 's2',
    name: 'Physics',
    progress: 65,
    status: 'average' as const,
    lastActivity: '1 week ago',
    strengthAreas: ['Mechanics', 'Thermodynamics'],
    weakAreas: ['Electromagnetism', 'Quantum Physics']
  },
  {
    id: 's3',
    name: 'Computer Science',
    progress: 92,
    status: 'strong' as const,
    lastActivity: 'Yesterday',
    strengthAreas: ['Programming', 'Algorithms'],
    weakAreas: ['Networking', 'Database Systems']
  },
  {
    id: 's4',
    name: 'Chemistry',
    progress: 45,
    status: 'weak' as const,
    lastActivity: '3 days ago',
    strengthAreas: ['Organic Chemistry'],
    weakAreas: ['Inorganic Chemistry', 'Physical Chemistry']
  },
  {
    id: 's5',
    name: 'Biology',
    progress: 71,
    status: 'average' as const,
    lastActivity: '5 days ago',
    strengthAreas: ['Cell Biology', 'Genetics'],
    weakAreas: ['Ecology', 'Evolution']
  }
];

// Quiz data
export const quizData = [
  {
    id: 'q1',
    title: 'Algebra Fundamentals',
    subject: 'Mathematics',
    difficulty: 'easy' as const,
    questionCount: 10,
    timeLimit: 15,
    completed: true,
    score: 85
  },
  {
    id: 'q2',
    title: 'Data Structures',
    subject: 'Computer Science',
    difficulty: 'medium' as const,
    questionCount: 15,
    timeLimit: 20,
    completed: true,
    score: 92
  },
  {
    id: 'q3',
    title: 'Mechanics & Motion',
    subject: 'Physics',
    difficulty: 'medium' as const,
    questionCount: 12,
    timeLimit: 18,
    completed: false
  },
  {
    id: 'q4',
    title: 'Organic Chemistry',
    subject: 'Chemistry',
    difficulty: 'hard' as const,
    questionCount: 8,
    timeLimit: 15,
    completed: false
  },
  {
    id: 'q5',
    title: 'Cell Biology',
    subject: 'Biology',
    difficulty: 'easy' as const,
    questionCount: 10,
    timeLimit: 15,
    completed: true,
    score: 78
  },
  {
    id: 'q6',
    title: 'Advanced Calculus',
    subject: 'Mathematics',
    difficulty: 'hard' as const,
    questionCount: 8,
    timeLimit: 20,
    completed: false
  }
];

// Learning resources
export const resourceData = [
  {
    id: 'r1',
    title: 'Understanding Calculus: A Visual Introduction',
    description: 'A comprehensive visual guide to calculus concepts with interactive examples.',
    type: 'video' as const,
    source: 'Khan Academy',
    duration: '45 min',
    tags: ['Mathematics', 'Calculus', 'Beginner'],
    url: 'https://example.com/resource1',
    saved: true
  },
  {
    id: 'r2',
    title: 'Data Structures Explained',
    description: 'Learn about various data structures and their applications in computer science.',
    type: 'article' as const,
    source: 'Medium',
    duration: '20 min read',
    tags: ['Computer Science', 'Algorithms', 'Intermediate'],
    url: 'https://example.com/resource2',
    saved: false
  },
  {
    id: 'r3',
    title: 'Practice Problems: Electromagnetism',
    description: 'A set of practice problems to test your understanding of electromagnetism concepts.',
    type: 'practice' as const,
    source: 'MIT OpenCourseWare',
    duration: '1 hour',
    tags: ['Physics', 'Electromagnetism', 'Advanced'],
    url: 'https://example.com/resource3',
    saved: true
  },
  {
    id: 'r4',
    title: 'Organic Chemistry: Reaction Mechanisms',
    description: 'Detailed explanation of common reaction mechanisms in organic chemistry.',
    type: 'book' as const,
    source: 'Chemistry Journal',
    duration: '3 hours',
    tags: ['Chemistry', 'Organic Chemistry', 'Intermediate'],
    url: 'https://example.com/resource4',
    saved: false
  }
];

// Stats data
export const statsData = [
  {
    title: 'Study Hours',
    value: '42.5',
    percentChange: 12,
    trend: 'up' as const,
    subtitle: 'This week'
  },
  {
    title: 'Quiz Score Avg',
    value: '85%',
    percentChange: 5,
    trend: 'up' as const,
    subtitle: 'Last 30 days'
  },
  {
    title: 'Weak Areas',
    value: '3',
    percentChange: 8,
    trend: 'down' as const,
    subtitle: 'Improved since last month'
  },
  {
    title: 'Resources Saved',
    value: '24',
    subtitle: 'For future reference'
  }
];

// User data
export const userData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  image: null,
  joinedDate: 'September 2023',
  role: 'Student',
  institution: 'Stanford University',
  major: 'Computer Science',
  grade: 'Senior',
  strengths: ['Programming', 'Mathematics', 'Problem Solving'],
  weaknesses: ['Chemistry', 'History', 'Literature']
};
