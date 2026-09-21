import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizService } from '../../shared/quiz.service';

@Component({
  selector: 'app-priser',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './priser.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PriserComponent {
  constructor(public quiz: QuizService) {}
}
