
import ProductCard from "@/components/ProductCard";
import { Product } from "@/contexts/CartContext";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, LayoutGrid, Search } from "lucide-react";

interface ProductListProps {
  filteredProducts: Product[];
  sortOrder: string;
  onSortChange: (value: string) => void;
  selectedCategory: string;
}

const ProductList = ({ 
  filteredProducts, 
  sortOrder, 
  onSortChange, 
  selectedCategory 
}: ProductListProps) => {
  // Translate category names for display
  const getCategoryDisplay = (category: string) => {
    const translations: Record<string, string> = {
      "all": "Todos",
      "furniture": "Móveis",
      "appliance": "Eletrodomésticos",
      "electronics": "Eletrônicos",
      "decoration": "Decoração"
    };
    
    return translations[category] || category;
  };

  return (
    <Card className="bg-card border-none shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {selectedCategory === "all" 
                ? <><LayoutGrid className="h-5 w-5 text-purple-light" /> Doações Disponíveis</> 
                : <><Filter className="h-5 w-5 text-purple-light" /> Doações - {getCategoryDisplay(selectedCategory)}</>}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Encontramos {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'itens'} para você
            </p>
          </div>
          <div className="flex items-center gap-2 bg-accent rounded-lg p-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Select value={sortOrder} onValueChange={onSortChange}>
              <SelectTrigger className="w-[180px] border-0 bg-transparent focus:ring-0">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
                <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
                <SelectItem value="category-asc">Categoria (A-Z)</SelectItem>
                <SelectItem value="category-desc">Categoria (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center p-8 text-center glass-morphism rounded-xl">
            <Search className="h-12 w-12 text-muted-foreground mb-4 opacity-40" />
            <p className="text-lg mb-2">
              Nenhuma doação encontrada
            </p>
            <p className="text-sm text-muted-foreground">
              Tente ajustar os filtros ou limpar a busca para encontrar mais opções.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductList;
