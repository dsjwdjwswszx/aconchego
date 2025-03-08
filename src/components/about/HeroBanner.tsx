
import { Heart } from "lucide-react";

const HeroBanner = () => {
  return (
    <div className="relative py-24 px-4">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-900/30 to-background"></div>
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-600/10 blur-[100px]"></div>
      <div className="container mx-auto text-center max-w-3xl">
        <Heart className="h-16 w-16 text-purple-light mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre o Lar Aconchegante</h1>
        <div className="h-1 w-20 bg-purple-light mx-auto rounded-full mb-8"></div>
        <p className="text-xl text-muted-foreground">
          Transformando vidas e lares através da solidariedade
        </p>
      </div>
    </div>
  );
};

export default HeroBanner;
