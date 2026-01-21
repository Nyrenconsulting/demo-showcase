import BackToShowcase from "@/components/BackToShowcase";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, Calendar, ChefHat, Wine, Star, Gift, Users, Utensils, Info } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const menuItems = [
  { name: "Carpaccio di Manzo", description: "Tunt skivad oxfilé med ruccola, parmesan och tryffelolja", price: "185 kr", category: "Förrätter" },
  { name: "Burrata Caprese", description: "Färsk burrata med tomater, basilika och balsamico", price: "165 kr", category: "Förrätter" },
  { name: "Risotto ai Funghi", description: "Krämig risotto med karl-johan och parmesan", price: "245 kr", category: "Huvudrätter" },
  { name: "Ossobuco alla Milanese", description: "Kalvlägg brässerad i vitt vin med gremolata", price: "325 kr", category: "Huvudrätter" },
  { name: "Branzino al Forno", description: "Hel havsabborre bakat med örter och citron", price: "295 kr", category: "Huvudrätter" },
  { name: "Tiramisu", description: "Klassisk italiensk dessert med mascarpone och espresso", price: "125 kr", category: "Dessert" },
];

const fullMenu = {
  "Förrätter": [
    { name: "Carpaccio di Manzo", description: "Tunt skivad oxfilé med ruccola, parmesan och tryffelolja", price: "185 kr" },
    { name: "Burrata Caprese", description: "Färsk burrata med tomater, basilika och balsamico", price: "165 kr" },
    { name: "Bruschetta Trio", description: "Tre olika varianter av klassisk bruschetta", price: "145 kr" },
    { name: "Vitello Tonnato", description: "Kall kalvfilé med tonnatomajonnäs", price: "175 kr" },
  ],
  "Pasta": [
    { name: "Spaghetti Carbonara", description: "Klassisk carbonara med guanciale och pecorino", price: "215 kr" },
    { name: "Tagliatelle al Ragù", description: "Handgjord pasta med långkokt köttfärssås", price: "225 kr" },
    { name: "Cacio e Pepe", description: "Enkel perfektion med pecorino och svartpeppar", price: "195 kr" },
  ],
  "Huvudrätter": [
    { name: "Risotto ai Funghi", description: "Krämig risotto med karl-johan och parmesan", price: "245 kr" },
    { name: "Ossobuco alla Milanese", description: "Kalvlägg brässerad i vitt vin med gremolata", price: "325 kr" },
    { name: "Branzino al Forno", description: "Hel havsabborre bakat med örter och citron", price: "295 kr" },
    { name: "Bistecca alla Fiorentina", description: "T-bone steak på grillen, 800g för två personer", price: "695 kr" },
    { name: "Pollo alla Parmigiana", description: "Panerad kycklingfilé med tomat och mozzarella", price: "265 kr" },
  ],
  "Dessert": [
    { name: "Tiramisu", description: "Klassisk italiensk dessert med mascarpone och espresso", price: "125 kr" },
    { name: "Panna Cotta", description: "Med bärkompott och mandelflarn", price: "115 kr" },
    { name: "Affogato", description: "Vaniljglass med espresso och amaretto", price: "95 kr" },
  ],
  "Drycker": [
    { name: "Husets vin röd/vit", description: "Glas 95 kr / Flaska 375 kr", price: "" },
    { name: "Aperol Spritz", description: "Klassisk italiensk aperitif", price: "145 kr" },
    { name: "Espresso / Cappuccino", description: "", price: "45 kr / 55 kr" },
  ],
};

const RestaurantDemo = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    phone: "",
    email: "",
  });
  
  // Footer dialogs
  const [giftCardOpen, setGiftCardOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [giftCardForm, setGiftCardForm] = useState({ amount: "", name: "", email: "" });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.date || !bookingForm.time || !bookingForm.guests || !bookingForm.name || !bookingForm.phone) {
      toast.error("Vänligen fyll i alla obligatoriska fält");
      return;
    }
    toast.success(`Tack ${bookingForm.name}! Er bokning för ${bookingForm.guests} personer den ${bookingForm.date} kl ${bookingForm.time} är bekräftad. Vi skickar en bekräftelse till ${bookingForm.phone}.`);
    setBookingOpen(false);
    setBookingForm({ date: "", time: "", guests: "", name: "", phone: "", email: "" });
  };

  return (
    <div className="min-h-screen bg-background pt-14">
      <BackToShowcase demoName="Bella Cucina - Restaurang" />

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Boka bord</DialogTitle>
            <DialogDescription>
              Fyll i dina uppgifter för att reservera ett bord på Bella Cucina.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBookingSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Datum *</Label>
                <Input
                  id="date"
                  type="date"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Tid *</Label>
                <Select value={bookingForm.time} onValueChange={(v) => setBookingForm({ ...bookingForm, time: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Välj tid" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="17:00">17:00</SelectItem>
                    <SelectItem value="17:30">17:30</SelectItem>
                    <SelectItem value="18:00">18:00</SelectItem>
                    <SelectItem value="18:30">18:30</SelectItem>
                    <SelectItem value="19:00">19:00</SelectItem>
                    <SelectItem value="19:30">19:30</SelectItem>
                    <SelectItem value="20:00">20:00</SelectItem>
                    <SelectItem value="20:30">20:30</SelectItem>
                    <SelectItem value="21:00">21:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests">Antal gäster *</Label>
              <Select value={bookingForm.guests} onValueChange={(v) => setBookingForm({ ...bookingForm, guests: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Välj antal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 person</SelectItem>
                  <SelectItem value="2">2 personer</SelectItem>
                  <SelectItem value="3">3 personer</SelectItem>
                  <SelectItem value="4">4 personer</SelectItem>
                  <SelectItem value="5">5 personer</SelectItem>
                  <SelectItem value="6">6 personer</SelectItem>
                  <SelectItem value="7+">7+ personer (ring oss)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Namn *</Label>
              <Input
                id="name"
                value={bookingForm.name}
                onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                placeholder="Ditt namn"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon *</Label>
              <Input
                id="phone"
                type="tel"
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                placeholder="07X XXX XX XX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-post (valfritt)</Label>
              <Input
                id="email"
                type="email"
                value={bookingForm.email}
                onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                placeholder="din@email.se"
              />
            </div>
            <Button type="submit" className="w-full">
              Bekräfta bokning
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Full Menu Dialog */}
      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Komplett meny</DialogTitle>
            <DialogDescription>
              Upptäck alla våra rätter - från klassiska italienska favoriter till säsongens specialiteter.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-8">
            {Object.entries(fullMenu).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold text-primary border-b border-border pb-2 mb-4">{category}</h3>
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-medium text-foreground">{item.name}</h4>
                        {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                      </div>
                      {item.price && <span className="font-semibold text-foreground whitespace-nowrap">{item.price}</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-4 border-t border-border">
            <Button onClick={() => { setMenuOpen(false); setBookingOpen(true); }} className="w-full">
              <Calendar className="mr-2 h-5 w-5" />
              Boka bord
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
          <Button size="lg" className="mt-8" onClick={() => setBookingOpen(true)}>
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
            <a href="tel:08-12345678" className="flex items-center gap-2 text-secondary-foreground hover:text-primary transition-colors">
              <Phone className="h-4 w-4" />
              <span>08-123 456 78</span>
            </a>
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
            <Button variant="outline" size="lg" onClick={() => setMenuOpen(true)}>
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
          <Button size="lg" className="mt-8" onClick={() => setBookingOpen(true)}>
            <Calendar className="mr-2 h-5 w-5" />
            Boka bord online
          </Button>
        </div>
      </section>

      {/* Gift Card Dialog */}
      <Dialog open={giftCardOpen} onOpenChange={setGiftCardOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Gift className="h-6 w-6 text-primary" />
              <DialogTitle>Presentkort</DialogTitle>
            </div>
            <DialogDescription>Ge bort en kulinarisk upplevelse</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Välj värde</Label>
              <div className="grid grid-cols-3 gap-2">
                {["500", "1000", "2000"].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setGiftCardForm({ ...giftCardForm, amount })}
                    className={`py-3 px-4 rounded-lg border text-center font-medium transition-colors ${
                      giftCardForm.amount === amount
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {amount} kr
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gift-name">Ditt namn</Label>
              <Input
                id="gift-name"
                value={giftCardForm.name}
                onChange={(e) => setGiftCardForm({ ...giftCardForm, name: e.target.value })}
                placeholder="Ditt namn"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gift-email">Din e-post</Label>
              <Input
                id="gift-email"
                type="email"
                value={giftCardForm.email}
                onChange={(e) => setGiftCardForm({ ...giftCardForm, email: e.target.value })}
                placeholder="din@email.se"
              />
            </div>
            <Button 
              className="w-full" 
              onClick={() => {
                if (!giftCardForm.amount || !giftCardForm.name || !giftCardForm.email) {
                  toast.error("Vänligen fyll i alla fält");
                  return;
                }
                toast.success(`Presentkort på ${giftCardForm.amount} kr skickas till ${giftCardForm.email}!`);
                setGiftCardOpen(false);
                setGiftCardForm({ amount: "", name: "", email: "" });
              }}
            >
              Köp presentkort
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Events Dialog */}
      <Dialog open={eventsOpen} onOpenChange={setEventsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-primary" />
              <DialogTitle>Evenemang & Sällskap</DialogTitle>
            </div>
            <DialogDescription>Fira med oss på Bella Cucina</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Privata evenemang</h4>
              <p className="text-sm text-muted-foreground">
                Vårt separata rum rymmer upp till 25 gäster och passar perfekt för 
                födelsedagar, firmafester eller andra speciella tillfällen.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Större sällskap</h4>
              <p className="text-sm text-muted-foreground">
                För sällskap på 8-15 personer erbjuder vi specialmenyer anpassade efter era önskemål. 
                Kontakta oss för skräddarsydda förslag.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Vinprovning</h4>
              <p className="text-sm text-muted-foreground">
                Låt vår sommelier guida er genom utvalda viner från vår vinkällare. 
                Perfekt för en kväll med vänner eller kollegor.
              </p>
            </div>
            <Button 
              className="w-full" 
              onClick={() => {
                setEventsOpen(false);
                setBookingOpen(true);
              }}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Kontakta oss för bokning
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* About Dialog */}
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Utensils className="h-6 w-6 text-primary" />
              <DialogTitle>Om Bella Cucina</DialogTitle>
            </div>
          </DialogHeader>
          <div className="space-y-4 mt-4 text-muted-foreground">
            <p>
              Bella Cucina grundades 1987 av familjen Rossi, som flyttade från den lilla byn 
              Montepulciano i Toscana till Stockholm med drömmen om att dela sin passion för 
              autentisk italiensk mat.
            </p>
            <p>
              Idag drivs restaurangen av andra generationen Rossi, men principerna är desamma: 
              färska, lokala råvaror när det är möjligt, importerade specialiteter från Italien 
              när det krävs, och handgjord pasta varje dag.
            </p>
            <p>
              Vår vinkällare innehåller över 120 noggrant utvalda viner, främst från italienska 
              familjeproducenter som vi har personliga relationer med.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
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
              <h4 className="font-semibold mb-3">Information</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><button onClick={() => setAboutOpen(true)} className="hover:text-background">Om oss</button></li>
                <li><button onClick={() => setMenuOpen(true)} className="hover:text-background">Meny</button></li>
                <li><button onClick={() => setGiftCardOpen(true)} className="hover:text-background">Presentkort</button></li>
                <li><button onClick={() => setEventsOpen(true)} className="hover:text-background">Evenemang</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Kontakt</h4>
              <p className="text-sm text-background/70">Storgatan 12, 111 23 Stockholm</p>
              <p className="text-sm text-background/70">info@bellacucina.se</p>
              <a href="tel:08-12345678" className="text-sm text-background/70 hover:text-background">08-123 456 78</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RestaurantDemo;
