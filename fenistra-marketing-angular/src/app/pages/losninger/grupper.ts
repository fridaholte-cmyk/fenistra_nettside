// «Alt som er bygget inn i Fenistra»: every part of the platform in plain text, ordered by the job it does.
// Shown in the #alt-i-fenistra section of the Løsninger page. Each group links to its solution page.
export interface Del { title: string; text: string; }
export interface Gruppe { id: string; title: string; intro: string; route: string; linkText: string; deler: Del[]; }

export const GRUPPER: Gruppe[] = [
    {
      id: 'kontrakter',
      title: 'Kontrakter og leieforhold',
      intro: 'Hver kontrakt, hver sikkerhet og hver frist samlet, med varsel før noe glipper.',
      route: '/losninger/kontroll-pa-portefoljen',
      linkText: 'Følge opp kontrakter og leietakere',
      deler: [
        { title: 'Kontrakter', text: 'Utleie-, fremleie- og interne kontrakter samlet på tvers av hele porteføljen, fra signering til utløp. Trappetrinnsleie, leierabatter, omsetningsbasert leie og egne faktureringsvilkår settes opp direkte i kontrakten.' },
        { title: 'Sikkerhetsstyring', text: 'Oversikt over bankgaranti og depositum i porteføljen, med varsel når sikkerheten mangler, er for lav eller utløper.' },
        { title: 'Dokument', text: 'Kontrakter, tegninger og annen dokumentasjon samlet og koblet direkte til riktig eiendom og leieforhold.' },
        { title: 'Digital signering', text: 'Kontrakter og dokumenter signeres digitalt, direkte i Fenistra.' },
        { title: 'Protokoller', text: 'Overtakelse og tilbakelevering av lokaler, med protokoller koblet direkte til riktig kontrakt.' },
        { title: 'Tegning og arealberegning', text: 'Arealene kobles til tekniske tegninger og 3D-tegninger, med kobling mot AutoCAD. Dere ser avvik mellom reelle og kommersielle arealer og kan simulere endringer i omriss. Det reduserer risikoen for feil i leiekostnader og kvadratmeterpriser.' },
      ],
    },
    {
      id: 'utleie',
      title: 'Utleie og leietakeroppfølging',
      intro: 'Den kommersielle forvaltningen i samme system som økonomien, fra første henvendelse til signert kontrakt og innflytting.',
      route: '/losninger/fra-lead-til-innflytting',
      linkText: 'Fra ledig lokale til signert kontrakt',
      deler: [
        { title: 'CRM og leads', text: 'CRM bygget inn og koblet til kontraktene, med oppfølging av leads, behov og leietakere.' },
        { title: 'Leietakeroppfølging', text: 'Oversikt over hver leietaker og hele leieforholdet, med varsel når noe krever oppmerksomhet.' },
        { title: 'Kontraktsutkast', text: 'Kontraktsutkast fra maler, med vilkårene fra forhandlingen, klare for signering.' },
        { title: 'Leie mot marked', text: 'Markedsdata fra Arealstatistikk integrert, så leien vurderes mot markedet for riktig sone og leietype.' },
      ],
    },
    {
      id: 'fakturering',
      title: 'Fakturering og avregning',
      intro: 'Registrer én gang, og la systemet regulere, fakturere og avregne gjennom hele leieforholdet.',
      route: '/losninger/fakturering-og-avregning',
      linkText: 'Fra kontrakt til regnskap',
      deler: [
        { title: 'Fakturering', text: 'Faktureringen skjer i Fenistra: fakturaene lages og sendes fra systemet, og bokføringen overføres til regnskapet. Fast, akonto og omsetningsbasert husleie i én løsning, med gjentakende fakturering gjennom hele leieforholdet. KPI-regulering med integrasjon mot SSB og automatiske reguleringsbrev.' },
        { title: 'Felleskostnader', text: 'Felleskostnadsavregning etter kontrakten og fordelingsnøkkelen, med oversikt over kostnader, fordeling og MVA-behandling. Enkeltleietakere kan få faste beløp, og resten fordeles på de øvrige.' },
        { title: 'Omsetningsavregning', text: 'Avregning av omsetningsbasert leie, basert på revisorbekreftet omsetning, beregnet og fakturert uten manuelle mellomregninger.' },
        { title: 'Revisorbekreftet omsetning', text: 'Innhenting og administrasjon av leietakernes årlige, revisorbekreftede omsetningstall.' },
      ],
    },
    {
      id: 'mva',
      title: 'MVA og regelverk',
      intro: 'MVA-erklæringer, justeringsforpliktelser og dokumentasjonen revisor spør etter.',
      route: '/losninger/mva-og-regelverk',
      linkText: 'MVA og regelverk',
      deler: [
        { title: 'MVA-erklæring', text: 'Automatisk innhenting av nødvendig informasjon ved utleie til MVA-registrerte leietakere.' },
        { title: 'Justering', text: 'MVA og justeringsforpliktelser for utleiere av fast eiendom, fulgt opp gjennom hele perioden i tråd med regelverket.' },
      ],
    },
    {
      id: 'rapport',
      title: 'Rapport og analyse',
      intro: 'Nøkkeltall, budsjett og verdier rett fra kildedataene, klare for ledelse og styre.',
      route: '/losninger/rapport-og-analyse',
      linkText: 'Se mulighetene i porteføljen',
      deler: [
        { title: 'Rapportering', text: 'Standardrapporter og interaktive visualiseringer av porteføljens data og nøkkeltall, bygget på de samme dataene som kontrakt, fakturering og regnskap.' },
        { title: 'Inntektsbudsjett', text: 'Inntektsbudsjett bygget direkte fra de faktiske leieforholdene i porteføljen, ikke fra separate regneark.' },
        { title: 'Formuesverdsettelse', text: 'Beregning og dokumentasjon av formuesverdi for næringseiendom, basert på faktisk fakturert leieinntekt og ledighet, i en rapport regnskapsfører og revisor kan kontrollere.' },
      ],
    },
    {
      id: 'kjopesenter',
      title: 'Kjøpesenter',
      intro: 'Ett system for hele senteret, der eiendomsselskapet, butikkene og senterleder jobber ut fra de samme tallene.',
      route: '/losninger/kjopesenter',
      linkText: 'Fenistra Kjøpesenter',
      deler: [
        { title: 'Senterdashbord', text: 'Ukens besøks- og omsetningstall, utvikling mot fjoråret, omsetning per bransje og aktiviteter i én oversikt.' },
        { title: 'Ukesrapport', text: 'Omsetning og besøk mot fjoråret, gruppert per bransje, etasje eller tilhørighet, helt ned på hver enkelt butikk.' },
        { title: 'Omsetningsrapportering', text: 'Automatisk purring når butikkene mangler omsetningsrapportering.' },
        { title: 'Rapporter', text: 'Bransjetilpassede rapporter, inkludert Kvarud Analyse, i PDF og Excel.' },
        { title: 'Besøk og aktiviteter', text: 'Besøksregistrering, salgsaktiviteter og værdata samlet med omsetningen. Løsningen er tilgjengelig uansett hvor senterleder befinner seg.' },
      ],
    },
  ];
