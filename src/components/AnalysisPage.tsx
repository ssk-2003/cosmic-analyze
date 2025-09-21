import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  Brain, 
  Target, 
  FileText,
  Sparkles,
  Download,
  Share
} from 'lucide-react';

interface AnalysisPageProps {
  onBack: () => void;
  uploadedFile: File | null;
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: 'primary' | 'secondary' | 'accent';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon, color }) => {
  const colorClasses = {
    primary: 'text-primary border-primary/20 shadow-glow-primary/10',
    secondary: 'text-secondary border-secondary/20 shadow-glow-secondary/10',
    accent: 'text-accent border-accent/20 shadow-glow-accent/10'
  };

  return (
    <Card className={`bg-card/50 backdrop-blur-sm border-card-border hover:${colorClasses[color]} transition-all duration-300 group`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Icon className={`w-8 h-8 ${colorClasses[color].split(' ')[0]} group-hover:animate-glow-pulse`} />
          <span className="text-sm text-muted-foreground">{change}</span>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const SentimentChart: React.FC = () => {
  const sentimentData = [
    { label: 'Positive', value: 65, color: 'bg-green-500' },
    { label: 'Neutral', value: 25, color: 'bg-yellow-500' },
    { label: 'Negative', value: 10, color: 'bg-red-500' }
  ];

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-card-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <TrendingUp className="w-5 h-5 text-primary" />
          Sentiment Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sentimentData.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <span className="text-sm text-muted-foreground">{item.value}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${item.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const AnalysisPage: React.FC<AnalysisPageProps> = ({ onBack, uploadedFile }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'preprocessing', label: 'Data Preprocessing', icon: FileText },
    { id: 'topic', label: 'Topic Modeling', icon: Brain },
    { id: 'sentiment', label: 'Sentiment Analysis', icon: TrendingUp },
    { id: 'classification', label: 'Classification Metrics', icon: Target },
    { id: 'insights', label: 'Insights & Summary', icon: Sparkles }
  ];

  const metrics = [
    { title: 'Total Records', value: '12,847', change: '+2.3%', icon: FileText, color: 'primary' as const },
    { title: 'Data Quality', value: '94.2%', change: '+5.1%', icon: Target, color: 'secondary' as const },
    { title: 'Processing Time', value: '2.4s', change: '-12.5%', icon: TrendingUp, color: 'accent' as const },
    { title: 'Accuracy Score', value: '97.8%', change: '+1.2%', icon: Brain, color: 'primary' as const }
  ];

  return (
    <div className="min-h-screen bg-gradient-cosmic">
      {/* Sticky Navigation */}
      <motion.nav 
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-card-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-lg font-semibold text-foreground">
                Analysis: {uploadedFile?.name || 'Dataset'}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="cosmic" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="neon" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="container mx-auto px-4 py-8">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            {/* Tab Navigation */}
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 bg-background-secondary border border-card-border">
              {navItems.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className="flex items-center gap-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <TabsContent value="overview" className="space-y-8">
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {metrics.map((metric, index) => (
                      <motion.div
                        key={metric.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <MetricCard {...metric} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <SentimentChart />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Card className="bg-card/50 backdrop-blur-sm border-card-border">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-foreground">
                            <Brain className="w-5 h-5 text-secondary" />
                            Processing Status
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {[
                            { label: 'Data Cleaning', progress: 100 },
                            { label: 'Feature Extraction', progress: 100 },
                            { label: 'Model Training', progress: 87 },
                            { label: 'Validation', progress: 65 }
                          ].map((item, index) => (
                            <div key={item.label} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-foreground">{item.label}</span>
                                <span className="text-sm text-muted-foreground">{item.progress}%</span>
                              </div>
                              <Progress value={item.progress} className="h-2" />
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Other Tab Contents */}
              {navItems.slice(1).map((item) => (
                <TabsContent key={item.id} value={item.id} className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="bg-card/50 backdrop-blur-sm border-card-border">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-foreground">
                          <item.icon className="w-5 h-5 text-primary" />
                          {item.label}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="py-12">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                            <item.icon className="w-8 h-8 text-primary animate-glow-pulse" />
                          </div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {item.label} Results
                          </h3>
                          <p className="text-muted-foreground mb-6">
                            Detailed analysis and insights for {item.label.toLowerCase()} will be displayed here.
                          </p>
                          <div className="inline-flex items-center gap-2 text-sm text-primary">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            Analysis in progress...
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalysisPage;
