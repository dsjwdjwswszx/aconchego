
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AuthForm = () => {
  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  
  // Register form state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    sede: ""
  });
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!loginData.email || !loginData.password) {
        toast({
          title: "Erro no formulário",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive"
        });
        return;
      }
      
      await login(loginData.email, loginData.password);
      navigate("/");
    } catch (error) {
      // Error is handled in the auth context
      console.error("Login error:", error);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form
      if (!registerData.name || !registerData.email || !registerData.password || !registerData.sede) {
        toast({
          title: "Erro no formulário",
          description: "Por favor, preencha todos os campos obrigatórios, incluindo a sede.",
          variant: "destructive"
        });
        return;
      }
      
      if (registerData.password !== registerData.confirmPassword) {
        toast({
          title: "Erro no formulário",
          description: "As senhas não coincidem.",
          variant: "destructive"
        });
        return;
      }
      
      await register(
        registerData.name,
        registerData.email,
        registerData.password,
        registerData.phone,
        registerData.address,
        registerData.sede
      );
      
      navigate("/products");
    } catch (error) {
      // Error is handled in the auth context
      console.error("Registration error:", error);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Entrar</TabsTrigger>
          <TabsTrigger value="register">Registrar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle>Entrar</CardTitle>
              <CardDescription>
                Entre com sua conta para continuar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Senha</Label>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        
        <TabsContent value="register">
          <form onSubmit={handleRegister}>
            <CardHeader>
              <CardTitle>Criar Conta</CardTitle>
              <CardDescription>
                Crie uma conta para solicitar doações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Nome Completo</Label>
                <Input
                  id="register-name"
                  name="name"
                  placeholder="Seu nome completo"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-phone">Telefone</Label>
                <Input
                  id="register-phone"
                  name="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={registerData.phone}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-address">Endereço</Label>
                <Input
                  id="register-address"
                  name="address"
                  placeholder="Seu endereço"
                  value={registerData.address}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-sede">Sede em Londrina *</Label>
                <Select 
                  value={registerData.sede} 
                  onValueChange={(value) => setRegisterData({...registerData, sede: value})}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma sede" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MÓVEIS SEDE LONDRINA">MÓVEIS SEDE LONDRINA</SelectItem>
                    <SelectItem value="MÓVEIS SEDE LONDRINA 2">MÓVEIS SEDE LONDRINA 2</SelectItem>
                    <SelectItem value="MÓVEIS SEDE TERCEIRA">MÓVEIS SEDE TERCEIRA</SelectItem>
                    <SelectItem value="MÓVEIS SEDE QUARTA">MÓVEIS SEDE QUARTA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Senha</Label>
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Confirmar Senha</Label>
                <Input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Criando conta..." : "Criar Conta"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
