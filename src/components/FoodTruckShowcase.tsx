import { motion } from "framer-motion";
import foodTruckExterior from "@/assets/food-truck-exterior.jpg";
import foodTruckEvent from "@/assets/food-truck-event.jpg";

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
            className="relative overflow-hidden rounded-2xl shadow-2xl group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={foodTruckExterior}
              alt="Grilly Cheese food truck exterior at outdoor event with guests in line"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-background mb-2">
                  Ready for Any Event
                </h3>
                <p className="text-background/90">
                  Fully equipped and professionally staffed for events of all sizes
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-2xl shadow-2xl group"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={foodTruckEvent}
              alt="Grilly Cheese food truck serving guests at elegant wedding reception during golden hour"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-background mb-2">
                  Perfect for Weddings
                </h3>
                <p className="text-background/90">
                  Create unforgettable memories with our mobile catering experience
                </p>
              </div>
            </div>
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
