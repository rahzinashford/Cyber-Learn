import React, { useState } from "react";
import { Switch, Route } from "wouter";
import LandingPage from "./pages/LandingPage";
import PlatformSelection from "./pages/PlatformSelection";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import References from "./pages/References";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import PopupModal from "./components/PopupModal";
import { ToastProvider } from "./components/ui/Toast";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activePopup, setActivePopup] = useState(null);

  const closePopup = () => setActivePopup(null);

  const renderPopupContent = () => {
    switch (activePopup) {
      case "profile": return <Profile />;
      case "community": return <Community />;
      case "platform": return <PlatformSelection />;
      case "references": return <References />;
      case "settings": return <Settings />;
      default: return null;
    }
  };

  const getPopupTitle = () => {
    if (!activePopup) return "";
    return activePopup.charAt(0).toUpperCase() + activePopup.slice(1);
  };

  return (
    <ToastProvider>
      <Navbar 
        onOpenAuth={() => setIsAuthModalOpen(true)} 
        onOpenPopup={(type) => setActivePopup(type)}
      />
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/platform" component={PlatformSelection} />
        <Route path="/community" component={Community} />
        <Route path="/profile" component={Profile} />
        <Route path="/references" component={References} />
        <Route path="/settings" component={Settings} />
        <Route path="/admin" component={Admin} />
      </Switch>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
      <PopupModal
        isOpen={!!activePopup}
        onClose={closePopup}
        title={getPopupTitle()}
      >
        {renderPopupContent()}
      </PopupModal>
    </ToastProvider>
  );
}

export default App;

