import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import LearnSection from "@/components/LearnSection";
import DataFlowDiagram from "@/components/DataFlowDiagram";
import ContactForm from "@/components/ContactForm";
import LeadsDashboard from "@/components/LeadsDashboard";
import Footer from "@/components/Footer";
import LoginPage from "@/components/LoginPage";
import LogoutButton from "@/components/LogoutButton";
import { isAuthenticated, setAuthenticated } from "@/lib/auth";

const Index = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verifica lo stato di autenticazione all'avvio
  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const handleLeadSaved = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleLoginSuccess = () => {
    setAuthenticated(true);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Se non autenticato, mostra la pagina di login
  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Pulsante Logout */}
      <LogoutButton onLogout={handleLogout} />

      {/* Hero Section - Prima impressione */}
      <HeroSection />

      {/* Sezione Educativa - Spiega i concetti */}
      <LearnSection />

      {/* Diagramma Interattivo - Mostra il flusso dati */}
      <DataFlowDiagram />

      {/* Form di Contatto - Componente pratico */}
      <ContactForm onLeadSaved={handleLeadSaved} />

      {/* Dashboard Lead - Visualizza i dati salvati */}
      <LeadsDashboard refreshTrigger={refreshTrigger} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
