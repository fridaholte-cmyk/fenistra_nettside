import { AfterViewInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizService, QuizResult } from '../../shared/quiz.service';
import { createHubspotForm } from '../../shared/hubspot-form';

@Component({
  selector: 'app-pakke-resultat',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pakke-resultat.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PakkeResultatComponent implements AfterViewInit, OnDestroy {
  result: QuizResult | null;
  private sub: Subscription;

  constructor(public quiz: QuizService) {
    this.result = quiz.getResult();
    this.sub = quiz.resultChanged$.subscribe((r) => (this.result = r));
  }

  ngAfterViewInit() {
    createHubspotForm('#hubspotMeetingForm');
  }

  retakeQuiz() {
    this.quiz.clearResult();
    this.quiz.open();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
