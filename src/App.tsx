
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PropertyProvider } from "@/context/PropertyContext";
import Index from "./pages/Index";
import { PropertySearchPage } from "@/components/PropertySearchPage";
import { PropertyDetails } from "@/components/PropertyDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PropertyProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/clients" element={<Index />} />
            <Route path="/estates" element={<Index />} />
            <Route path="/properties" element={<PropertySearchPage />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/units" element={<Index />} />
            <Route path="/tenants" element={<Index />} />
            <Route path="/leases" element={<Index />} />
            <Route path="/settings" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PropertyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
