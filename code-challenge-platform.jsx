// ============================================
// PROJECT 2: CODE CHALLENGE PLATFORM
// React + Monaco Editor + Chart.js
// ============================================

import React, { useState, useEffect, useRef } from 'react';

// ============ MAIN APP ============
function CodeChallengePlatform() {
  const [currentPage, setCurrentPage] = useState('problems');
  const [selectedProblem, setSelectedProblem] = useState(null);

  const problems = [
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'Easy',
      description: 'Найди два числа, которые в сумме дают target',
      examples: [
        { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' }
      ],
      boilerplate: `function twoSum(nums, target) {\n  // Напиши решение здесь\n  return [];\n}`,
      testCases: [
        { input: [2, 7, 11, 15], target: 9, expected: [0, 1] },
        { input: [3, 2, 4], target: 6, expected: [1, 2] },
      ]
    },
    {
      id: 2,
      title: 'Palindrome Number',
      difficulty: 'Medium',
      description: 'Проверь, является ли число палиндромом без преобразования в строку',
      examples: [
        { input: 'x = 121', output: 'true' }
      ],
      boilerplate: `function isPalindrome(x) {\n  if (x < 0) return false;\n  // Напиши решение здесь\n  return true;\n}`,
      testCases: [
        { input: 121, expected: true },
        { input: -121, expected: false },
      ]
    }
  ];

  const handleSelectProblem = (problem) => {
    setSelectedProblem(problem);
    setCurrentPage('editor');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {currentPage === 'problems' && (
        <ProblemsPage problems={problems} onSelectProblem={handleSelectProblem} />
      )}
      {currentPage === 'editor' && selectedProblem && (
        <EditorPage problem={selectedProblem} goBack={() => setCurrentPage('problems')} />
      )}
      {currentPage === 'leaderboard' && (
        <LeaderboardPage />
      )}
    </div>
  );
}

function Header({ currentPage, setCurrentPage }) {
  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">💻</span>
          <h1 className="text-white text-2xl font-bold">CodeChallenge Pro</h1>
        </div>
        <nav className="flex space-x-6">
          <button 
            onClick={() => setCurrentPage('problems')}
            className={`px-3 py-2 rounded transition ${
              currentPage === 'problems' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            📝 Задачи
          </button>
          <button 
            onClick={() => setCurrentPage('leaderboard')}
            className={`px-3 py-2 rounded transition ${
              currentPage === 'leaderboard' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            🏆 Лидербоард
          </button>
        </nav>
      </div>
    </header>
  );
}

function ProblemsPage({ problems, onSelectProblem }) {
  const [filter, setFilter] = useState('all');
  
  const filtered = filter === 'all' ? problems : 
                   problems.filter(p => p.difficulty === filter);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex space-x-3">
        {['all', 'Easy', 'Medium', 'Hard'].map(level => (
          <button 
            key={level}
            onClick={() => setFilter(level)}
            className={`px-4 py-2 rounded transition ${
              filter === level 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {level === 'all' ? 'Все' : level}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(problem => (
          <div 
            key={problem.id} 
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition cursor-pointer border border-gray-700"
            onClick={() => onSelectProblem(problem)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-white text-lg font-bold">{problem.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{problem.description}</p>
              </div>
              <span className={`px-3 py-1 rounded text-sm font-semibold ml-4 ${
                problem.difficulty === 'Easy' ? 'bg-green-600' :
                problem.difficulty === 'Medium' ? 'bg-yellow-600' :
                'bg-red-600'
              }`}>
                {problem.difficulty}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EditorPage({ problem, goBack }) {
  const [code, setCode] = useState(problem.boilerplate);
  const [results, setResults] = useState([]);
  const [running, setRunning] = useState(false);

  const runTests = () => {
    setRunning(true);
    setTimeout(() => {
      const testResults = problem.testCases.map((testCase, idx) => {
        // Имитация выполнения кода
        let passed = false;
        let output = '';
        
        try {
          // В реальном приложении здесь был бы запрос к Judge0 API
          passed = Math.random() > 0.3; // Случайный результат для демо
          output = JSON.stringify(testCase.expected);
        } catch (err) {
          output = err.message;
        }

        return {
          id: idx,
          passed,
          output,
          expected: JSON.stringify(testCase.expected),
          time: Math.random() * 100,
          memory: Math.random() * 50
        };
      });

      setResults(testResults);
      setRunning(false);
    }, 1500);
  };

  const passedTests = results.filter(r => r.passed).length;
  const totalTests = results.length;

  return (
    <div className="container mx-auto px-4 py-6">
      <button 
        onClick={goBack}
        className="mb-4 text-blue-500 hover:text-blue-400 transition"
      >
        ← Назад к задачам
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Problem Description */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 overflow-y-auto max-h-96">
          <h2 className="text-white text-2xl font-bold mb-4">{problem.title}</h2>
          <p className="text-gray-300 mb-6">{problem.description}</p>
          
          <h3 className="text-white font-bold mb-3">📝 Примеры:</h3>
          {problem.examples.map((example, idx) => (
            <div key={idx} className="bg-gray-900 p-3 rounded mb-3 text-sm">
              <p className="text-gray-400">Input: <span className="text-blue-400">{example.input}</span></p>
              <p className="text-gray-400">Output: <span className="text-green-400">{example.output}</span></p>
            </div>
          ))}
        </div>

        {/* Editor */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 bg-gray-900 text-white font-mono p-4 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            spellCheck="false"
          />
          <button 
            onClick={runTests}
            disabled={running}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-2 rounded transition"
          >
            {running ? '⏳ Выполняю...' : '▶️ Запустить код'}
          </button>
        </div>
      </div>

      {/* Test Results */}
      {results.length > 0 && (
        <div className="mt-6 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-white text-xl font-bold mb-4">
            Результаты: <span className={passedTests === totalTests ? 'text-green-400' : 'text-red-400'}>
              {passedTests}/{totalTests} тестов пройдено
            </span>
          </h3>
          
          <div className="space-y-2">
            {results.map(result => (
              <div key={result.id} className={`p-3 rounded border-l-4 ${
                result.passed ? 'bg-green-900 border-green-500' : 'bg-red-900 border-red-500'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">
                    {result.passed ? '✅' : '❌'} Тест #{result.id + 1}
                  </span>
                  <div className="text-xs text-gray-300">
                    <span className="mr-3">⏱️ {result.time.toFixed(2)}ms</span>
                    <span>💾 {result.memory.toFixed(2)}MB</span>
                  </div>
                </div>
                {!result.passed && (
                  <div className="text-sm mt-2 text-gray-200">
                    <p>Expected: <span className="text-green-300">{result.expected}</span></p>
                    <p>Got: <span className="text-red-300">{result.output}</span></p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LeaderboardPage() {
  const [leaderboard] = useState([
    { rank: 1, name: 'AlexMaster', solved: 247, rating: 2450, country: '🇷🇺' },
    { rank: 2, name: 'CodeNinja', solved: 234, rating: 2380, country: '🇷🇺' },
    { rank: 3, name: 'PythonPro', solved: 219, rating: 2290, country: '🇺🇦' },
    { rank: 4, name: 'JSWizard', solved: 198, rating: 2150, country: '🇷🇺' },
    { rank: 5, name: 'DataMaster', solved: 187, rating: 2050, country: '🇧🇾' },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-white text-3xl font-bold mb-8">🏆 Лидербоард</h1>
      
      <div className="space-y-3">
        {leaderboard.map(user => (
          <div key={user.rank} className="bg-gray-800 rounded-lg p-4 flex items-center border border-gray-700">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 text-white font-bold mr-4">
              {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : user.rank}
            </div>
            <div className="flex-1">
              <p className="text-white font-bold">{user.name}</p>
              <p className="text-gray-400 text-sm">{user.country} {user.solved} решено</p>
            </div>
            <div className="text-right">
              <p className="text-blue-400 font-bold">{user.rating}</p>
              <p className="text-gray-400 text-sm">Рейтинг</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CodeChallengePlatform;