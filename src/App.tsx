import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HeroPage from "./components/HeroPage";
import UploadPage from "./components/UploadPage";
import AnalysisPage from "./components/AnalysisPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

type AppState = 'hero' | 'upload' | 'analysis';

const App = () => {
  const [currentPage, setCurrentPage] = useState<AppState>('hero');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleGetStarted = () => {
    setCurrentPage('upload');
  };

  const handleUploadComplete = (file: File) => {
    setUploadedFile(file);
    setCurrentPage('analysis');
  };

  const handleBackToHero = () => {
    setCurrentPage('hero');
    setUploadedFile(null);
  };

  const handleBackToUpload = () => {
    setCurrentPage('upload');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <>
                {currentPage === 'hero' && (
                  <HeroPage onGetStarted={handleGetStarted} />
                )}
                {currentPage === 'upload' && (
                  <UploadPage 
                    onBack={handleBackToHero} 
                    onUploadComplete={handleUploadComplete} 
                  />
                )}
                {currentPage === 'analysis' && (
                  <AnalysisPage 
                    onBack={handleBackToUpload} 
                    uploadedFile={uploadedFile} 
                  />
                )}
              </>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;