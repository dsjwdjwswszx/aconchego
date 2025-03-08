
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, LogIn, User } from "lucide-react";

import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "../lib/utils";

// Definindo um componente de Logo simples já que não temos o componente original
const Logo = () => {
  return (
    <div className="font-bold text-2xl text-primary">LA</div>
  );
};

export function Navbar() {
  const { state } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-75"
          >
            <Logo />
            <span className="text-xl font-bold hidden sm:inline-block">Lar Aconchegante</span>
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6 mx-6">
            <Link
              to="/products"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/products"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Produtos
            </Link>
            <Link
              to="/about"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/about"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Sobre
            </Link>
            {/* Removida a aba de Rastreio, mantendo apenas o acesso via URL direta */}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative transition-opacity hover:opacity-75">
            <ShoppingCart className="h-6 w-6" />
            {state.totalItems > 0 && (
              <span className="absolute -top-2 -right-2 rounded-full bg-secondary px-1.5 py-0.5 text-xs font-bold text-secondary-foreground">
                {state.totalItems}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photoURL} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>Perfil</DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button>Entrar</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
