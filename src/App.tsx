import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./components/AdminLayout";

// Portal Pages
import Dashboard from "./pages/portal/Dashboard";
import Quotes from "./pages/portal/Quotes";
import QuoteDetail from "./pages/portal/QuoteDetail";
import Messages from "./pages/portal/Messages";
import Documents from "./pages/portal/Documents";
import Billing from "./pages/portal/Billing";
import Settings from "./pages/portal/Settings";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminClients from "./pages/admin/AdminClients";
import AdminClientDetail from "./pages/admin/AdminClientDetail";
import AdminQuotes from "./pages/admin/AdminQuotes";
import AdminQuoteEdit from "./pages/admin/AdminQuoteEdit";
import WeddingCatering from "./pages/services/WeddingCatering";
import CorporateCatering from "./pages/services/CorporateCatering";
import BabyShowers from "./pages/services/BabyShowers";
import RetirementParties from "./pages/services/RetirementParties";
import FilmSetCatering from "./pages/services/FilmSetCatering";
import FoodTruckCatering from "./pages/services/FoodTruckCatering";
import DropOffCatering from "./pages/services/DropOffCatering";
import PopUpEvents from "./pages/services/PopUpEvents";
import EventTypesOverview from "./pages/events/EventTypesOverview";
import NewJersey from "./pages/locations/NewJersey";
import Pennsylvania from "./pages/locations/Pennsylvania";
import NewYorkCity from "./pages/locations/NewYorkCity";
import Maryland from "./pages/locations/Maryland";
import Delaware from "./pages/locations/Delaware";
import WashingtonDC from "./pages/locations/WashingtonDC";
import LongIsland from "./pages/locations/LongIsland";
import BlogIndex from "./pages/blog/BlogIndex";
import FoodTruckCateringNJGuide from "./pages/blog/FoodTruckCateringNJGuide";
import BookingFoodTrucksNJ from "./pages/blog/BookingFoodTrucksNJ";
import FoodTruckCosts from "./pages/blog/FoodTruckCosts";
import QuestionsToAsk from "./pages/blog/QuestionsToAsk";
import FoodTruckVsCatering from "./pages/blog/FoodTruckVsCatering";
import CorporateEventAdvantages from "./pages/blog/CorporateEventAdvantages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Client Portal Routes */}
          <Route path="/portal/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/portal/quotes" element={<ProtectedRoute><Quotes /></ProtectedRoute>} />
          <Route path="/portal/quotes/:id" element={<ProtectedRoute><QuoteDetail /></ProtectedRoute>} />
          <Route path="/portal/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
          <Route path="/portal/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
          <Route path="/portal/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
          <Route path="/portal/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
          <Route path="/admin/clients" element={<AdminRoute><AdminLayout><AdminClients /></AdminLayout></AdminRoute>} />
          <Route path="/admin/clients/:id" element={<AdminRoute><AdminLayout><AdminClientDetail /></AdminLayout></AdminRoute>} />
          <Route path="/admin/quotes" element={<AdminRoute><AdminLayout><AdminQuotes /></AdminLayout></AdminRoute>} />
          <Route path="/admin/quotes/:id" element={<AdminRoute><AdminLayout><AdminQuoteEdit /></AdminLayout></AdminRoute>} />
          
          {/* Service Type Pages */}
          <Route path="/services/food-truck-catering" element={<FoodTruckCatering />} />
          <Route path="/services/drop-off-catering" element={<DropOffCatering />} />
          <Route path="/services/pop-up-events" element={<PopUpEvents />} />
          
          {/* Event Type Pages */}
          <Route path="/events" element={<EventTypesOverview />} />
          <Route path="/events/wedding-catering" element={<WeddingCatering />} />
          <Route path="/events/corporate-catering" element={<CorporateCatering />} />
          <Route path="/events/baby-showers" element={<BabyShowers />} />
          <Route path="/events/retirement-parties" element={<RetirementParties />} />
          <Route path="/events/film-set-catering" element={<FilmSetCatering />} />
          
          {/* Legacy redirects - keep old URLs working */}
          <Route path="/services" element={<EventTypesOverview />} />
          <Route path="/services/wedding-catering" element={<WeddingCatering />} />
          <Route path="/services/corporate-catering" element={<CorporateCatering />} />
          <Route path="/services/baby-showers" element={<BabyShowers />} />
          <Route path="/services/retirement-parties" element={<RetirementParties />} />
          <Route path="/services/film-set-catering" element={<FilmSetCatering />} />
          
          {/* Location Pages */}
          <Route path="/locations/new-jersey" element={<NewJersey />} />
          <Route path="/locations/pennsylvania" element={<Pennsylvania />} />
          <Route path="/locations/new-york-city" element={<NewYorkCity />} />
          <Route path="/locations/maryland" element={<Maryland />} />
          <Route path="/locations/delaware" element={<Delaware />} />
          <Route path="/locations/washington-dc" element={<WashingtonDC />} />
          <Route path="/locations/long-island" element={<LongIsland />} />
          
          {/* Blog Pages */}
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/food-truck-catering-nj-guide" element={<FoodTruckCateringNJGuide />} />
          <Route path="/blog/booking-food-trucks-in-new-jersey" element={<BookingFoodTrucksNJ />} />
          <Route path="/blog/food-truck-costs" element={<FoodTruckCosts />} />
          <Route path="/blog/questions-to-ask" element={<QuestionsToAsk />} />
          <Route path="/blog/food-trucks-vs-catering" element={<FoodTruckVsCatering />} />
          <Route path="/blog/corporate-event-advantages" element={<CorporateEventAdvantages />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
