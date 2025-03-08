
import { Heart, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 text-purple-light mr-2" />
              <span className="text-xl font-bold">Lar Aconchegante</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Transformando casas em lares através de doações que fazem a diferença.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-purple-light transition-colors">Início</Link></li>
              <li><Link to="/products" className="text-muted-foreground hover:text-purple-light transition-colors">Produtos</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-purple-light transition-colors">Sobre</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Sedes</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-muted-foreground">Londrina</span></li>
              <li><span className="text-muted-foreground">Londrina 2</span></li>
              <li><span className="text-muted-foreground">Terceira</span></li>
              <li><span className="text-muted-foreground">Quarta</span></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">(43) 3356-2548</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">contato@laraconchegante.org</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Av. Principal, 123, Londrina - PR</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Lar Aconchegante. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-purple-light transition-colors">
              <span className="sr-only">Facebook</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-purple-light transition-colors">
              <span className="sr-only">Instagram</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-purple-light transition-colors">
              <span className="sr-only">WhatsApp</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M17.5 13.8c-.5.3-1.2.7-1.9.7-1.5 0-2.9-1.3-4.4-2.6-1.2-1.1-2.4-2.6-2.7-3.7-.1-.5 0-1.1.3-1.6.4-.7 1-1.4 1.5-2 .6-.7.6-1.6-.2-2.2-1.1-.8-2.1-1.7-3.3-2.4C5.9 0 5 .3 4.4 1c-2.2 2.9-2 6.2 1 9.9 2.1 2.5 4.7 4.7 7.5 6.2 1.2.6 2.5 1 3.4.8.9-.2 1.7-1.2 2.3-2.2.5-.9.2-1.7-.7-2.1-1-.5-2-1.2-2.9-1.5-1.2-.4-1.8.4-2.1.9"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
