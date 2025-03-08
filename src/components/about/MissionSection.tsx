
import { Users, Award, Calendar } from "lucide-react";

const MissionSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card rounded-2xl p-8 glass-morphism">
          <h2 className="text-2xl font-bold mb-6 text-center">Nossa Missão</h2>
          <p className="text-lg leading-relaxed text-center mb-8">
            Trabalhamos para facilitar o acesso a móveis, eletrodomésticos e itens essenciais para o lar, 
            ajudando a transformar casas vazias em lares aconchegantes para famílias em situação de 
            vulnerabilidade social.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard 
              icon={<Users className="h-6 w-6 text-purple-light" />}
              value="300+"
              label="Famílias Atendidas"
            />
            
            <StatCard 
              icon={<Award className="h-6 w-6 text-purple-light" />}
              value="500+"
              label="Itens Doados"
            />
            
            <StatCard 
              icon={<Calendar className="h-6 w-6 text-purple-light" />}
              value="5 Anos"
              label="De Atuação"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) => {
  return (
    <div className="text-center">
      <div className="h-14 w-14 rounded-full bg-purple-dark flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="font-semibold mb-2">{value}</h3>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default MissionSection;
