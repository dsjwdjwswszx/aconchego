
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Background with purple gradient overlay */}
      <div 
        className="absolute inset-0 -z-10 bg-[url('https://i.postimg.cc/CLrnrFsB/banner.jpg')] bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(76, 29, 149, 0.8), rgba(17, 24, 39, 0.95)), url('https://i.postimg.cc/CLrnrFsB/banner.jpg')` 
        }}
      />
      
      {/* Decorative blurred circles */}
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-600/20 blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-purple-400/20 blur-[120px] animate-pulse delay-700"></div>
      
      {/* Content */}
      <div className="w-full max-w-3xl mx-auto space-y-8 animate-fade-in relative z-10">
        {/* Small decorative pill */}
        <div className="inline-block px-3 py-1 rounded-full glass-morphism text-sm font-medium text-purple-light mb-2">
          Solidariedade em cada objeto
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          <span className="block text-white">Lar Aconchegante</span>
          <span className="block text-gradient mt-2">Doações que transformam</span>
        </h1>
        
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-6">
          Os produtos compartilhados aqui são pré-doação – itens que não têm muita saída nas lojas 
          ou que estão sendo desapegados por outros. Nossa intenção é apoiar quem mais precisa.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link to="/products">
            <Button size="lg" className="text-md px-8 py-6 rounded-md gap-2 group">
              Ver Produtos
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" size="lg" className="border-purple-light/50 text-white hover:bg-purple-light/10 px-8 py-6 rounded-md text-md">
              Sobre Nós
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Stats bar */}
      <div className="absolute bottom-8 left-0 right-0 mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 glass-morphism rounded-xl p-4 mx-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-2">
              <p className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</p>
              <p className="text-xs md:text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative curved shape at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-background" style={{ 
        clipPath: 'ellipse(70% 60% at 50% 100%)' 
      }} />
    </div>
  );
};

const stats = [
  { value: "500+", label: "Itens Doados" },
  { value: "300+", label: "Famílias Atendidas" },
  { value: "4", label: "Sedes" },
  { value: "100%", label: "Satisfação" }
];

export default Hero;
