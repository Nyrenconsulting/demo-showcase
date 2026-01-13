import BackToShowcase from "@/components/BackToShowcase";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, Calendar, ChefHat, Wine, Star } from "lucide-react";

const menuItems = [
  { name: "Carpaccio di Manzo", description: "Tunt skivad oxfilé med ruccola, parmesan och tryffelolja", price: "185 kr", category: "Förrätter" },
  { name: "Burrata Caprese", description: "Färsk burrata med tomater, basilika och balsamico", price: "165 kr", category: "Förrätter" },
  { name: "Risotto ai Funghi", description: "Krämig risotto med karl-johan och parmesan", price: "245 kr", category: "Huvudrätter" },
  { name: "Ossobuco alla Milanese", description: "Kalvlägg brässerad i vitt vin med gremolata", price: "325 kr", category: "Huvudrätter" },
  { name: "Branzino al Forno", description: "Hel havsabborre bakat med örter och citron", price: "295 kr", category: "Huvudrätter" },
  { name: "Tiramisu", description: "Klassisk italiensk dessert med mascarpone och espresso", price: "125 kr", category: "Dessert" },
];

const RestaurantDemo = () => {
  return (
    <div className="min-h-screen bg-background pt-14">
      <BackToShowcase demoName="Bella Cucina - Restaurang" />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
            alt="Restaurant interior"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 text-center text-background px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Bella Cucina</h1>
          <p className="mt-4 text-xl md:text-2xl text-background/80">Autentisk italiensk matlagning sedan 1987</p>
          <Button size="lg" className="mt-8">
            <Calendar className="mr-2 h-5 w-5" />
            Boka bord
          </Button>
        </div>
      </section>

      {/* Info Bar */}
      <section className="bg-secondary py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-secondary-foreground">
              <Clock className="h-4 w-4" />
              <span>Mån-Lör: 17:00-23:00</span>
            </div>
            <div className="flex items-center gap-2 text-secondary-foreground">
              <MapPin className="h-4 w-4" />
              <span>Storgatan 12, Stockholm</span>
            </div>
            <div className="flex items-center gap-2 text-secondary-foreground">
              <Phone className="h-4 w-4" />
              <span>08-123 456 78</span>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Vår historia</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Bella Cucina grundades av familjen Rossi som flyttade från Toscana till Stockholm 
                med en dröm om att dela sin kärlek till autentisk italiensk mat. I över 35 år 
                har vi serverat handgjord pasta, färska ingredienser och tidlösa recept som 
                gått i arv genom generationer.
              </p>
              <div className="mt-8 flex gap-8">
                <div className="text-center">
                  <ChefHat className="h-8 w-8 text-primary mx-auto" />
                  <p className="mt-2 text-2xl font-bold text-foreground">35+</p>
                  <p className="text-sm text-muted-foreground">År av tradition</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 text-primary mx-auto" />
                  <p className="mt-2 text-2xl font-bold text-foreground">4.8</p>
                  <p className="text-sm text-muted-foreground">Betyg på Google</p>
                </div>
                <div className="text-center">
                  <Wine className="h-8 w-8 text-primary mx-auto" />
                  <p className="mt-2 text-2xl font-bold text-foreground">120+</p>
                  <p className="text-sm text-muted-foreground">Viner i vinkällaren</p>
                </div>
              </div>
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                alt="Chef preparing food"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Vår meny</h2>
            <p className="mt-4 text-muted-foreground">Ett urval av våra signaturäretter</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start gap-4 p-4 rounded-lg bg-card border border-border"
              >
                <div>
                  <span className="text-xs font-medium text-primary">{item.category}</span>
                  <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <span className="text-lg font-semibold text-foreground whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Se hela menyn
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Boka ditt bord idag</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Upplev äkta italiensk gastronomi i en varm och välkomnande miljö. 
            Vi rekommenderar att boka i förväg, speciellt för helger.
          </p>
          <Button size="lg" className="mt-8">
            <Calendar className="mr-2 h-5 w-5" />
            Boka bord online
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold">Bella Cucina</h3>
              <p className="mt-2 text-background/70 text-sm">Autentisk italiensk matlagning sedan 1987</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Öppettider</h4>
              <p className="text-sm text-background/70">Måndag - Lördag: 17:00 - 23:00</p>
              <p className="text-sm text-background/70">Söndag: Stängt</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Kontakt</h4>
              <p className="text-sm text-background/70">Storgatan 12, 111 23 Stockholm</p>
              <p className="text-sm text-background/70">info@bellacucina.se</p>
              <p className="text-sm text-background/70">08-123 456 78</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RestaurantDemo;
