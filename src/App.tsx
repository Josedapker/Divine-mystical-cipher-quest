import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { IntroSequence } from "./components/IntroSequence";
import Home from "./pages/Home";

const queryClient = new QueryClient();

const App = () => {
  const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={hasSeenIntro ? <Navigate to="/home" /> : <IntroSequence />} />
            <Route path="/intro" element={<IntroSequence />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;