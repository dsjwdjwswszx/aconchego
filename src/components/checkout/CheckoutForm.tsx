
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Store, Truck } from "lucide-react";

interface CheckoutFormProps {
  formData: {
    name: string;
    phone: string;
    address: string;
    additionalInfo: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export const CheckoutForm = ({ formData, handleChange, handleSubmit, isSubmitting }: CheckoutFormProps) => {
  const { state } = useCart();
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {state.deliveryMethod === 'retirada' ? 'Informações para Retirada' : 'Informações de Entrega'}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              required
            />
          </div>
          
          {state.deliveryMethod === 'entrega' && (
            <div className="space-y-2">
              <Label htmlFor="address">Endereço Completo *</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Rua, número, bairro, cidade, estado, CEP"
                required
              />
            </div>
          )}
          
          {user?.sede && (
            <div className="p-3 bg-purple-dark/20 border border-purple-light/20 rounded-md">
              <Label className="font-medium">Sede Selecionada</Label>
              <p className="text-sm">{user.sede}</p>
            </div>
          )}
          
          <div className="p-3 bg-muted rounded-md">
            <Label className="font-medium">Método de Recebimento</Label>
            <div className="flex items-center gap-2 mt-1">
              {state.deliveryMethod === 'retirada' ? (
                <><Store className="h-4 w-4 text-purple-light" /> Retirada</>
              ) : (
                <><Truck className="h-4 w-4 text-purple-light" /> Entrega</>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Para mudar o método, volte para o carrinho.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Informações Adicionais</Label>
            <Textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder={state.deliveryMethod === 'retirada' 
                ? "Informações para a retirada, dia e horário preferido, etc." 
                : "Pontos de referência, instruções para entrega, etc."}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processando..." : "Confirmar Pedido"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
