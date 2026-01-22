import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RestaurantDemo from "./pages/demos/RestaurantDemo";
import SalonDemo from "./pages/demos/SalonDemo";
import EcommerceDemo from "./pages/demos/EcommerceDemo";
import ConsultantDemo from "./pages/demos/ConsultantDemo";

const queryClient = new QueryClient();

const basename = import.meta.env.PROD ? "/demo-showcase" : "/";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/demo/restaurant" element={<RestaurantDemo />} />
          <Route path="/demo/salon" element={<SalonDemo />} />
          <Route path="/demo/ecommerce" element={<EcommerceDemo />} />
          <Route path="/demo/consultant" element={<ConsultantDemo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
