import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLogout}
      className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border-2 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Esci
    </Button>
  );
};

export default LogoutButton;
