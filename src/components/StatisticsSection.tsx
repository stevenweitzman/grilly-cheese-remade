import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { TrendingUp, Award, Users, Star } from "lucide-react";

const StatisticsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--accent) / 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, hsl(var(--primary) / 0.1) 0%, transparent 50%)",
          backgroundSize: "100% 100%"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Numbers that showcase our commitment to excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <StatCard
            icon={Users}
            end={10000}
            suffix="+"
            label="Events Catered"
            delay={0}
            color="primary"
          />
          <StatCard
            icon={Star}
            end={4.9}
            decimals={1}
            prefix=""
            suffix="/5"
            label="Average Rating"
            delay={0.2}
            color="accent"
          />
          <StatCard
            icon={Award}
            end={6}
            prefix="Top "
            suffix=""
            label="In the Nation"
            delay={0.4}
            color="primary"
          />
          <StatCard
            icon={TrendingUp}
            end={500}
            suffix="+"
            label="5-Star Reviews"
            delay={0.6}
            color="accent"
          />
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  icon: any;
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
  delay: number;
  decimals?: number;
  color: "primary" | "accent";
}

const StatCard = ({ icon: Icon, end, prefix = "", suffix = "", label, delay, decimals = 0, color }: StatCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString();
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, end, {
        duration: 2,
        delay: delay,
      });
      return controls.stop;
    }
  }, [isInView, count, end, delay]);

  return (
    <motion.div
      ref={ref}
      className="bg-card border-2 border-border rounded-xl p-8 text-center relative overflow-hidden group"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.05,
        borderColor: color === "primary" ? "hsl(var(--primary))" : "hsl(var(--accent))",
        boxShadow: "var(--shadow-warm)"
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />
      
      <motion.div 
        className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
          color === "primary" ? "bg-primary/10" : "bg-accent/10"
        }`}
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className={`h-8 w-8 ${color === "primary" ? "text-primary" : "text-accent"}`} />
      </motion.div>

      <motion.div className="relative z-10">
        <div 
          className={`text-4xl md:text-5xl font-bold mb-2 ${
            color === "primary" ? "text-primary" : "text-accent"
          }`}
        >
          {prefix}
          <motion.span>{rounded}</motion.span>
          {suffix}
        </div>
        <p className="text-muted-foreground font-medium">{label}</p>
      </motion.div>
    </motion.div>
  );
};

export default StatisticsSection;
