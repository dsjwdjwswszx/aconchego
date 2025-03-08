
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AttendantSelector, Attendant } from "./AttendantSelector";

interface OrderSuccessProps {
  orderNumber: string;
  showSelectAttendant: boolean;
  selectedAttendant: Attendant | null;
  handleSelectAttendant: (attendant: Attendant) => void;
  attendants: Attendant[];
}

export const OrderSuccess = ({ 
  orderNumber, 
  showSelectAttendant, 
  selectedAttendant, 
  handleSelectAttendant,
  attendants
}: OrderSuccessProps) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-24 max-w-2xl">
      <Card className="border-green-500/30">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-green-500/20 p-4 flex items-center justify-center">
            <Check className="h-10 w-10 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Pedido Confirmado!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p>
            Seu pedido foi registrado com sucesso. Por favor, selecione um atendente para
            finalizar o processo pelo WhatsApp.
          </p>
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-medium">Número do Pedido</p>
            <p className="text-lg">{`#${orderNumber}`}</p>
          </div>
          
          {showSelectAttendant && (
            <AttendantSelector
              attendants={attendants}
              selectedAttendant={selectedAttendant}
              onSelect={handleSelectAttendant}
            />
          )}
          
          {selectedAttendant && (
            <div className="flex justify-center mt-4">
              <div className="animate-pulse bg-green-500/20 p-3 rounded-full">
                <Phone className="h-6 w-6 text-green-500" />
              </div>
            </div>
          )}
          
          {selectedAttendant && (
            <p className="text-sm text-muted-foreground">
              Redirecionando para o WhatsApp...
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => navigate("/products")} className="w-full max-w-xs">
            Continuar Navegando
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
