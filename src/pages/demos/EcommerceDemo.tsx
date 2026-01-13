import BackToShowcase from "@/components/BackToShowcase";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Search, User, Filter, Star, ChevronRight } from "lucide-react";
import { useState } from "react";

const products = [
  { id: 1, name: "Linne Armchair", price: "4 995 kr", originalPrice: null, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", category: "Möbler", rating: 4.8 },
  { id: 2, name: "Keramik Vas Set", price: "895 kr", originalPrice: "1 195 kr", image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80", category: "Dekoration", rating: 4.5 },
  { id: 3, name: "Ullpläd Naturvit", price: "1 495 kr", originalPrice: null, image: "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=600&q=80", category: "Textil", rating: 4.9 },
  { id: 4, name: "Pendel Lampa Mässing", price: "2 295 kr", originalPrice: null, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80", category: "Belysning", rating: 4.7 },
  { id: 5, name: "Sidobord Ek", price: "1 995 kr", originalPrice: "2 495 kr", image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&q=80", category: "Möbler", rating: 4.6 },
  { id: 6, name: "Ljusstake Trio", price: "595 kr", originalPrice: null, image: "https://images.unsplash.com/photo-1603905179604-1e687bf7c9db?w=600&q=80", category: "Dekoration", rating: 4.4 },
];

const categories = ["Alla", "Möbler", "Dekoration", "Textil", "Belysning"];

const EcommerceDemo = () => {
  const [selectedCategory, setSelectedCategory] = useState("Alla");
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = selectedCategory === "Alla" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background pt-14">
      <BackToShowcase demoName="Nordic Style - E-handel" />

      {/* Header */}
      <header className="sticky top-14 z-40 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Nordic Style</h1>
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex gap-6 text-sm">
                <a href="#" className="text-foreground hover:text-primary transition-colors">Nyheter</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Möbler</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Dekoration</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Inspiration</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-secondary rounded-full transition-colors">
                <Search className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="p-2 hover:bg-secondary rounded-full transition-colors">
                <User className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="p-2 hover:bg-secondary rounded-full transition-colors relative">
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
            <Button size="lg" className="mt-6">
              Shoppa nu
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
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
                <div className="relative aspect-square rounded-xl overflow-hidden bg-muted mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button 
                    className="absolute top-4 right-4 p-2 bg-background rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-secondary"
                  >
                    <Heart className="h-5 w-5 text-foreground" />
                  </button>
                  {product.originalPrice && (
                    <span className="absolute top-4 left-4 px-2 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded">
                      REA
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">{product.category}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-1">{product.name}</h3>
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
                    onClick={() => setCartCount(c => c + 1)}
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
          <div className="mt-6 flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Din e-postadress"
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground"
            />
            <Button>Prenumerera</Button>
          </div>
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
                <li><a href="#" className="hover:text-background">Nyheter</a></li>
                <li><a href="#" className="hover:text-background">Möbler</a></li>
                <li><a href="#" className="hover:text-background">Dekoration</a></li>
                <li><a href="#" className="hover:text-background">Rea</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Kundservice</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background">Leverans</a></li>
                <li><a href="#" className="hover:text-background">Returer</a></li>
                <li><a href="#" className="hover:text-background">Kontakt</a></li>
                <li><a href="#" className="hover:text-background">FAQ</a></li>
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
