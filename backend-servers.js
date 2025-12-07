const express2 = require('express');
const axios = require('axios');
const app2 = express2();

app2.use(express2.json());
app2.use(cors());

const JUDGE0_API = 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_KEY = process.env.JUDGE0_API_KEY;

const problems = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Find two numbers that sum to target',
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] }
    ]
  },
  {
    id: 2,
    title: 'Palindrome',
    difficulty: 'Medium',
    description: 'Check if number is palindrome',
    testCases: [
      { input: 121, expected: true }
    ]
  }
];

let submissions = [];

// Get all problems
app2.get('/api/problems', (req, res) => {
  res.json(problems);
});

// Get problem by ID
app2.get('/api/problems/:id', (req, res) => {
  const problem = problems.find(p => p.id === parseInt(req.params.id));
  res.json(problem || { error: 'Not found' });
});

// Submit solution
app2.post('/api/submissions', async (req, res) => {
  const { problemId, code, language } = req.body;
  
  // Call Judge0 API to execute code
  try {
    const response = await axios.post(
      `${JUDGE0_API}/submissions`,
      {
        source_code: code,
        language_id: getLanguageId(language),
        stdin: ''
      },
      {
        headers: {
          'x-rapidapi-key': JUDGE0_KEY,
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
      }
    );
    
    const submission = {
      id: submissions.length + 1,
      problemId,
      code,
      language,
      status: 'accepted',
      time: 125,
      memory: 23,
      createdAt: new Date()
    };
    
    submissions.push(submission);
    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: 'Compilation failed' });
  }
});

// Get leaderboard
app2.get('/api/leaderboard', (req, res) => {
  const leaderboard = [
    { rank: 1, name: 'AlexMaster', solved: 247, rating: 2450 },
    { rank: 2, name: 'CodeNinja', solved: 234, rating: 2380 },
    { rank: 3, name: 'PythonPro', solved: 219, rating: 2290 }
  ];
  res.json(leaderboard);
});

function getLanguageId(language) {
  const languageMap = {
    'javascript': 63,
    'python': 71,
    'java': 62,
    'cpp': 54
  };
  return languageMap[language] || 63;
}

app2.listen(5001, () => console.log('Code Challenge Server on port 5001'));