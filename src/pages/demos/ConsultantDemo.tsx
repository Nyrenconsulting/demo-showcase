import BackToShowcase from "@/components/BackToShowcase";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Lightbulb, Users, Target, CheckCircle, Mail, Phone, MapPin } from "lucide-react";

const services = [
  { 
    icon: BarChart3, 
    title: "Strategirådgivning", 
    description: "Vi hjälper er att formulera och implementera en affärsstrategi som driver tillväxt och lönsamhet."
  },
  { 
    icon: Lightbulb, 
    title: "Digital transformation", 
    description: "Modernisera er verksamhet med rätt teknologi och processer för att möta framtidens utmaningar."
  },
  { 
    icon: Users, 
    title: "Organisationsutveckling", 
    description: "Bygg en högpresterande organisation med rätt struktur, kultur och ledarskap."
  },
  { 
    icon: Target, 
    title: "Affärsutveckling", 
    description: "Identifiera nya marknader och affärsmöjligheter för att accelerera er tillväxt."
  },
];

const team = [
  { name: "Johan Bergström", role: "VD & Partner", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", bio: "20+ års erfarenhet inom strategisk rådgivning" },
  { name: "Anna Lindqvist", role: "Partner, Digital", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80", bio: "Expert inom digital transformation" },
  { name: "Erik Johansson", role: "Senior Consultant", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80", bio: "Specialist på organisationsförändring" },
];

const caseStudies = [
  { client: "TechCorp AB", industry: "Tech", result: "+45% omsättningstillväxt", description: "Strategisk omställning och digital expansion" },
  { client: "Nordic Retail", industry: "Retail", result: "30% kostnadsreduktion", description: "Operationell effektivisering och processoptimering" },
  { client: "HealthPlus", industry: "Healthcare", result: "Ny marknadsledare", description: "Go-to-market strategi för ny produktlansering" },
];

const ConsultantDemo = () => {
  return (
    <div className="min-h-screen bg-background pt-14">
      <BackToShowcase demoName="Bergström Consulting - Konsult" />

      {/* Navigation */}
      <header className="sticky top-14 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">Bergström Consulting</h1>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Tjänster</a>
              <a href="#team" className="text-muted-foreground hover:text-foreground transition-colors">Team</a>
              <a href="#cases" className="text-muted-foreground hover:text-foreground transition-colors">Case</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Kontakt</a>
            </nav>
            <Button>Boka möte</Button>
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
              <Button size="lg">
                Kontakta oss
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
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
                <Button variant="link" className="mt-4 px-0">
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
          <Button size="lg" variant="secondary" className="mt-8">
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
                  info@bergstromconsulting.se
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  08-123 456 00
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
                <li><a href="#" className="hover:text-background">Om oss</a></li>
                <li><a href="#" className="hover:text-background">Karriär</a></li>
                <li><a href="#" className="hover:text-background">Nyheter</a></li>
                <li><a href="#" className="hover:text-background">Integritetspolicy</a></li>
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
