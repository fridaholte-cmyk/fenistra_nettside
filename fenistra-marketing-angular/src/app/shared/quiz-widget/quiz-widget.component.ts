import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService, QUIZ_QUESTIONS, QuizAnswer } from '../quiz.service';

@Component({
  selector: 'app-quiz-widget',
  standalone: true,
  imports: [],
  templateUrl: './quiz-widget.component.html'
})
export class QuizWidgetComponent {
  questions = QUIZ_QUESTIONS;
  currentIndex = 0;
  answers: Record<string, number> = {};

  constructor(public quiz: QuizService, private router: Router) {}

  get currentQuestion() {
    return this.questions[this.currentIndex];
  }

  get isLastQuestion(): boolean {
    return this.currentIndex === this.questions.length - 1;
  }

  selectOption(optionIndex: number) {
    this.answers[this.currentQuestion.id] = optionIndex;
  }

  back() {
    if (this.currentIndex > 0) this.currentIndex--;
  }

  next() {
    if (this.answers[this.currentQuestion.id] === undefined) return;
    if (!this.isLastQuestion) {
      this.currentIndex++;
      return;
    }
    const quizAnswers: QuizAnswer[] = this.questions.map((q) => ({
      questionId: q.id,
      optionIndex: this.answers[q.id],
    }));
    this.quiz.submitAnswers(quizAnswers);
    this.reset();
    this.quiz.close();
    this.router.navigateByUrl('/pakke-resultat');
  }

  close() {
    this.reset();
    this.quiz.close();
  }

  private reset() {
    this.currentIndex = 0;
    this.answers = {};
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.quiz.isOpen) this.close();
  }
}
