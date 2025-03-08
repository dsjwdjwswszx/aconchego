
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Phone, Truck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export const OrderSummary = () => {
  const { state, calculateTotal } = useCart();
  const total = calculateTotal();

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">CNPJ: 00.346.076/0001-73</h3>
              <Separator className="mb-4" />
              
              <h3 className="font-medium mb-2">Itens ({state.totalItems})</h3>
              <ul className="space-y-2">
                {state.items.map((item) => (
                  <li key={item.product.id} className="flex justify-between text-sm">
                    <span>
                      {item.product.name} {item.quantity > 1 && `(${item.quantity}x)`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            {state.deliveryMethod === 'entrega' && (
              <>
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Entrega</h3>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span>Taxa de entrega básica</span>
                    </div>
                    <span>R$ 200,00</span>
                  </div>
                  
                  {(() => {
                    const totalQuantity = state.items.reduce((total, item) => {
                      return total + item.quantity;
                    }, 0);
                    
                    const extraItems = Math.max(0, totalQuantity - 5);
                    
                    if (totalQuantity > 5) {
                      return (
                        <div className="flex items-center justify-between text-sm mt-2">
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-muted-foreground" />
                            <span>Taxa adicional ({extraItems} produto(s) além de 5)</span>
                          </div>
                          <span>R$ {(extraItems * 25).toFixed(2).replace('.', ',')}</span>
                        </div>
                      );
                    }
                    return null;
                  })()}
                
                  <Separator className="my-3" />
                  
                  <div className="flex justify-between">
                    <span className="font-bold">Total de Entrega</span>
                    <span className="font-bold">R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6 p-4 border border-purple-light/20 rounded-lg bg-purple-dark/10">
        <div className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-purple-light mt-1" />
          <div>
            <h4 className="font-medium text-sm mb-1">Processo de Finalização</h4>
            <p className="text-xs text-muted-foreground">
              Após confirmar seu pedido, você poderá escolher um atendente para ser redirecionado ao WhatsApp
              {state.deliveryMethod === 'retirada' 
                ? " e combinar os detalhes da retirada."
                : " e combinar os detalhes da entrega."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
