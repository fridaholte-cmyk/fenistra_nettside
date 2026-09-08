import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizService } from '../../shared/quiz.service';

@Component({
  selector: 'app-losninger',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './losninger.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LosningerComponent {
  constructor(public quiz: QuizService) {}
}
