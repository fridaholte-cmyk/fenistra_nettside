# Lansering av www.fenistra.no – sjekkliste

Rekkefølgen betyr noe. Punktene under «På lanseringsdagen» bør tas i den rekkefølgen de står.

## Før lanseringsdagen

| # | Hva | Hvem |
|---|---|---|
| 1 | Avklar de 31 redirectene (se `redirects-beslutninger.md`) | Frida |
| 2 | Send listen gammel → ny URL til byrået | Frida |
| 3 | Opprett fenistra.no som property i Search Console, verifiser via DNS | Frida / IT |
| 4 | Hent GTM-container-ID fra byrået og send den videre, så kobles den inn og publiseres | Byrå → utvikling |
| 5 | Pek DNS for www.fenistra.no mot Azure, og fenistra.no uten www videre til www | IT |
| 6 | Importer redirectfilen i HubSpot (klar, men ikke aktiv) | HubSpot-ansvarlig |

Punkt 4 er verdt å prioritere: kommer GTM-ID-en først etter lansering, går de første dagenes
trafikk tapt i statistikken, og de er ofte de mest interessante.

## På lanseringsdagen, i rekkefølge

1. **Passordsperren skrus av og siden publiseres.** Datoene i sitemapet oppdateres samtidig.
   Alt annet under her forutsetter at dette er gjort.
2. **Kontroller at siden svarer:** www.fenistra.no laster, og fenistra.no uten www sender videre dit.
3. **Aktiver redirectene i HubSpot.** Ta 5–10 stikkprøver fra listen og se at de lander riktig sted,
   og at de gir 301 (permanent), ikke 302.
4. **Send inn sitemap.xml i Search Console** (`https://www.fenistra.no/sitemap.xml`).
5. **Be om indeksering** av forsiden og de viktigste sidene: Løsninger, Priser, Spørsmål, Integrasjoner.
6. **Byrået** oppdaterer destinasjons-URL-er i annonser og sitelinks, og kjører domeneverifisering.
7. **Test sporingen:** åpne siden, bytt side, send inn skjemaet og still et spørsmål i chatten.
   Alle fire skal dukke opp i GA4 sanntid. Gjør det etter at cookie-banneret er godtatt, ellers
   sendes ingenting, og det er meningen.

## De første fire ukene

- Se på 404-rapporten i Search Console ukentlig. Nye 404-er betyr som regel en redirect som mangler.
- Følg med på antall indekserte sider. Det skal stige jevnt de første ukene.
- Sammenlign trafikk i GA4 mot samme periode før flyttingen. Et fall den første uken er normalt.
- **La propertysolutions.no og redirectene stå i minst 6–12 måneder.** Skrus de av for tidlig,
  mister dere rangeringen de gamle adressene har bygget opp.
- Annonsørbekreftelsen hos Google kommer når byrået sier fra.

## Dette er allerede på plass, og trenger ingen handling

Sitemap med alle sidene, robots.txt som åpner for søkemotorer, canonical-tagg på hver side,
strukturert data (organisasjon, produkt, artikler og spørsmål/svar) og interne lenker som
peker på de nye adressene.
