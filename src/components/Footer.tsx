const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
            Grilly Cheese
          </h3>
          <p className="text-primary-foreground/80 mb-4">
            The Ultimate Food Truck in NJ, PA, & NYC
          </p>
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Grilly Cheese Food Trucks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
