import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart, Product } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { state, addItem, removeItem, updateQuantity } = useCart();
  const { toast } = useToast();
  const cartItem = state.items.find(item => item.product.id === product.id);
  const [isHovering, setIsHovering] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Fallback image for donation products
  const fallbackImage = "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800";
  
  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Item adicionado",
      description: `${product.name} foi adicionado à sua lista.`,
    });
  };
  
  const handleRemove = () => {
    removeItem(product.id);
    toast({
      title: "Item removido",
      description: `${product.name} foi removido da sua lista.`,
    });
  };
  
  const incrementQuantity = () => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(product.id, cartItem.quantity - 1);
    } else if (cartItem) {
      handleRemove();
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Get category display name
  const getCategoryDisplay = (category: string) => {
    const translations: Record<string, string> = {
      "furniture": "Móveis",
      "appliance": "Eletrodomésticos",
      "electronics": "Eletrônicos",
      "decoration": "Decoração"
    };
    
    return translations[category] || category;
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 border border-border/50 bg-card/80",
        "hover:border-purple-light/50 hover:shadow-lg hover:shadow-purple-900/20",
        "flex flex-col h-full"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={imageError ? fallbackImage : product.image}
          alt={`${product.name} - Item para doação`}
          className={cn(
            "object-cover w-full h-full transition-transform duration-500",
            isHovering ? "scale-110" : "scale-100"
          )}
          onError={handleImageError}
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-purple-dark/80 backdrop-blur-sm text-white">
            {getCategoryDisplay(product.category)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="flex-grow p-5">
        <h3 className="text-lg font-medium mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {!cartItem ? (
          <Button 
            onClick={handleAddToCart} 
            className="w-full group bg-purple-dark hover:bg-purple transition-colors"
          >
            <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            Adicionar
          </Button>
        ) : (
          <div className="flex items-center justify-between w-full rounded-md border border-border bg-accent/50 p-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={decrementQuantity}
              className="h-8 w-8"
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="text-sm font-medium">{cartItem.quantity}</span>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={incrementQuantity}
              className="h-8 w-8"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
