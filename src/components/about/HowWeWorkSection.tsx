
import { Check } from "lucide-react";

const HowWeWorkSection = () => {
  const benefits = [
    "Avaliação criteriosa de todos os itens antes da disponibilização",
    "Processo transparente e acessível para solicitantes",
    "Suporte durante todo o processo de doação",
    "Acompanhamento pós-entrega para garantir satisfação",
    "Possibilidade de solicitação de itens específicos não listados"
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-purple-900/5">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-4 text-center">Como Funcionamos</h2>
        <div className="h-1 w-20 bg-purple-light mx-auto rounded-full mb-10"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1603796846097-bee99e4a601f?q=80&w=1000" 
              alt="Doações em ação" 
              className="rounded-xl w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Os produtos compartilhados em nossa plataforma são pré-doação – ou seja, são itens que não 
              têm muita saída nas lojas ou que estão sendo desapegados por outras pessoas. Todos os itens 
              passam por uma verificação para garantir que estão em condições adequadas de uso.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-purple-dark flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-purple-light" />
                  </div>
                  <p className="text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
