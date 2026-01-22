import DemoCard from "@/components/DemoCard";
import { Layers, Mail, Instagram, Facebook } from "lucide-react";

const demos = [
  {
    title: "Bella Cucina",
    description: "En elegant restaurangwebbplats med meny, bordbokning och öppettider. Perfekt för restauranger och caféer.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    category: "Restaurang & Café",
    href: "/demo/restaurant",
  },
  {
    title: "Studio Elegance",
    description: "Modern frisörsalong med tjänster, prislista och online-bokning. Stilren design för skönhetsbranschen.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    category: "Frisör & Salong",
    href: "/demo/salon",
  },
  {
    title: "Nordic Style",
    description: "E-handelsplattform med produktkatalog, varukorg och checkout. Skalbar lösning för butiker online.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    category: "E-handel & Butik",
    href: "/demo/ecommerce",
  },
  {
    title: "Bergström Consulting",
    description: "Professionell konsultsida med tjänster, team-presentation och case studies. Trovärdig design för B2B.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    category: "Konsult & Byrå",
    href: "/demo/consultant",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold text-foreground">Demo Showcase</span>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              Professionella webbplatser
              <br />
              <span className="text-muted-foreground">för alla branscher</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Utforska klickbara prototyper och se hur din nästa hemsida kan se ut. 
              Varje demo är interaktiv och visar verklig funktionalitet.
            </p>
          </div>
        </section>

        {/* Demo Grid */}
        <section className="pb-20 md:pb-32">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {demos.map((demo) => (
                <DemoCard key={demo.href} {...demo} />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            <span className="text-lg font-semibold text-foreground">Nyrén Consulting</span>
            <div className="flex items-center gap-4">
              <a
                href="mailto:max@nyrenconsulting.se"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              <a
                href="https://www.instagram.com/nyrenconsulting/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61587021118824"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Demo Showcase. Alla demos är klickbara prototyper.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
