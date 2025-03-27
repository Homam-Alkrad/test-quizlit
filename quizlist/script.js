const questions = document.querySelectorAll('.question');
const showAnswerBtn = document.getElementById('showAnswer');
const nextBtn = document.getElementById('next');
const resultDiv = document.getElementById('result');
const progress = document.getElementById('progress');
let currentQuestion = 0;
let score = 0;

questions[currentQuestion].classList.add('active');
updateProgress();

showAnswerBtn.addEventListener('click', () => {
    const correctAnswer = questions[currentQuestion].getAttribute('data-answer');
    if (questions[currentQuestion].classList.contains('mc')) {
        resultDiv.innerHTML = `الإجابة الصحيحة هي: ${correctAnswer}`;
    } else {
        const flashcardAnswer = questions[currentQuestion].querySelector('.flashcard-answer');
        flashcardAnswer.style.display = 'block';
        resultDiv.innerHTML = '';
    }
});

nextBtn.addEventListener('click', () => {
    if (questions[currentQuestion].classList.contains('mc')) {
        const selectedOption = questions[currentQuestion].querySelector('input:checked');
        const correctAnswer = questions[currentQuestion].getAttribute('data-answer');

        if (selectedOption && selectedOption.value === correctAnswer) {
            score++;
        }
    }

    questions[currentQuestion].classList.remove('active');
    currentQuestion++;

    if (currentQuestion < questions.length) {
        questions[currentQuestion].classList.add('active');
        resultDiv.innerHTML = '';
        if (questions[currentQuestion].classList.contains('flashcard')) {
            questions[currentQuestion].querySelector('.flashcard-answer').style.display = 'none';
        }
        updateProgress();
    } else {
        showFinalResult();
    }
});

function updateProgress() {
    const progressPercentage = (currentQuestion / questions.length) * 100;
    progress.style.width = `${progressPercentage}%`;
}

function showFinalResult() {
    resultDiv.innerHTML = `
        انتهى الاختبار!<br>
        نتيجتك في الأسئلة متعددة الخيارات: ${score} من 5<br>
        النسبة: ${(score / 5 * 100).toFixed(2)}%
    `;
    showAnswerBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    progress.style.width = '100%';
}