// Kunnskapsbase for chat-assistenten. Nøkkelord matches mot brukerens spørsmål.
// Dekker: sporsmal.html (FAQ), alle løsningssider, integrasjonssider, priser, kundehistorier,
// nøkkeltall, team/kontaktinfo, datasikkerhet, blogg- og media-artikler, samt personvern/cookies/åpenhetsloven.
// Hver post lenker videre til kildesiden for mer informasjon.
const FENISTRA_CHAT_KB = [
  {
    keywords: ["passer fenistra", "passer det for", "passer fenistra for", "er fenistra noe for", "fenistra for meg", "fenistra for oss", "passer dette for", "egner fenistra seg", "kan fenistra brukes av", "passer for min bedrift", "passer for oss"],
    answer: "Ja, sannsynligvis! Fenistra passer for de fleste eiendomsforvaltere og eiendomsselskaper i Norge, uansett størrelse på porteføljen. Ta testen, så viser vi hvilke løsninger og hvilken pakke som passer akkurat for dere, på under to minutter. <a href=\"pakke-resultat.html\">Ta testen →</a>"
  },
  {
    keywords: ["datasikkerhet", "sikker data", "dataene trygge", "sikrer dere dataene", "sikkerhet program", "visma security program", "kryptering", "hosting", "trust centre", "informasjonssikkerhet", "trygge data", "sikre data", "lagrer dere dataene", "hvor lagres dataene", "databeskyttelse", "cybersikkerhet", "dataene", "trygge"],
    answer: "Fenistra er en del av Visma-konsernet, og dataene deres beskyttes gjennom Visma Security Program - de samme sikkerhetsstandardene som gjelder på tvers av hele Visma. For full teknisk og compliance-dokumentasjon, se Visma Trust Centre. <a href=\"datasikkerhet.html\">Les mer om Datasikkerhet →</a>"
  },
  {
    keywords: ["forvaltningssystem"],
    answer: "Et forvaltningssystem er et samlet sett med verktøy og arbeidsprosesser som hjelper eiendomsbesittere, gårdeiere og forvaltere med å organisere drift, vedlikehold, økonomi og administrasjon av eiendommer, alt fra leietakeradministrasjon til regnskap og rapportering, på ett sted. Fenistra er ikke bare et kontraktshåndteringssystem, men også et faktureringssystem — en komplett løsning for økonomisk forvaltning av næringseiendom, fra kontrakt og budsjettering til fakturering, felleskostnadsavregning, mva-håndtering og rapportering i én sammenhengende flyt. <a href=\"om-oss.html\">Les mer om Om oss →</a>"
  },
  {
    keywords: ["standard"],
    answer: "Fenistra Standard passer for små og mellomstore eiendomsselskaper, og dekker hele arbeidsflyten fra kontrakt til rapportering: Kontrakt, Fakturering, Regnskap, Rapportering, Dokument, Felleskostnader, Omsetningsavregning, Formuesverdsettelse og Inntektsbudsjett, i tillegg til transaksjonsproduktene MVA-erklæring, RBO, Protokoller og Digital signering. <a href=\"priser.html\">Les mer om Priser →</a>"
  },
  {
    keywords: ["premium"],
    answer: "Alt fra Standard-pakken, i tillegg til alle tilleggsprodukter og egen dedikert kunderådgiver. Se pris og løsning. <a href=\"priser.html\">Les mer om Priser →</a>"
  },
  {
    keywords: ["kjøpesenter"],
    answer: "Fenistra Kjøpesenter er senterleders verktøy, og gir full oversikt over status på senteret og oppgavene som hører til rollen. Fokuset ligger på butikk, aktiviteter og løpende omsetningsrapportering. Les mer her. <a href=\"losning-kjopesenter.html\">Les mer om Fenistra Kjøpesenter →</a>"
  },
  {
    keywords: ["regnskapssystem", "integreres"],
    answer: "Sannsynligvis ja. Fenistra er i dag integrert mot rundt 20 ulike regnskapssystemer i produksjon hos kunder, blant annet Tripletex, Xledger, PowerOffice GO, Visma Business NXT og Visma.net, i tillegg til en rekke andre ERP-systemer som SAP, Microsoft Dynamics og 24SevenOffice. Se full oversikt over regnskapsintegrasjoner. <a href=\"integrasjon-regnskap-erp.html\">Les mer om Regnskap og ERP-integrasjoner →</a>"
  },
  {
    keywords: ["koster", "kostnad", "abonnement"],
    answer: "Fenistra prises etter porteføljens leieomsetning, ikke antall brukere, alle pakker har ubegrenset antall brukere. Vi har ikke faste priser liggende åpent på siden, siden det varierer med portefølje og behov. Se Standard og Premium på Priser-siden, eller book en demo for et konkret tilbud. <a href=\"priser.html\">Les mer om Priser →</a>"
  },
  {
    keywords: ["forskjellen", "standard", "premium"],
    answer: "Standard passer for små og mellomstore eiendomsselskaper, og inneholder kjerneløsningene i Fenistra samt transaksjonsproduktene. Premium passer for store eiendomsselskaper, og inneholder alt fra Standard i tillegg til alle tilleggsprodukter og en egen dedikert kunderådgiver. <a href=\"priser.html\">Les mer om Priser →</a>"
  },
  {
    keywords: ["eier"],
    answer: "Fenistra er en del av Visma Property Solutions, og har vært det siden januar 2020. Visma Property Solutions er en del av Visma-konsernet. <a href=\"om-oss.html\">Les mer om Om oss →</a>"
  },
  {
    keywords: ["eksistert", "lenge"],
    answer: "Fenistra har røtter tilbake til 1994. Selskapet ble formelt stiftet som BRA Consult AS i februar 1995, endret navn til BRA Informasjonssystemer AS i 1996, og fikk navnet Fenistra AS i oktober 2003. <a href=\"om-oss.html\">Les mer om Om oss →</a>"
  },
  {
    keywords: ["kunder"],
    answer: "Fenistra brukes i dag av over 180 eiendomsforvaltere i Norge, blant andre Höegh Eiendom, Frydenbø Eiendom, Aspelin Ramm og Backer AS. Se kundehistoriene våre. <a href=\"kunder.html\">Les mer om Kundehistorier →</a>"
  },
  {
    keywords: ["felleskostnadsavregning", "hjelper"],
    answer: "Felleskostnadsavregning er fordelingen av driftskostnader (som strøm i fellesareal, vaktmestertjenester og renhold) mellom leietakerne i en eiendom, avregnet mot akontobeløp gjennom året. Fenistra Felleskostnader automatiserer MVA-behandling, beregning og avregning, og kobler fordelingsnøkler direkte til kontraktsdataene. Les mer i bloggartikkelen om felleskostnadsavregning. <a href=\"losning-felleskostnader.html\">Les mer om Fenistra Felleskostnader →</a>"
  },
  {
    keywords: ["omsetningsbasert", "omsetningsleie", "leie"],
    answer: "Omsetningsbasert leie er en leiemodell der deler av leien er knyttet til leietakers faktiske omsetning, vanlig i kjøpesentre og handelseiendom. Fenistra henter inn og avregner omsetningstall automatisk, med automatisk purring på manglende rapportering. Les mer om omsetningsleie i kjøpesenter. <a href=\"losning-omsetningsavregning.html\">Les mer om Fenistra Omsetningsavregning →</a>"
  },
  {
    keywords: ["revisorbekreftet", "omsetning", "rbo"],
    answer: "RBO er innhenting og administrasjon av leietakers årlige, revisorbekreftede omsetningsdata, informasjon utleier trenger for å avregne omsetningsbasert leie korrekt. RBO er et transaksjonsprodukt inkludert i Fenistra Standard. <a href=\"losning-rbo.html\">Les mer om Fenistra RBO →</a>"
  },
  {
    keywords: ["formuesverdsettelse", "trenger"],
    answer: "Formuesverdsettelse er beregning og dokumentasjon av formuesverdi for næringseiendom, som underlag til skattemeldingen (RF-1098). Fenistra Formuesverdsettelse beregner og dokumenterer dette direkte fra porteføljedataene deres. <a href=\"losning-formuesverdsettelse.html\">Les mer om Fenistra Formuesverdsettelse →</a>"
  },
  {
    keywords: ["mva-erklæring"],
    answer: "Fenistra MVA-erklæring automatiserer innhentingen av MVA-erklæringer fra MVA-registrerte leietakere, og gir oversikt over bruken av lokalene gjennom året. Det var Fenistras aller første produkt, lansert i 2017. <a href=\"losning-mva-erklaring.html\">Les mer om Fenistra MVA-erklæring →</a>"
  },
  {
    keywords: ["transaksjonsprodukter"],
    answer: "MVA-erklæring, RBO, Protokoller og Digital signering er transaksjonsprodukter. De er inkludert i Fenistra Standard, men betales per transaksjon eller bruk fremfor en fast pris. <a href=\"priser.html\">Les mer om Priser →</a>"
  },
  {
    keywords: ["kontrakter", "digitalt", "signere"],
    answer: "Ja. Fenistra Digital signering lar dere signere kontrakter og dokumenter digitalt, direkte i Fenistra, uten å måtte gå via e-post eller eksterne verktøy. Det er et transaksjonsprodukt inkludert i Fenistra Standard. <a href=\"losning-digital-signering.html\">Les mer om Fenistra Digital signering →</a>"
  },
  {
    keywords: ["arealberegning"],
    answer: "Fenistra Arealberegning kobler areal direkte til tegning og kontrakt, og gir nøyaktige arealberegninger som reduserer risikoen for feil i leiekostnader og kvadratmeterpriser. <a href=\"losning-arealberegning.html\">Les mer om Fenistra Arealberegning →</a>"
  },
  {
    keywords: ["lokaler", "leier"],
    answer: "Ja. Fenistra Innleie er en egen løsning for dere som leier inn eiendommer, med håndtering av alle leiekontrakter og aktiviteter på innleiesiden, i tillegg til den vanlige utleiesiden. <a href=\"losning-innleie.html\">Les mer om Fenistra Innleie →</a>"
  },
  {
    keywords: ["fenistradagene"],
    answer: "Fenistradagene er vårt årlige arrangement for Fenistra-kunder, med faglig påfyll, nettverksbygging og sosialt samvær. Arrangementet het tidligere Fenistra Brukerforum, og har gått av stabelen i over 25 år. Se mer om Fenistradagene. <a href=\"fenistradagene.html\">Les mer om Fenistradagene →</a>"
  },
  {
    keywords: ["intelligens", "kunstig", "jobber"],
    answer: "Ja. Fenistra og Visma Property Solutions jobber aktivt med KI i eiendomsforvaltningen, blant annet gjennom innovasjonsprosjektet Felix, et KI-native verktøy for kontraktsforvaltning som gir varsler, anbefalinger og svar basert på opplastede kontrakter. Les mer om KI hos Fenistra. <a href=\"ki.html\">Les mer om KI hos Fenistra →</a>"
  },
  {
    keywords: ["kommer", "gang"],
    answer: "Book en demo, eller ta testen vår for å se hvilken pakke og hvilke løsninger som passer for akkurat deres portefølje. En av rådgiverne våre tar deretter kontakt for å finne riktig oppsett. <a href=\"pakke-resultat.html\">Les mer om pakketesten →</a>"
  },
  {
    keywords: ["arealberegning", "areal", "kvadratmeter", "tegning", "fenistra arealberegning"],
    answer: "Fenistra Arealberegning: Nøyaktige arealberegninger som reduserer risikoen for feil i leiekostnader og kvadratmeterpriser, med kobling mot AutoCAD-tegninger. Tilleggsprodukt i Fenistra Premium. Blant annet: Kobling via Viewer mot AutoCAD-tegningsfiler; Automatisk beregning av MVA-grad på tegning; Historikk bevares ved endring av tegninger. <a href=\"losning-arealberegning.html\">Les mer om Fenistra Arealberegning →</a>"
  },
  {
    keywords: ["digital signering", "signering", "signere", "e-signatur", "fenistra digital signering", "digital"],
    answer: "Fenistra Digital signering: Signer kontrakter og dokumenter digitalt, direkte i Fenistra, uten å måtte gå via e-post eller eksterne verktøy. Inkludert i Fenistra Standard. Blant annet: Digital signering direkte i kontraktsflyten; Full sporbarhet på hvem som har signert og når; Juridisk bindende signaturer. <a href=\"losning-digital-signering.html\">Les mer om Fenistra Digital signering →</a>"
  },
  {
    keywords: ["dokument", "dokumenthåndtering", "dokumenter", "fenistra dokument"],
    answer: "Fenistra Dokument: Samle kontrakter, tegninger og annen dokumentasjon direkte koblet til riktig eiendom og leieforhold. Inkludert i Fenistra Standard. Blant annet: Dokumenter koblet direkte til kontrakt og eiendom; Enkel tilgang for hele organisasjonen; Historikk og sporbarhet over tid. <a href=\"losning-dokument.html\">Les mer om Fenistra Dokument →</a>"
  },
  {
    keywords: ["fakturering", "faktura", "fakturere", "fenistra fakturering"],
    answer: "Fenistra Fakturering: Fast, akonto og omsetningsbasert husleie samlet i én løsning, med gjentakende fakturering gjennom hele leieforholdet. Inkludert i Fenistra Standard. Blant annet: Gjentakende fakturering gjennom hele leieforholdet; Støtter fast, akonto og omsetningsbasert husleie; Avstemming mot regnskapssystemet dere bruker. <a href=\"losning-fakturering.html\">Les mer om Fenistra Fakturering →</a>"
  },
  {
    keywords: ["felleskostnader", "felleskost", "felleskostavregning", "avregning", "fenistra felleskostnader"],
    answer: "Fenistra Felleskostnader: Automatisert felleskostnadsavregning med full oversikt over kostnader, fordeling og MVA-behandling. Inkludert i Fenistra Standard. Blant annet: Automatisert MVA-behandling; Fleksible avregningssykluser; Avanserte beregninger sikrer rettferdig kostnadsfordeling. <a href=\"losning-felleskostnader.html\">Les mer om Fenistra Felleskostnader →</a>"
  },
  {
    keywords: ["formuesverdsettelse", "formuesverdi", "rf-1098", "skattemelding", "fenistra formuesverdsettelse"],
    answer: "Fenistra Formuesverdsettelse: Beregning og dokumentasjon av formuesverdi for næringseiendom, som underlag til RF-1098. Inkludert i Fenistra Standard. Blant annet: Beregner formuesverdi for næringseiendom; Underlag direkte til myndighetenes skjema RF-1098; Samler grunnlagsdata fra eiendom og leieforhold. <a href=\"losning-formuesverdsettelse.html\">Les mer om Fenistra Formuesverdsettelse →</a>"
  },
  {
    keywords: ["innleie", "leier inn", "innleiesiden", "fenistra innleie", "leier"],
    answer: "Fenistra Innleie: En løsning for deg som leier inn eiendommer, med håndtering av alle leiekontrakter og aktiviteter knyttet til hvert leieforhold. Tilleggsprodukt i Fenistra Premium. Blant annet: Oversikt over leieforpliktelser, varighet og kostnader; Overvåkning av felleskostnader mot kontraktens betingelser; Matcher inngående husleiefakturaer mot kontrakt. <a href=\"losning-innleie.html\">Les mer om Fenistra Innleie →</a>"
  },
  {
    keywords: ["inntektsbudsjett", "budsjett", "budsjettering", "fenistra inntektsbudsjett"],
    answer: "Fenistra Inntektsbudsjett: Bygg inntektsbudsjett direkte fra de faktiske leieforholdene i porteføljen, ikke fra separate regneark. Inkludert i Fenistra Standard. Blant annet: Budsjettering basert på faktiske kontraktsdata; Oppdateres automatisk ved endringer i leieforhold; Avstemming mot faktisk fakturert leie. <a href=\"losning-inntektsbudsjett.html\">Les mer om Fenistra Inntektsbudsjett →</a>"
  },
  {
    keywords: ["justering", "justeringsforpliktelser", "mva-fradrag", "fenistra justering"],
    answer: "Fenistra Justering: Et effektivt verktøy for å håndtere MVA og justeringsforpliktelser for utleiere av fast eiendom, i samsvar med lover, forskrifter og uttalelser. Tilleggsprodukt i Fenistra Premium. Blant annet: Kontroll på justeringsforpliktelser for eiendommene; Beregner MVA-fradragsprosent per prosjekt; Oversikt over MVA-status i bygge- og tiltaksperioden. <a href=\"losning-justering.html\">Les mer om Fenistra Justering →</a>"
  },
  {
    keywords: ["kjøpesenter", "senterdrift", "senterleder", "butikkoversikt", "fenistra kjøpesenter"],
    answer: "Fenistra Kjøpesenter: Full oversikt over senterdrift for senterleder, med fokus på butikk, aktiviteter og omsetningsrapportering. Tilleggsprodukt i Fenistra Premium. Blant annet: Oversiktlig dashboard for omsetning og utvikling på senteret; Automatisk purring på manglende omsetningsrapportering, med ønsket antall repetisjoner; Bransjetilpassede rapporter, inkludert Kvarud Analyse. <a href=\"losning-kjopesenter.html\">Les mer om Fenistra Kjøpesenter →</a>"
  },
  {
    keywords: ["kontrakter", "kontrakt", "leiekontrakt", "leiekontrakter", "fenistra kontrakter"],
    answer: "Fenistra Kontrakter: Effektiv overvåkning og håndtering av utleie-, fremleie- og interne kontrakter, samlet på tvers av hele porteføljen. Inkludert i Fenistra Standard. Blant annet: Håndtering av utleie-, fremleie- og interne kontrakter; Varsling før kontraktsutløp og viktige frister; Direkte kobling mot leietaker, areal og fakturering. <a href=\"losning-kontrakter.html\">Les mer om Fenistra Kontrakter →</a>"
  },
  {
    keywords: ["mva-erklæring", "mva", "merverdiavgift", "erklæring", "fenistra mva-erklæring"],
    answer: "Fenistra MVA-erklæring: Automatisert innhenting av nødvendig informasjon ved utleie til MVA-registrerte leietakere. Inkludert i Fenistra Standard. Blant annet: Automatisert innhenting av MVA-erklæringer fra leietakere; Oversikt over bruken av lokalene gjennom året; Reduserer manuelt oppfølgingsarbeid. <a href=\"losning-mva-erklaring.html\">Les mer om Fenistra MVA-erklæring →</a>"
  },
  {
    keywords: ["omsetningsavregning", "omsetningsleie", "omsetningsbasert leie", "fenistra omsetningsavregning", "omsetningsbasert", "leie"],
    answer: "Fenistra Omsetningsavregning: Forenkler og effektiviserer avregningen av omsetningsbasert leie, basert på revisorbekreftet omsetning. Inkludert i Fenistra Standard. Blant annet: Beregner korrekt leie basert på revisorbekreftet omsetning; Sammenholder løpende fakturert leie med faktisk omsetning; Differanse legges automatisk opp til fakturering. <a href=\"losning-omsetningsavregning.html\">Les mer om Fenistra Omsetningsavregning →</a>"
  },
  {
    keywords: ["protokoller", "overtakelsesprotokoll", "tilbakelevering", "fenistra protokoller"],
    answer: "Fenistra Protokoller: Verktøy for overtakelse og tilbakelevering av lokaler, med protokoller koblet direkte til riktig kontrakt. Inkludert i Fenistra Standard. Blant annet: Protokoller for overtakelse av lokaler; Protokoller for tilbakelevering ved utflytting; Direkte kobling til kontrakt og dokumentasjon. <a href=\"losning-protokoller.html\">Les mer om Fenistra Protokoller →</a>"
  },
  {
    keywords: ["rapportering", "rapport", "rapporter", "nøkkeltall", "fenistra rapportering"],
    answer: "Fenistra Rapportering: Fenistra rapporter gir deg innsikten du trenger, når du trenger den. Inkludert i Fenistra Standard. Blant annet: Enkle rapporter som gir deg og teamet et godt beslutningsgrunnlag; Hent ut per selskap, eiendom, portefølje eller egendefinerte tags og bransje; Alle rapporter kan hentes ut og lastes ned direkte fra løsningen. <a href=\"losning-rapportering.html\">Les mer om Fenistra Rapportering →</a>"
  },
  {
    keywords: ["rbo", "revisorbekreftet omsetning", "fenistra rbo", "revisorbekreftet", "omsetning"],
    answer: "Fenistra RBO: Enkel innhenting og administrasjon av leietakers årlige, revisorbekreftede omsetningsdata. Inkludert i Fenistra Standard. Blant annet: Innhenting av revisorbekreftet omsetning fra leietakere; Samlet administrasjon per leietaker og eiendom; Grunnlag for omsetningsbasert avregning. <a href=\"losning-rbo.html\">Les mer om Fenistra RBO →</a>"
  },
  {
    keywords: ["regnskap", "regnskapssystem", "kundereskontro", "fenistra regnskap"],
    answer: "Fenistra Regnskap: Hold eiendomsøkonomien avstemt og oppdatert, med integrasjon mot regnskapssystemene dere allerede bruker i dag. Inkludert i Fenistra Standard. Blant annet: Integrasjon mot rundt 20+ ulike regnskapssystemer i produksjon; Avstemming av fakturering og felleskostnader; Grunnlag for budsjettering og oppfølging. <a href=\"losning-regnskap.html\">Les mer om Fenistra Regnskap →</a>"
  },
  {
    keywords: ["sikkerhetsstyring", "bankgaranti", "depositum", "sikkerhet", "fenistra sikkerhetsstyring"],
    answer: "Fenistra Sikkerhetsstyring: Full oversikt over bankgaranti og depositum i porteføljen, med varsel når sikkerhet mangler eller utløper. Inkludert i Fenistra Standard. Blant annet: Bankgaranti og depositum samlet per kontrakt og på tvers av porteføljen; Varsel når sikkerhet mangler, er for lav eller nærmer seg utløp; Aggregert risikooversikt for hele porteføljen, ikke bare kontrakt for kontrakt. <a href=\"losning-sikkerhetsstyring.html\">Les mer om Fenistra Sikkerhetsstyring →</a>"
  },
  {
    keywords: ["tegning", "tegninger", "plantegning", "npoint", "fenistra tegning"],
    answer: "Fenistra Tegning: Ett sentralt arkiv for alle plantegninger, koblet direkte til kontrakt, leietaker og areal, uten AutoCAD eller andre spesialprogrammer. Tilleggsprodukt i Fenistra Premium. Blant annet: Sentralt arkiv for alle plantegninger, tilgjengelig for hele organisasjonen; Se tegninger direkte i nettleseren, ingen spesialprogramvare nødvendig; Full versjonshistorikk når tegninger oppdateres eller erstattes. <a href=\"losning-tegning.html\">Les mer om Fenistra Tegning →</a>"
  },
  {
    keywords: ["utleie", "leieinntekter", "fenistra utleie"],
    answer: "Fenistra Utleie: Holder orden på inntektssiden av den økonomiske forvaltningen i forbindelse med utleie av eiendom og driftstjenester. Tilleggsprodukt i Fenistra Premium. Blant annet: Skalerbar løsning for deg som eier eller forvalter eiendom; Registrerte inntekter faktureres og avstemmes mot regnskap; Grunnlag for budsjettering av leieinntekter. <a href=\"losning-utleie.html\">Les mer om Fenistra Utleie →</a>"
  },
  {
    keywords: ["løsninger", "alle løsninger", "hva kan fenistra", "moduler"],
    answer: "Fenistra har 18 løsninger, fra kontrakter og felleskostnader til rapportering og kjøpesenterdrift, samlet i ett system. Se hele oversikten på Løsninger-siden. <a href=\"losninger.html\">Les mer om Løsninger →</a>"
  },
  {
    keywords: ["regnskap integrasjon", "erp", "tripletex", "xledger", "poweroffice", "visma business nxt", "visma.net", "sap", "24sevenoffice", "unimicro", "microsoft dynamics", "regnskap", "integrasjon", "visma", "business", "microsoft", "dynamics"],
    answer: "Fenistra har direkte API-integrasjon mot fem regnskapssystemer: Tripletex, Xledger, PowerOffice GO, Visma Business NXT og Visma.net, med automatisk dataflyt begge veier. I tillegg har vi integrasjoner mot en rekke andre ERP-systemer som 24SevenOffice, UniMicro, Microsoft Dynamics, Visma Business, Visma Global, SAP, PowerOffice, Unit4 ERP, Infor M3 og flere. Bruker dere noe annet, ta kontakt så ser vi på løsningen. <a href=\"integrasjon-regnskap-erp.html\">Les mer om Regnskap og ERP-integrasjoner →</a>"
  },
  {
    keywords: ["årsoppgjør", "finale"],
    answer: "For årsoppgjør kobler Fenistra seg til systemet Finale for å utarbeide og sende inn årsregnskapet. Bruker dere et annet system, ta kontakt for informasjon om integrasjonsmuligheter. <a href=\"integrasjon-arsoppgjor.html\">Les mer om Årsoppgjør-integrasjoner →</a>"
  },
  {
    keywords: ["drift og vedlikehold", "properly", "famac", "vedlikeholdssystem", "drift", "vedlikehold"],
    answer: "For drift og vedlikehold integreres Fenistra med Properly og FAMAC, slik at informasjon flyter mellom forvaltning og drift. <a href=\"integrasjon-drift-vedlikehold.html\">Les mer om Drift og vedlikehold-integrasjoner →</a>"
  },
  {
    keywords: ["kjøpesenterløsninger integrasjon", "viametrics", "imas", "ferdselstelling", "besøkstall", "kjøpesenterløsninger", "integrasjon"],
    answer: "Fenistra kobles direkte mot Viametrics og IMAS for ferdselstelling og senterdata, slik at besøkstall flyter automatisk inn i Kjøpesenter-modulen og omsetningsrapporteringen. <a href=\"integrasjon-kjopesenter.html\">Les mer om Kjøpesenter-integrasjoner →</a>"
  },
  {
    keywords: ["power bi", "maestro", "analyseverktøy", "rapporteringsverktøy", "power"],
    answer: "Fenistra-data kan kobles til rapporterings- og analyseverktøy som Power BI og Maestro, slik at innsikten dere trenger alltid er oppdatert. <a href=\"integrasjon-rapportering.html\">Les mer om Rapportering-integrasjoner →</a>"
  },
  {
    keywords: ["hvor mange systemer", "alle integrasjoner", "integrasjoner oversikt", "integrasjoner"],
    answer: "Fenistra er integrert mot rundt 25 systemer i produksjon, på tvers av regnskap/ERP, årsoppgjør, drift og vedlikehold, rapportering/analyse og kjøpesenterløsninger. Se full oversikt på Integrasjoner-siden. <a href=\"integrasjoner-alle-systemer.html\">Les mer om Integrasjoner →</a>"
  },
  {
    keywords: ["kundehistorier", "referansekunder", "kundecase"],
    answer: "Fenistra brukes av over 180 eiendomsforvaltere i Norge. Se kundehistoriene fra blant andre Höegh Eiendom, Frydenbø Eiendom, Aspelin Ramm og Backer AS på Kunder-siden. <a href=\"kunder.html\">Les mer om Kundehistorier →</a>"
  },
  {
    keywords: ["fenistradagene", "arrangement", "konferanse"],
    answer: "Fenistradagene er Fenistras årlige arrangement for kunder, med faglig påfyll, nettverksbygging og sosialt samvær. Het tidligere Fenistra Brukerforum. <a href=\"fenistradagene.html\">Les mer om Fenistradagene →</a>"
  },
  {
    keywords: ["felix", "kunstig intelligens ki", "ai-satsing", "ki i eiendomsforvaltning", "kunstig", "intelligens", "eiendomsforvaltning"],
    answer: "Eiendomsforvaltning handler om store mengder data på tvers av kontrakter, arealer og økonomi. Det er nettopp den typen data KI er godt egnet til å strukturere, tolke og varsle på, når det gjøres riktig. <a href=\"ki.html\">Les mer om KI hos Fenistra →</a>"
  },
  {
    keywords: ["om fenistra historie", "hvem er fenistra", "selskapet fenistra", "historie", "selskapet"],
    answer: "Fenistra er en markedsledende leverandør av forvaltningssystemer for næringseiendom, med røtter tilbake til midten av 1990-tallet. Siden 2020 er Fenistra en del av Visma Property Solutions. <a href=\"om-oss.html\">Les mer om Om oss →</a>"
  },
  {
    keywords: ["ansatte", "teamet", "menneskene bak fenistra", "kundeteam", "produktteam", "menneskene"],
    answer: "Fenistra har egne team for kundesuksess og produktutvikling. Se menneskene bak Fenistra, med lenker til kundeteamet og produktteamet, på Ansatte-siden. <a href=\"ansatte.html\">Les mer om Ansatte →</a>"
  },
  {
    keywords: ["felleskostnadsavregning", "feil"],
    answer: "Hva er felleskostnadsavregning, og hvorfor blir den ofte feil? Manuell fordeling av felleskostnader er en av de vanligste feilkildene i eiendomsforvaltning. Her er hva som går galt, og hvordan automatisering løser det. <a href=\"blogg-felleskostnadsavregning.html\">Les mer om Hva er felleskostnadsavregning, og hvorfor blir den ofte feil? →</a>"
  },
  {
    keywords: ["leiekontrakten"],
    answer: "Når kontroll over leiekontrakten blir viktigere enn noensinne For gårdeiere og forvaltere handler god eiendomsdrift i stadig større grad om oversikt: å vite hvor kapital er bundet, hvilke forpliktelser som løper, og hvilke valg som faktisk finnes. Depositum er ett av områdene hvor denne oversikten historisk har vært mangelfull, ofte håndtert manuelt og med lite oppmerksomhet fra bransjen for øvrig. <a href=\"blogg-matrix-samarbeid.html\">Les mer om Når kontroll over leiekontrakten blir viktigere enn noensinne →</a>"
  },
  {
    keywords: ["mva", "utleie", "næringsdrivende", "vite"],
    answer: "MVA ved utleie til næringsdrivende: dette må dere vite Frivillig registrering, justeringsforpliktelser og dokumentasjonskrav, MVA-reglene ved utleie av næringseiendom er strenge. Her er en innføring i det viktigste. <a href=\"blogg-mva-utleie-naringseiendom.html\">Les mer om MVA ved utleie til næringsdrivende: dette må dere vite →</a>"
  },
  {
    keywords: ["omsetningsleie", "kjøpesenter", "korrekt", "rapportering"],
    answer: "Omsetningsleie i kjøpesenter: slik sikrer du korrekt rapportering Omsetningsbasert leie krever løpende oppfølging av hver enkelt leietaker. Her er hva som skal til for å få rapporteringen riktig, og hvorfor senterledere sliter med det manuelt. <a href=\"blogg-omsetningsleie-kjopesenter.html\">Les mer om Omsetningsleie i kjøpesenter: slik sikrer du korrekt rapportering →</a>"
  },
  {
    keywords: ["høegh eiendom", "høegh"],
    answer: "Derfor har Höegh Eiendom brukt Fenistra i over to tiår Maren Elise Dalene Torp, som Senior Controller Eiendomsforvaltning i Høegh Eiendom setter stor pris på tryggheten det gir å jobbe med en partner som har bransjekunnskapen. <a href=\"media-hoegh-eiendom.html\">Les mer om Derfor har Höegh Eiendom brukt Fenistra i over to tiår →</a>"
  },
  {
    keywords: ["backer", "rigger", "fremtiden", "velger"],
    answer: "Backer rigger for fremtiden – velger Fenistra for sin eiendomsforvaltning Backer har tatt et viktig steg for å rigge seg for videre vekst. Valget av ny systempartner falt på Fenistra – ikke bare på grunn av løsningen, men for menneskene og visjonen bak. <a href=\"media-backer.html\">Les mer om Backer rigger for fremtiden – velger Fenistra for sin eiendomsforvaltning →</a>"
  },
  {
    keywords: ["mest", "komplette", "løsningen", "eiendomsforvaltning"],
    answer: "Fenistra: Mest komplette løsningen for eiendomsforvaltning Eiendomsselskaper benytter et økende antall spesialiserte IT-løsninger for å håndtere sine behov. Med kundens tilbakemeldinger i sentrum, har vi derfor tatt grep og fornyet Fenistra. <a href=\"media-mest-komplette-losningen.html\">Les mer om Fenistra: Mest komplette løsningen for eiendomsforvaltning →</a>"
  },
  {
    keywords: ["business", "nxt", "full", "business nxt"],
    answer: "Fenistra+Business NXT: Full kontroll på økonomi og eiendomsforvaltning Eiendomsselskaper står overfor et raskt skiftende marked med økende krav til effektiv drift, økonomisk kontroll og digitale løsninger. Med Fenistra og Business NXT får du en komplett skybasert plattform som automatiserer økonomistyring og eiendomsforvaltning. På den måten reduserer du risiko samtidig som du jobber smartere og sikrer lønnsom vekst. <a href=\"media-business-nxt.html\">Les mer om Fenistra+Business NXT: Full kontroll på økonomi og eiendomsforvaltning →</a>"
  },
  {
    keywords: ["budsjett", "faktura", "presis", "transparent", "fordeling", "felleskost budsjett", "felleskost"],
    answer: "Fra budsjett til faktura – En presis og transparent fordeling Få en slutt på leietakerklager, store likviditetshull og timer med feilsøking i Excel. Fenistra Felleskost budsjett tar seg av en av de vanskeligste delene av eiendomsforvaltningen: Den presise, avtalemessige fordelingen av felleskostnader. <a href=\"media-budsjett-til-faktura.html\">Les mer om Fra budsjett til faktura – En presis og transparent fordeling →</a>"
  },
  {
    keywords: ["forenkler", "felleskostnadene"],
    answer: "Fenistra forenkler felleskostnadene Som eiendomsforvalter vet du at felleskostavregningen er en sentral, men ofte tidkrevende og kompleks oppgave. Manuell datainntasting, komplekse beregninger og risiko for feil kan spise opp verdifull tid og gå utover inntektsmuligheter, tid som heller burde brukes på mer verdiskapende oppgaver. <a href=\"media-forenkler-felleskostnadene.html\">Les mer om Fenistra forenkler felleskostnadene →</a>"
  },
  {
    keywords: ["rapport", "kjøpesenter", "kjøpesenterrapport"],
    answer: "Ny rapport i Fenistra kjøpesenter Ny rapport for innsikt og vekst: Månedsoversikt for Fenistra kjøpesenter. <a href=\"media-ny-rapport-kjopesenter.html\">Les mer om Ny rapport i Fenistra kjøpesenter →</a>"
  },
  {
    keywords: ["oppsummering", "brukerforum", "2024", "innsikt", "brukerforum 2024"],
    answer: "Oppsummering av Fenistra Brukerforum 2024: Innsikt og innovasjon i eiendomsbransjen Fenistra Brukerforum 2024 vekket entusiastisk engasjement og ettertanke blant deltakerne, delvis takket være innsiktsfulle og inspirerende bidrag fra våre anerkjente foredragsholdere. Over to actionfylte dager på Scandic Holmenkollen Park Hotel koste deltakerne seg med en miks av faglig dybdelæring, innsikt og nettverksmuligheter. <a href=\"media-brukerforum-2024-oppsummering.html\">Les mer om Oppsummering av Fenistra Brukerforum 2024: Innsikt og innovasjon i eiendomsbransjen →</a>"
  },
  {
    keywords: ["brukerforum", "2024", "brukerforum 2024"],
    answer: "Fenistra Brukerforum 2024 En viktig arena for deg som benytter Fenistra! <a href=\"media-brukerforum-2024-invitasjon.html\">Les mer om Fenistra Brukerforum 2024 →</a>"
  },
  {
    keywords: ["effektiv", "innhenting", "mva-erklæringer", "leietakere", "mva-erklæringer innhenting"],
    answer: "Slik sikrer du effektiv innhenting av MVA-erklæringer fra leietakere Som eier av utleieeiendom eller -lokaler er det viktig å ha full kontroll på Merverdiavgift (MVA). For deg som leier ut til MVA-registrerte virksomheter, er det å samle inn MVA-erklæringer fra leietakerne en viktig del av skattehåndteringen. Denne prosessen er ikke bare avgjørende for å oppfylle dine egne forpliktelser, men den hjelper også leietakerne med å holde seg innenfor lovens krav. Her ser vi på hvorfor dette er viktig, og hvordan du kan gjøre innsamlingen så enkel som mulig. <a href=\"media-mva-erklaringer.html\">Les mer om Slik sikrer du effektiv innhenting av MVA-erklæringer fra leietakere →</a>"
  },
  {
    keywords: ["brukeropplevelsen", "neste", "nivå", "ny brukeropplevelse", "nytt grensesnitt", "brukeropplevelse", "nytt", "grensesnitt"],
    answer: "Fenistra tar brukeropplevelsen til neste nivå! Visma Property Solutions flytter forvaltningssystemet Fenistra over på ny plattform, med en helt ny og intuitiv brukeropplevelse. Flere ansatte får nå god tilgang til informasjonen de trenger. <a href=\"media-brukeropplevelse-neste-niva.html\">Les mer om Fenistra tar brukeropplevelsen til neste nivå! →</a>"
  },
  {
    keywords: ["skaper", "kontinuerlig", "verdi", "kundene", "voksende"],
    answer: "Skaper kontinuerlig verdi for kundene i et voksende marked Nye Fenistra gir eiendomsselskapene den beste kombinasjonen av fleksibilitet og effektivitet kombinert med moderne teknologi og brukergrensesnitt. Den nyeste versjonen representerer et betydelig fremskritt ved å tilby tilpassede verktøy som møter dagens forvaltningskrav. <a href=\"media-kontinuerlig-verdi.html\">Les mer om Skaper kontinuerlig verdi for kundene i et voksende marked →</a>"
  },
  {
    keywords: ["egen", "eiendomsportefølje", "create insight", "create", "insight"],
    answer: "Dette må du ha oversikt over i egen eiendomsportefølje! Har du fullstendig oversikt over din eiendomsportefølje? <a href=\"media-eiendomsportefolje-oversikt.html\">Les mer om Dette må du ha oversikt over i egen eiendomsportefølje! →</a>"
  },
  {
    keywords: ["test hvilken pakke", "hvilken pakke passer", "pakketest", "test", "hvilken", "pakke"],
    answer: "Ta testen på Priser-siden (eller via 'Book demo') for å se hvilke løsninger og hvilken pakke som passer akkurat deres portefølje. <a href=\"pakke-resultat.html\">Les mer om pakketesten →</a>"
  },
  {
    keywords: ["høegh eiendom", "20 år som kunde", "maren elise"],
    answer: "Höegh Eiendom er et familieeid eiendomsselskap som eier, utvikler og forvalter eiendommer i Oslo og østlandsområdet, kunde av Fenistra siden 2004. Etter overgangen til ny Fenistra-plattform har faktureringsprosesser gått ned 50-60 % i tidsbruk. «Det er en trygghet i å møte en samarbeidspartner som forstår vår særbransje,» sier Maren Elise Dalene Torp, Senior Controller Eiendomsforvaltning. <a href=\"kunder.html\">Les mer om Kundehistorier →</a>"
  },
  {
    keywords: ["frydenbø eiendom", "bente haugsdal", "markedets mest brukte"],
    answer: "Frydenbø Eiendom bruker Fenistra som forvaltningssystem, kombinert med Create Insight for markedsinnsikt. «Fenistra har utviklet seg i takt med krav og regelverk i tett samarbeid med eiendomsbesittere,» sier utviklingssjef Bente Haugsdal. <a href=\"kunder.html\">Les mer om Kundehistorier →</a>"
  },
  {
    keywords: ["aspelin ramm", "ninette jurs", "kristin støfringsdal", "vulkan"],
    answer: "Aspelin Ramm, kjent for byutviklingsprosjektet Vulkan i Oslo, bruker Fenistra.net i det daglige. «Det er mye mer brukervennlig enn den gamle løsningen og gir full oversikt over alle leietakere,» sier kontraktsforvalter Ninette Jurs og eiendomsforvalter Kristin Støfringsdal. <a href=\"kunder.html\">Les mer om Kundehistorier →</a>"
  },
  {
    keywords: ["backer as", "tine wergeland johannessen", "ny kunde backer"],
    answer: "Backer AS, et eiendomsselskap som utvikler, forvalter og leier ut nærings- og boligeiendom, valgte Fenistra på grunn av 35 års bransjeerfaring og Vismas sikkerhetsstandarder. «Vi valgte Fenistra fordi de kombinerer dyp bransjekunnskap med et verktøy som forenkler hverdagen vår,» sier Tine Wergeland Johannessen, utleie- og markedssjef. <a href=\"kunder.html\">Les mer om Kundehistorier →</a>"
  },
  {
    keywords: ["nøkkeltall", "hvor mange bruker", "statistikk fenistra", "60 000 kontrakter"],
    answer: "Noen nøkkeltall om Fenistra: 180+ eiendomsforvaltere i Norge bruker Fenistra, 20+ regnskapsintegrasjoner er i produksjon hos kunder, 17-18 løsninger dekker hele forvaltningen, og over 60 000 kontrakter forvaltes gjennom Fenistra-plattformen. <a href=\"index.html\">Les mer om Forsiden →</a>"
  },
  {
    keywords: ["tilleggsprodukter", "selvstendige produkter", "hva er inkludert"],
    answer: "Fenistra er delt i tre: kjerneløsninger (Kontrakter, Felleskostnader, Fakturering, Regnskap, Rapportering, Dokument, Omsetningsavregning, Formuesverdsettelse, Inntektsbudsjett), transaksjonsprodukter som er inkludert i begge pakker men betales per bruk (MVA-erklæring, RBO, Protokoller, Digital signering), og tilleggsprodukter som er selvstendige eller kombinert med Standard, og alltid inkludert i Premium (Justering, Arealberegning, Kjøpesenter, Utleie, Innleie). <a href=\"priser.html\">Les mer om Priser →</a>"
  },
  {
    keywords: ["kundeteamet kontakt", "hvem kan jeg kontakte kunde", "brukerstøtte kontakt person", "head of customer success"],
    answer: "Kundeteamet ledes av Trygve Vardenær, Head of Customer Success (trygve.vardenar@visma.com). I teamet finner du også kundekontakter som Kristian Lien, Frida Holte, Beate Paulsen og Patrick Eriksen, brukerstøtte ved Henning Aas, og konsulenter som Marius Sømme, Kristin Falch og Rokshar Zendehbizadeh. <a href=\"kundeteam.html\">Les mer om Kundeteamet →</a>"
  },
  {
    keywords: ["produktteamet kontakt", "hvem lager fenistra", "joakim howlid", "daglig leder fenistra"],
    answer: "Produktteamet ledes av Joakim Howlid, daglig leder og produktsjef i Fenistra. Teamet består ellers av produktledelse, UX-designere og et utviklingsteam på rundt ti personer som bygger og videreutvikler løsningene. <a href=\"produktteam.html\">Les mer om Produktteamet →</a>"
  },
  {
    keywords: ["personvern", "personopplysninger", "gdpr", "personvernerklæring"],
    answer: "Personvernerklæringen beskriver hvordan Visma Property Solutions, som leverer Fenistra, håndterer personopplysninger og data. Se hele erklæringen på Personvern-siden. <a href=\"personvern.html\">Les mer om Personvern →</a>"
  },
  {
    keywords: ["cookies", "informasjonskapsler", "cookie policy"],
    answer: "Retningslinjer for bruk av cookies (informasjonskapsler) hos Visma Property Solutions, som leverer Fenistra, finner du på Cookies-siden. <a href=\"cookies.html\">Les mer om Cookies →</a>"
  },
  {
    keywords: ["åpenhetsloven", "menneskerettigheter", "aktsomhetsvurdering"],
    answer: "Redegjørelsen etter åpenhetsloven beskriver Visma Property Solutions' aktsomhetsvurderinger for grunnleggende menneskerettigheter og anstendige arbeidsforhold. Se hele redegjørelsen på siden om Åpenhetsloven. <a href=\"apenhetsloven.html\">Les mer om Åpenhetsloven →</a>"
  },
  {
    keywords: ["forvaltningssystem", "hva er fenistra", "hva er dette", "hva gjør fenistra"],
    answer: "Et forvaltningssystem er et samlet sett med verktøy og arbeidsprosesser som hjelper eiendomsbesittere, gårdeiere og forvaltere med å organisere drift, vedlikehold, økonomi og administrasjon av eiendommer - fra leietakeradministrasjon til regnskap og rapportering, på ett sted. Fenistra er nettopp et slikt system, bygget for næringseiendom. <a href=\"om-oss.html\">Les mer om Om oss →</a>"
  },
  {
    keywords: ["fenistra standard", "hva inneholder standard"],
    answer: "Fenistra Standard inneholder løsningene Kontrakt, Fakturering, Regnskap, Rapportering, Dokument, Felleskostnader, Omsetningsavregning, Formuesverdsettelse og Inntektsbudsjett, i tillegg til transaksjonsproduktene MVA-erklæring, RBO, Protokoller og Digital signering. <a href=\"priser.html\">Les mer om Priser →</a>"
  },
  {
    keywords: ["premium"],
    answer: "Fenistra Premium inneholder alt fra Standard-pakken, i tillegg til alle tilleggsprodukter og egen dedikert kunderådgiver. <a href=\"priser.html\">Les mer om Priser →</a>"
  },
  {
    keywords: ["kjøpesenter", "senterdrift", "senterleder"],
    answer: "Fenistra Kjøpesenter er senterleders viktigste verktøy - dashboard for omsetning og utvikling, automatisk purring på manglende omsetningsrapportering, bransjetilpassede rapporter (inkl. Kvarud Analyse) og besøksregistrering. <a href=\"losning-kjopesenter.html\">Les mer om Fenistra Kjøpesenter →</a>"
  },
  {
    keywords: ["integrer", "integrasjon", "regnskapssystem", "tripletex", "visma", "xledger", "poweroffice", "sap", "erp", "24sevenoffice"],
    answer: "Sannsynligvis ja! Fenistra er i dag integrert mot rundt 20 ulike regnskapssystemer i produksjon hos kunder - blant annet Tripletex, Xledger, PowerOffice GO, Visma Business NXT og Visma.net via direkte API-integrasjon. <a href=\"integrasjon-regnskap-erp.html\">Les mer om Regnskap og ERP-integrasjoner →</a>"
  },
  {
    keywords: ["løsning", "løsninger", "hva kan fenistra"],
    answer: "Fenistra har 17-18 løsninger, fra kontrakter og felleskostnader til rapportering og kjøpesenterdrift. <a href=\"losninger.html\">Les mer om Løsninger →</a>"
  },
  {
    keywords: ["digital signering", "signering", "signere"],
    answer: "Fenistra Digital signering lar dere signere kontrakter og dokumenter digitalt, direkte i Fenistra - uten å måtte gå via e-post eller eksterne verktøy. Det er et transaksjonsprodukt inkludert i Fenistra Standard, så dere betaler kun for signeringene dere faktisk bruker. <a href=\"losning-digital-signering.html\">Les mer om Fenistra Digital signering →</a>"
  },
  {
    keywords: ["transaksjonsprodukt", "transaksjon"],
    answer: "MVA-erklæring, RBO, Protokoller og Digital signering er transaksjonsprodukter - de er inkludert i Fenistra Standard, men betales per transaksjon/bruk fremfor en fast pris. <a href=\"priser.html\">Les mer om Priser →</a>"
  },
  {
    keywords: ["pris", "koster", "kostnad", "abonnement"],
    answer: "Fenistra prises etter porteføljens leieomsetning, ikke antall brukere - alle pakker har ubegrenset antall brukere. Se Standard og Premium på Priser-siden, eller book en demo, så finner vi ut hva som passer for dere. <a href=\"priser.html\">Les mer om Priser →</a>"
  },
  {
    keywords: ["demo", "book demo", "prøve"],
    answer: "Du kan booke en demo direkte via «Book demo»-knappen øverst på siden, så tar en av våre rådgivere kontakt. <a href=\"pakke-resultat.html\">Les mer om pakketesten →</a>"
  },
  {
    keywords: ["hei", "hallo", "yo", "morn"],
    answer: "Hei! Jeg kan svare på enkle spørsmål om Fenistra - løsninger, integrasjoner og pakker. Hva lurer du på?"
  },
  {
    keywords: ["fenistradagene", "brukerforum"],
    answer: "Fenistradagene samler alle Fenistra-kunder hvert år i juni for faglig påfyll, nettverksbygging og sosialt samvær. Het tidligere Fenistra Brukerforum. <a href=\"fenistradagene.html\">Les mer om Fenistradagene →</a>"
  },
  {
    keywords: ["kunstig intelligens", "felix", " ai ", "ai-", " ki ", "ki-"],
    answer: "Fenistra og Visma Property Solutions jobber aktivt med KI i eiendomsforvaltningen, blant annet gjennom innovasjonsprosjektet Felix for KI-drevet kontraktsforvaltning. <a href=\"ki.html\">Les mer om KI hos Fenistra →</a>"
  },
  {
    keywords: ["kunder", "referanse", "case", "hvem bruker"],
    answer: "Fenistra brukes av 180+ eiendomsforvaltere i Norge, blant andre Thon Gruppen, Coop, Aspelin Reitan, Frydenbø Eiendom, Höegh Eiendom, Spabo Eiendom, Selvaag Eiendom, Backer AS, Norgesgruppen, Ragde, Avantor og Møller. <a href=\"kunder.html\">Les mer om Kundehistorier →</a>"
  },
  {
    keywords: ["blogg", "artikkel", "artikler", "fagstoff"],
    answer: "Vi skriver fagartikler om eiendomsforvaltning - felleskostnader, MVA-regelverk, omsetningsleie og kjøpesenterdrift. Se alle artikler på Blogg-siden. <a href=\"blogg.html\">Les mer om Bloggen →</a>"
  },
];
