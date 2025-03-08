
import { Heart, Package, Truck, ShieldCheck, ShoppingCart } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
          <div className="h-1 w-20 bg-purple-light mx-auto rounded-full mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nós conectamos pessoas que possuem itens para doar com aqueles que realmente precisam, 
            tornando o processo simples e acessível para todos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg glass-morphism card-hover"
            >
              <div className="h-14 w-14 rounded-full flex items-center justify-center bg-purple-dark mb-5">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    title: "Explore Produtos",
    description: "Navegue por nossa seleção de móveis e itens para doação.",
    icon: <Package className="h-6 w-6 text-purple-light" />,
  },
  {
    title: "Adicione ao Carrinho",
    description: "Escolha os itens que você precisa e adicione-os ao seu carrinho.",
    icon: <ShoppingCart className="h-6 w-6 text-purple-light" />,
  },
  {
    title: "Entrega Simplificada",
    description: "Taxa fixa de entrega, com adicional apenas para grandes volumes.",
    icon: <Truck className="h-6 w-6 text-purple-light" />,
  },
  {
    title: "Confiança",
    description: "Todos os itens são verificados e preparados para doação.",
    icon: <ShieldCheck className="h-6 w-6 text-purple-light" />,
  }
];

export default AboutSection;
