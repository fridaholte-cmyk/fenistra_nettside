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
      { label: 'Under 5 000 kvm', premiumWeight: 0 },
      { label: '5 000–15 000 kvm', premiumWeight: 0 },
      { label: '15 000–50 000 kvm', premiumWeight: 0 },
      { label: '50 000–100 000 kvm', premiumWeight: 1 },
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
    id: 'areal',
    question: 'Ønsker dere god kontroll over arealer, med tegninger koblet direkte til kontrakt og leietaker?',
    options: [
      { label: 'Ikke nødvendig for oss', premiumWeight: 0 },
      { label: 'Ja, det er viktig', premiumWeight: 1 },
    ],
  },
  {
    id: 'ki',
    question: 'Ønsker dere å ta i bruk KI-teknologi for bedre innsikt i porteføljen deres?',
    options: [
      { label: 'Ikke nå', premiumWeight: 0 },
      { label: 'Ja, det er interessant', premiumWeight: 0 },
    ],
  },
  {
    id: 'regulering',
    question: 'Ønsker dere automatisk varsling og håndtering av KPI-regulering, oppsigelsesfrister og utsendelse av reguleringsbrev?',
    options: [
      { label: 'Vi klarer oss med dagens rutiner', premiumWeight: 0 },
      { label: 'Ja, det vil spare oss for mye tid', premiumWeight: 0 },
    ],
  },
  {
    id: 'felleskost-mva',
    question: 'Ønsker dere automatisert felleskostnadsavregning og innhenting av MVA-status og erklæringer fra leietakerne?',
    options: [
      { label: 'Nei, det gjør vi manuelt i dag', premiumWeight: 0 },
      { label: 'Ja, dette vil vi automatisere', premiumWeight: 0 },
    ],
  },
  {
    id: 'fakturering',
    question: 'Ønsker dere løpende fakturering med automatisk håndtering av avvik?',
    options: [
      { label: 'Nei', premiumWeight: 0 },
      { label: 'Ja', premiumWeight: 0 },
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
    if (sizeAnswer && sizeAnswer.optionIndex >= 3) {
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

    const arealAnswer = byId.get('areal');
    if (arealAnswer?.optionIndex === 1) {
      reasons.push('Arealberegning og Tegning er tilleggsprodukter som gir full kontroll på areal, koblet direkte til kontrakt og tegning, og er inkludert i Premium.');
      relatedChips.push({ label: 'Arealberegning', route: '/losning-arealberegning' }, { label: 'Tegning', route: '/losning-tegning' });
    }

    const kiAnswer = byId.get('ki');
    if (kiAnswer?.optionIndex === 1) {
      relatedChips.push({ label: 'KI hos Fenistra', route: '/ki' });
    }

    const reguleringAnswer = byId.get('regulering');
    if (reguleringAnswer?.optionIndex === 1) {
      reasons.push('Fenistra varsler dere automatisk før KPI-reguleringer, oppsigelsesfrister og opsjoner utløper, og hjelper med reguleringsbrev.');
    }

    const felleskostMvaAnswer = byId.get('felleskost-mva');
    if (felleskostMvaAnswer?.optionIndex === 1) {
      reasons.push('Felleskostnadsavregning og innhenting av MVA-erklæringer er automatisert i Fenistra, fra fordelingsnøkler til ferdig avregning.');
      relatedChips.push({ label: 'Felleskostnader', route: '/losning-felleskostnader' }, { label: 'MVA-erklæring', route: '/losning-mva-erklaring' });
    }

    const faktureringAnswer = byId.get('fakturering');
    if (faktureringAnswer?.optionIndex === 1) {
      reasons.push('Løpende fakturering med automatisk håndtering av avvik er en av kjernefunksjonene i Fenistra, uansett pakke.');
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
