import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizService } from '../../shared/quiz.service';

@Component({
  selector: 'app-sporsmal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sporsmal.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SporsmalComponent {
  constructor(public quiz: QuizService) {}
}
