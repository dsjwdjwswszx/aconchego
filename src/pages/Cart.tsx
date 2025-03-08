
import React from "react";
import { useCart } from "../contexts/CartContext";
import { ShoppingCart, Trash, Plus, Minus, Store, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { ScrollArea } from "../components/ui/scroll-area";
import { Badge } from "../components/ui/badge";
import { cn } from "../lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

const Cart = () => {
  const { state, removeItem, updateQuantity, calculateTotal, setDeliveryMethod, clearCart } = useCart();
  const [showTermsDialog, setShowTermsDialog] = React.useState(false);
  
  const totalQuantity = state.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  
  const hasMoreThan5Items = totalQuantity > 5;
  const extraItems = Math.max(0, totalQuantity - 5);
  const total = calculateTotal();

  const handleDeliveryMethodSelect = (method: 'retirada' | 'entrega') => {
    if (method === 'entrega') {
      setShowTermsDialog(true);
    } else {
      setDeliveryMethod('retirada');
    }
  };

  const acceptDeliveryTerms = () => {
    setDeliveryMethod('entrega');
    setShowTermsDialog(false);
  };
  
  if (state.items.length === 0) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Seu Carrinho
          </CardTitle>
        </CardHeader>
        <CardContent className="py-10 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/40" />
            <h3 className="text-xl font-medium">Seu carrinho está vazio</h3>
            <p className="text-muted-foreground max-w-md">
              Adicione produtos para solicitar sua doação. Todos os itens estão disponíveis para ajudar quem precisa.
            </p>
            <Link to="/products">
              <Button className="mt-4">Ver produtos</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Seu Carrinho
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ScrollArea className="max-h-[400px] pr-4 -mr-4">
          {state.items.map((item) => (
            <div key={item.product.id} className="flex gap-4 py-4">
              <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0 bg-accent/50">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-medium">{item.product.name}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.product.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                    "bg-primary/20 text-primary"
                  )}>
                    {item.product.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.product.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash className="h-4 w-4" />
                </Button>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (item.quantity > 1) {
                        updateQuantity(item.product.id, item.quantity - 1);
                      } else {
                        removeItem(item.product.id);
                      }
                    }}
                    className="h-8 w-8"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="h-8 w-8"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="flex flex-col gap-4">
        <div className="w-full space-y-2">
          <h3 className="font-medium mb-2">Informações da Empresa</h3>
          <p className="text-sm text-muted-foreground">
            CNPJ: 00.346.076/0001-73
          </p>
          <Separator className="my-2" />
          
          <h3 className="font-medium mb-2">Método de Recebimento</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant={state.deliveryMethod === 'retirada' ? "default" : "outline"} 
              className="flex items-center gap-2"
              onClick={() => handleDeliveryMethodSelect('retirada')}
            >
              <Store className="h-4 w-4" />
              Retirada
            </Button>
            <Button 
              variant={state.deliveryMethod === 'entrega' ? "default" : "outline"} 
              className="flex items-center gap-2"
              onClick={() => handleDeliveryMethodSelect('entrega')}
            >
              <Truck className="h-4 w-4" />
              Entrega
            </Button>
          </div>
          
          {state.deliveryMethod === 'entrega' && (
            <>
              <Separator className="my-2" />
              <div>
                <h3 className="font-medium mb-2">Custos de Entrega</h3>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxa de entrega básica</span>
                  <span>R$ 200,00</span>
                </div>
                {hasMoreThan5Items && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxa adicional ({extraItems} produto(s) além de 5)</span>
                    <span>R$ {(extraItems * 25).toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </>
          )}
        </div>
        
        <Link to="/checkout" className="w-full">
          <Button 
            className="w-full" 
            disabled={state.deliveryMethod === null}
          >
            Prosseguir para doação
          </Button>
        </Link>
      </CardFooter>

      <AlertDialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Termos de Entrega</AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mb-4">
                Informamos que a entrega é realizada por uma empresa terceirizada. 
              </p>
              <p className="mb-4">
                A taxa básica de entrega é de R$ 200,00 para até 5 produtos.
              </p>
              <p className="mb-4">
                Para cada produto adicional (além de 5), será cobrado um valor extra de R$ 25,00 por unidade.
              </p>
              <p>
                Ao aceitar estes termos, você concorda com a cobrança dos valores de entrega conforme descrito.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowTermsDialog(false)}>Cancelar</Button>
            <AlertDialogAction onClick={acceptDeliveryTerms}>
              Aceitar Termos
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default Cart;
