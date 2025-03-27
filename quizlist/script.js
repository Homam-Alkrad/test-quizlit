const questions = document.querySelectorAll('.question');
const showAnswerBtn = document.getElementById('showAnswer');
const nextBtn = document.getElementById('next');
const restartBtn = document.getElementById('restart');
const resultDiv = document.getElementById('result');
const progress = document.getElementById('progress');
const scoreDisplay = document.getElementById('score-display');
let currentQuestion = 0;
let score = 0;

function initializeQuiz() {
    questions[currentQuestion].classList.add('active');
    updateProgress();
    updateScore();
    toggleShowAnswerButton();
}

showAnswerBtn.addEventListener('click', () => {
    if (questions[currentQuestion].classList.contains('mc')) {
        const correctAnswer = questions[currentQuestion].getAttribute('data-answer');
        resultDiv.innerHTML = `الإجابة الصحيحة هي: ${correctAnswer}`;
        highlightCorrectAnswer(correctAnswer);
    }
});

nextBtn.addEventListener('click', () => {
    if (questions[currentQuestion].classList.contains('mc')) {
        const selectedOption = questions[currentQuestion].querySelector('input:checked');
        const correctAnswer = questions[currentQuestion].getAttribute('data-answer');

        if (selectedOption && selectedOption.value === correctAnswer) {
            score++;
            updateScore();
        }
    }

    questions[currentQuestion].classList.remove('active');
    const currentCard = questions[currentQuestion].querySelector('.card');
    if (currentCard) currentCard.classList.remove('flipped');

    currentQuestion++;

    if (currentQuestion < questions.length) {
        questions[currentQuestion].classList.add('active');
        resultDiv.innerHTML = '';
        toggleShowAnswerButton();
        updateProgress();
    } else {
        showFinalResult();
    }
});

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    questions.forEach(q => {
        q.classList.remove('active');
        const card = q.querySelector('.card');
        if (card) card.classList.remove('flipped');
        const inputs = q.querySelectorAll('input');
        inputs.forEach(input => input.checked = false);
    });
    resultDiv.innerHTML = '';
    nextBtn.style.display = 'inline-block';
    restartBtn.style.display = 'none';
    initializeQuiz();
});

function updateProgress() {
    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
    progress.style.width = `${progressPercentage}%`;
}

function updateScore() {
    scoreDisplay.textContent = `${score}/5`;
}

function highlightCorrectAnswer(correctAnswer) {
    const options = questions[currentQuestion].querySelectorAll('label');
    options.forEach(option => {
        const input = option.querySelector('input');
        if (input.value === correctAnswer) {
            option.style.background = '#2ecc71';
            option.style.color = 'white';
            option.style.borderColor = '#27ae60';
        }
    });
}

function toggleShowAnswerButton() {
    showAnswerBtn.style.display = questions[currentQuestion].classList.contains('mc') ? 'inline-block' : 'none';
}

function showFinalResult() {
    const percentage = (score / 5 * 100).toFixed(2);
    let message = '';
    if (percentage === 100) {
        message = 'ممتاز! أداء مثالي!';
    } else if (percentage >= 70) {
        message = 'جيد جداً! أحسنت!';
    } else if (percentage >= 50) {
        message = 'جيد، يمكنك التحسن!';
    } else {
        message = 'حاول مرة أخرى لتحسين نتيجتك!';
    }

    resultDiv.innerHTML = `
        انتهى الاختبار!<br>
        نتيجتك في الأسئلة متعددة الخيارات: ${score} من 5<br>
        النسبة: ${percentage}%<br>
        ${message}
    `;
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
    showAnswerBtn.style.display = 'none';
}

// Add flip functionality to flashcards
document.querySelectorAll('.flashcard .card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

initializeQuiz();