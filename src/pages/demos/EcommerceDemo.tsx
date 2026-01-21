import BackToShowcase from "@/components/BackToShowcase";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Search, User, Filter, Star, ChevronRight, X, Plus, Minus, Trash2, Truck, RotateCcw, Mail, Phone, HelpCircle } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Product {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  originalPrice: string | null;
  image: string;
  category: string;
  rating: number;
  description?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: "Linne Armchair", price: "4 995 kr", priceNum: 4995, originalPrice: null, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", category: "Möbler", rating: 4.8, description: "En elegant och bekväm fåtölj i naturligt linnetyg. Perfekt för vardagsrummet eller ett mysigt läshörn." },
  { id: 2, name: "Keramik Vas Set", price: "895 kr", priceNum: 895, originalPrice: "1 195 kr", image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80", category: "Dekoration", rating: 4.5, description: "Set med tre handgjorda keramikvaser i olika storlekar. Varje vas är unik med sin egen karaktär." },
  { id: 3, name: "Ullpläd Naturvit", price: "1 495 kr", priceNum: 1495, originalPrice: null, image: "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=600&q=80", category: "Textil", rating: 4.9, description: "Lyxig pläd i 100% merinoull. Mjuk, varm och perfekt för soffmys." },
  { id: 4, name: "Pendel Lampa Mässing", price: "2 295 kr", priceNum: 2295, originalPrice: null, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80", category: "Belysning", rating: 4.7, description: "Elegant taklampa i borstad mässing med dimbar LED-belysning." },
  { id: 5, name: "Sidobord Ek", price: "1 995 kr", priceNum: 1995, originalPrice: "2 495 kr", image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&q=80", category: "Möbler", rating: 4.6, description: "Minimalistiskt sidobord i massiv ek med elegant design. Passar perfekt bredvid soffan." },
  { id: 6, name: "Ljusstake Trio", price: "595 kr", priceNum: 595, originalPrice: null, image: "https://images.unsplash.com/photo-1603905179604-1e687bf7c9db?w=600&q=80", category: "Dekoration", rating: 4.4, description: "Tre ljusstakar i svart metall i olika höjder. Skapar en varm atmosfär." },
];

const categories = ["Alla", "Möbler", "Dekoration", "Textil", "Belysning"];

const EcommerceDemo = () => {
  const [selectedCategory, setSelectedCategory] = useState("Alla");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  
  // Footer dialogs
  const [shippingOpen, setShippingOpen] = useState(false);
  const [returnsOpen, setReturnsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [inspirationOpen, setInspirationOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Vänligen fyll i alla fält");
      return;
    }
    toast.success("Tack för ditt meddelande! Vi återkommer inom 24 timmar.");
    setContactOpen(false);
    setContactForm({ name: "", email: "", message: "" });
  };

  const scrollToProductsWithFilter = (category: string) => {
    setSelectedCategory(category);
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredProducts = selectedCategory === "Alla" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const searchResults = searchQuery.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.priceNum * item.quantity, 0);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} har lagts i varukorgen`);
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === productId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    toast.success("Produkt borttagen från varukorgen");
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
        toast.success("Borttagen från favoriter");
      } else {
        newFavorites.add(productId);
        toast.success("Tillagd i favoriter ❤️");
      }
      return newFavorites;
    });
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setProductOpen(true);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Varukorgen är tom");
      return;
    }
    toast.success(`Tack för din beställning! Totalt: ${cartTotal.toLocaleString()} kr. En orderbekräftelse skickas till din e-post.`);
    setCart([]);
    setCartOpen(false);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.includes("@")) {
      toast.error("Vänligen ange en giltig e-postadress");
      return;
    }
    toast.success("Tack för din prenumeration! Din 10% rabattkod: NORDIC10");
    setNewsletterEmail("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast.error("Vänligen fyll i alla fält");
      return;
    }
    toast.success(`Välkommen tillbaka! Du är nu inloggad som ${loginForm.email}`);
    setLoginOpen(false);
    setLoginForm({ email: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-background pt-14">
      <BackToShowcase demoName="Nordic Style - E-handel" />

      {/* Cart Sheet */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="w-full sm:max-w-md flex flex-col">
          <SheetHeader>
            <SheetTitle>Varukorg ({cartCount})</SheetTitle>
            <SheetDescription>
              {cart.length === 0 ? "Din varukorg är tom" : "Granska dina produkter"}
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto py-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 py-4 border-b border-border">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 rounded-md hover:bg-secondary"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 rounded-md hover:bg-secondary"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 rounded-md hover:bg-secondary ml-auto text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Totalt</span>
                <span>{cartTotal.toLocaleString()} kr</span>
              </div>
              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Gå till kassan
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Sök produkter</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Sök efter produkter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <div className="space-y-2">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                        openProductDetails(product);
                      }}
                      className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-secondary text-left"
                    >
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-md object-cover" />
                      <div>
                        <p className="font-medium text-foreground">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.price}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Inga produkter hittades för "{searchQuery}"
                  </p>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Login Dialog */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Logga in</DialogTitle>
            <DialogDescription>
              Logga in för att se dina ordrar och favoriter
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-post</Label>
              <Input
                id="email"
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                placeholder="din@email.se"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Lösenord</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full">
              Logga in
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Har du inget konto?{" "}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => {
                  toast.success("Registreringssida - kommer snart!");
                }}
              >
                Skapa konto
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>

      {/* Product Details Dialog */}
      <Dialog open={productOpen} onOpenChange={setProductOpen}>
        <DialogContent className="sm:max-w-2xl">
          {selectedProduct && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs text-muted-foreground">{selectedProduct.category}</span>
                <h2 className="text-2xl font-bold text-foreground mt-1">{selectedProduct.name}</h2>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm text-muted-foreground">{selectedProduct.rating}</span>
                </div>
                <p className="mt-4 text-muted-foreground">{selectedProduct.description}</p>
                <div className="flex items-center gap-3 mt-6">
                  <span className="text-2xl font-bold text-foreground">{selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {selectedProduct.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      addToCart(selectedProduct);
                      setProductOpen(false);
                    }}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Lägg i varukorg
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleFavorite(selectedProduct.id)}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.has(selectedProduct.id) ? "fill-destructive text-destructive" : ""
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Shipping Dialog */}
      <Dialog open={shippingOpen} onOpenChange={setShippingOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Truck className="h-6 w-6 text-primary" />
              <DialogTitle>Leveransinformation</DialogTitle>
            </div>
            <DialogDescription>Allt du behöver veta om våra leveranser</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Fraktkostnader</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Standardfrakt: <span className="text-foreground font-medium">49 kr</span></li>
                <li>• Fri frakt vid köp över <span className="text-foreground font-medium">499 kr</span></li>
                <li>• Expressfrakt (nästa dag): <span className="text-foreground font-medium">99 kr</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Leveranstider</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Standardfrakt: <span className="text-foreground">2-5 arbetsdagar</span></li>
                <li>• Expressfrakt: <span className="text-foreground">Nästa arbetsdag</span></li>
                <li>• Hemleverans av möbler: <span className="text-foreground">5-10 arbetsdagar</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Spåra din order</h4>
              <p className="text-sm text-muted-foreground">
                När din order skickats får du ett mail med spårningsnummer. 
                Du kan enkelt följa paketet via PostNord eller DHLs hemsida.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Returns Dialog */}
      <Dialog open={returnsOpen} onOpenChange={setReturnsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-6 w-6 text-primary" />
              <DialogTitle>Returer & Byten</DialogTitle>
            </div>
            <DialogDescription>Enkel och trygg returprocess</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">30 dagars öppet köp</h4>
              <p className="text-sm text-muted-foreground">
                Du har alltid 30 dagar på dig att ångra ditt köp. Produkten ska vara oanvänd 
                och i originalförpackning.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Så här returnerar du</h4>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>Logga in på ditt konto och välj "Mina ordrar"</li>
                <li>Välj produkten du vill returnera och ange orsak</li>
                <li>Skriv ut retursedeln och fäst på paketet</li>
                <li>Lämna in paketet hos närmaste ombud</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Återbetalning</h4>
              <p className="text-sm text-muted-foreground">
                Pengarna återbetalas inom 5-7 arbetsdagar efter att vi mottagit returen. 
                Återbetalningen sker till samma betalningsmetod som användes vid köpet.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-primary" />
              <DialogTitle>Kontakta oss</DialogTitle>
            </div>
            <DialogDescription>Vi svarar vanligtvis inom 24 timmar</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContactSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Namn</Label>
              <Input
                id="contact-name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                placeholder="Ditt namn"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">E-post</Label>
              <Input
                id="contact-email"
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                placeholder="din@email.se"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">Meddelande</Label>
              <Textarea
                id="contact-message"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Hur kan vi hjälpa dig?"
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full">Skicka meddelande</Button>
          </form>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              Du kan också nå oss på <a href="tel:08-111222-33" className="text-primary hover:underline">08-111 222 33</a>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* FAQ Dialog */}
      <Dialog open={faqOpen} onOpenChange={setFaqOpen}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <HelpCircle className="h-6 w-6 text-primary" />
              <DialogTitle>Vanliga frågor</DialogTitle>
            </div>
          </DialogHeader>
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>Hur lång är leveranstiden?</AccordionTrigger>
              <AccordionContent>
                Standardleverans tar 2-5 arbetsdagar. Expressfrakt levereras nästa arbetsdag 
                om du beställer före kl 14:00. Möbler kan ta 5-10 arbetsdagar.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Kan jag returnera min order?</AccordionTrigger>
              <AccordionContent>
                Ja! Du har 30 dagars öppet köp på alla produkter. Produkten ska vara oanvänd 
                och i originalförpackning. Returfrakten är gratis.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Hur spårar jag min order?</AccordionTrigger>
              <AccordionContent>
                När din order skickas får du ett mail med spårningslänk. Du kan också logga in 
                på ditt konto och se status under "Mina ordrar".
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Vilka betalningsmetoder accepterar ni?</AccordionTrigger>
              <AccordionContent>
                Vi accepterar Visa, Mastercard, Klarna (faktura, delbetalning, direktbetalning), 
                Swish och banköverföring.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Har ni fysiska butiker?</AccordionTrigger>
              <AccordionContent>
                Vi har en showroom i Stockholm på Birger Jarlsgatan 15 där du kan se utvalda 
                produkter. Öppet mån-fre 10-18, lör 11-16.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Erbjuder ni montering av möbler?</AccordionTrigger>
              <AccordionContent>
                Ja, vid hemleverans av större möbler erbjuder vi montering för 299 kr. 
                Välj detta alternativ i kassan.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DialogContent>
      </Dialog>

      {/* Inspiration Dialog */}
      <Dialog open={inspirationOpen} onOpenChange={setInspirationOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Inspiration</DialogTitle>
            <DialogDescription>Idéer och tips för ditt hem</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-3">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80" 
                  alt="Vardagsrum"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-medium text-foreground">Minimalistiskt vardagsrum</h4>
              <p className="text-sm text-muted-foreground">Skapa lugn och harmoni med ljusa toner och rena linjer.</p>
            </div>
            <div className="space-y-3">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                <img 
                  src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80" 
                  alt="Sovrum"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-medium text-foreground">Mysigt sovrum</h4>
              <p className="text-sm text-muted-foreground">Textilier och varma nyanser för ultimat komfort.</p>
            </div>
            <div className="space-y-3">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80" 
                  alt="Kök"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-medium text-foreground">Funktionellt kök</h4>
              <p className="text-sm text-muted-foreground">Smart förvaring och tidlös design.</p>
            </div>
            <div className="space-y-3">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                <img 
                  src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80" 
                  alt="Arbetsrum"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-medium text-foreground">Hemmakontor</h4>
              <p className="text-sm text-muted-foreground">Skapa en produktiv arbetsmiljö hemma.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <header className="sticky top-14 z-40 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Nordic Style</h1>
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex gap-6 text-sm">
                <button 
                  onClick={() => scrollToProductsWithFilter("Alla")}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Nyheter
                </button>
                <button 
                  onClick={() => scrollToProductsWithFilter("Möbler")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Möbler
                </button>
                <button 
                  onClick={() => scrollToProductsWithFilter("Dekoration")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Dekoration
                </button>
                <button 
                  onClick={() => setInspirationOpen(true)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Inspiration
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="p-2 hover:bg-secondary rounded-full transition-colors"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5 text-muted-foreground" />
              </button>
              <button
                className="p-2 hover:bg-secondary rounded-full transition-colors"
                onClick={() => setLoginOpen(true)}
              >
                <User className="h-5 w-5 text-muted-foreground" />
              </button>
              <button
                className="p-2 hover:bg-secondary rounded-full transition-colors relative"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80"
            alt="Living room"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/30" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 bg-background text-foreground text-sm font-medium rounded-full mb-4">
              Ny kollektion
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-background">Skandinavisk design för ditt hem</h2>
            <p className="mt-4 text-lg text-background/80">Upptäck vår nya vårkollektion med tidlösa favoriter</p>
            <Button
              size="lg"
              className="mt-6"
              onClick={() => {
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Shoppa nu
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filtrera:</span>
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-sm rounded-full transition-colors ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-sm text-muted-foreground">{filteredProducts.length} produkter</span>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group">
                <div
                  className="relative aspect-square rounded-xl overflow-hidden bg-muted mb-4 cursor-pointer"
                  onClick={() => openProductDetails(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-4 right-4 p-2 bg-background rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-secondary"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.has(product.id) ? "fill-destructive text-destructive" : "text-foreground"
                      }`}
                    />
                  </button>
                  {product.originalPrice && (
                    <span className="absolute top-4 left-4 px-2 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded">
                      REA
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">{product.category}</span>
                  <h3
                    className="text-lg font-semibold text-foreground mt-1 cursor-pointer hover:text-primary"
                    onClick={() => openProductDetails(product)}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm text-muted-foreground">{product.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-foreground">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Lägg i varukorg
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">Få 10% rabatt på din första beställning</h3>
          <p className="mt-2 text-muted-foreground">Prenumerera på vårt nyhetsbrev för exklusiva erbjudanden</p>
          <form onSubmit={handleNewsletterSubmit} className="mt-6 flex max-w-md mx-auto gap-2">
            <Input
              type="email"
              placeholder="Din e-postadress"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Prenumerera</Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold">Nordic Style</h3>
              <p className="mt-2 text-background/70 text-sm">Skandinavisk design för ditt hem sedan 2015</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Handla</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><button onClick={() => scrollToProductsWithFilter("Alla")} className="hover:text-background">Nyheter</button></li>
                <li><button onClick={() => scrollToProductsWithFilter("Möbler")} className="hover:text-background">Möbler</button></li>
                <li><button onClick={() => scrollToProductsWithFilter("Dekoration")} className="hover:text-background">Dekoration</button></li>
                <li><button onClick={() => {
                  setSelectedCategory("Alla");
                  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                  toast.success("Visar produkter på rea!");
                }} className="hover:text-background">Rea</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Kundservice</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><button onClick={() => setShippingOpen(true)} className="hover:text-background">Leverans</button></li>
                <li><button onClick={() => setReturnsOpen(true)} className="hover:text-background">Returer</button></li>
                <li><button onClick={() => setContactOpen(true)} className="hover:text-background">Kontakt</button></li>
                <li><button onClick={() => setFaqOpen(true)} className="hover:text-background">FAQ</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Kontakt</h4>
              <p className="text-sm text-background/70">hello@nordicstyle.se</p>
              <p className="text-sm text-background/70">08-111 222 33</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcommerceDemo;
