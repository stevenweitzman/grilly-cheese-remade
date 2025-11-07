const ClientsSection = () => {
  const clients = [
    {
      name: "The Children's Hospital of Philadelphia",
      logo: "https://logos-world.net/wp-content/uploads/2021/11/CHOP-Logo.png",
    },
    {
      name: "Target",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Target-Logo.png",
    },
    {
      name: "The College of New Jersey",
      logo: "https://www.tcnj.edu/wp-content/uploads/2023/09/lion-logo-header.png",
    },
    {
      name: "Hallmark Channel",
      logo: "https://logos-world.net/wp-content/uploads/2022/01/Hallmark-Channel-Logo.png",
    },
    {
      name: "Planet Fitness",
      logo: "https://logos-world.net/wp-content/uploads/2021/03/Planet-Fitness-Logo.png",
    },
    {
      name: "Rutgers University",
      logo: "https://logos-world.net/wp-content/uploads/2022/11/Rutgers-University-Logo.png",
    },
    {
      name: "Princeton University",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Princeton_seal.svg",
    },
    {
      name: "Johnson & Johnson",
      logo: "https://logos-world.net/wp-content/uploads/2020/09/Johnson-Johnson-Logo.png",
    },
    {
      name: "Merck",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Merck-Logo.png",
    },
    {
      name: "Comcast",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Comcast-Logo.png",
    },
    {
      name: "Wells Fargo",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Wells-Fargo-Logo.png",
    },
    {
      name: "TD Bank",
      logo: "https://logos-world.net/wp-content/uploads/2022/04/TD-Bank-Logo.png",
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
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement('div');
                    fallback.className = 'text-center font-semibold text-muted-foreground text-sm';
                    fallback.textContent = client.name;
                    parent.appendChild(fallback);
                  }
                }}
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
