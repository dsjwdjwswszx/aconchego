
const ContactSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-4 text-center">Contato</h2>
        <div className="h-1 w-20 bg-purple-light mx-auto rounded-full mb-10"></div>
        
        <div className="bg-card rounded-xl p-8 glass-morphism text-center">
          <p className="mb-6 text-muted-foreground">
            Para mais informações, dúvidas ou se quiser fazer uma doação, entre em contato:
          </p>
          <p className="text-lg mb-2">
            Email: <a href="mailto:contato@laraconchegante.org" className="text-purple-light hover:underline">contato@laraconchegante.org</a>
          </p>
          <p className="text-lg mb-2">
            Telefone: (43) 3356-2548
          </p>
          <p className="text-lg">
            Endereço: Av. Principal, 123, Londrina - PR
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
