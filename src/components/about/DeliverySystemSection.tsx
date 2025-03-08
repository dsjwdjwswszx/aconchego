
import { Check } from "lucide-react";

const DeliverySystemSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-4 text-center">Sistema de Entrega</h2>
        <div className="h-1 w-20 bg-purple-light mx-auto rounded-full mb-6"></div>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Para viabilizar a logística de entrega, utilizamos um sistema simples e transparente
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card rounded-xl p-6 glass-morphism">
            <h3 className="text-xl font-semibold mb-4">Taxa Básica</h3>
            <p className="text-4xl font-bold mb-6">R$ 200,00</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-purple-light" />
                <span className="text-muted-foreground">Até 5 itens</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-purple-light" />
                <span className="text-muted-foreground">Entrega em Londrina</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-purple-light" />
                <span className="text-muted-foreground">Agendamento flexível</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-card rounded-xl p-6 glass-morphism">
            <h3 className="text-xl font-semibold mb-4">Taxa Adicional</h3>
            <p className="text-4xl font-bold mb-6">R$ 25,00</p>
            <p className="text-muted-foreground mb-4">Por item adicional</p>
            <p className="text-muted-foreground">
              Para pedidos com mais de 5 móveis, é acrescentado um valor adicional 
              de R$ 25,00 por item devido ao maior volume de carga.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverySystemSection;
