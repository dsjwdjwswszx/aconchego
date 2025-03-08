
import { MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

interface LocationSelectorProps {
  availableSedes: string[];
  onSedeChange: (value: string) => void;
}

const LocationSelector = ({ availableSedes, onSedeChange }: LocationSelectorProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLocationSelect = (sede: string) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para selecionar uma sede.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    onSedeChange(sede);
    toast({
      title: "Sede selecionada",
      description: `Produtos filtrados para a ${sede}.`,
    });
  };
  
  return (
    <Card className="mb-6 border border-muted shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-base font-medium">
          <MapPin className="mr-2 h-4 w-4 text-primary" /> Selecione uma Sede
        </CardTitle>
        <CardDescription className="text-xs">
          Escolha a sede de onde você deseja visualizar os produtos disponíveis
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <Select onValueChange={handleLocationSelect}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione uma Sede" />
          </SelectTrigger>
          <SelectContent>
            {availableSedes.map((sede) => (
              <SelectItem key={sede} value={sede} className="cursor-pointer">
                {sede}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default LocationSelector;
