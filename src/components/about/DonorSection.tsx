
import { Button } from "@/components/ui/button";

const DonorSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="glass-morphism rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Seja Um Doador</h2>
          <div className="h-1 w-20 bg-purple-light mx-auto rounded-full mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Se você tem móveis, eletrodomésticos ou outros itens para o lar que não utiliza mais e 
            gostaria de doar, entre em contato conosco! Sua doação pode transformar a vida de uma 
            família inteira.
          </p>
          <div className="inline-block px-6 py-4 rounded-lg bg-purple-dark/80 text-lg italic text-white mb-8">
            "Pequenos gestos de solidariedade podem transformar realidades e trazer conforto para 
            quem mais precisa."
          </div>
          <Button size="lg">Entre em Contato</Button>
        </div>
      </div>
    </section>
  );
};

export default DonorSection;
