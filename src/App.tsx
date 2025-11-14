import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Eager load: Critical for initial page load
import Index from "./pages/Index";

// Lazy load: All other pages to reduce initial bundle
const NotFound = lazy(() => import("./pages/NotFound"));
const WeddingCatering = lazy(() => import("./pages/services/WeddingCatering"));
const CorporateCatering = lazy(() => import("./pages/services/CorporateCatering"));
const BabyShowers = lazy(() => import("./pages/services/BabyShowers"));
const RetirementParties = lazy(() => import("./pages/services/RetirementParties"));
const FilmSetCatering = lazy(() => import("./pages/services/FilmSetCatering"));
const FoodTruckCatering = lazy(() => import("./pages/services/FoodTruckCatering"));
const DropOffCatering = lazy(() => import("./pages/services/DropOffCatering"));
const PopUpEvents = lazy(() => import("./pages/services/PopUpEvents"));
const EventTypesOverview = lazy(() => import("./pages/events/EventTypesOverview"));
const NewJersey = lazy(() => import("./pages/locations/NewJersey"));
const Pennsylvania = lazy(() => import("./pages/locations/Pennsylvania"));
const NewYorkCity = lazy(() => import("./pages/locations/NewYorkCity"));
const Maryland = lazy(() => import("./pages/locations/Maryland"));
const Delaware = lazy(() => import("./pages/locations/Delaware"));
const WashingtonDC = lazy(() => import("./pages/locations/WashingtonDC"));
const LongIsland = lazy(() => import("./pages/locations/LongIsland"));
const BlogIndex = lazy(() => import("./pages/blog/BlogIndex"));
const FoodTruckCateringNJGuide = lazy(() => import("./pages/blog/FoodTruckCateringNJGuide"));
const BookingFoodTrucksNJ = lazy(() => import("./pages/blog/BookingFoodTrucksNJ"));
const FoodTruckCosts = lazy(() => import("./pages/blog/FoodTruckCosts"));
const QuestionsToAsk = lazy(() => import("./pages/blog/QuestionsToAsk"));
const FoodTruckVsCatering = lazy(() => import("./pages/blog/FoodTruckVsCatering"));
const CorporateEventAdvantages = lazy(() => import("./pages/blog/CorporateEventAdvantages"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
          
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
