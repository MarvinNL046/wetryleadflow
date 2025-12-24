"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  Zap,
  Users,
  Kanban,
  BarChart3,
  ChevronRight,
  ChevronDown,
  Rocket,
  HelpCircle,
  Mail,
  Clock,
  Phone,
  UserPlus,
  Settings,
  Target,
  TrendingUp,
  Shield,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MousePointerClick,
  Repeat,
  PhoneCall,
  MailCheck,
  Timer,
  Layers,
  PieChart,
  Activity,
  UserCheck,
  Building2,
  Lock,
  Upload,
  Search,
  Tag,
  Globe,
  Smartphone,
  Receipt,
  CreditCard,
  RefreshCw,
  Package,
  Percent,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// QUICK START GUIDES
// ============================================
const quickStartGuides = [
  {
    id: "first-contact",
    title: "Je eerste contact toevoegen",
    description: "Voeg handmatig een nieuwe lead toe aan je CRM",
    duration: "2 min",
    icon: UserPlus,
    color: "violet",
    steps: [
      "Ga naar Contacts in het menu",
      "Klik op 'Nieuw Contact' rechtsboven",
      "Vul de contactgegevens in (naam, email, telefoon)",
      "Voeg optioneel bedrijfsnaam en functie toe",
      "Klik op 'Opslaan' om het contact aan te maken",
    ],
  },
  {
    id: "create-pipeline",
    title: "Een pipeline aanmaken",
    description: "Configureer je sales pipeline met custom stages",
    duration: "5 min",
    icon: Kanban,
    color: "blue",
    steps: [
      "Ga naar Pipelines in het menu",
      "Klik op 'Nieuwe Pipeline'",
      "Geef je pipeline een naam (bijv. 'Sales' of 'Recruitment')",
      "Voeg stages toe door op '+' te klikken",
      "Stel kleuren in voor elke stage",
      "Sleep stages om de volgorde aan te passen",
    ],
  },
  {
    id: "connect-meta",
    title: "Meta Lead Ads koppelen",
    description: "Verbind Facebook & Instagram Lead Ads",
    duration: "5 min",
    icon: Zap,
    color: "amber",
    steps: [
      "Ga naar CRM Settings → Integraties",
      "Klik op 'Verbinden' bij Meta Lead Ads",
      "Log in met je Facebook account",
      "Selecteer de pagina's die je wilt koppelen",
      "Klik op 'Sync Forms' om je formulieren op te halen",
      "Geef formulieren een herkenbare naam (bijv. 'Airco Leads')",
      "Configureer in welke pipeline nieuwe leads komen",
    ],
  },
  {
    id: "first-opportunity",
    title: "Een opportunity aanmaken",
    description: "Voeg een deal toe aan je pipeline",
    duration: "3 min",
    icon: Target,
    color: "emerald",
    steps: [
      "Ga naar Pipelines en open een pipeline",
      "Klik op '+' in de gewenste stage",
      "Selecteer een bestaand contact of maak er een aan",
      "Vul de deal titel en verwachte waarde in",
      "Stel optioneel een verwachte sluitdatum in",
      "Sleep de opportunity naar andere stages als de deal vordert",
    ],
  },
  {
    id: "stage-automation",
    title: "Stage automatisering instellen",
    description: "Automatische follow-ups en acties per stage",
    duration: "3 min",
    icon: Zap,
    color: "amber",
    steps: [
      "Ga naar Pipelines en open een pipeline",
      "Klik op 'Stages Bewerken' (tandwiel icoon)",
      "Bij elke stage: schakel 'Follow-up herinnering' in",
      "Stel het aantal dagen in (bijv. 2 dagen)",
      "Optioneel: markeer als 'Laatste poging'",
      "Optioneel: schakel 'Auto naar Verloren' en 'Stuur afscheids-email' in",
      "Klik op 'Opslaan' om de instellingen toe te passen",
    ],
  },
];

// ============================================
// FEATURE DOCUMENTATION
// ============================================
const featureCategories = [
  {
    id: "contacts",
    title: "Contactbeheer",
    icon: Users,
    color: "violet",
    description: "Beheer al je leads en klanten op één plek",
    features: [
      {
        title: "Contacten toevoegen",
        icon: UserPlus,
        content: `Je kunt op verschillende manieren contacten toevoegen aan LeadFlow:

**Handmatig toevoegen:**
1. Ga naar Contacts in het hoofdmenu
2. Klik op 'Nieuw Contact' rechtsboven
3. Vul de verplichte velden in: voornaam, achternaam
4. Voeg optionele informatie toe: email, telefoon, bedrijf, functie
5. Klik op 'Opslaan'

**Via Meta Lead Ads:**
Contacten worden automatisch aangemaakt wanneer iemand een lead form invult op Facebook of Instagram.

**Via API:**
Gebruik onze REST API om contacten programmatisch aan te maken.`,
      },
      {
        title: "Contact informatie",
        icon: FileText,
        content: `Elk contact bevat de volgende informatie:

**Standaard velden:**
- Voornaam & Achternaam
- Email adres
- Telefoonnummer
- Bedrijfsnaam
- Functie/Positie

**Automatische tracking:**
- Aanmaakdatum
- Laatst gewijzigd
- Aangemaakt door (welke gebruiker)
- Lead bron (Meta, handmatig, API)

**Call tracking:**
- Aantal belpoginges
- Laatste belpoging datum
- Resultaat laatste gesprek`,
      },
      {
        title: "Lead attributie",
        icon: Target,
        content: `LeadFlow houdt automatisch bij waar elke lead vandaan komt:

**Formulier badges:**
- Elke lead toont een badge met de formuliernaam
- Badge is zichtbaar in contactenlijst, pipeline en leads queue
- Herkenbare namen zoals "Airco Leads" of "Thuisbatterijen"
- Zo weet je direct welk product de lead zoekt

**Meta Lead Ads attributie:**
- Facebook/Instagram pagina
- Lead form naam (aanpasbaar)
- Campagne ID
- Ad Set ID
- Ad ID

**UTM parameters:**
- utm_source
- utm_medium
- utm_campaign
- utm_content
- utm_term

Dit helpt je om te analyseren welke campagnes het beste presteren.`,
      },
    ],
  },
  {
    id: "pipelines",
    title: "Pipelines & Opportunities",
    icon: Kanban,
    color: "blue",
    description: "Visueel deal management met Kanban boards",
    features: [
      {
        title: "Pipeline structuur",
        icon: Layers,
        content: `Een pipeline bestaat uit meerdere stages die de reis van lead naar klant weergeven.

**Standaard stages (aanpasbaar):**
1. **Lead** - Nieuwe, ongekwalificeerde leads
2. **1x Gebeld** - Eerste contactpoging gedaan
3. **Niet Bereikbaar** - Meerdere pogingen zonder succes
4. **Gekwalificeerd** - Lead is geïnteresseerd
5. **Offerte** - Offerte verstuurd
6. **Gewonnen** - Deal gesloten ✅
7. **Verloren** - Deal niet doorgegaan ❌

**Pipeline aanpassen:**
- Voeg onbeperkt stages toe
- Wijzig stage namen
- Stel kleuren in per stage
- Versleep om volgorde aan te passen`,
      },
      {
        title: "Kanban board",
        icon: MousePointerClick,
        content: `Het Kanban board geeft je een visueel overzicht van al je deals:

**Mogelijkheden:**
- Sleep opportunities tussen stages
- Bekijk deal waarde per opportunity
- Zie wie er aan toegewezen is
- Filter op verschillende criteria

**Opportunity kaart toont:**
- Deal titel
- Contact naam
- Verwachte waarde (€)
- Toegewezen teamlid
- Dagen in huidige stage

**Acties:**
- Klik op een opportunity voor details
- Sleep naar een andere stage om te verplaatsen
- Klik '+' om een nieuwe opportunity toe te voegen`,
      },
      {
        title: "Deal tracking",
        icon: TrendingUp,
        content: `Houd de voortgang van elke deal bij:

**Opportunity gegevens:**
- Titel/naam van de deal
- Verwachte waarde in Euro
- Verwachte sluitdatum
- Toegewezen aan (teamlid)
- Contact koppeling

**Automatische tracking:**
- Stage geschiedenis (wanneer verplaatst, door wie)
- Dagen in pipeline
- Conversie status (actief/gewonnen/verloren)

**Won/Lost tracking:**
- Markeer deals als gewonnen of verloren
- Reden van verlies (optioneel)
- Impact op analytics en rapportage`,
      },
      {
        title: "Stage automatisering",
        icon: Zap,
        content: `Configureer automatische acties per stage:

**Stage instellingen openen:**
1. Ga naar je pipeline
2. Klik op 'Stages Bewerken' (tandwiel icoon)
3. Bij elke stage zie je de automatisering opties

**Follow-up herinnering:**
- Schakel in per stage
- Stel aantal dagen in (bijv. 2 dagen)
- Je krijgt een notificatie als een lead te lang in de stage staat
- Perfect voor stages zoals "1x Gebeld" of "Offerte Verstuurd"

**Laatste poging (Final Attempt):**
- Markeer een stage als laatste poging
- Ideaal voor stages zoals "2x Gebeld" of "3x Gebeld"
- Extra opties worden beschikbaar:

**Auto naar Verloren:**
- Als de follow-up periode verloopt, wordt de lead automatisch naar "Verloren" verplaatst
- Geen handmatige actie nodig
- Houdt je pipeline schoon

**Stuur afscheids-email:**
- Automatische email naar de lead wanneer deze naar Verloren gaat
- Professionele afsluiting van het contact
- Bevat bedankje en uitnodiging voor toekomstig contact

**Voorbeeld configuratie:**
1. **1x Gebeld** - Follow-up: 2 dagen
2. **2x Gebeld** - Follow-up: 2 dagen, Laatste poging: aan
3. **3x Gebeld** - Follow-up: 2 dagen, Laatste poging: aan, Auto naar Verloren: aan, Email: aan`,
      },
    ],
  },
  {
    id: "calling",
    title: "Bel Nu Queue",
    icon: PhoneCall,
    color: "emerald",
    description: "Efficiënt bellen met de leads queue",
    features: [
      {
        title: "De Bel Nu weergave",
        icon: Phone,
        content: `De 'Bel Nu' queue is speciaal ontworpen voor telefonische acquisitie:

**Wat je ziet:**
- Lijst van alle leads die gebeld moeten worden
- Formulier badge (bijv. "Airco Leads", "Thuisbatterijen")
- Contactgegevens met click-to-call
- Aantal eerdere belpogingen
- Tijd sinds laatste actie

**Snelfilters:**
- Nieuw (nog nooit gebeld)
- Terugbellen (callback periode verlopen)
- Alle actieve leads

**Hoe te openen:**
Ga naar Contacts → Bel Nu (of gebruik de snelkoppeling in de sidebar)`,
      },
      {
        title: "Actieknoppen",
        icon: MousePointerClick,
        content: `Elke lead kaart heeft directe actieknoppen:

**🟢 Gebeld - Geïnteresseerd:**
- Lead gaat naar 'Gekwalificeerd' stage
- Maak direct een opportunity aan
- Voeg notities toe over het gesprek

**🟡 Niet Bereikt:**
- Belpoging wordt geregistreerd (+1)
- Lead blijft in queue voor later
- Na 3 pogingen: optioneel automatische email

**🔵 Later Terugbellen:**
- Kies periode: 1 week, 1 maand, 3 maanden, 6 maanden
- Lead verdwijnt tijdelijk uit queue
- Komt automatisch terug na de periode

**🔴 Niet Geïnteresseerd:**
- Lead wordt gemarkeerd als 'Verloren'
- Verdwijnt uit de bel queue
- Blijft beschikbaar in contacten archief`,
      },
      {
        title: "Call tracking",
        icon: Activity,
        content: `LeadFlow houdt automatisch bij:

**Per contact:**
- Totaal aantal belpogingen
- Datum/tijd laatste poging
- Resultaat per poging
- Wie heeft gebeld (teamlid)

**Statistieken:**
- Conversie rate (gebeld → geïnteresseerd)
- Gemiddeld aantal pogingen tot conversie
- Beste tijdstippen om te bellen
- Performance per teamlid

**Voordelen:**
- Nooit dubbel bellen
- Altijd weten waar je gebleven was
- Team kan werk overnemen
- Inzicht in bell-effectiviteit`,
      },
    ],
  },
  {
    id: "automation",
    title: "Automatisering",
    icon: Zap,
    color: "amber",
    description: "Automatische follow-ups en lead processing",
    features: [
      {
        title: "Auto follow-up systeem",
        icon: Repeat,
        content: `LeadFlow biedt twee niveaus van automatisering:

**1. Workspace-niveau (CRM Settings → Follow-ups):**
- **Auto Follow-Up**: Schakel automatische herinnering in/uit
- **Follow-Up Dagen**: Na hoeveel dagen zonder actie moet de lead terug naar 'Lead' stage
- **Max Belpogingen**: Na hoeveel mislukte pogingen wordt een lead 'Verloren'
- **Email bij Verloren**: Stuur automatisch een email na max pogingen

**2. Per-stage niveau (Pipeline → Stages Bewerken):**
- **Follow-up herinnering**: Per stage apart instellen
- **Laatste poging**: Markeer bepaalde stages als laatste poging
- **Auto naar Verloren**: Automatisch verplaatsen na follow-up periode
- **Afscheids-email**: Automatisch email sturen bij verplaatsing naar Lost

**Hoe het werkt:**
1. Je belt een contact
2. Geen gehoor? Markeer als 'Niet bereikt'
3. Lead gaat naar "1x Gebeld" stage
4. Na X dagen krijg je een follow-up notificatie
5. Bij "laatste poging" stages: lead gaat automatisch naar Verloren
6. Optioneel wordt automatisch een afscheids-email verstuurd`,
      },
      {
        title: "Callback periodes",
        icon: Timer,
        content: `Plan callbacks in voor later:

**Beschikbare periodes:**
- 1 week
- 1 maand
- 3 maanden
- 6 maanden

**Hoe te gebruiken:**
1. Bij een contact, klik 'Later Terugbellen'
2. Selecteer de gewenste periode
3. Contact wordt automatisch opnieuw geactiveerd na de periode

**Voordelen:**
- Verlies geen leads die nu niet klaar zijn
- Automatische herinneringen
- Perfecte timing voor follow-up`,
      },
      {
        title: "3-Gesprekken email",
        icon: MailCheck,
        content: `Na 3 mislukte belpogingen kan LeadFlow automatisch een email sturen:

**Automatische email bevat:**
- Gepersonaliseerde aanhef
- Mededeling dat je geprobeerd hebt te bellen
- Uitnodiging om contact op te nemen
- Je contactgegevens

**Vereisten:**
- Contact moet een email adres hebben
- Instelling moet ingeschakeld zijn in CRM Settings
- Minimaal 3 'niet bereikt' pogingen

Dit verhoogt je kans op conversie wanneer telefonisch contact niet lukt.`,
      },
    ],
  },
  {
    id: "analytics",
    title: "Analytics & Rapportage",
    icon: BarChart3,
    color: "emerald",
    description: "Inzicht in je sales performance",
    features: [
      {
        title: "Dashboard metrics",
        icon: PieChart,
        content: `Het analytics dashboard toont de belangrijkste KPI's:

**Hoofdmetrics:**
- **Totale Omzet**: Som van gewonnen deals
- **Nieuwe Leads**: Aantal nieuwe contacten in periode
- **Conversie Rate**: % deals gewonnen van totaal
- **Gem. Deal Grootte**: Gemiddelde waarde van gewonnen deals
- **Pipeline Waarde**: Totale waarde actieve deals
- **Sales Cycle**: Gemiddelde dagen van lead tot deal

**Vergelijking:**
Elke metric toont ook de vergelijking met de vorige periode (% stijging/daling).`,
      },
      {
        title: "Revenue tracking",
        icon: TrendingUp,
        content: `Analyseer je omzet over tijd:

**Grafieken:**
- Omzet per dag/week/maand
- Trend lijn over geselecteerde periode
- Vergelijking met vorige periode

**Filters:**
- Datumbereik selecteren
- Per pipeline filteren
- Per teamlid bekijken

**Inzichten:**
- Beste maanden/weken identificeren
- Seizoenspatronen herkennen
- Groei/daling trends spotten`,
      },
      {
        title: "Pipeline funnel",
        icon: Activity,
        content: `Visualiseer je sales funnel:

**Funnel weergave:**
- Aantal opportunities per stage
- Waarde per stage
- Conversie tussen stages
- Kleuren per stage

**Metrics per stage:**
- Aantal deals in stage
- Totale waarde in stage
- Gemiddelde dagen in stage
- Conversion rate naar volgende stage

Dit helpt je bottlenecks te identificeren in je sales proces.`,
      },
    ],
  },
  {
    id: "meta-integration",
    title: "Meta Lead Ads Integratie",
    icon: Globe,
    color: "blue",
    description: "Facebook & Instagram leads automatisch importeren",
    features: [
      {
        title: "Verbinding maken",
        icon: Zap,
        content: `Koppel je Meta (Facebook/Instagram) account:

**Stappen:**
1. Ga naar CRM Settings → Integraties
2. Klik 'Verbinden' bij Meta Lead Ads
3. Log in met je Facebook account
4. Geef LeadFlow toegang tot je pagina's
5. Selecteer welke pagina's je wilt koppelen

**Vereisten:**
- Facebook Business account
- Beheerder van de Facebook pagina
- Actieve Lead Ads campagnes

**Beveiliging:**
- OAuth 2.0 authenticatie
- Tokens worden versleuteld opgeslagen
- Je kunt de verbinding altijd verbreken`,
      },
      {
        title: "Formulieren beheren",
        icon: FileText,
        content: `Beheer je Facebook/Instagram lead formulieren:

**Formulieren pagina (CRM Settings → Integraties → Lead Formulieren):**
- Overzicht van al je lead formulieren
- Per form: aantal leads en laatste lead datum
- Sync knop om nieuwe forms op te halen

**Formulier aanpassen:**
- Geef elk formulier een herkenbare naam (bijv. "Airco Leads", "Thuisbatterijen")
- De aangepaste naam wordt getoond als badge bij elke lead
- Schakel formulieren actief/inactief
- Bekijk welke velden het formulier bevat

**Lead badges:**
- Elke lead krijgt automatisch een badge met de formuliernaam
- Zo zie je direct of het een Airco of Thuisbatterij lead is
- Badge is zichtbaar in contactenlijst, pipeline en leads queue

**Voordelen:**
- Snel herkennen welk product de lead wil
- Betere voorbereiding voor gesprekken
- Eenvoudig filteren op formulier`,
      },
      {
        title: "Real-time sync",
        icon: Repeat,
        content: `Leads worden real-time gesynchroniseerd:

**Hoe het werkt:**
1. Iemand vult een Lead Ad form in
2. Meta stuurt een webhook naar LeadFlow
3. LeadFlow verwerkt de lead binnen seconden
4. Contact en opportunity worden automatisch aangemaakt
5. Je ziet de nieuwe lead direct in je pipeline

**Tracking:**
- Lead Gen ID (uniek)
- Pagina waarop de lead binnenkwam
- Form dat werd ingevuld (met jouw aangepaste naam!)
- Alle form velden en antwoorden
- Timestamp van inzending

**Lead attributie:**
- Formulier naam als badge zichtbaar
- Campagne, ad set en ad ID opgeslagen
- UTM parameters (indien aanwezig)`,
      },
    ],
  },
  {
    id: "team",
    title: "Team & Organisatie",
    icon: Building2,
    color: "violet",
    description: "Samenwerken met je team",
    features: [
      {
        title: "Organisatie structuur",
        icon: Building2,
        content: `LeadFlow ondersteunt multi-tenancy:

**Organisatie:**
- Top-level account
- Eigen slug (URL)
- Meerdere workspaces mogelijk

**Workspace:**
- Sub-account binnen organisatie
- Eigen contacten, pipelines, analytics
- Gescheiden data

**Voordelen:**
- Meerdere afdelingen/teams apart beheren
- Gescheiden rapportage
- Flexibele structuur`,
      },
      {
        title: "Rollen & rechten",
        icon: Shield,
        content: `LeadFlow heeft een role-based access control systeem:

**Beschikbare rollen:**

**Owner:**
- Volledige toegang tot alles
- Kan organisatie instellingen wijzigen
- Kan andere gebruikers beheren
- Kan betalingen beheren

**Admin:**
- Toegang tot alle CRM functies
- Kan team instellingen beheren
- Kan gebruikers uitnodigen
- Kan niet facturatie wijzigen

**Member:**
- Standaard CRM toegang
- Kan contacten en deals beheren
- Kan analytics bekijken
- Beperkte instellingen toegang`,
      },
      {
        title: "Teamleden toevoegen",
        icon: UserPlus,
        content: `Nodig collega's uit voor je workspace:

**Uitnodigen:**
1. Ga naar Settings → Team
2. Klik 'Teamlid uitnodigen'
3. Voer het email adres in
4. Selecteer de rol (Admin/Member)
5. Verstuur de uitnodiging

**Onboarding:**
- Collega ontvangt email met uitnodiging
- Account aanmaken (of inloggen)
- Direct toegang tot de workspace

**Beheer:**
- Bekijk alle teamleden
- Wijzig rollen
- Verwijder toegang indien nodig`,
      },
    ],
  },
  {
    id: "settings",
    title: "Instellingen",
    icon: Settings,
    color: "zinc",
    description: "Configureer LeadFlow naar jouw wensen",
    features: [
      {
        title: "CRM instellingen",
        icon: Settings,
        content: `Pas je CRM aan in CRM Settings:

**Follow-up configuratie:**
- Auto follow-up aan/uit
- Aantal dagen voor follow-up
- Maximum belpogingen
- Email bij verloren deal

**Callback periodes:**
- Beschikbare periodes instellen
- Periodes in/uitschakelen

**Integraties:**
- Meta Lead Ads koppelen
- Webhook configuratie
- API toegang`,
      },
      {
        title: "Account instellingen",
        icon: UserCheck,
        content: `Beheer je persoonlijke account:

**Profiel:**
- Naam wijzigen
- Email adres
- Profielfoto

**Organisatie:**
- Organisatie naam
- Bekijk je rol

**Beveiliging:**
- Wachtwoord wijzigen
- Account verwijderen

**Thema:**
- Light mode
- Dark mode`,
      },
      {
        title: "Data & Privacy",
        icon: Lock,
        content: `LeadFlow neemt privacy serieus:

**GDPR compliance:**
- Data deletion request mogelijk
- Export je data
- Inzicht in opgeslagen gegevens

**Audit logging:**
- Alle acties worden gelogd
- Wie deed wat, wanneer
- IP adres en user agent

**Beveiliging:**
- Versleutelde tokens
- Veilige authenticatie
- Role-based access control`,
      },
    ],
  },
  {
    id: "invoicing",
    title: "Facturatie",
    icon: Receipt,
    color: "emerald",
    description: "Offertes, facturen en producten beheren",
    features: [
      {
        title: "Offertes maken",
        icon: FileText,
        content: `Maak professionele offertes voor je klanten:

**Offerte aanmaken:**
1. Ga naar Facturatie → Offertes
2. Klik op 'Nieuwe Offerte'
3. Selecteer een contact uit je CRM
4. Voeg producten/diensten toe met de line item editor
5. Pas prijzen, hoeveelheden en BTW aan
6. Voeg een optionele notitie toe
7. Sla op als concept of verstuur direct

**Offerte opties:**
- Vervaldatum instellen
- Korting toevoegen (% of vast bedrag)
- Verschillende BTW tarieven per regel
- Automatische subtotaal en totaal berekening

**Offerte statussen:**
- **Concept**: Nog niet verstuurd, bewerkbaar
- **Verstuurd**: Email naar klant verzonden
- **Geaccepteerd**: Klant heeft akkoord gegeven
- **Afgewezen**: Klant heeft afgewezen
- **Verlopen**: Vervaldatum is verstreken`,
      },
      {
        title: "Facturen maken",
        icon: Receipt,
        content: `Verstuur professionele facturen:

**Factuur aanmaken:**
1. Ga naar Facturatie → Facturen
2. Klik op 'Nieuwe Factuur'
3. Selecteer een contact
4. Voeg producten/diensten toe
5. Stel betalingstermijn in
6. Genereer en verstuur

**Van offerte naar factuur:**
- Accepteerde offertes kunnen met één klik omgezet worden naar factuur
- Alle gegevens worden automatisch overgenomen

**Factuur functies:**
- Automatische factuurnummering
- PDF generatie met je bedrijfsgegevens
- Direct versturen via email
- Betaallink toevoegen (Stripe integratie)

**Factuur statussen:**
- **Concept**: Nog niet verstuurd
- **Verstuurd**: Email naar klant verzonden
- **Betaald**: Betaling ontvangen
- **Te laat**: Betaaldatum verstreken`,
      },
      {
        title: "Producten catalogus",
        icon: Package,
        content: `Beheer je producten en diensten:

**Product toevoegen:**
1. Ga naar Facturatie → Producten
2. Klik op 'Nieuw Product'
3. Vul naam en beschrijving in
4. Stel prijs en BTW tarief in
5. Optioneel: voeg SKU code toe

**Product eigenschappen:**
- Productnaam
- Beschrijving
- Standaard prijs (exclusief BTW)
- BTW percentage (21%, 9%, 0%)
- SKU/Artikelnummer
- Actief/Inactief status

**Voordelen:**
- Snel selecteren bij offertes/facturen
- Consistente prijzen
- Automatische BTW berekening
- Overzicht van al je diensten`,
      },
      {
        title: "BTW instellingen",
        icon: Percent,
        content: `Configureer je BTW/VAT instellingen:

**Beschikbare tarieven:**
- 21% - Standaard BTW tarief
- 9% - Verlaagd tarief
- 0% - Vrijgesteld/Export

**Facturatie instellingen:**
1. Ga naar Facturatie → Instellingen
2. Vul je bedrijfsgegevens in:
   - Bedrijfsnaam
   - Adres
   - KvK nummer
   - BTW nummer
3. Upload je logo voor op facturen

**Betalingsopties:**
- Standaard betalingstermijn (bijv. 14 dagen)
- Bankgegevens voor overschrijving
- Stripe koppeling voor online betaling

**Op je factuur:**
- BTW specificatie per regel
- Subtotaal exclusief BTW
- BTW bedrag uitgesplitst
- Totaal inclusief BTW`,
      },
      {
        title: "Email & PDF",
        icon: Mail,
        content: `Verstuur professionele documenten:

**PDF generatie:**
- Automatische PDF creatie voor offertes en facturen
- Je bedrijfslogo en gegevens
- Professionele opmaak
- Download optie voor je administratie

**Email verzending:**
- Direct versturen vanuit LeadFlow
- Gepersonaliseerde begeleidende tekst
- PDF als bijlage
- Track of email is geopend

**Email templates:**
- Standaard offerte email
- Standaard factuur email
- Betalingsherinnering (automatisch)

**Wat de klant ontvangt:**
- Nette email met je bedrijfsbranding
- PDF bijlage
- Optioneel: "Betaal nu" link voor directe betaling`,
      },
      {
        title: "Dashboard & Statistieken",
        icon: BarChart3,
        content: `Houd je facturatie overzichtelijk:

**Dashboard metrics:**
- Totaal gefactureerd deze maand
- Openstaande facturen
- Te laat betalingen
- Omzet statistieken

**Offerte statistieken:**
- Aantal verstuurde offertes
- Acceptatie percentage
- Gemiddelde offerte waarde
- Conversie naar factuur

**Factuur overzicht:**
- Alle facturen op één plek
- Filter op status (concept, verstuurd, betaald, te laat)
- Zoeken op klantnaam of factuurnummer
- Exporteer voor je boekhouding

**Productiviteit:**
- Snelle acties: versturen, markeren als betaald
- Bulk operaties mogelijk
- Dupliceer bestaande documenten`,
      },
    ],
  },
];

// ============================================
// FAQ
// ============================================
const faqCategories = [
  {
    category: "Algemeen",
    questions: [
      {
        q: "Wat is LeadFlow?",
        a: "LeadFlow is een CRM platform specifiek ontworpen voor lead generation. Het combineert contactbeheer, visuele pipelines, en automatische Meta Lead Ads integratie in één tool.",
      },
      {
        q: "Voor wie is LeadFlow geschikt?",
        a: "LeadFlow is perfect voor bedrijven die werken met leads uit Meta (Facebook/Instagram) advertenties, sales teams die een overzichtelijke pipeline willen, en iedereen die telefonische acquisitie doet.",
      },
      {
        q: "Kan ik LeadFlow gratis proberen?",
        a: "Ja, je kunt LeadFlow gratis uitproberen. Neem contact op voor meer informatie over onze plannen en prijzen.",
      },
      {
        q: "Wat is de 'Bel Nu' queue?",
        a: "De 'Bel Nu' queue is een speciale weergave voor telefonische acquisitie. Je ziet alle leads die gebeld moeten worden in een overzichtelijke lijst, met directe actieknoppen: Bel, Niet Bereikt, Later Terugbellen, of Niet Geïnteresseerd. Perfect voor call-center workflows.",
      },
    ],
  },
  {
    category: "Contacten & Leads",
    questions: [
      {
        q: "Hoe importeer ik bestaande contacten?",
        a: "Op dit moment kun je contacten handmatig toevoegen of via de Meta integratie. CSV import functionaliteit komt binnenkort beschikbaar.",
      },
      {
        q: "Kan ik custom velden toevoegen aan contacten?",
        a: "Custom velden staan op onze roadmap. Momenteel worden alle Meta form velden opgeslagen in het systeem en zijn beschikbaar via de API.",
      },
      {
        q: "Worden duplicaten automatisch gedetecteerd?",
        a: "LeadFlow controleert op basis van email adres of een contact al bestaat. Bij Meta leads wordt ook de unieke lead ID gebruikt om duplicaten te voorkomen.",
      },
    ],
  },
  {
    category: "Pipelines",
    questions: [
      {
        q: "Kan ik meerdere pipelines hebben?",
        a: "Ja, je kunt onbeperkt pipelines aanmaken. Handig voor verschillende processen zoals Sales, Recruitment, of Partner acquisitie.",
      },
      {
        q: "Wat gebeurt er als ik een stage verwijder?",
        a: "Opportunities in die stage moeten eerst verplaatst worden naar een andere stage voordat je de stage kunt verwijderen.",
      },
      {
        q: "Kan ik de volgorde van stages aanpassen?",
        a: "Ja, sleep stages naar de gewenste positie om de volgorde aan te passen. De volgorde wordt automatisch opgeslagen.",
      },
    ],
  },
  {
    category: "Meta Integratie",
    questions: [
      {
        q: "Welke Meta producten worden ondersteund?",
        a: "LeadFlow integreert met Facebook Lead Ads en Instagram Lead Ads. Leads van beide platforms komen automatisch binnen.",
      },
      {
        q: "Hoe snel komen leads binnen?",
        a: "Leads worden real-time verwerkt. Zodra iemand een formulier invult, verschijnt de lead binnen enkele seconden in je pipeline.",
      },
      {
        q: "Hoe zie ik van welk formulier een lead komt?",
        a: "Elke lead krijgt automatisch een badge met de formuliernaam. Je kunt formulieren een herkenbare naam geven (bijv. 'Airco Leads') via CRM Settings → Integraties → Lead Formulieren. Deze naam wordt dan getoond bij alle leads van dat formulier.",
      },
      {
        q: "Wat als mijn Meta verbinding verbreekt?",
        a: "Je ontvangt een notificatie en kunt de verbinding opnieuw maken in CRM Settings → Integraties. Geen leads gaan verloren.",
      },
      {
        q: "Worden alle formulier velden opgeslagen?",
        a: "Ja, alle velden die de lead invult worden opgeslagen. Je kunt ze mappen naar LeadFlow velden of ze blijven beschikbaar als ruwe data.",
      },
    ],
  },
  {
    category: "Automatisering",
    questions: [
      {
        q: "Wat doet de auto follow-up functie?",
        a: "Als er X dagen geen actie is op een lead, wordt deze automatisch terug verplaatst naar de 'Lead' stage zodat je niet vergeet op te volgen.",
      },
      {
        q: "Hoe werkt de 3-gesprekken email?",
        a: "Na 3 mislukte belpogingen (niet bereikt) stuurt LeadFlow automatisch een email naar de lead met de vraag om contact op te nemen. Dit verhoogt je bereikbaarheid.",
      },
      {
        q: "Kan ik automatisering per stage instellen?",
        a: "Ja! Ga naar je pipeline en klik op 'Stages Bewerken'. Per stage kun je instellen: follow-up herinnering (na X dagen), of het een 'laatste poging' stage is, automatisch verplaatsen naar Verloren, en automatische afscheids-email. Zo kun je bijvoorbeeld instellen dat na de '3x Gebeld' stage leads automatisch naar Verloren gaan met een afscheids-email.",
      },
      {
        q: "Kan ik de email templates aanpassen?",
        a: "Custom email templates staan op onze roadmap. Momenteel worden professionele standaard templates gebruikt.",
      },
    ],
  },
  {
    category: "Team & Toegang",
    questions: [
      {
        q: "Hoeveel teamleden kan ik toevoegen?",
        a: "Dit hangt af van je plan. Neem contact op voor informatie over team limieten per plan.",
      },
      {
        q: "Kan ik zien wie wat heeft gedaan?",
        a: "Ja, LeadFlow houdt een complete audit log bij. Je ziet wie contacten heeft aangemaakt, opportunities heeft verplaatst, etc.",
      },
      {
        q: "Kan ik bepaalde pipelines afschermen?",
        a: "Geavanceerde pipeline permissions staan op onze roadmap. Momenteel hebben alle teamleden toegang tot alle pipelines in de workspace.",
      },
    ],
  },
  {
    category: "Privacy & GDPR",
    questions: [
      {
        q: "Is LeadFlow GDPR-compliant?",
        a: "Ja, LeadFlow is volledig GDPR-compliant. We verwerken data volgens de Europese privacywetgeving, bieden data deletion mogelijkheden, en hebben een uitgebreide privacy policy.",
      },
      {
        q: "Waar kan ik de privacy policy vinden?",
        a: "Onze privacy policy is beschikbaar op /privacy. Hier lees je exact welke data we verzamelen, hoe we deze gebruiken, en wat je rechten zijn.",
      },
      {
        q: "Hoe vraag ik data deletion aan?",
        a: "Ga naar /data-deletion voor instructies. Je kunt een verzoek indienen via email naar privacy@wetryleadflow.com. We verwijderen je data binnen 30 dagen.",
      },
      {
        q: "Wat gebeurt er als een Facebook gebruiker data deletion vraagt?",
        a: "Als iemand via Facebook data deletion aanvraagt, ontvangen wij automatisch een bericht. We verwijderen dan alle gerelateerde data: contacten, leads, form data, en Meta connecties.",
      },
      {
        q: "Hoe lang bewaren jullie data?",
        a: "We bewaren data zolang je account actief is. Na account verwijdering wordt alle data binnen 30 dagen permanent verwijderd. Audit logs worden maximaal 2 jaar bewaard voor compliance.",
      },
      {
        q: "Is mijn data veilig?",
        a: "Ja. We gebruiken versleuteling voor data in transit (TLS) en gevoelige data at rest. Meta tokens worden encrypted opgeslagen. We hebben Row Level Security op database niveau voor tenant isolatie.",
      },
    ],
  },
  {
    category: "Facturatie",
    questions: [
      {
        q: "Hoe maak ik een offerte aan?",
        a: "Ga naar Facturatie → Offertes en klik op 'Nieuwe Offerte'. Selecteer een contact, voeg producten toe met de line item editor, stel prijzen en BTW in, en verstuur direct of sla op als concept.",
      },
      {
        q: "Kan ik een offerte omzetten naar factuur?",
        a: "Ja! Wanneer een offerte is geaccepteerd, kun je met één klik een factuur genereren. Alle gegevens (contact, producten, prijzen) worden automatisch overgenomen.",
      },
      {
        q: "Welke BTW tarieven kan ik gebruiken?",
        a: "LeadFlow ondersteunt de Nederlandse BTW tarieven: 21% (standaard), 9% (verlaagd), en 0% (vrijgesteld/export). Je kunt per factuurregel een ander tarief selecteren.",
      },
      {
        q: "Hoe stel ik mijn bedrijfsgegevens in?",
        a: "Ga naar Facturatie → Instellingen. Hier kun je je bedrijfsnaam, adres, KvK nummer, BTW nummer en bankgegevens invullen. Deze gegevens verschijnen op al je facturen en offertes.",
      },
      {
        q: "Kan ik mijn logo op facturen zetten?",
        a: "Ja, in Facturatie → Instellingen kun je je bedrijfslogo uploaden. Dit logo verschijnt automatisch op alle PDF's van offertes en facturen.",
      },
      {
        q: "Hoe werkt de Stripe integratie?",
        a: "Met Stripe kun je betaallinks toevoegen aan facturen. Klanten kunnen dan direct online betalen via iDEAL, creditcard of andere betaalmethodes. Ga naar Facturatie → Instellingen om Stripe te koppelen.",
      },
      {
        q: "Worden facturen automatisch genummerd?",
        a: "Ja, LeadFlow genereert automatisch unieke factuurnummers in het formaat INV-YYYYMMDD-XXXX. Je kunt de nummering niet handmatig wijzigen om de integriteit te waarborgen.",
      },
      {
        q: "Kan ik betalingsherinneringen sturen?",
        a: "Automatische betalingsherinneringen staan op onze roadmap. Momenteel kun je handmatig herinneringen versturen door een factuur opnieuw te verzenden.",
      },
    ],
  },
];

// ============================================
// UPCOMING FEATURES
// ============================================
const upcomingFeatures = [
  {
    title: "CSV Import/Export",
    description: "Importeer contacten uit Excel of exporteer je data",
    icon: Upload,
    status: "Q1 2025",
  },
  {
    title: "Custom velden",
    description: "Voeg eigen velden toe aan contacten",
    icon: Tag,
    status: "Q1 2025",
  },
  {
    title: "Email templates",
    description: "Pas automatische emails aan met je eigen branding",
    icon: Mail,
    status: "Q2 2025",
  },
  {
    title: "WhatsApp integratie",
    description: "Stuur WhatsApp berichten direct vanuit LeadFlow",
    icon: Smartphone,
    status: "Q2 2025",
  },
  {
    title: "Google Calendar",
    description: "Plan afspraken en sync met je agenda",
    icon: Calendar,
    status: "Q2 2025",
  },
  {
    title: "Zapier integratie",
    description: "Verbind met 5000+ apps via Zapier",
    icon: Zap,
    status: "Q3 2025",
  },
];

// ============================================
// COMPONENT
// ============================================
export default function InfocentrumPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<{
    categoryId: string;
    featureIndex: number;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<"guides" | "features" | "faq">("guides");

  const colorClasses: Record<string, { bg: string; text: string; border: string; light: string }> = {
    violet: {
      bg: "bg-violet-100 dark:bg-violet-900/30",
      text: "text-violet-600 dark:text-violet-400",
      border: "border-violet-200 dark:border-violet-800",
      light: "bg-violet-50 dark:bg-violet-950/30",
    },
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      light: "bg-blue-50 dark:bg-blue-950/30",
    },
    emerald: {
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-200 dark:border-emerald-800",
      light: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    amber: {
      bg: "bg-amber-100 dark:bg-amber-900/30",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      light: "bg-amber-50 dark:bg-amber-950/30",
    },
    zinc: {
      bg: "bg-zinc-100 dark:bg-zinc-800",
      text: "text-zinc-600 dark:text-zinc-400",
      border: "border-zinc-200 dark:border-zinc-700",
      light: "bg-zinc-50 dark:bg-zinc-900",
    },
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 shadow-lg shadow-violet-500/25">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Infocentrum</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Alles wat je nodig hebt om het maximale uit LeadFlow te halen
              </p>
            </div>
          </div>
        </div>

        {/* Search (placeholder) */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Zoek in handleidingen, FAQ's en meer..."
              className="w-full rounded-xl border border-zinc-200/50 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-violet-300 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:focus:border-violet-700"
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 flex gap-2 border-b border-zinc-200/50 dark:border-zinc-800/50">
          {[
            { id: "guides", label: "Snel starten", icon: Rocket },
            { id: "features", label: "Features", icon: Sparkles },
            { id: "faq", label: "FAQ", icon: HelpCircle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "border-violet-500 text-violet-600 dark:text-violet-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Quick Start Tab */}
        {activeTab === "guides" && (
          <div className="space-y-8">
            {/* Quick Start Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {quickStartGuides.map((guide) => {
                const colors = colorClasses[guide.color];
                const isOpen = selectedGuide === guide.id;

                return (
                  <div
                    key={guide.id}
                    className={cn(
                      "rounded-xl border transition-all",
                      isOpen
                        ? `${colors.border} ${colors.light}`
                        : "border-zinc-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-900/50"
                    )}
                  >
                    <button
                      onClick={() => setSelectedGuide(isOpen ? null : guide.id)}
                      className="flex w-full items-start gap-4 p-5 text-left"
                    >
                      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", colors.bg, colors.text)}>
                        <guide.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{guide.title}</h3>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 text-zinc-400 transition-transform",
                              isOpen && "rotate-180"
                            )}
                          />
                        </div>
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                          {guide.description}
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-xs text-zinc-400">
                          <Clock className="h-3 w-3" />
                          {guide.duration}
                        </div>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t border-zinc-200/50 px-5 py-4 dark:border-zinc-800/50">
                        <ol className="space-y-3">
                          {guide.steps.map((step, idx) => (
                            <li key={idx} className="flex gap-3 text-sm">
                              <span className={cn(
                                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium",
                                colors.bg,
                                colors.text
                              )}>
                                {idx + 1}
                              </span>
                              <span className="text-zinc-600 dark:text-zinc-300">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Links */}
            <div className="rounded-xl border border-zinc-200/50 bg-zinc-50/50 p-6 dark:border-zinc-800/50 dark:bg-zinc-900/30">
              <h3 className="mb-4 font-semibold">Snelle links</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <Link
                  href="/crm/contacts"
                  className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:text-violet-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-violet-400"
                >
                  <Users className="h-4 w-4" />
                  Contacten
                  <ArrowRight className="ml-auto h-3 w-3" />
                </Link>
                <Link
                  href="/crm/pipelines"
                  className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:text-violet-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-violet-400"
                >
                  <Kanban className="h-4 w-4" />
                  Pipelines
                  <ArrowRight className="ml-auto h-3 w-3" />
                </Link>
                <Link
                  href="/crm/invoicing"
                  className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:text-violet-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-violet-400"
                >
                  <Receipt className="h-4 w-4" />
                  Facturatie
                  <ArrowRight className="ml-auto h-3 w-3" />
                </Link>
                <Link
                  href="/crm/analytics"
                  className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:text-violet-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-violet-400"
                >
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                  <ArrowRight className="ml-auto h-3 w-3" />
                </Link>
                <Link
                  href="/crm/settings"
                  className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:text-violet-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-violet-400"
                >
                  <Settings className="h-4 w-4" />
                  Instellingen
                  <ArrowRight className="ml-auto h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === "features" && (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Category List */}
            <div className="space-y-2">
              {featureCategories.map((category) => {
                const colors = colorClasses[category.color];
                const isSelected = selectedFeature?.categoryId === category.id;

                return (
                  <button
                    key={category.id}
                    onClick={() =>
                      setSelectedFeature(
                        isSelected ? null : { categoryId: category.id, featureIndex: 0 }
                      )
                    }
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all",
                      isSelected
                        ? `${colors.border} ${colors.light}`
                        : "border-zinc-200/50 bg-white hover:border-zinc-300 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
                    )}
                  >
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", colors.bg, colors.text)}>
                      <category.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{category.title}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{category.description}</p>
                    </div>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 text-zinc-400 transition-transform",
                        isSelected && "rotate-90"
                      )}
                    />
                  </button>
                );
              })}
            </div>

            {/* Feature Content */}
            <div className="lg:col-span-2">
              {selectedFeature ? (
                <div className="rounded-xl border border-zinc-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-900/50">
                  {(() => {
                    const category = featureCategories.find((c) => c.id === selectedFeature.categoryId);
                    if (!category) return null;
                    const colors = colorClasses[category.color];

                    return (
                      <>
                        {/* Feature Tabs */}
                        <div className="flex gap-1 overflow-x-auto border-b border-zinc-200/50 p-2 dark:border-zinc-800/50">
                          {category.features.map((feature, idx) => (
                            <button
                              key={idx}
                              onClick={() =>
                                setSelectedFeature({ ...selectedFeature, featureIndex: idx })
                              }
                              className={cn(
                                "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                selectedFeature.featureIndex === idx
                                  ? `${colors.bg} ${colors.text}`
                                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                              )}
                            >
                              <feature.icon className="h-4 w-4" />
                              {feature.title}
                            </button>
                          ))}
                        </div>

                        {/* Feature Content */}
                        <div className="p-6">
                          <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none">
                            {category.features[selectedFeature.featureIndex].content
                              .split("\n\n")
                              .map((paragraph, idx) => {
                                if (paragraph.startsWith("**") && paragraph.endsWith(":**")) {
                                  return (
                                    <h4 key={idx} className="mt-6 first:mt-0 font-semibold">
                                      {paragraph.replace(/\*\*/g, "").replace(":", "")}
                                    </h4>
                                  );
                                }
                                if (paragraph.startsWith("**")) {
                                  return (
                                    <h4 key={idx} className="mt-6 first:mt-0 font-semibold">
                                      {paragraph.replace(/\*\*/g, "")}
                                    </h4>
                                  );
                                }
                                if (paragraph.startsWith("- ")) {
                                  return (
                                    <ul key={idx} className="mt-2 space-y-1">
                                      {paragraph.split("\n").map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <CheckCircle2 className={cn("mt-0.5 h-4 w-4 shrink-0", colors.text)} />
                                          <span
                                            dangerouslySetInnerHTML={{
                                              __html: item
                                                .replace("- ", "")
                                                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                                            }}
                                          />
                                        </li>
                                      ))}
                                    </ul>
                                  );
                                }
                                if (paragraph.match(/^\d+\./)) {
                                  return (
                                    <ol key={idx} className="mt-2 space-y-2">
                                      {paragraph.split("\n").map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <span
                                            className={cn(
                                              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-medium",
                                              colors.bg,
                                              colors.text
                                            )}
                                          >
                                            {i + 1}
                                          </span>
                                          <span
                                            dangerouslySetInnerHTML={{
                                              __html: item
                                                .replace(/^\d+\.\s*/, "")
                                                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                                            }}
                                          />
                                        </li>
                                      ))}
                                    </ol>
                                  );
                                }
                                return (
                                  <p
                                    key={idx}
                                    className="mt-3 first:mt-0"
                                    dangerouslySetInnerHTML={{
                                      __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                                    }}
                                  />
                                );
                              })}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-zinc-200/50 bg-zinc-50/50 p-12 dark:border-zinc-800/50 dark:bg-zinc-900/30">
                  <div className="text-center">
                    <Sparkles className="mx-auto h-10 w-10 text-zinc-300 dark:text-zinc-600" />
                    <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                      Selecteer een categorie om de documentatie te bekijken
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <div className="space-y-6">
            {faqCategories.map((category) => (
              <div key={category.category}>
                <h3 className="mb-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.questions.map((item, idx) => {
                    const faqId = `${category.category}-${idx}`;
                    const isOpen = openFaq === faqId;

                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-zinc-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-900/50"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : faqId)}
                          className="flex w-full items-center justify-between p-4 text-left"
                        >
                          <span className="font-medium">{item.q}</span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 shrink-0 text-zinc-400 transition-transform",
                              isOpen && "rotate-180"
                            )}
                          />
                        </button>
                        {isOpen && (
                          <div className="border-t border-zinc-200/50 px-4 py-3 text-sm text-zinc-600 dark:border-zinc-800/50 dark:text-zinc-400">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upcoming Features */}
        <section className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <h2 className="text-lg font-semibold">Binnenkort beschikbaar</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingFeatures.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-3 rounded-xl border border-zinc-200/50 bg-white p-4 dark:border-zinc-800/50 dark:bg-zinc-900/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{feature.title}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{feature.description}</p>
                </div>
                <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  {feature.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section className="mt-10 rounded-xl border border-zinc-200/50 bg-gradient-to-br from-violet-50 to-blue-50 p-6 dark:border-zinc-800/50 dark:from-violet-950/30 dark:to-blue-950/30">
          <div className="flex flex-col items-center text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-lg font-semibold">Nog vragen?</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                We helpen je graag verder. Neem contact op via email of gebruik de feedback knop.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href="mailto:support@wetryleadflow.com"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40"
              >
                <Mail className="h-4 w-4" />
                Support
              </a>
              <a
                href="mailto:privacy@wetryleadflow.com"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                <Lock className="h-4 w-4" />
                Privacy
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
