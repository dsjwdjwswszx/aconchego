
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeaturedProductsSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-purple-900/5">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Produtos em Destaque</h2>
            <p className="text-muted-foreground">Confira alguns dos nossos itens disponíveis para doação</p>
          </div>
          <Link to="/products" className="flex items-center text-purple-light hover:text-purple-400 transition-colors gap-1 text-sm">
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <div key={index} className="rounded-xl overflow-hidden glass-morphism card-hover">
              <div className="h-48 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="inline-block px-2 py-1 text-xs rounded-full bg-purple-dark/80 text-purple-light mb-3">
                  {product.category}
                </div>
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{product.description}</p>
                <Link to={`/products`}>
                  <Button variant="outline" size="sm" className="w-full">Ver detalhes</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const featuredProducts = [
  {
    name: "Sofá de 3 Lugares",
    category: "Móveis",
    description: "Sofá em bom estado para doação a famílias necessitadas. Em ótimas condições de uso, estofado limpo e estrutura resistente.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000"
  },
  {
    name: "Geladeira Frost Free",
    category: "Eletrodomésticos",
    description: "Geladeira duplex em perfeito estado de funcionamento. Ideal para famílias que precisam de eletrodomésticos básicos.",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=1000"
  },
  {
    name: "Smart TV 42 Polegadas",
    category: "Eletrônicos",
    description: "Televisão inteligente LED com resolução Full HD. Em excelente estado, ideal para instituições educativas ou comunitárias.",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1000"
  }
];

export default FeaturedProductsSection;
