import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, BarChart3, FileText, Rocket, Sparkles } from 'lucide-react';

interface HeroPageProps {
  onGetStarted: () => void;
}

const HeroPage: React.FC<HeroPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze your data with unprecedented accuracy"
    },
    {
      icon: BarChart3,
      title: "Rich Visualizations",
      description: "Interactive charts and graphs that bring your data insights to life"
    },
    {
      icon: FileText,
      title: "Instant Reports",
      description: "Generate comprehensive reports in seconds with actionable insights"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 2
            }}
            initial={{ scale: 0, opacity: 0 }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-4 py-16 lg:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative inline-block mb-6"
          >
            <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-accent animate-sparkle" />
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-neon bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
              Smart Dataset Analyzer
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Transform your raw data into powerful insights with our AI-driven analysis platform.
            Unlock patterns, trends, and intelligence hidden in your datasets.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              variant="hero"
              size="xl"
              onClick={onGetStarted}
              className="group relative overflow-hidden"
            >
              <span className="flex items-center gap-3">
                Try Now 
                <Rocket className="w-5 h-5 group-hover:animate-float transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-card-border hover:border-primary/50 transition-all duration-300 group hover:shadow-glow-primary/20">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center group-hover:shadow-glow-primary transition-all duration-300 group-hover:scale-110">
                      <feature.icon className="w-8 h-8 text-primary group-hover:animate-glow-pulse" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: "99.9%", label: "Accuracy Rate" },
            { value: "10K+", label: "Datasets Analyzed" },
            { value: "50ms", label: "Average Response" },
            { value: "24/7", label: "AI Processing" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
              className="text-center group"
            >
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2 group-hover:animate-glow-pulse">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm lg:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HeroPage;