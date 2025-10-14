// script.js

// --- Data Structure ---
const quizData = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Manager", "Home Tool Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["JavaScript", "HTML", "CSS", "Python"],
        answer: "CSS"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<script>", "<js>", "<javascript>", "<link>"],
        answer: "<script>"
    },
    {
        question: "What is the primary role of JavaScript in a web application?",
        options: ["Data storage", "Styling and layout", "Server-side logic", "Interactivity and behavior"],
        answer: "Interactivity and behavior"
    },
    {
        question: "Which CSS property is used to change the background color?",
        options: ["color", "bg-color", "background-color", "text-color"],
        answer: "background-color"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let quizActive = false;
// Simulate a unique logged-in user
const currentUser = "User_" + Math.floor(Math.random() * 900 + 100); 

// --- DOM Elements ---
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-question-btn');
const currentQSpan = document.getElementById('current-q');
const totalQSpan = document.getElementById('total-q');


// --- Core Application Functions ---

/** Switches the visible section. */
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    // Workflow step: Leaderboard updates automatically (if navigating to it)
    if (sectionId === 'leaderboard') {
        loadLeaderboard();
    }
    // Workflow step: Dashboard refreshes to show updated stats
    if (sectionId === 'dashboard') {
        updateDashboardStats();
    }
}

/** Workflow step: User clicks "Start Quiz" -> navigates to Quiz section. */
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizActive = true;
    nextBtn.disabled = true;
    showSection('quiz-section'); 
    loadQuestion();
}

/** Loads the current question and options. */
function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        endQuiz();
        return;
    }

    const currentQuiz = quizData[currentQuestionIndex];
    questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuiz.question}`;
    optionsContainer.innerHTML = '';
    currentQSpan.textContent = currentQuestionIndex + 1;

    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => selectAnswer(option, currentQuiz.answer, button);
        optionsContainer.appendChild(button);
    });
}

/** Handles answer selection, scoring, and UI feedback. */
function selectAnswer(selectedOption, correctAnswer, clickedButton) {
    if (!quizActive) return;

    // Disable all options
    Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);

    // Apply color feedback and update score
    if (selectedOption === correctAnswer) {
        clickedButton.classList.add('correct');
        score++;
    } else {
        clickedButton.classList.add('wrong');
        // Highlight the correct answer
        Array.from(optionsContainer.children).find(btn => btn.textContent === correctAnswer).classList.add('correct');
    }

    nextBtn.disabled = false;
}

/** Moves to the next question or finishes the quiz. */
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        nextBtn.disabled = true;
    } else {
        endQuiz();
    }
}

/** Workflow step: User completes quiz -> Score saved. */
function endQuiz() {
    quizActive = false;
    saveScore(currentUser, score); 
    
    // Update result section content
    document.getElementById('final-score').textContent = score;
    document.getElementById('max-score').textContent = quizData.length;
    let message = score === quizData.length ? "Perfect score! 🎉" :
                  score > quizData.length / 2 ? "Great job! Keep learning. 👍" :
                  "Good effort. Review the material! 📚";
    document.getElementById('result-message').textContent = message;

    showSection('result-section');
}

// --- Leaderboard/Storage Functions ---

/** Retrieves the leaderboard data from LocalStorage. */
function getLeaderboardData() {
    const data = localStorage.getItem('quiz_leaderboard');
    return data ? JSON.parse(data) : [];
}

/** Saves the score to LocalStorage. */
function saveScore(user, newScore) {
    const leaderboard = getLeaderboardData();

    // Check if the user already exists and if the new score is higher
    const userIndex = leaderboard.findIndex(entry => entry.user === user);

    if (userIndex !== -1) {
        // Only save if it's a new high score for the user
        if (newScore > leaderboard[userIndex].score) {
            leaderboard[userIndex].score = newScore;
        }
    } else {
        leaderboard.push({ user: user, score: newScore, date: new Date().toLocaleString() });
    }

    // Update LocalStorage
    localStorage.setItem('quiz_leaderboard', JSON.stringify(leaderboard));
}

/** Renders the leaderboard table. */
function loadLeaderboard() {
    let leaderboard = getLeaderboardData();

    // Sort by score descending
    leaderboard.sort((a, b) => b.score - a.score);

    const tbody = document.querySelector('#leaderboard-table tbody');
    tbody.innerHTML = ''; // Clear previous entries

    leaderboard.slice(0, 10).forEach((entry, index) => { // Show top 10
        const row = tbody.insertRow();
        row.insertCell().textContent = index + 1;
        row.insertCell().textContent = entry.user;
        row.insertCell().textContent = entry.score;
    });
}

/** Workflow step: Dashboard loads stats. Updates the stats on the dashboard. */
function updateDashboardStats() {
    const leaderboard = getLeaderboardData();

    // Filter scores for the current user
    const userScores = leaderboard.filter(entry => entry.user === currentUser);

    // Total quizzes is the number of entries for the current user
    const totalQuizzes = userScores.length;
    
    // High score is the maximum score among the user's entries
    const highScore = userScores.length > 0
        ? userScores.reduce((max, entry) => Math.max(max, entry.score), 0)
        : 0;

    document.getElementById('stat-quizzes').textContent = totalQuizzes;
    document.getElementById('stat-high-score').textContent = highScore;
    document.getElementById('current-username').textContent = currentUser;
}

// --- Initial Load (Ensures the app starts correctly) ---
document.addEventListener('DOMContentLoaded', () => {
    totalQSpan.textContent = quizData.length;
    document.getElementById('max-score').textContent = quizData.length;
    updateDashboardStats();
    loadLeaderboard();
    showSection('dashboard'); // Initial view: User logs in -> Dashboard loads
});