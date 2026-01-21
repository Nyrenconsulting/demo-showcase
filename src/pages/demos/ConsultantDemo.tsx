import BackToShowcase from "@/components/BackToShowcase";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Lightbulb, Users, Target, CheckCircle, Mail, Phone, MapPin, Briefcase, Building, FileText, Shield, Calendar } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  details: string[];
}

const services: Service[] = [
  { 
    icon: BarChart3, 
    title: "Strategirådgivning", 
    description: "Vi hjälper er att formulera och implementera en affärsstrategi som driver tillväxt och lönsamhet.",
    details: [
      "Strategisk analys och marknadsundersökning",
      "Affärsmodellsutveckling",
      "Konkurrensanalys och positionering",
      "Tillväxtstrategi och skalning",
      "Implementeringsstöd och uppföljning",
    ]
  },
  { 
    icon: Lightbulb, 
    title: "Digital transformation", 
    description: "Modernisera er verksamhet med rätt teknologi och processer för att möta framtidens utmaningar.",
    details: [
      "Digital mognadsbedömning",
      "Teknologistrategi och roadmap",
      "Processautomatisering",
      "Data & Analytics-strategi",
      "Change management och kompetensutveckling",
    ]
  },
  { 
    icon: Users, 
    title: "Organisationsutveckling", 
    description: "Bygg en högpresterande organisation med rätt struktur, kultur och ledarskap.",
    details: [
      "Organisationsdesign och struktur",
      "Kultur- och värdegrundsarbete",
      "Ledarskapsutveckling",
      "Talent management",
      "Teamutveckling och samarbete",
    ]
  },
  { 
    icon: Target, 
    title: "Affärsutveckling", 
    description: "Identifiera nya marknader och affärsmöjligheter för att accelerera er tillväxt.",
    details: [
      "Marknadsexpansion och internationalisering",
      "Partnerskap och allianser",
      "M&A-rådgivning och due diligence",
      "Nya affärsmodeller och intäktsströmmar",
      "Innovationsledning",
    ]
  },
];

const team = [
  { name: "Johan Bergström", role: "VD & Partner", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", bio: "20+ års erfarenhet inom strategisk rådgivning" },
  { name: "Anna Lindqvist", role: "Partner, Digital", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80", bio: "Expert inom digital transformation" },
  { name: "Erik Johansson", role: "Senior Consultant", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80", bio: "Specialist på organisationsförändring" },
];

interface CaseStudy {
  client: string;
  industry: string;
  result: string;
  description: string;
  challenge: string;
  solution: string;
  quote?: string;
}

const caseStudies: CaseStudy[] = [
  { 
    client: "TechCorp AB", 
    industry: "Tech", 
    result: "+45% omsättningstillväxt", 
    description: "Strategisk omställning och digital expansion",
    challenge: "TechCorp stod inför ökad konkurrens från internationella aktörer och behövde snabbt ompositionera sig på marknaden för att behålla sin ledande position.",
    solution: "Vi genomförde en omfattande strategisk analys och utvecklade en ny Go-to-Market-strategi med fokus på premium-segment och nya digitala tjänster. Implementeringen inkluderade organisationsförändringar och ett nytt säljupplägg.",
    quote: "Bergström Consulting hjälpte oss att se våra utmaningar från ett helt nytt perspektiv. Deras insikter och pragmatiska approach var avgörande för vår framgång. - CEO, TechCorp AB"
  },
  { 
    client: "Nordic Retail", 
    industry: "Retail", 
    result: "30% kostnadsreduktion", 
    description: "Operationell effektivisering och processoptimering",
    challenge: "Nordic Retail hade under flera år sett sjunkande marginaler och behövde optimera sin verksamhet utan att kompromissa på kundupplevelsen.",
    solution: "Vi identifierade ineffektiviteter i hela värdekedjan och implementerade lean-principer i logistik och lagerhållning. Dessutom automatiserades flera administrativa processer.",
    quote: "Resultaten överträffade våra förväntningar. Vi sparade inte bara pengar utan förbättrade även vår kundnöjdhet. - COO, Nordic Retail"
  },
  { 
    client: "HealthPlus", 
    industry: "Healthcare", 
    result: "Ny marknadsledare", 
    description: "Go-to-market strategi för ny produktlansering",
    challenge: "HealthPlus hade utvecklat en innovativ produkt men saknade erfarenhet av att lansera på B2B-marknaden för sjukvård.",
    solution: "Vi utvecklade en komplett GTM-strategi inklusive prissättning, kanalstrategi och kommunikationsplan. Vi stöttade även under själva lanseringsfasen.",
    quote: "Från idé till marknadsledare på 18 månader – det hade inte varit möjligt utan Bergström Consulting. - Grundare, HealthPlus"
  },
];

const ConsultantDemo = () => {
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [caseOpen, setCaseOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [meetingForm, setMeetingForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  
  // Footer dialogs
  const [aboutOpen, setAboutOpen] = useState(false);
  const [careerOpen, setCareerOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const openServiceModal = (service: Service) => {
    setSelectedService(service);
    setServiceOpen(true);
  };

  const openCaseModal = (caseStudy: CaseStudy) => {
    setSelectedCase(caseStudy);
    setCaseOpen(true);
  };

  const handleMeetingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingForm.name || !meetingForm.email || !meetingForm.company) {
      toast.error("Vänligen fyll i alla obligatoriska fält");
      return;
    }
    toast.success(
      `Tack ${meetingForm.name}! Vi har tagit emot din förfrågan och återkommer inom 24 timmar.`
    );
    setMeetingOpen(false);
    setMeetingForm({ name: "", company: "", email: "", phone: "", service: "", message: "" });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background pt-14">
      <BackToShowcase demoName="Bergström Consulting - Konsult" />

      {/* Meeting Dialog */}
      <Dialog open={meetingOpen} onOpenChange={setMeetingOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Boka ett möte</DialogTitle>
            <DialogDescription>
              Fyll i formuläret så återkommer vi inom 24 timmar för att boka ett möte.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleMeetingSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Namn *</Label>
                <Input
                  id="name"
                  value={meetingForm.name}
                  onChange={(e) => setMeetingForm({ ...meetingForm, name: e.target.value })}
                  placeholder="Ditt namn"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Företag *</Label>
                <Input
                  id="company"
                  value={meetingForm.company}
                  onChange={(e) => setMeetingForm({ ...meetingForm, company: e.target.value })}
                  placeholder="Företagsnamn"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-post *</Label>
                <Input
                  id="email"
                  type="email"
                  value={meetingForm.email}
                  onChange={(e) => setMeetingForm({ ...meetingForm, email: e.target.value })}
                  placeholder="din@email.se"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={meetingForm.phone}
                  onChange={(e) => setMeetingForm({ ...meetingForm, phone: e.target.value })}
                  placeholder="07X XXX XX XX"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">Intresseområde</Label>
              <Select
                value={meetingForm.service}
                onValueChange={(v) => setMeetingForm({ ...meetingForm, service: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Välj tjänsteområde" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strategy">Strategirådgivning</SelectItem>
                  <SelectItem value="digital">Digital transformation</SelectItem>
                  <SelectItem value="organization">Organisationsutveckling</SelectItem>
                  <SelectItem value="business">Affärsutveckling</SelectItem>
                  <SelectItem value="other">Annat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Meddelande</Label>
              <Textarea
                id="message"
                value={meetingForm.message}
                onChange={(e) => setMeetingForm({ ...meetingForm, message: e.target.value })}
                placeholder="Beskriv kort era utmaningar eller vad ni vill diskutera..."
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full">
              Skicka förfrågan
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Service Details Dialog */}
      <Dialog open={serviceOpen} onOpenChange={setServiceOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <selectedService.icon className="h-8 w-8 text-primary" />
                  <DialogTitle>{selectedService.title}</DialogTitle>
                </div>
                <DialogDescription className="text-base mt-4">
                  {selectedService.description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6">
                <h4 className="font-semibold text-foreground mb-4">Vad ingår:</h4>
                <ul className="space-y-3">
                  {selectedService.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                className="w-full mt-6"
                onClick={() => {
                  setServiceOpen(false);
                  setMeetingForm({ ...meetingForm, service: selectedService.title.toLowerCase() });
                  setMeetingOpen(true);
                }}
              >
                Boka möte om {selectedService.title}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Case Study Dialog */}
      <Dialog open={caseOpen} onOpenChange={setCaseOpen}>
        <DialogContent className="sm:max-w-2xl">
          {selectedCase && (
            <>
              <DialogHeader>
                <span className="text-xs font-medium text-primary">{selectedCase.industry}</span>
                <DialogTitle className="text-2xl">{selectedCase.client}</DialogTitle>
                <DialogDescription>{selectedCase.description}</DialogDescription>
              </DialogHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Utmaning</h4>
                  <p className="text-muted-foreground">{selectedCase.challenge}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Lösning</h4>
                  <p className="text-muted-foreground">{selectedCase.solution}</p>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5">
                  <CheckCircle className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Resultat</p>
                    <p className="text-xl font-bold text-foreground">{selectedCase.result}</p>
                  </div>
                </div>
                {selectedCase.quote && (
                  <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                    {selectedCase.quote}
                  </blockquote>
                )}
              </div>
              <Button
                className="w-full mt-6"
                onClick={() => {
                  setCaseOpen(false);
                  setMeetingOpen(true);
                }}
              >
                Kontakta oss
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* About Dialog */}
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Building className="h-6 w-6 text-primary" />
              <DialogTitle>Om Bergström Consulting</DialogTitle>
            </div>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-muted-foreground">
              Bergström Consulting grundades 2009 av Johan Bergström med visionen att leverera 
              strategisk rådgivning av högsta kvalitet till nordiska företag.
            </p>
            <p className="text-muted-foreground">
              Idag är vi ett team på över 25 konsulter med bred erfarenhet från ledande globala 
              konsultfirmor och näringslivet. Vi kombinerar djup branschexpertis med beprövade 
              metoder för att skapa verklig förändring.
            </p>
            <div className="pt-4 border-t border-border">
              <h4 className="font-semibold text-foreground mb-2">Våra värderingar</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span><strong>Integritet</strong> – Vi sätter alltid kundens bästa först</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span><strong>Excellens</strong> – Vi levererar konsekvent högsta kvalitet</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span><strong>Samarbete</strong> – Vi bygger långsiktiga partnerskap</span>
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Career Dialog */}
      <Dialog open={careerOpen} onOpenChange={setCareerOpen}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Briefcase className="h-6 w-6 text-primary" />
              <DialogTitle>Karriär hos oss</DialogTitle>
            </div>
            <DialogDescription>Bli en del av vårt team</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <p className="text-muted-foreground">
              Vi söker alltid efter talangfulla individer som vill göra skillnad. 
              Hos oss får du möjlighet att arbeta med ledande företag och utvecklas snabbt.
            </p>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Öppna tjänster</h4>
              <div className="space-y-3">
                <div className="p-4 rounded-lg border border-border">
                  <h5 className="font-medium text-foreground">Senior Consultant – Strategy</h5>
                  <p className="text-sm text-muted-foreground mt-1">Stockholm • Heltid</p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => {
                    toast.success("Tack för ditt intresse! Skicka din ansökan till karriar@bergstromconsulting.se");
                  }}>
                    Ansök nu
                  </Button>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <h5 className="font-medium text-foreground">Manager – Digital Transformation</h5>
                  <p className="text-sm text-muted-foreground mt-1">Stockholm • Heltid</p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => {
                    toast.success("Tack för ditt intresse! Skicka din ansökan till karriar@bergstromconsulting.se");
                  }}>
                    Ansök nu
                  </Button>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <h5 className="font-medium text-foreground">Analyst – Business Development</h5>
                  <p className="text-sm text-muted-foreground mt-1">Stockholm • Heltid</p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => {
                    toast.success("Tack för ditt intresse! Skicka din ansökan till karriar@bergstromconsulting.se");
                  }}>
                    Ansök nu
                  </Button>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Hittar du ingen passande tjänst? Skicka en spontanansökan till{" "}
                <a href="mailto:karriar@bergstromconsulting.se" className="text-primary hover:underline">
                  karriar@bergstromconsulting.se
                </a>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* News Dialog */}
      <Dialog open={newsOpen} onOpenChange={setNewsOpen}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <DialogTitle>Nyheter & Insikter</DialogTitle>
            </div>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="pb-4 border-b border-border">
              <span className="text-xs text-muted-foreground">15 januari 2024</span>
              <h4 className="font-semibold text-foreground mt-1">Bergström Consulting expanderar till Norge</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Vi är glada att meddela att vi öppnar kontor i Oslo för att bättre betjäna 
                våra nordiska kunder. Det nya kontoret öppnar i mars 2024.
              </p>
            </div>
            <div className="pb-4 border-b border-border">
              <span className="text-xs text-muted-foreground">8 december 2023</span>
              <h4 className="font-semibold text-foreground mt-1">Ny rapport: Digitalisering i svensk industri</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Vår senaste studie visar att 7 av 10 svenska industriföretag planerar att 
                öka sina digitaliseringsinvesteringar under 2024.
              </p>
            </div>
            <div className="pb-4 border-b border-border">
              <span className="text-xs text-muted-foreground">22 november 2023</span>
              <h4 className="font-semibold text-foreground mt-1">Anna Lindqvist utnämnd till Partner</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Vi gratulerar Anna Lindqvist som utnämnts till Partner och chef för vår 
                Digital Transformation-praktik.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Privacy Dialog */}
      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <DialogTitle>Integritetspolicy</DialogTitle>
            </div>
          </DialogHeader>
          <div className="space-y-4 mt-4 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Personuppgiftsansvarig</strong><br />
              Bergström Consulting AB, org.nr 556123-4567, är personuppgiftsansvarig för 
              behandlingen av dina personuppgifter.
            </p>
            <p>
              <strong className="text-foreground">Vilka uppgifter samlar vi in?</strong><br />
              Vi samlar in uppgifter som du lämnar till oss, t.ex. namn, e-post och telefonnummer 
              när du kontaktar oss eller anmäler dig till vårt nyhetsbrev.
            </p>
            <p>
              <strong className="text-foreground">Hur använder vi uppgifterna?</strong><br />
              Vi använder dina uppgifter för att kunna kommunicera med dig, hantera din förfrågan 
              och förbättra våra tjänster.
            </p>
            <p>
              <strong className="text-foreground">Hur länge sparar vi uppgifterna?</strong><br />
              Vi sparar dina uppgifter så länge det krävs för att uppfylla ändamålet med 
              behandlingen, eller så länge som krävs enligt lag.
            </p>
            <p>
              <strong className="text-foreground">Dina rättigheter</strong><br />
              Du har rätt att begära tillgång till, rättelse av eller radering av dina 
              personuppgifter. Kontakta oss på gdpr@bergstromconsulting.se.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Navigation */}
      <header className="sticky top-14 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">Bergström Consulting</h1>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <button
                onClick={() => scrollToSection("services")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Tjänster
              </button>
              <button
                onClick={() => scrollToSection("team")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Team
              </button>
              <button
                onClick={() => scrollToSection("cases")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Case
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Kontakt
              </button>
            </nav>
            <Button onClick={() => setMeetingOpen(true)}>Boka möte</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Vi hjälper företag att nå sin fulla potential
            </h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              Med djup branschexpertis och beprövade metoder stödjer vi ledande företag 
              i deras viktigaste strategiska beslut.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" onClick={() => setMeetingOpen(true)}>
                Kontakta oss
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("services")}>
                Våra tjänster
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold">15+</p>
              <p className="text-sm text-primary-foreground/70 mt-1">År i branschen</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">200+</p>
              <p className="text-sm text-primary-foreground/70 mt-1">Genomförda projekt</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">50+</p>
              <p className="text-sm text-primary-foreground/70 mt-1">Aktiva kunder</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">95%</p>
              <p className="text-sm text-primary-foreground/70 mt-1">Nöjda kunder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Våra tjänster</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Vi erbjuder ett brett spektrum av rådgivningstjänster anpassade för att möta 
              era specifika utmaningar och mål.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="p-8 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow"
              >
                <service.icon className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-xl font-semibold text-foreground">{service.title}</h3>
                <p className="mt-2 text-muted-foreground">{service.description}</p>
                <Button
                  variant="link"
                  className="mt-4 px-0"
                  onClick={() => openServiceModal(service)}
                >
                  Läs mer <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Vårt team</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Ett erfaret team med passion för att skapa verklig förändring
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="bg-card rounded-xl overflow-hidden border border-border">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary font-medium">{member.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="cases" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Utvalda case</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Se hur vi har hjälpt ledande företag att nå sina mål
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <div 
                key={index}
                className="p-8 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow group cursor-pointer"
                onClick={() => openCaseModal(caseStudy)}
              >
                <span className="text-xs font-medium text-primary">{caseStudy.industry}</span>
                <h3 className="mt-2 text-xl font-semibold text-foreground">{caseStudy.client}</h3>
                <p className="mt-2 text-muted-foreground text-sm">{caseStudy.description}</p>
                <div className="mt-6 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-lg font-bold text-foreground">{caseStudy.result}</span>
                </div>
                <Button variant="link" className="mt-4 px-0">
                  Läs hela caset <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Redo att ta nästa steg?</h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
            Kontakta oss för ett förutsättningslöst samtal om hur vi kan hjälpa ert företag.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8"
            onClick={() => setMeetingOpen(true)}
          >
            Boka ett möte
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold">Bergström Consulting</h3>
              <p className="mt-4 text-background/70 max-w-md">
                Vi är en ledande managementkonsultfirma som hjälper företag att navigera 
                komplexa utmaningar och driva hållbar tillväxt.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <ul className="space-y-3 text-sm text-background/70">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:info@bergstromconsulting.se" className="hover:text-background">
                    info@bergstromconsulting.se
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:08-12345600" className="hover:text-background">
                    08-123 456 00
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Kungsgatan 1, Stockholm
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Länkar</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><button onClick={() => setAboutOpen(true)} className="hover:text-background">Om oss</button></li>
                <li><button onClick={() => setCareerOpen(true)} className="hover:text-background">Karriär</button></li>
                <li><button onClick={() => setNewsOpen(true)} className="hover:text-background">Nyheter</button></li>
                <li><button onClick={() => setPrivacyOpen(true)} className="hover:text-background">Integritetspolicy</button></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-background/20 text-center text-sm text-background/50">
            © {new Date().getFullYear()} Bergström Consulting AB. Alla rättigheter förbehållna.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConsultantDemo;
