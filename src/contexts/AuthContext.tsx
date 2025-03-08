import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from "../hooks/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  sede?: string;
  photoURL?: string; // Adding photoURL property
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string, address?: string, sede?: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => void;
  sendToDiscordWebhook: (type: 'registro' | 'pedido', data: any) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Discord webhook URL real
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1344745416142622833/ZI2IQezYvAoU_RBo_LYoKKCBLntRKSg4NU_uYQqJ0BXgEraq2aYC4li6T9xAfsPc-hDy";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Função para enviar dados para o webhook do Discord
  const sendToDiscordWebhook = async (type: 'registro' | 'pedido', data: any) => {
    try {
      console.log(`Enviando dados de ${type} para o Discord:`, data);
      
      // Criando campos para o embed
      const fields = Object.entries(data).map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: String(value),
        inline: true,
      }));
      
      // Enviando para o Discord
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `Novo ${type} recebido!`,
          embeds: [
            {
              title: `Detalhes do ${type}`,
              color: 10181046, // Cor roxa
              fields,
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
      
      console.log(`Dados enviados com sucesso para o Discord!`);
      
    } catch (error) {
      console.error(`Erro ao enviar dados para o Discord:`, error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just create a user if the email contains "test"
      if (email.includes('test')) {
        const user = {
          id: '1',
          name: 'Test User',
          email,
          photoURL: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Felix' // Add a default avatar
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo(a) de volta!"
        });
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: error instanceof Error ? error.message : "Falha na autenticação",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string, 
    email: string, 
    password: string,
    phone?: string,
    address?: string,
    sede?: string
  ) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        address,
        sede
      };
      
      // Enviar dados do cadastro para o Discord
      await sendToDiscordWebhook('registro', {
        nome: name,
        email,
        telefone: phone || 'Não informado',
        endereco: address || 'Não informado',
        sede: sede || 'Não informada',
        data_registro: new Date().toLocaleString('pt-BR')
      });
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: "Registro concluído",
        description: "Sua conta foi criada com sucesso!"
      });
    } catch (error) {
      toast({
        title: "Erro no registro",
        description: error instanceof Error ? error.message : "Não foi possível criar sua conta",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado da sua conta"
    });
  };

  const updateUserProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso"
      });
    }
  };

  // Check for existing user session on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUserProfile,
        sendToDiscordWebhook
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
