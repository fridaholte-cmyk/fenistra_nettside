import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface QuizAnswer {
  questionId: string;
  optionIndex: number;
}

export interface QuizResult {
  package: 'Standard' | 'Premium';
  reasons: string[];
  relatedChips: { label: string; route: string }[];
  takenAt: string;
}

export interface QuizOption {
  label: string;
  premiumWeight: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

const RESULT_KEY = 'fenistra_quiz_result';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'portfolio-size',
    question: 'Hvor stor er eiendomsporteføljen deres?',
    options: [
      { label: 'Under 20 000 kvm', premiumWeight: 0 },
      { label: '20 000–100 000 kvm', premiumWeight: 0 },
      { label: 'Over 100 000 kvm', premiumWeight: 1 },
    ],
  },
  {
    id: 'kjopesenter',
    question: 'Driver dere kjøpesenter, eller har dere omsetningsbasert leie som må følges opp?',
    options: [
      { label: 'Nei', premiumWeight: 0 },
      { label: 'Ja', premiumWeight: 1 },
    ],
  },
  {
    id: 'innleie',
    question: 'Leier dere også lokaler selv (innleie), i tillegg til å leie ut?',
    options: [
      { label: 'Nei, kun utleie', premiumWeight: 0 },
      { label: 'Ja, vi har innleieforhold også', premiumWeight: 1 },
    ],
  },
  {
    id: 'radgiver',
    question: 'Ønsker dere en dedikert kunderådgiver og prioritert oppfølging?',
    options: [
      { label: 'Ikke nødvendig', premiumWeight: 0 },
      { label: 'Ja, det er viktig for oss', premiumWeight: 1 },
    ],
  },
];

@Injectable({ providedIn: 'root' })
export class QuizService {
  isOpen = false;
  resultChanged$ = new Subject<QuizResult | null>();

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  getResult(): QuizResult | null {
    try {
      const raw = localStorage.getItem(RESULT_KEY);
      return raw ? (JSON.parse(raw) as QuizResult) : null;
    } catch {
      return null;
    }
  }

  clearResult() {
    try {
      localStorage.removeItem(RESULT_KEY);
    } catch {
      /* ignore */
    }
    this.resultChanged$.next(null);
  }

  submitAnswers(answers: QuizAnswer[]): QuizResult {
    let score = 0;
    const byId = new Map(answers.map((a) => [a.questionId, a]));

    QUIZ_QUESTIONS.forEach((q) => {
      const a = byId.get(q.id);
      if (a) score += q.options[a.optionIndex]?.premiumWeight ?? 0;
    });

    const pkg: 'Standard' | 'Premium' = score >= 2 ? 'Premium' : 'Standard';

    const reasons: string[] = [];
    const relatedChips: { label: string; route: string }[] = [];

    const sizeAnswer = byId.get('portfolio-size');
    if (sizeAnswer?.optionIndex === 2) {
      reasons.push('Porteføljen deres er stor nok til at en dedikert kunderådgiver og prioritert oppfølging gir mest verdi.');
    } else {
      reasons.push('Fenistra Standard dekker kjerneløsningene deres — kontrakt, fakturering, regnskap og rapportering — uten behov for tilleggsprodukter.');
    }

    const kjopesenterAnswer = byId.get('kjopesenter');
    if (kjopesenterAnswer?.optionIndex === 1) {
      reasons.push('Kjøpesenterdrift og omsetningsbasert leie er et tilleggsprodukt som alltid er inkludert i Premium.');
      relatedChips.push({ label: 'Kjøpesenter', route: '/losning-kjopesenter' });
    }

    const innleieAnswer = byId.get('innleie');
    if (innleieAnswer?.optionIndex === 1) {
      reasons.push('Innleiehåndtering er et tilleggsprodukt som alltid er inkludert i Premium.');
      relatedChips.push({ label: 'Innleie', route: '/losning-innleie' });
    }

    const radgiverAnswer = byId.get('radgiver');
    if (radgiverAnswer?.optionIndex === 1) {
      reasons.push('Dere får en egen dedikert kunderådgiver, som alltid er inkludert i Premium.');
      relatedChips.push({ label: 'Kundeteamet', route: '/kundeteam' });
    }

    reasons.push('Alle transaksjonsprodukter (MVA-erklæring, RBO, Protokoller, Digital signering) er inkludert i begge pakker, betalt per bruk.');
    relatedChips.push({ label: 'Kontrakter', route: '/losning-kontrakter' }, { label: 'Fakturering', route: '/losning-fakturering' });

    const result: QuizResult = {
      package: pkg,
      reasons,
      relatedChips,
      takenAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(RESULT_KEY, JSON.stringify(result));
    } catch {
      /* ignore storage errors */
    }

    this.resultChanged$.next(result);
    return result;
  }
}
