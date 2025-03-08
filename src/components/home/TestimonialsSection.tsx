
const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Depoimentos</h2>
          <div className="h-1 w-20 bg-purple-light mx-auto rounded-full mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Confira o que as pessoas estão dizendo sobre nossa iniciativa
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 rounded-lg glass-morphism">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-dark/80 flex items-center justify-center text-lg font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const testimonials = [
  {
    name: "Maria Silva",
    role: "Beneficiária",
    text: "Graças ao Lar Aconchegante, consegui mobiliar minha casa após um período muito difícil. A equipe foi incrível e os móveis estavam em perfeito estado."
  },
  {
    name: "João Oliveira",
    role: "Doador",
    text: "Poder doar meus móveis antigos sabendo que eles terão um novo propósito me deixou muito feliz. O processo foi simples e rápido."
  },
  {
    name: "Ana Costa",
    role: "Voluntária",
    text: "Participo como voluntária há 1 ano e vejo diariamente como as doações transformam a vida das pessoas. É gratificante fazer parte desta iniciativa."
  }
];

export default TestimonialsSection;
