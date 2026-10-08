// Innhold for landingssidene per «jobb» under Løsninger. Malen ligger i jobbside.component.
// Ikonene er Font Awesome Classic Light, innebygd som SVG (samme som resten av nettstedet).

export interface JobbModul { route: string; title: string; desc: string; icon: string; }
export interface Jobbside {
  slug: string;
  name: string;
  h1: string;
  h1Strong: string;
  lead: string;
  outcomes: [string, string][];
  whyTitle: string;
  why: string;
  image: { src: string; w: number; h: number; alt: string } | null;
  modules: JobbModul[];
  /** optional highlighted process, shown between outcomes and the dark "why" section */
  spotlight?: { id: string; eyebrow: string; title: string; strong: string; intro: string; steps: [string, string][] };
}

export const JOBBSIDER: Jobbside[] = [
  {
    "slug": "kontroll-pa-portefoljen",
    "name": "Kontroll på porteføljen",
    "h1": "Hvert leieforhold under kontroll, før noe glipper",
    "h1Strong": "Før noe glipper.",
    "lead": "Kontrakter, sikkerheter, frister og dokumenter samlet i ett system. Fenistra varsler før utløp, regulering og manglende sikkerhet, så dere ser risikoen mens det fortsatt er tid til å handle.",
    "outcomes": [
      [
        "Ingen frister som glipper",
        "Varsel før kontraktsutløp, oppsigelsesfrister og opsjoner, og automatiske reguleringsbrev basert på KPI eller markedsleie."
      ],
      [
        "Sikkerheten på plass",
        "Full oversikt over bankgarantier og depositum, med varsel når sikkerheten mangler, er for lav eller nærmer seg utløp."
      ],
      [
        "Alt på ett sted",
        "Utleie-, fremleie- og interne kontrakter, dokumenter og signering samlet på tvers av hele porteføljen."
      ]
    ],
    "whyTitle": "Risiko dere ser i tide, er risiko dere kan styre",
    "why": "For økonomisjefen betyr det færre overraskelser. Utløpte garantier, glemte reguleringer og frister som passerer, fanges opp før de koster penger, og hele porteføljen kan følges opp fra ett sted.",
    "image": {
      "src": "images/kontrakter-oversikt.webp",
      "w": 1200,
      "h": 977,
      "alt": "Kontraktsoversikten i Fenistra: søkbar liste over alle kontrakter med leietaker, selskap, eiendom og startdato, med summerte nøkkeltall øverst."
    },
    "modules": [
      {
        "route": "/losning-kontrakter",
        "title": "Kontrakter",
        "desc": "Full oversikt over hvert leieforhold, fra signering til utløp.",
        "icon": "<svg width=\"22\" height=\"22\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 384 512\" fill=\"currentColor\"><path d=\"M192 32L64 32C46.3 32 32 46.3 32 64l0 384c0 17.7 14.3 32 32 32l256 0c17.7 0 32-14.3 32-32l0-256-96 0c-35.3 0-64-28.7-64-64l0-96zM338.7 160L224 45.3 224 128c0 17.7 14.3 32 32 32l82.7 0zM0 64C0 28.7 28.7 0 64 0L197.5 0c17 0 33.3 6.7 45.3 18.7L365.3 141.3c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM127.6 314.9c5.5-6.9 13.9-10.9 22.7-10.9 12.8 0 24.2 8.4 27.8 20.7L195.9 384 304 384c8.8 0 16 7.2 16 16s-7.2 16-16 16l-120 0c-7.1 0-13.3-4.6-15.3-11.4L149.1 339.3 92.5 410c-5.5 6.9-15.6 8-22.5 2.5s-8-15.6-2.5-22.5l60.1-75.1zM80 96l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z\"/></svg>"
      },
      {
        "route": "/losning-sikkerhetsstyring",
        "title": "Sikkerhetsstyring",
        "desc": "Bankgaranti og depositum, med varsel når det mangler eller utløper.",
        "icon": "<svg width=\"22\" height=\"22\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 512 512\" fill=\"currentColor\"><path d=\"M231.1 7.9c16-6.8 34-6.8 50 0L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.7 363.2-16.7 8-36.1 8-52.7 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L231.1 7.9zm37.5 29.4c-8-3.4-17-3.4-25 0l-176.7 75c-11.3 4.8-18.8 15.5-18.8 27.6 .5 94 39.3 259.8 195.4 334.5 7.9 3.8 17.2 3.8 25.1 0 156.1-74.7 195-240.4 195.5-334.5 .1-12.1-7.5-22.8-18.8-27.6l-176.7-75zm54.5 132.9c5.2-7.1 15.2-8.7 22.3-3.5s8.7 15.2 3.5 22.3L243.4 334.2c-2.8 3.8-7.1 6.2-11.8 6.5s-9.3-1.4-12.6-4.8l-54.4-56.3c-6.1-6.4-6-16.5 .4-22.6s16.5-5.9 22.6 .4l41.2 42.6 94.4-129.8z\"/></svg>"
      },
      {
        "route": "/losning-dokument",
        "title": "Dokument",
        "desc": "All dokumentasjon der resten av forvaltningen skjer.",
        "icon": "<svg width=\"22\" height=\"22\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 576 512\" fill=\"currentColor\"><path d=\"M97.5 416c-10.8 0-18.5-10.5-15.3-20.8l50-160c2.1-6.7 8.3-11.2 15.3-11.2L527 224c10.8 0 18.5 10.5 15.3 20.8l-50 160C490.1 411.5 484 416 477 416L97.5 416zm126.7 32L477 448c21 0 39.6-13.6 45.8-33.7l50-160c9.7-30.9-13.4-62.3-45.8-62.3l-379.4 0c-21 0-39.6 13.6-45.8 33.7L64.2 345.6 64.2 96c0-17.7 14.3-32 32-32l138.7 0c6.9 0 13.7 2.2 19.2 6.4l38.4 28.8c11.1 8.3 24.6 12.8 38.4 12.8l117.3 0c17.7 0 32 14.3 32 32l32 0c0-35.3-28.7-64-64-64L330.9 80c-6.9 0-13.7-2.2-19.2-6.4L273.3 44.8C262.2 36.5 248.8 32 234.9 32L96.2 32c-35.3 0-64 28.7-64 64l0 288c0 35.3 28.7 64 64 64l128 0z\"/></svg>"
      },
      {
        "route": "/losning-digital-signering",
        "title": "Digital signering",
        "desc": "Signer kontrakter og dokumenter digitalt, direkte i Fenistra.",
        "icon": "<svg width=\"22\" height=\"22\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 640 512\" fill=\"currentColor\"><path d=\"M160 128c0-35.3 28.7-64 64-64s64 28.7 64 64l0 8.2c0 24.4-2 48.8-5.9 72.8L155 243.7c-34.8 9.5-59 41.1-59 77.2l0 63.1-80 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l80 0c1.3 35.6 30.5 64 66.4 64 24 0 46.2-13 57.9-33.9l31.1-55.4c18.1-32.2 32.8-66.1 43.8-101.4l2.5-8.1c4.8-15.4 8.8-31 12.1-46.7l123.7-33.7-48 96c-2.5 5-2.2 10.9 .7 15.6s8.1 7.6 13.6 7.6l160 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-134.1 0 52.4-104.8c2.8-5.6 2.1-12.4-1.9-17.3s-10.5-7-16.6-5.3l-144 39.3c2.8-21.1 4.2-42.3 4.2-63.6l0-8.2c0-53-43-96-96-96s-96 43-96 96l0 48c0 8.8 7.2 16 16 16s16-7.2 16-16l0-48zm3.4 146.6L275 244.1c-2.3 9.3-4.8 18.5-7.7 27.6l-2.5 8.1c-10.3 33.1-24.1 65-41.1 95.2l-31.1 55.4c-6.1 10.9-17.6 17.6-30.1 17.6-19 0-34.5-15.4-34.5-34.5l0-92.6c0-21.6 14.5-40.6 35.4-46.3zM295 416l329 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-312.5 0c-5.1 10.8-10.6 21.5-16.5 32z\"/></svg>"
      },
      {
        "route": "/losning-protokoller",
        "title": "Protokoller",
        "desc": "Overtakelse og tilbakelevering av lokaler, dokumentert.",
        "icon": "<svg width=\"22\" height=\"22\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 384 512\" fill=\"currentColor\"><path d=\"M136 80l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L136 32c-13.3 0-24 10.7-24 24s10.7 24 24 24zm0 32c-28.2 0-51.6-20.9-55.4-48L64 64C46.3 64 32 78.3 32 96l0 352c0 17.7 14.3 32 32 32l256 0c17.7 0 32-14.3 32-32l0-352c0-17.7-14.3-32-32-32l-16.6 0c-3.9 27.1-27.2 48-55.4 48l-112 0zM248 0c22.3 0 41.6 13.1 50.6 32L320 32c35.3 0 64 28.7 64 64l0 352c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l21.4 0c9-18.9 28.3-32 50.6-32L248 0zM192 224c-8.8 0-16-7.2-16-16s7.2-16 16-16l96 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-96 0zm0 160l96 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-96 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm-56 16c0 13.3-10.7 24-24 24s-24-10.7-24-24 10.7-24 24-24 24 10.7 24 24zM112 280a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM88 208a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM192 320c-8.8 0-16-7.2-16-16s7.2-16 16-16l96 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-96 0z\"/></svg>"
      }
    ]
  },
  {
    "slug": "fakturering-og-avregning",
    "name": "Fakturering og avregning",
    "h1": "Registrer én gang, og få riktig faktura hver gang",
    "h1Strong": "Riktig faktura hver gang.",
    "lead": "Fenistra regulerer, fakturerer og avregner gjennom hele leieforholdet. Fast leie, akonto, felleskostnader og omsetningsbasert leie i én sammenhengende flyt, overført til regnskapssystemet dere allerede bruker.",
    "outcomes": [
      [
        "Regulering uten regneark",
        "KPI-reguleringen henter indeksen direkte fra SSB, og reguleringsbrevene lages automatisk."
      ],
      [
        "Felleskostnader ned til siste øre",
        "Avregning med automatisk MVA-behandling, fleksible sykluser og full sporbarhet overfor leietakerne."
      ],
      [
        "Omsetningsleie som stemmer",
        "Leie basert på faktisk, revisorbekreftet omsetning, beregnet og fakturert uten manuelle mellomregninger."
      ]
    ],
    "whyTitle": "Hver krone kan spores tilbake til kontrakten",
    "why": "Når systemet beregner leie, regulering og avregning, blir faktureringen forutsigbar for dere og leietakerne, og enkel å forklare for revisor. Fakturaene overføres til regnskapet, så tallene stemmer begge steder.",
    "image": {
      "src": "images/felleskost-skjevfordeling.webp",
      "w": 1200,
      "h": 977,
      "alt": "Skjevfordeling i Fenistra Felleskost: tabell der kostnadskontoer ligger som kolonner og leietakere som rader, med faste beløp per celle."
    },
    "spotlight": {
      "id": "kpi-regulering",
      "eyebrow": "KPI-regulering",
      "title": "Fra SSB-indeks til riktig faktura, uten regneark",
      "strong": "Uten regneark.",
      "intro": "Indeksregulering er der små feil blir store over tid. I Fenistra reguleres leien automatisk, og leietakeren får reguleringsbrevet sammen med fakturaen.",
      "steps": [
        ["SSB publiserer indeksen", "Fenistra henter KPI direkte fra SSB, så ingen trenger å slå opp eller taste inn tall."],
        ["Leien reguleres per kontrakt", "Hver kontrakt reguleres slik den er avtalt, etter KPI eller markedsleie."],
        ["Reguleringsbrevet lages", "Brevet til leietakeren opprettes automatisk, så ingen trenger å skrive det selv."],
        ["Sendes med fakturaen", "Reguleringsbrevet følger automatisk med som vedlegg når fakturaen sendes."]
      ]
    },
    "modules": [
      {
        "route": "/losning-fakturering",
        "title": "Fakturering",
        "desc": "Registrer én gang, fakturer gjennom hele leieforholdet.",
        "icon": "<svg width=\"22\" height=\"22\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 384 512\" fill=\"currentColor\"><path d=\"M192 32L64 32C46.3 32 32 46.3 32 64l0 384c0 17.7 14.3 32 32 32l256 0c17.7 0 32-14.3 32-32l0-256-96 0c-35.3 0-64-28.7-64-64l0-96zM338.7 160L224 45.3 224 128c0 17.7 14.3 32 32 32l82.7 0zM0 64C0 28.7 28.7 0 64 0L197.5 0c17 0 33.3 6.7 45.3 18.7L365.3 141.3c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM96 296l0 80c0 4.4 3.6 8 8 8l176 0c4.4 0 8-3.6 8-8l0-80c0-4.4-3.6-8-8-8l-176 0c-4.4 0-8 3.6-8 8zm-32 0c0-22.1 17.9-40 40-40l176 0c22.1 0 40 17.9 40 40l0 80c0 22.1-17.9 40-40 40l-176 0c-22.1 0-40-17.9-40-40l0-80zM80 96l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z\"/></svg>"
      },
      {
        "route": "/losning-felleskostnader",
        "title": "Felleskostnader",
        "desc": "Avregning uten hodebry, ned til siste øre.",
        "icon": "<svg width=\"22\" height=\"22\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 576 512\" fill=\"currentColor\"><path d=\"M510 208C496.2 118.8 425.6 48.2 336.4 34.4l0 173.6 173.6 0zM224.4 69.6c-91.7 21.7-160 104.1-160 202.4 0 114.9 93.1 208 208 208 34.4 0 66.7-8.3 95.2-23L237.3 299.7c-8.3-10-12.9-22.7-12.9-35.7l0-194.4zM538.9 320l-139.3 0 82.9 100.1c27.4-27 47.3-61.5 56.4-100.1zm3.5-111.9c2.3 17.5-12.2 31.9-29.9 31.9l-176 0c-17.7 0-32-14.3-32-32l0-176c0-17.7 14.4-32.2 31.9-29.9 107 14.2 191.8 99 206 206zM256.4 66.7l0 197.3c0 5.6 2 11 5.5 15.3L394 438.7c11.7 14.1 9.2 35.4-6.9 44.1-34.1 18.6-73.2 29.2-114.7 29.2-132.5 0-240-107.5-240-240 0-115.5 81.5-211.9 190.2-234.8 18.1-3.8 33.8 11 33.8 29.5zM571.2 321.8c-10.2 48.4-35 91.4-69.6 124.2-12.3 11.7-31.6 9.2-42.4-3.9L374.9 340.4c-17.3-20.9-2.4-52.4 24.6-52.4l142.2 0c18.5 0 33.3 15.7 29.5 33.8z\"/></svg>"
      },
      {
        "route": "/losning-omsetningsavregning",
        "title": "Omsetningsavregning",
        "desc": "Riktig leie, basert på faktisk omsetning.",
        "icon": "<svg width=\"22\" height=\"22\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 384 512\" fill=\"currentColor\"><path d=\"M135.2 1.7c-4.8-2.4-10.4-2.2-15.1 .4L72 29.6 23.9 2.1C19-.7 12.9-.7 8 2.2S0 10.3 0 16L0 496c0 5.7 3 11 8 13.8s11 2.9 16 .1l48.1-27.5 48.1 27.5c4.6 2.7 10.3 2.8 15.1 .4l56.8-28.4 56.8 28.4c4.8 2.4 10.4 2.2 15.1-.4l48.1-27.5 48.1 27.5c5 2.8 11 2.8 16-.1s8-8.1 8-13.8l0-480c0-5.7-3-11-8-13.8s-11-2.9-16-.1L312 29.6 263.9 2.1c-4.6-2.7-10.3-2.8-15.1-.4L192 30.1 135.2 1.7zM79.9 61.9l48.6-27.8 56.3 28.2c4.5 2.3 9.8 2.3 14.3 0l56.3-28.2 48.6 27.8c4.9 2.8 11 2.8 15.9 0l32.1-18.3 0 424.9-32.1-18.3c-4.9-2.8-11-2.8-15.9 0l-48.6 27.8-56.3-28.2c-4.5-2.3-9.8-2.3-14.3 0l-56.3 28.2-48.6-27.8c-4.9-2.8-11-2.8-15.9 0L32 468.4 32 43.6 64.1 61.9c4.9 2.8 11 2.8 15.9 0zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16l192 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L96 144zM80 352c0 8.8 7.2 16 16 16l192 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L96 336c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16l192 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L96 240z\"/></svg>"
      },
      {
        "route": "/losning-rbo",
        "title": "Revisorbekreftet omsetning",
        "desc": "Leietakernes reviderte omsetningstall, samlet og administrert.",
        "icon": "<svg width=\"22\" height=\"22\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 512 512\" fill=\"currentColor\"><path d=\"M32 48c0-8.8-7.2-16-16-16S0 39.2 0 48L0 400c0 44.2 35.8 80 80 80l416 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L80 448c-26.5 0-48-21.5-48-48L32 48zm288 96c0 8.8 7.2 16 16 16l89.4 0-105.4 105.4-84.7-84.7c-6.2-6.2-16.4-6.2-22.6 0l-112 112c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L224 214.6 308.7 299.3c6.2 6.2 16.4 6.2 22.6 0L448 182.6 448 272c0 8.8 7.2 16 16 16s16-7.2 16-16l0-128c0-8.8-7.2-16-16-16l-128 0c-8.8 0-16 7.2-16 16z\"/></svg>"
      }
    ]
  },
  {
    "slug": "mva-og-regelverk",
    "name": "MVA og regelverk",
    "h1": "MVA i tråd med regelverket, dokumentert for revisor",
    "h1Strong": "Dokumentert for revisor.",
    "lead": "MVA-erklæringer fra leietakerne, justeringsforpliktelser over hele perioden og dokumentasjonen som følger med, håndtert av systemet i stedet for i regneark.",
    "outcomes": [
      [
        "Erklæringene kommer inn",
        "Automatisert innhenting av MVA-erklæringer fra MVA-registrerte leietakere."
      ],
      [
        "Justering fulgt opp i hele perioden",
        "Justeringsforpliktelser for utleiere av fast eiendom håndteres i samsvar med lover, forskrifter og uttalelser."
      ],
      [
        "Riktig MVA i avregningen",
        "MVA-behandlingen i felleskostnadsavregningen skjer automatisk, for hver leietaker."
      ]
    ],
    "whyTitle": "Feil som oppdages sent, er de dyreste",
    "why": "MVA og justering er der feil kan koste lenge etter at de ble gjort. Når systemet følger opp hele perioden og dokumenterer underveis, står dere trygt når regnskapsfører, revisor eller Skatteetaten spør.",
    "image": null,
    "modules": [
      {
        "route": "/losning-mva-erklaring",
        "title": "MVA-erklæring",
        "desc": "Automatisert innhenting fra MVA-registrerte leietakere.",
        "icon": "<svg width=\"22\" height=\"22\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 384 512\" fill=\"currentColor\"><path d=\"M197.5 0c17 0 33.2 6.8 45.2 18.8L365.3 141.2c12 12 18.7 28.3 18.7 45.2L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L197.5 0zM64 32C46.3 32 32 46.3 32 64l0 384c0 17.7 14.3 32 32 32l256 0c17.7 0 32-14.3 32-32l0-256-96 0c-35.3 0-64-28.7-64-64l0-96-128 0zM259.1 250.2c5.2-7.1 15.2-8.7 22.3-3.5s8.7 15.2 3.5 22.3L179.3 414.2c-2.8 3.8-7.1 6.2-11.8 6.5s-9.3-1.4-12.6-4.8l-54.4-56.3c-6.1-6.4-6-16.5 .4-22.6s16.5-5.9 22.6 .4l41.2 42.6 94.4-129.8zM224 128c0 17.7 14.3 32 32 32l82.7 0-114.7-114.8 0 82.8z\"/></svg>"
      },
      {
        "route": "/losning-justering",
        "title": "Justering",
        "desc": "MVA og justeringsforpliktelser i tråd med regelverket.",
        "icon": "<svg width=\"22\" height=\"22\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 512 512\" fill=\"currentColor\"><path d=\"M0 416c0-8.8 7.2-16 16-16l65.6 0c7.4-36.5 39.7-64 78.4-64s71 27.5 78.4 64L496 400c8.8 0 16 7.2 16 16s-7.2 16-16 16l-257.6 0c-7.4 36.5-39.7 64-78.4 64s-71-27.5-78.4-64L16 432c-8.8 0-16-7.2-16-16zm208 0a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM400 256a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm-48-80c38.7 0 71 27.5 78.4 64l65.6 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-65.6 0c-7.4 36.5-39.7 64-78.4 64s-71-27.5-78.4-64L16 272c-8.8 0-16-7.2-16-16s7.2-16 16-16l257.6 0c7.4-36.5 39.7-64 78.4-64zM192 48a48 48 0 1 0 0 96 48 48 0 1 0 0-96zm78.4 32L496 80c8.8 0 16 7.2 16 16s-7.2 16-16 16l-225.6 0c-7.4 36.5-39.7 64-78.4 64s-71-27.5-78.4-64L16 112c-8.8 0-16-7.2-16-16S7.2 80 16 80l97.6 0C121 43.5 153.3 16 192 16s71 27.5 78.4 64z\"/></svg>"
      },
      {
        "route": "/losning-felleskostnader",
        "title": "Felleskostnader",
        "desc": "Avregning med automatisk MVA-behandling, ned til siste øre.",
        "icon": "<svg width=\"22\" height=\"22\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 576 512\" fill=\"currentColor\"><path d=\"M510 208C496.2 118.8 425.6 48.2 336.4 34.4l0 173.6 173.6 0zM224.4 69.6c-91.7 21.7-160 104.1-160 202.4 0 114.9 93.1 208 208 208 34.4 0 66.7-8.3 95.2-23L237.3 299.7c-8.3-10-12.9-22.7-12.9-35.7l0-194.4zM538.9 320l-139.3 0 82.9 100.1c27.4-27 47.3-61.5 56.4-100.1zm3.5-111.9c2.3 17.5-12.2 31.9-29.9 31.9l-176 0c-17.7 0-32-14.3-32-32l0-176c0-17.7 14.4-32.2 31.9-29.9 107 14.2 191.8 99 206 206zM256.4 66.7l0 197.3c0 5.6 2 11 5.5 15.3L394 438.7c11.7 14.1 9.2 35.4-6.9 44.1-34.1 18.6-73.2 29.2-114.7 29.2-132.5 0-240-107.5-240-240 0-115.5 81.5-211.9 190.2-234.8 18.1-3.8 33.8 11 33.8 29.5zM571.2 321.8c-10.2 48.4-35 91.4-69.6 124.2-12.3 11.7-31.6 9.2-42.4-3.9L374.9 340.4c-17.3-20.9-2.4-52.4 24.6-52.4l142.2 0c18.5 0 33.3 15.7 29.5 33.8z\"/></svg>"
      }
    ]
  },
  {
    "slug": "rapport-og-analyse",
    "name": "Rapport og analyse",
    "h1": "Beslutninger på ferske tall, rett fra kildedataene",
    "h1Strong": "Rett fra kildedataene.",
    "lead": "Nøkkeltall, budsjett og verdier hentet direkte fra kontrakter, arealer og økonomi i Fenistra. Alltid oppdatert, og klare for ledelse, styre og revisor.",
    "outcomes": [
      [
        "Alltid oppdaterte nøkkeltall",
        "Ingen manuell sammenstilling. Rapportene bygger på de samme dataene som faktureringen, med eksport til Excel."
      ],
      [
        "Budsjett fra faktiske leieforhold",
        "Inntektsbudsjettet tar utgangspunkt i kontraktene dere faktisk har, ikke i et regneark ved siden av."
      ],
      [
        "Verdier dere kan dokumentere",
        "Formuesverdsettelse basert på faktisk leieinntekt og ledighet, i en rapport regnskapsfører og revisor kan kontrollere."
      ]
    ],
    "whyTitle": "Samme tall i ledermøtet som i regnskapet",
    "why": "Når rapportene bygger på de samme dataene som faktureringen og regnskapet, slipper dere å avstemme versjoner av sannheten. Ledelsen og styret får tall de kan stå inne for.",
    "image": {
      "src": "images/rapportering-leietakerliste.webp",
      "w": 1200,
      "h": 977,
      "alt": "Rapportmodulen i Fenistra: leietakerliste med filtre for selskap, portefølje og eiendom, søylediagram over månedlig leieomsetning og en detaljert tabell med areal, arealleie, felleskost og årsbeløp per eiendom."
    },
    "modules": [
      {
        "route": "/losning-rapportering",
        "title": "Rapportering",
        "desc": "Nøkkeltallene deres, alltid oppdatert.",
        "icon": "<svg width=\"22\" height=\"22\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 512 512\" fill=\"currentColor\"><path d=\"M16 32c8.8 0 16 7.2 16 16l0 352c0 26.5 21.5 48 48 48l416 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L80 480c-44.2 0-80-35.8-80-80L0 48c0-8.8 7.2-16 16-16zM144 256c8.8 0 16 7.2 16 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16zM256 144l0 224c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-224c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 48c8.8 0 16 7.2 16 16l0 160c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-160c0-8.8 7.2-16 16-16zM448 80l0 288c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-288c0-8.8 7.2-16 16-16s16 7.2 16 16z\"/></svg>"
      },
      {
        "route": "/losning-inntektsbudsjett",
        "title": "Inntektsbudsjett",
        "desc": "Budsjettering med utgangspunkt i faktiske leieforhold.",
        "icon": "<svg width=\"22\" height=\"22\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 576 512\" fill=\"currentColor\"><path d=\"M288 0a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm0 160a96 96 0 1 0 0-192 96 96 0 1 0 0 192zm134.2-43.7c-4.4 11.4-10.3 22-17.3 31.7 2.5 1.3 4.9 2.6 7.3 4 6 3.5 13.6 2.6 18.7-2 14.9-13.5 34.7-21.7 56.4-21.7l12.9 0-19.7 78.7c-1 4.1-.4 8.5 1.8 12.1 5.1 8.5 9.3 17.3 12.7 26.4 2.3 6.3 8.3 10.5 15 10.5l25 0c5 0 9 4 9 9l0 110c0 5-4 9-9 9l-58.8 0c-4.2 0-8.2 1.6-11.2 4.6-11.3 11.1-24.9 20.9-40.5 29.1-5.2 2.8-8.5 8.2-8.5 14.1l0 30.8c0 9.6-7.8 17.4-17.4 17.4l-31.5 0c-7.2 0-13.7-4.5-16.3-11.3L347 458.4c-2.3-6.2-8.3-10.4-15-10.4l-88 0c-6.7 0-12.6 4.1-15 10.4l-3.9 10.4c-2.5 6.8-9 11.3-16.3 11.3l-31.5 0c-9.6 0-17.4-7.8-17.4-17.4l0-30.8c0-5.9-3.3-11.4-8.5-14.1-49.5-26.2-79.5-67.8-79.5-121.7 0-60.8 38.8-116.2 99-148-6.2-8.6-11.4-17.9-15.6-27.8-68.7 36.4-115.4 100.5-115.4 175.8 0 64.7 35 114.2 88 145.3l0 21.4c0 27.3 22.1 49.4 49.4 49.4l31.5 0c20.6 0 39-12.8 46.2-32l65.8 0c7.2 19.2 25.6 32 46.2 32l31.5 0c27.3 0 49.4-22.1 49.4-49.4l0-21.4c12.6-7.4 24.2-15.8 34.6-25.3l52.4 0c22.7 0 41-18.4 41-41l0-110c0-22.7-18.4-41-41-41l-14.2 0c-2.3-5.3-4.9-10.4-7.6-15.5l20.6-82.4c3.8-15.1-7.7-29.8-23.3-29.8l-23.1 0c-24.1 0-46.5 7.4-65.1 20zM448 296a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM208 192c-8.8 0-16 7.2-16 16s7.2 16 16 16l160 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-160 0z\"/></svg>"
      },
      {
        "route": "/losning-formuesverdsettelse",
        "title": "Formuesverdsettelse",
        "desc": "Formuesverdi basert på faktisk leieinntekt og ledighet.",
        "icon": "<svg width=\"22\" height=\"22\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 640 512\" fill=\"currentColor\"><path d=\"M384 64c0 29.8-20.4 54.9-48 62l0 354 192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-416 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l192 0 0-354c-27.6-7.1-48-32.2-48-62L112 64c-8.8 0-16-7.2-16-16s7.2-16 16-16l152.6 0C275.6 12.9 296.3 0 320 0s44.4 12.9 55.4 32L512 32c8.8 0 16 7.2 16 16s-7.2 16-16 16L384 64zm56.7 298.3C457.8 375.1 482.9 384 512 384s54.2-8.9 71.3-21.7C600.4 349.5 608 334.2 608 320l-192 0c0 14.2 7.6 29.5 24.7 42.3zm71.3-215L426.3 288 597.7 288 512 147.3zM384 320l0-1.6c0-14.7 4-29.1 11.7-41.6l92-151.2c5.2-8.5 14.4-13.7 24.3-13.7s19.2 5.2 24.3 13.7l92 151.2c7.6 12.5 11.7 26.9 11.7 41.6l0 1.6c0 53-57.3 96-128 96s-128-43-128-96zM32 320c0 14.2 7.6 29.5 24.7 42.3 17.1 12.8 42.2 21.7 71.3 21.7s54.2-8.9 71.3-21.7C216.4 349.5 224 334.2 224 320L32 320zm10.3-32L213.7 288 128 147.3 42.3 288zM128 416C57.3 416 0 373 0 320l0-1.6c0-14.7 4-29.1 11.7-41.6l92-151.2c5.2-8.5 14.4-13.7 24.3-13.7s19.2 5.2 24.3 13.7l92 151.2c7.6 12.5 11.7 26.9 11.7 41.6l0 1.6c0 53-57.3 96-128 96zM320 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z\"/></svg>"
      },
      {
        "route": "/losning-arealberegning",
        "title": "Arealberegning",
        "desc": "Nøyaktige arealer, koblet direkte til tegning og kontrakt.",
        "icon": "<svg width=\"22\" height=\"22\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 448 512\" fill=\"currentColor\"><path d=\"M48 64l96 0c8.8 0 16 7.2 16 16l0 48-48 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 0 48-48 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 0 48-48 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 0 48c0 8.8 7.2 16 16 16s16-7.2 16-16l0-48 48 0 0 48c0 8.8 7.2 16 16 16s16-7.2 16-16l0-48 48 0 0 48c0 8.8 7.2 16 16 16s16-7.2 16-16l0-48 48 0c8.8 0 16 7.2 16 16l0 96c0 8.8-7.2 16-16 16L48 448c-8.8 0-16-7.2-16-16L32 80c0-8.8 7.2-16 16-16zm144 80l0-64c0-26.5-21.5-48-48-48L48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l352 0c26.5 0 48-21.5 48-48l0-96c0-26.5-21.5-48-48-48l-208 0 0-144z\"/></svg>"
      }
    ]
  }
];
