import BackToShowcase from "@/components/BackToShowcase";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Phone, Scissors, Sparkles, Star, ArrowLeft, ArrowRight, Check, Gift, XCircle, Info } from "lucide-react";
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
import { toast } from "sonner";

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

const availableTimes = ["10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];

const SalonDemo = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", email: "" });
  
  // Footer dialogs
  const [giftCardOpen, setGiftCardOpen] = useState(false);
  const [cancellationOpen, setCancellationOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [giftCardForm, setGiftCardForm] = useState({ amount: "", senderName: "", recipientEmail: "" });

  const openBookingWithService = (serviceName: string) => {
    setSelectedService(serviceName);
    setBookingStep(2);
    setBookingOpen(true);
  };

  const openBooking = () => {
    setBookingStep(1);
    setBookingOpen(true);
  };

  const resetBooking = () => {
    setSelectedService(null);
    setSelectedStylist(null);
    setSelectedDate("");
    setSelectedTime(null);
    setContactForm({ name: "", phone: "", email: "" });
    setBookingStep(1);
  };

  const handleBookingClose = (open: boolean) => {
    if (!open) {
      resetBooking();
    }
    setBookingOpen(open);
  };

  const handleBookingSubmit = () => {
    if (!contactForm.name || !contactForm.phone) {
      toast.error("Vänligen fyll i namn och telefonnummer");
      return;
    }
    toast.success(
      `Tack ${contactForm.name}! Din bokning för ${selectedService} med ${selectedStylist} den ${selectedDate} kl ${selectedTime} är bekräftad!`
    );
    handleBookingClose(false);
  };

  const nextStep = () => {
    if (bookingStep === 1 && !selectedService) {
      toast.error("Välj en tjänst för att fortsätta");
      return;
    }
    if (bookingStep === 2 && !selectedStylist) {
      toast.error("Välj en stylist för att fortsätta");
      return;
    }
    if (bookingStep === 3 && (!selectedDate || !selectedTime)) {
      toast.error("Välj datum och tid för att fortsätta");
      return;
    }
    setBookingStep(bookingStep + 1);
  };

  const prevStep = () => {
    setBookingStep(bookingStep - 1);
  };

  return (
    <div className="min-h-screen bg-background pt-14">
      <BackToShowcase demoName="Studio Elegance - Salong" />

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={handleBookingClose}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Boka tid</DialogTitle>
            <DialogDescription>
              Steg {bookingStep} av 4 - {
                bookingStep === 1 ? "Välj tjänst" :
                bookingStep === 2 ? "Välj stylist" :
                bookingStep === 3 ? "Välj datum och tid" :
                "Dina uppgifter"
              }
            </DialogDescription>
          </DialogHeader>

          {/* Progress indicator */}
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  step <= bookingStep ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <div className="mt-6">
            {/* Step 1: Select Service */}
            {bookingStep === 1 && (
              <div className="space-y-3">
                {services.map((service) => (
                  <button
                    key={service.name}
                    onClick={() => setSelectedService(service.name)}
                    className={`w-full p-4 rounded-lg border text-left transition-colors ${
                      selectedService === service.name
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-foreground">{service.name}</h4>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{service.price}</p>
                        <p className="text-xs text-muted-foreground">{service.duration}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Select Stylist */}
            {bookingStep === 2 && (
              <div className="grid grid-cols-3 gap-4">
                {team.map((member) => (
                  <button
                    key={member.name}
                    onClick={() => setSelectedStylist(member.name)}
                    className={`p-4 rounded-lg border text-center transition-colors ${
                      selectedStylist === member.name
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="font-medium text-foreground text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                    {selectedStylist === member.name && (
                      <Check className="h-4 w-4 text-primary mx-auto mt-1" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: Select Date and Time */}
            {bookingStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Välj datum</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                {selectedDate && (
                  <div className="space-y-2">
                    <Label>Välj tid</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                            selectedTime === time
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Contact Details */}
            {bookingStep === 4 && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50 mb-4">
                  <h4 className="font-medium text-foreground mb-2">Din bokning</h4>
                  <p className="text-sm text-muted-foreground">Tjänst: <span className="text-foreground">{selectedService}</span></p>
                  <p className="text-sm text-muted-foreground">Stylist: <span className="text-foreground">{selectedStylist}</span></p>
                  <p className="text-sm text-muted-foreground">Datum: <span className="text-foreground">{selectedDate} kl {selectedTime}</span></p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Namn *</Label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Ditt namn"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="07X XXX XX XX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-post (valfritt)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="din@email.se"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            {bookingStep > 1 ? (
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tillbaka
              </Button>
            ) : (
              <div />
            )}
            {bookingStep < 4 ? (
              <Button onClick={nextStep}>
                Nästa
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleBookingSubmit}>
                <Check className="mr-2 h-4 w-4" />
                Bekräfta bokning
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Phone Dialog */}
      <Dialog open={phoneDialogOpen} onOpenChange={setPhoneDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Ring oss</DialogTitle>
            <DialogDescription>
              Vi svarar måndag-fredag 10:00-19:00 och lördag 10:00-16:00.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <Phone className="h-12 w-12 text-primary mb-4" />
            <a
              href="tel:08-76543210"
              className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
            >
              08-765 432 10
            </a>
          </div>
          <Button asChild className="w-full">
            <a href="tel:08-76543210">
              <Phone className="mr-2 h-4 w-4" />
              Ring nu
            </a>
          </Button>
        </DialogContent>
      </Dialog>

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
          <Button size="lg" className="mt-8" onClick={openBooking}>
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
            <button
              onClick={() => setPhoneDialogOpen(true)}
              className="flex items-center gap-2 text-secondary-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>08-765 432 10</span>
            </button>
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
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => openBookingWithService(service.name)}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Boka denna tjänst
                </Button>
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
                <Button
                  variant="link"
                  className="mt-2"
                  onClick={() => {
                    setSelectedStylist(member.name);
                    setBookingStep(1);
                    setBookingOpen(true);
                  }}
                >
                  Boka tid med {member.name.split(" ")[0]}
                </Button>
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
            <Button size="lg" variant="secondary" onClick={openBooking}>
              <Calendar className="mr-2 h-5 w-5" />
              Boka online
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setPhoneDialogOpen(true)}
            >
              <Phone className="mr-2 h-5 w-5" />
              Ring oss
            </Button>
          </div>
        </div>
      </section>

      {/* Gift Card Dialog */}
      <Dialog open={giftCardOpen} onOpenChange={setGiftCardOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Gift className="h-6 w-6 text-primary" />
              <DialogTitle>Köp presentkort</DialogTitle>
            </div>
            <DialogDescription>Den perfekta presenten för någon du bryr dig om</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Välj belopp</Label>
              <div className="grid grid-cols-3 gap-2">
                {["500", "1000", "1500"].map((amount) => (
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
              <Label htmlFor="sender">Ditt namn</Label>
              <Input
                id="sender"
                value={giftCardForm.senderName}
                onChange={(e) => setGiftCardForm({ ...giftCardForm, senderName: e.target.value })}
                placeholder="Ditt namn"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipient">Mottagarens e-post</Label>
              <Input
                id="recipient"
                type="email"
                value={giftCardForm.recipientEmail}
                onChange={(e) => setGiftCardForm({ ...giftCardForm, recipientEmail: e.target.value })}
                placeholder="mottagare@email.se"
              />
            </div>
            <Button 
              className="w-full" 
              onClick={() => {
                if (!giftCardForm.amount || !giftCardForm.senderName || !giftCardForm.recipientEmail) {
                  toast.error("Vänligen fyll i alla fält");
                  return;
                }
                toast.success(`Presentkort på ${giftCardForm.amount} kr skickat till ${giftCardForm.recipientEmail}!`);
                setGiftCardOpen(false);
                setGiftCardForm({ amount: "", senderName: "", recipientEmail: "" });
              }}
            >
              Köp presentkort
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancellation Dialog */}
      <Dialog open={cancellationOpen} onOpenChange={setCancellationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <XCircle className="h-6 w-6 text-primary" />
              <DialogTitle>Avbokningspolicy</DialogTitle>
            </div>
          </DialogHeader>
          <div className="space-y-4 mt-4 text-sm text-muted-foreground">
            <p>
              Vi förstår att planer kan ändras. Här är vår avbokningspolicy:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Mer än 24 timmar före:</strong> Kostnadsfri avbokning eller ombookning</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Mindre än 24 timmar före:</strong> 50% av behandlingspriset debiteras</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Utebliven ankomst:</strong> 100% av behandlingspriset debiteras</span>
              </li>
            </ul>
            <p>
              För att avboka, ring oss på <a href="tel:08-76543210" className="text-primary hover:underline">08-765 432 10</a> eller 
              skicka ett SMS till samma nummer.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* About Dialog */}
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Info className="h-6 w-6 text-primary" />
              <DialogTitle>Om Studio Elegance</DialogTitle>
            </div>
          </DialogHeader>
          <div className="space-y-4 mt-4 text-muted-foreground">
            <p>
              Studio Elegance grundades 2009 med en vision att skapa en salong där varje besök 
              känns som en lyxupplevelse. Vi kombinerar traditionellt hantverk med moderna tekniker.
            </p>
            <p>
              Vårt team består av passionerade stylister med internationell erfarenhet och kontinuerlig 
              utbildning inom de senaste trenderna och teknikerna.
            </p>
            <div className="pt-4 border-t border-border">
              <h4 className="font-semibold text-foreground mb-2">Vi använder</h4>
              <p className="text-sm">
                Endast högkvalitativa och miljövänliga produkter från Oribe, Kerastase och Kevin Murphy.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
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
              <h4 className="font-semibold mb-3">Information</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><button onClick={() => setAboutOpen(true)} className="hover:text-background">Om oss</button></li>
                <li><button onClick={() => setGiftCardOpen(true)} className="hover:text-background">Presentkort</button></li>
                <li><button onClick={() => setCancellationOpen(true)} className="hover:text-background">Avbokningspolicy</button></li>
                <li><button onClick={openBooking} className="hover:text-background">Boka tid</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Kontakt</h4>
              <p className="text-sm text-background/70">Drottninggatan 45, 111 21 Stockholm</p>
              <p className="text-sm text-background/70">hello@studioelegance.se</p>
              <a href="tel:08-76543210" className="text-sm text-background/70 hover:text-background">08-765 432 10</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SalonDemo;
