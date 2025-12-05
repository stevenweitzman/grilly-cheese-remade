import { motion } from "framer-motion";
import { Truck, Users } from "lucide-react";

const FoodTruckShowcase = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet the Grilly Cheese Truck
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our iconic food truck brings the gourmet grilled cheese experience directly to your event
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            className="relative overflow-hidden rounded-2xl shadow-2xl group bg-gradient-to-br from-accent/20 to-primary/20 h-[400px] flex items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="text-center p-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Truck className="h-24 w-24 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Ready for Any Event
              </h3>
              <p className="text-muted-foreground">
                Fully equipped and professionally staffed for events of all sizes
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-2xl shadow-2xl group bg-gradient-to-br from-primary/20 to-accent/20 h-[400px] flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="text-center p-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Users className="h-24 w-24 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Perfect for Weddings
              </h3>
              <p className="text-muted-foreground">
                Create unforgettable memories with our mobile catering experience
              </p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            With over 2,500 events catered and a 4.9★ rating, our food truck has become a tri-state area favorite. 
            We handle everything from setup to cleanup, so you can focus on enjoying your special day.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FoodTruckShowcase;
