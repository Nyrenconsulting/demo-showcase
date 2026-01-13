import BackToShowcase from "@/components/BackToShowcase";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Phone, Scissors, Sparkles, Star } from "lucide-react";

const services = [
  { name: "Damklippning", price: "från 595 kr", duration: "60 min", description: "Konsultation, klippning och styling" },
  { name: "Herrklippning", price: "från 395 kr", duration: "30 min", description: "Klippning, styling och skäggvård" },
  { name: "Färgning", price: "från 995 kr", duration: "90 min", description: "Konsultation, färg och behandling" },
  { name: "Slingor", price: "från 1295 kr", duration: "120 min", description: "Folieslingor eller balayage" },
  { name: "Hårvård", price: "från 495 kr", duration: "45 min", description: "Djupvårdande behandling med massage" },
  { name: "Styling", price: "från 395 kr", duration: "45 min", description: "Styling för fest eller vardag" },
];

const team = [
  { name: "Emma Lindström", role: "Creative Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
  { name: "Marcus Berg", role: "Senior Stylist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Sofia Nilsson", role: "Color Specialist", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
];

const SalonDemo = () => {
  return (
    <div className="min-h-screen bg-background pt-14">
      <BackToShowcase demoName="Studio Elegance - Salong" />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80"
            alt="Salon interior"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>
        <div className="relative z-10 text-center text-background px-4">
          <Scissors className="h-12 w-12 mx-auto mb-4 text-background/80" />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Studio Elegance</h1>
          <p className="mt-4 text-xl text-background/80">Din destination för skönhet och välmående</p>
          <Button size="lg" className="mt-8">
            <Calendar className="mr-2 h-5 w-5" />
            Boka tid
          </Button>
        </div>
      </section>

      {/* Quick Info */}
      <section className="bg-secondary py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-secondary-foreground">
              <Clock className="h-4 w-4" />
              <span>Mån-Fre: 10:00-19:00, Lör: 10:00-16:00</span>
            </div>
            <div className="flex items-center gap-2 text-secondary-foreground">
              <MapPin className="h-4 w-4" />
              <span>Drottninggatan 45, Stockholm</span>
            </div>
            <div className="flex items-center gap-2 text-secondary-foreground">
              <Phone className="h-4 w-4" />
              <span>08-765 432 10</span>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80"
                alt="Salon work"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Om oss</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Studio Elegance är en modern salong i hjärtat av Stockholm där vi kombinerar 
                kreativitet med expertis. Vårt passionerade team strävar efter att ge varje 
                kund en personlig upplevelse och ett resultat som överträffar förväntningarna.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Vi använder endast högkvalitativa produkter som är skonsamma mot både hår 
                och miljö. Välkommen till en oas av lugn och stil.
              </p>
              <div className="mt-8 flex gap-6">
                <div className="text-center">
                  <Sparkles className="h-6 w-6 text-primary mx-auto" />
                  <p className="mt-2 text-xl font-bold text-foreground">15+</p>
                  <p className="text-sm text-muted-foreground">År i branschen</p>
                </div>
                <div className="text-center">
                  <Star className="h-6 w-6 text-primary mx-auto" />
                  <p className="mt-2 text-xl font-bold text-foreground">4.9</p>
                  <p className="text-sm text-muted-foreground">Kundbetyg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Våra tjänster</h2>
            <p className="mt-4 text-muted-foreground">Skräddarsydda behandlingar för alla behov</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
                  <span className="text-sm text-muted-foreground">{service.duration}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                <p className="mt-4 text-lg font-bold text-primary">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Vårt team</h2>
            <p className="mt-4 text-muted-foreground">Möt våra erfarna stylister</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="aspect-square rounded-full overflow-hidden w-48 mx-auto">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Boka din tid idag</h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
            Låt oss hjälpa dig att hitta din bästa look. Boka enkelt online eller ring oss.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary">
              <Calendar className="mr-2 h-5 w-5" />
              Boka online
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Phone className="mr-2 h-5 w-5" />
              Ring oss
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold">Studio Elegance</h3>
              <p className="mt-2 text-background/70 text-sm">Din destination för skönhet och välmående</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Öppettider</h4>
              <p className="text-sm text-background/70">Mån-Fre: 10:00-19:00</p>
              <p className="text-sm text-background/70">Lör: 10:00-16:00</p>
              <p className="text-sm text-background/70">Sön: Stängt</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Kontakt</h4>
              <p className="text-sm text-background/70">Drottninggatan 45, 111 21 Stockholm</p>
              <p className="text-sm text-background/70">hello@studioelegance.se</p>
              <p className="text-sm text-background/70">08-765 432 10</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SalonDemo;
