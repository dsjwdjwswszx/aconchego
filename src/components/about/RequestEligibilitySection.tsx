
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RequestEligibilitySection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-purple-900/10 to-background">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Quem Pode Solicitar</h2>
            <div className="h-1 w-20 bg-purple-light rounded-full mb-6"></div>
            <p className="text-muted-foreground mb-6">
              Qualquer pessoa que esteja precisando de apoio pode solicitar os itens disponíveis em nossa 
              plataforma. Para fazer um pedido, é necessário criar um cadastro simples com seus dados 
              pessoais e endereço para entrega.
            </p>
            <Link to="/products">
              <Button>Ver Produtos Disponíveis</Button>
            </Link>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1577896851305-fa9d5baee5b4?q=80&w=1000" 
              alt="Família feliz" 
              className="rounded-xl w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestEligibilitySection;
