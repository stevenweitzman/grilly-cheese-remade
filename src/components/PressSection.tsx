import { Award } from "lucide-react";
import { motion } from "framer-motion";
import phillyLogo from "@/assets/press-philly.png";
import sjMagLogo from "@/assets/press-sj-mag.png";
import phl17Logo from "@/assets/press-phl17.png";
import njcomLogo from "@/assets/press-njcom.png";

const PressSection = () => {
  const pressLogos = [
    { name: "Philly.com", logo: phillyLogo },
    { name: "SJ Magazine", logo: sjMagLogo },
    { name: "PHL17", logo: phl17Logo },
    { name: "NJ.com", logo: njcomLogo },
  ];

  return (
    <section className="py-16 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
            <Award className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Award Winning</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Recognized Excellence
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            "The Top Six Grilled Cheeses in the Nation"
          </p>
          <p className="text-lg text-muted-foreground font-medium">
            — Seamless Web/GrubHub
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {pressLogos.map((press, index) => (
            <motion.div 
              key={index}
              className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-all w-full h-24 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <img 
                src={press.logo} 
                alt={press.name}
                className="max-h-16 max-w-full object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PressSection;
