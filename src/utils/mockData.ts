
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
    name: 'CCNA',
    progress: 78,
    status: 'strong' as const,
    lastActivity: '2 days ago',
    strengthAreas: ['Network Fundamentals', 'IP Connectivity'],
    weakAreas: ['Security Basics', 'Automation'],
    badgesEarned: ['Network Apprentice', 'IP Master'],
    badgesAvailable: ['Routing Guru', 'Switching Expert', 'Security Guardian']
  },
  {
    id: 's2',
    name: 'CCNP',
    progress: 62,
    status: 'average' as const,
    lastActivity: '1 week ago',
    strengthAreas: ['Advanced Routing', 'Network Design'],
    weakAreas: ['SDN', 'Network Automation'],
    badgesEarned: ['Enterprise Enthusiast'],
    badgesAvailable: ['SDN Specialist', 'Automation Ace', 'Security Pro']
  },
  {
    id: 's3',
    name: 'Cloud Computing',
    progress: 92,
    status: 'strong' as const,
    lastActivity: 'Yesterday',
    strengthAreas: ['AWS Basics', 'Cloud Architecture'],
    weakAreas: ['Azure Integration', 'GCP Fundamentals'],
    badgesEarned: ['Cloud Pioneer', 'AWS Adept', 'Deployment Dynamo'],
    badgesAvailable: ['Multi-Cloud Master', 'Container King']
  },
  {
    id: 's4',
    name: 'Java Programming',
    progress: 45,
    status: 'weak' as const,
    lastActivity: '3 days ago',
    strengthAreas: ['Core Java'],
    weakAreas: ['Advanced Java', 'Spring Framework'],
    badgesEarned: ['Hello World Hero'],
    badgesAvailable: ['OOP Olympian', 'Spring Savant', 'API Architect']
  },
  {
    id: 's5',
    name: 'DevOps',
    progress: 71,
    status: 'average' as const,
    lastActivity: '5 days ago',
    strengthAreas: ['CI/CD Pipelines', 'Docker'],
    weakAreas: ['Kubernetes', 'Infrastructure as Code'],
    badgesEarned: ['Docker Deployer', 'CI Crusader'],
    badgesAvailable: ['Kubernetes Commander', 'Terraform Titan']
  }
];

// Quiz data
export const quizData = [
  {
    id: 'q1',
    title: 'Network Fundamentals',
    subject: 'CCNA',
    difficulty: 'easy' as const,
    questionCount: 10,
    timeLimit: 15,
    completed: true,
    score: 85,
    earnedXP: 120,
    badgeReward: 'Network Novice',
    questions: [
      {
        id: 'q1-1',
        question: 'What OSI layer is responsible for logical addressing?',
        options: ['Physical', 'Data Link', 'Network', 'Transport'],
        correctAnswer: 'Network',
        explanation: 'The Network layer (Layer 3) handles logical addressing like IP addresses and routing.'
      },
      {
        id: 'q1-2',
        question: 'Which protocol operates at the Transport layer?',
        options: ['HTTP', 'IP', 'Ethernet', 'TCP'],
        correctAnswer: 'TCP',
        explanation: 'TCP (Transmission Control Protocol) operates at the Transport layer (Layer 4) providing reliable, connection-oriented communication.'
      }
    ]
  },
  {
    id: 'q2',
    title: 'Java Fundamentals',
    subject: 'Java Programming',
    difficulty: 'medium' as const,
    questionCount: 15,
    timeLimit: 20,
    completed: true,
    score: 92,
    earnedXP: 150,
    badgeReward: 'Java Journeyman',
    questions: [
      {
        id: 'q2-1',
        question: 'Which of the following is not a Java primitive type?',
        options: ['int', 'String', 'boolean', 'double'],
        correctAnswer: 'String',
        explanation: 'String is a reference type in Java, not a primitive type.'
      },
      {
        id: 'q2-2',
        question: 'What keyword is used to inherit a class in Java?',
        options: ['implements', 'extends', 'inherit', 'super'],
        correctAnswer: 'extends',
        explanation: 'The "extends" keyword is used to inherit a class in Java.'
      }
    ]
  },
  {
    id: 'q3',
    title: 'Routing & Switching',
    subject: 'CCNP',
    difficulty: 'medium' as const,
    questionCount: 12,
    timeLimit: 18,
    completed: false,
    earnedXP: 0,
    badgeReward: 'Routing Ranger',
    questions: [
      {
        id: 'q3-1',
        question: 'Which protocol is used for link-state routing?',
        options: ['RIP', 'OSPF', 'EIGRP', 'BGP'],
        correctAnswer: 'OSPF',
        explanation: 'OSPF (Open Shortest Path First) is a link-state routing protocol.'
      },
      {
        id: 'q3-2',
        question: 'What is the purpose of a VLAN?',
        options: ['Increase bandwidth', 'Segment broadcast domains', 'Encrypt traffic', 'Connect to the internet'],
        correctAnswer: 'Segment broadcast domains',
        explanation: 'VLANs are used to segment broadcast domains in a LAN environment.'
      }
    ]
  },
  {
    id: 'q4',
    title: 'Cloud Architecture',
    subject: 'Cloud Computing',
    difficulty: 'hard' as const,
    questionCount: 8,
    timeLimit: 15,
    completed: false,
    earnedXP: 0,
    badgeReward: 'Cloud Architect',
    questions: [
      {
        id: 'q4-1',
        question: 'Which AWS service is used for serverless computing?',
        options: ['EC2', 'S3', 'Lambda', 'RDS'],
        correctAnswer: 'Lambda',
        explanation: 'AWS Lambda is a serverless computing service that runs code in response to events.'
      }
    ]
  },
  {
    id: 'q5',
    title: 'Java Collections',
    subject: 'Java Programming',
    difficulty: 'easy' as const,
    questionCount: 10,
    timeLimit: 15,
    completed: true,
    score: 78,
    earnedXP: 100,
    badgeReward: 'Collections Connoisseur',
    questions: []
  },
  {
    id: 'q6',
    title: 'Advanced Networking',
    subject: 'CCNP',
    difficulty: 'hard' as const,
    questionCount: 8,
    timeLimit: 20,
    completed: false,
    earnedXP: 0,
    badgeReward: 'Network Ninja',
    questions: []
  }
];

// Learning resources
export const resourceData = [
  {
    id: 'r1',
    title: 'CCNA Complete Course: Network Fundamentals',
    description: 'A comprehensive guide to networking concepts with hands-on examples.',
    type: 'video' as const,
    source: 'YouTube',
    duration: '45 min',
    tags: ['CCNA', 'Networking', 'Beginner'],
    url: 'https://example.com/resource1',
    embedUrl: 'https://www.youtube.com/embed/qiQR5rTSshw',
    saved: true
  },
  {
    id: 'r2',
    title: 'Java Collections Framework Explained',
    description: 'Learn about Java collections and their applications in programming.',
    type: 'article' as const,
    source: 'Medium',
    duration: '20 min read',
    tags: ['Java', 'Collections', 'Intermediate'],
    url: 'https://example.com/resource2',
    saved: false
  },
  {
    id: 'r3',
    title: 'Practice Lab: Configuring OSPF Routing',
    description: 'A set of practice labs to test your understanding of OSPF routing concepts.',
    type: 'practice' as const,
    source: 'Cisco Learning Network',
    duration: '1 hour',
    tags: ['CCNP', 'OSPF', 'Advanced'],
    url: 'https://example.com/resource3',
    saved: true
  },
  {
    id: 'r4',
    title: 'AWS Cloud Architecture Design Patterns',
    description: 'Detailed explanation of common design patterns in AWS cloud architecture.',
    type: 'book' as const,
    source: 'AWS Documentation',
    duration: '3 hours',
    tags: ['Cloud', 'AWS', 'Architecture'],
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
    title: 'XP Earned',
    value: '1,250',
    percentChange: 15,
    trend: 'up' as const,
    subtitle: 'Total experience points'
  }
];

// User data
export const userData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  image: null,
  joinedDate: 'September 2023',
  role: 'IT Professional',
  company: 'Tech Solutions Inc.',
  position: 'Network Engineer',
  level: 15,
  xp: 1250,
  nextLevelXP: 1500,
  badges: ['Network Novice', 'Java Journeyman', 'Cloud Explorer'],
  strengths: ['Network Fundamentals', 'Core Java', 'AWS Basics'],
  weaknesses: ['Network Automation', 'Spring Framework', 'Azure']
};

// Community data
export const communityData = [
  {
    id: 'c1',
    name: 'CCNA Study Group',
    members: 128,
    description: 'A community for CCNA aspirants to share resources and tips.',
    tags: ['CCNA', 'Networking', 'Certification'],
    joined: true
  },
  {
    id: 'c2',
    name: 'Java Developers',
    members: 256,
    description: 'Connect with Java developers to solve problems and share code.',
    tags: ['Java', 'Programming', 'Development'],
    joined: false
  },
  {
    id: 'c3',
    name: 'Cloud Architects',
    members: 92,
    description: 'Discuss cloud architecture, best practices, and certifications.',
    tags: ['Cloud', 'AWS', 'Azure', 'GCP'],
    joined: true
  }
];

// Roadmap data
export const roadmapData = {
  'CCNA': [
    {
      id: 'phase1',
      title: 'Phase 1: Network Fundamentals',
      progress: 100,
      completed: true,
      steps: [
        {
          id: 'step1-1',
          title: 'Understand OSI Model',
          completed: true,
          resources: ['r1']
        },
        {
          id: 'step1-2',
          title: 'Learn IP Addressing',
          completed: true,
          resources: ['r1']
        }
      ]
    },
    {
      id: 'phase2',
      title: 'Phase 2: Switching Concepts',
      progress: 75,
      completed: false,
      steps: [
        {
          id: 'step2-1',
          title: 'Ethernet Switching',
          completed: true,
          resources: []
        },
        {
          id: 'step2-2',
          title: 'VLANs and Trunking',
          completed: false,
          resources: []
        }
      ]
    },
    {
      id: 'phase3',
      title: 'Phase 3: Routing Concepts',
      progress: 0,
      completed: false,
      steps: [
        {
          id: 'step3-1',
          title: 'Static Routing',
          completed: false,
          resources: []
        },
        {
          id: 'step3-2',
          title: 'Dynamic Routing Protocols',
          completed: false,
          resources: []
        }
      ]
    }
  ],
  'Java Programming': [
    {
      id: 'phase1',
      title: 'Phase 1: Java Basics',
      progress: 100,
      completed: true,
      steps: [
        {
          id: 'step1-1',
          title: 'Syntax and Variables',
          completed: true,
          resources: []
        },
        {
          id: 'step1-2',
          title: 'Control Structures',
          completed: true,
          resources: []
        }
      ]
    },
    {
      id: 'phase2',
      title: 'Phase 2: Object-Oriented Programming',
      progress: 50,
      completed: false,
      steps: [
        {
          id: 'step2-1',
          title: 'Classes and Objects',
          completed: true,
          resources: []
        },
        {
          id: 'step2-2',
          title: 'Inheritance and Polymorphism',
          completed: false,
          resources: []
        }
      ]
    }
  ]
};

// Badge data
export const badgeData = [
  {
    id: 'b1',
    name: 'Network Novice',
    description: 'Completed the Network Fundamentals quiz with a score of 80% or higher',
    category: 'CCNA',
    icon: 'award',
    earned: true,
    progress: 100,
    rarity: 'common'
  },
  {
    id: 'b2',
    name: 'Java Journeyman',
    description: 'Completed 5 Java quizzes with an average score of 85% or higher',
    category: 'Java',
    icon: 'code',
    earned: true,
    progress: 100,
    rarity: 'uncommon'
  },
  {
    id: 'b3',
    name: 'Cloud Architect',
    description: 'Completed all Cloud Computing quizzes with an average score of 90% or higher',
    category: 'Cloud',
    icon: 'cloud',
    earned: false,
    progress: 60,
    rarity: 'rare'
  },
  {
    id: 'b4',
    name: 'Networking Ninja',
    description: 'Completed all CCNP quizzes with a perfect score',
    category: 'CCNP',
    icon: 'zap',
    earned: false,
    progress: 25,
    rarity: 'epic'
  },
  {
    id: 'b5',
    name: 'Consistency Champion',
    description: 'Studied for 30 consecutive days',
    category: 'Achievement',
    icon: 'calendar',
    earned: false,
    progress: 70,
    rarity: 'rare'
  }
];
