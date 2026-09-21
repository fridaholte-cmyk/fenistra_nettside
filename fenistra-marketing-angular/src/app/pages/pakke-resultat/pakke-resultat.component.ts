import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation, afterNextRender } from '@angular/core';
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
  result: QuizResult | null = null;
  private sub: Subscription;

  constructor(public quiz: QuizService, cdr: ChangeDetectorRef) {
    // stored in localStorage, so only read in the browser after the (prerendered) first render
    afterNextRender(() => {
      this.result = quiz.getResult();
      cdr.markForCheck();
    });
    this.sub = quiz.resultChanged$.subscribe((r) => (this.result = r));
  }

  ngAfterViewInit() {
    createHubspotForm('#hubspotMeetingForm', 'book_demo');
  }

  retakeQuiz() {
    this.quiz.clearResult();
    this.quiz.open();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
