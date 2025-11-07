const ClientsSection = () => {
  const clients = [
    {
      name: "The Children's Hospital of Philadelphia",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/CHOP_logo.svg/320px-CHOP_logo.svg.png",
    },
    {
      name: "Target",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Target_logo.svg/320px-Target_logo.svg.png",
    },
    {
      name: "The College of New Jersey",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/The_College_of_New_Jersey_seal.svg/240px-The_College_of_New_Jersey_seal.svg.png",
    },
    {
      name: "Hallmark Channel",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Hallmark_Channel.svg/320px-Hallmark_Channel.svg.png",
    },
    {
      name: "Planet Fitness",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Planet_Fitness_logo.svg/320px-Planet_Fitness_logo.svg.png",
    },
    {
      name: "Rutgers University",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Rutgers_Scarlet_Knights_logo.svg/240px-Rutgers_Scarlet_Knights_logo.svg.png",
    },
    {
      name: "Princeton University",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/240px-Princeton_seal.svg.png",
    },
    {
      name: "Johnson & Johnson",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Johnson_and_Johnson_Logo.svg/320px-Johnson_and_Johnson_Logo.svg.png",
    },
    {
      name: "Merck",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Merck_Logo.svg/320px-Merck_Logo.svg.png",
    },
    {
      name: "Comcast",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Comcast-logo.svg/320px-Comcast-logo.svg.png",
    },
    {
      name: "Wells Fargo",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wells_Fargo_Bank.svg/320px-Wells_Fargo_Bank.svg.png",
    },
    {
      name: "TD Bank",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Toronto-Dominion_Bank_logo.svg/320px-Toronto-Dominion_Bank_logo.svg.png",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Clients that Love Our Food
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Here's a select few of the thousands of clients we've had the privilege of serving
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {clients.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                className="max-w-full h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="text-center max-w-3xl mx-auto p-8 bg-accent/10 rounded-xl border border-accent/20 animate-fade-in">
          <p className="text-2xl font-semibold text-accent mb-2">
            "The Top Six Grilled Cheeses in the Nation"
          </p>
          <p className="text-muted-foreground">- Seamless Web/GrubHub</p>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-block text-lg font-semibold text-primary hover:text-accent transition-colors duration-300 story-link"
            onClick={() => {
              if (window.dataLayer) {
                window.dataLayer.push({
                  event: 'clients_cta_click',
                  cta_location: 'Clients Section',
                });
              }
            }}
          >
            Join our list of happy clients →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
