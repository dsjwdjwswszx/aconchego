
import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-purple-900/10 to-background">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-4">Entre em Contato</h2>
        <div className="h-1 w-20 bg-purple-light mx-auto rounded-full mb-6"></div>
        <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
          Estamos à disposição para esclarecer suas dúvidas e ouvir suas sugestões
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-lg glass-morphism">
            <div className="h-12 w-12 rounded-full bg-purple-dark flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-purple-light" />
            </div>
            <h3 className="font-semibold mb-2">Telefone</h3>
            <p className="text-muted-foreground">(43) 3356-2548</p>
          </div>
          
          <div className="p-6 rounded-lg glass-morphism">
            <div className="h-12 w-12 rounded-full bg-purple-dark flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-purple-light" />
            </div>
            <h3 className="font-semibold mb-2">E-mail</h3>
            <p className="text-muted-foreground">contato@laraconchegante.org</p>
          </div>
          
          <div className="p-6 rounded-lg glass-morphism">
            <div className="h-12 w-12 rounded-full bg-purple-dark flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-purple-light" />
            </div>
            <h3 className="font-semibold mb-2">Endereço</h3>
            <p className="text-muted-foreground">Av. Principal, 123, Londrina - PR</p>
          </div>
        </div>
        
        <Link to="/products">
          <Button size="lg" className="text-md px-8">
            Ver Produtos Disponíveis
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ContactSection;
