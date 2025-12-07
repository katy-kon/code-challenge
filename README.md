# code-challenge
Платформа для решения алгоритмических задач  Monaco Editor, лидербоард, система рейтинга
[README.md](https://github.com/user-attachments/files/24014884/README.md)
# 📊 CODE CHALLENGE PLATFORM

Платформа для решения алгоритмических задач с интегрированным кодовым редактором, тестированием и лидербордом.

## 🎯 Ключевые функции

- ✅ Встроенный кодовый редактор (Monaco Editor)
- ✅ Поддержка Python, JavaScript, Java, C++
- ✅ Система тестирования с видимыми и скрытыми тестами
- ✅ Лидербоард по скорости и эффективности решения
- ✅ Система рейтинга и достижений
- ✅ Категории задач (Easy, Medium, Hard)
- ✅ Обсуждение решений в комментариях
- ✅ История попыток и статистика

## 🛠️ Технологический стек

**Frontend:**
- React 18.3 + TypeScript
- Monaco Editor для кодирования
- TailwindCSS + Shadcn UI
- Zustand для state management
- Axios для API

**Backend:**
- Node.js + Express.js
- PostgreSQL + Prisma ORM
- Judge0 API для компиляции и выполнения кода
- Redis для кеширования

**DevOps:**
- Docker & Docker Compose
- GitHub Actions для CI/CD

## 📦 Структура

```
code-challenge-platform/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CodeEditor.tsx
│   │   │   ├── ProblemDescription.tsx
│   │   │   ├── TestResults.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   └── SubmissionHistory.tsx
│   │   ├── hooks/
│   │   │   └── useCodeExecution.ts
│   │   ├── store/
│   │   │   └── challengeStore.ts
│   │   ├── pages/
│   │   │   ├── ProblemsPage.tsx
│   │   │   ├── EditorPage.tsx
│   │   │   └── LeaderboardPage.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── problemController.ts
│   │   │   ├── submissionController.ts
│   │   │   └── leaderboardController.ts
│   │   ├── services/
│   │   │   ├── codeExecutionService.ts
│   │   │   └── ratingService.ts
│   │   ├── models/
│   │   │   └── prisma schema
│   │   └── routes/
│   │       └── index.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🚀 Быстрый старт

```bash
# Клонирование
git clone <repo-url>
cd code-challenge-platform

# Docker запуск (рекомендуется)
docker-compose up --build

# Или локально
cd frontend && npm install && npm run dev
cd ../backend && npm install && npm run dev
```

## 🔌 API Routes

```
GET    /api/problems              - Все задачи
GET    /api/problems/:id          - Деталь задачи
POST   /api/submissions           - Отправка решения
GET    /api/submissions/:id       - Результат
GET    /api/leaderboard           - Топ решающих
GET    /api/user/:id/stats        - Статистика пользователя
```

## 💡 Основные компоненты

### CodeEditor
- Syntax highlighting для 4+ языков
- Auto-completion и intellisense
- Keyboard shortcuts
- Theme switching

### TestRunner
- Запуск тестов в реальном времени
- Визуализация успешных/неудачных тестов
- Время выполнения и память
- Detailed error messages

### Rating System
- Elo rating система
- Рейтинги по языкам
- Достижения (badges)
- Progress tracking

## 🔐 Аутентификация

- JWT токены
- OAuth2 (GitHub/Google)
- Session management
- Rate limiting

## 📊 Мониторинг

- Метрики решений
- Время компиляции/выполнения
- CPU/Memory usage
- Успешность тестов

## 🎨 UI/UX

- Темная/светлая тема
- Responsive дизайн
- Accessibility (WCAG 2.1 AA)
- Smooth animations

## 📝 Лицензия

MIT License

Created for competitive programming education
