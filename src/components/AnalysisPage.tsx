import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  Brain, 
  Target, 
  FileText,
  Sparkles,
  Download,
  Share,
  Database,
  PieChart,
  Activity,
  CheckCircle,
  AlertCircle,
  XCircle,
  Hash,
  Award,
  Eye
} from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Pie } from 'recharts';

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
    <Card className={`glass-nature hover:${colorClasses[color]} transition-all duration-300 group hover:scale-105`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Icon className={`w-8 h-8 ${colorClasses[color].split(' ')[0]} group-hover:glow-pulse`} />
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
    { name: 'Positive', value: 65, color: 'hsl(120 60% 45%)' },
    { name: 'Neutral', value: 25, color: 'hsl(30 45% 50%)' },
    { name: 'Negative', value: 10, color: 'hsl(0 65% 50%)' }
  ];

  return (
    <Card className="glass-nature">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <PieChart className="w-5 h-5 text-primary" />
          Sentiment Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart>
            <Pie
              data={sentimentData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              animationBegin={0}
              animationDuration={1000}
            >
              {sentimentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </RechartsPieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {sentimentData.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="relative w-16 h-16 mx-auto mb-2">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-muted/20"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke={item.color}
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - item.value / 100)}`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold" style={{ color: item.color }}>
                    {item.value}%
                  </span>
                </div>
              </div>
              <p className="text-xs font-medium">{item.name}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const TopicModelingSection: React.FC = () => {
  const topicData = [
    { topic: 'Technology', keywords: ['AI', 'Machine Learning', 'Data'], distribution: 35 },
    { topic: 'Business', keywords: ['Strategy', 'Growth', 'Revenue'], distribution: 28 },
    { topic: 'Health', keywords: ['Wellness', 'Fitness', 'Nutrition'], distribution: 22 },
    { topic: 'Education', keywords: ['Learning', 'Skills', 'Training'], distribution: 15 }
  ];

  return (
    <div className="space-y-6">
      <Card className="glass-nature">
        <CardHeader>
          <CardTitle>Topic Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topicData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(120 30% 25%)" />
              <XAxis dataKey="topic" stroke="hsl(120 15% 65%)" />
              <YAxis stroke="hsl(120 15% 65%)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(145 25% 12%)',
                  border: '1px solid hsl(120 30% 25%)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="distribution" fill="hsl(120 60% 45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topicData.map((topic, index) => (
          <motion.div
            key={topic.topic}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-nature">
              <CardContent className="p-4">
                <h4 className="font-semibold text-primary mb-2">{topic.topic}</h4>
                <div className="flex flex-wrap gap-2">
                  {topic.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Distribution</span>
                    <span>{topic.distribution}%</span>
                  </div>
                  <Progress value={topic.distribution} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ClassificationMetrics: React.FC = () => {
  const metricsData = [
    { metric: 'Accuracy', value: 0.94, color: 'hsl(120 60% 45%)' },
    { metric: 'Precision', value: 0.91, color: 'hsl(30 45% 50%)' },
    { metric: 'Recall', value: 0.88, color: 'hsl(340 55% 55%)' },
    { metric: 'F1-Score', value: 0.89, color: 'hsl(200 60% 45%)' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metricsData.map((metric, index) => (
          <motion.div
            key={metric.metric}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-nature text-center">
              <CardContent className="p-4">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="text-muted/20"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke={metric.color}
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 36}`}
                      strokeDashoffset={`${2 * Math.PI * 36 * (1 - metric.value)}`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold" style={{ color: metric.color }}>
                      {(metric.value * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <h4 className="font-semibold text-sm">{metric.metric}</h4>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="glass-nature">
        <CardHeader>
          <CardTitle>Model Performance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[
              { epoch: 1, accuracy: 0.65, loss: 0.8 },
              { epoch: 5, accuracy: 0.78, loss: 0.6 },
              { epoch: 10, accuracy: 0.85, loss: 0.4 },
              { epoch: 15, accuracy: 0.91, loss: 0.25 },
              { epoch: 20, accuracy: 0.94, loss: 0.15 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(120 30% 25%)" />
              <XAxis dataKey="epoch" stroke="hsl(120 15% 65%)" />
              <YAxis stroke="hsl(120 15% 65%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(145 25% 12%)',
                  border: '1px solid hsl(120 30% 25%)',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="accuracy" stroke="hsl(120 60% 45%)" strokeWidth={2} />
              <Line type="monotone" dataKey="loss" stroke="hsl(0 65% 50%)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

const InsightsSection: React.FC = () => {
  const insights = [
    "The dataset shows a strong positive sentiment bias with 65% positive responses",
    "Technology and Business topics dominate the conversation at 63% combined",
    "Classification accuracy of 94% indicates high-quality model performance",
    "Peak engagement occurs during business hours (9 AM - 5 PM)",
    "Mobile users show 23% higher positive sentiment than desktop users"
  ];

  const topTerms = [
    'innovation', 'growth', 'efficiency', 'collaboration', 'sustainability',
    'digital', 'strategy', 'optimization', 'analytics', 'transformation'
  ];

  return (
    <div className="space-y-6">
      <Card className="glass-nature">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            AI-Generated Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20"
            >
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">{insight}</p>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <Card className="glass-nature">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-secondary" />
            Top Discovered Terms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {topTerms.map((term, index) => (
              <motion.span
                key={term}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 bg-gradient-neon text-primary-foreground rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-pointer"
              >
                #{term}
              </motion.span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ReportsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Executive Summary', description: 'High-level overview and key findings', icon: Award },
          { title: 'Detailed Analysis', description: 'Comprehensive analysis with all metrics', icon: BarChart3 },
          { title: 'Visual Report', description: 'Charts and visualizations export', icon: Eye }
        ].map((report, index) => (
          <motion.div
            key={report.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-nature hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="p-6 text-center">
                <report.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                <Button variant="forest" size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Generate PDF
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const AnalysisPage: React.FC<AnalysisPageProps> = ({ onBack, uploadedFile }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'preprocessing', label: 'Data Preprocessing', icon: Database },
    { id: 'topic', label: 'Topic Modeling', icon: Brain },
    { id: 'sentiment', label: 'Sentiment Analysis', icon: TrendingUp },
    { id: 'classification', label: 'Classification Metrics', icon: Target },
    { id: 'insights', label: 'Insights & Summary', icon: Sparkles },
    { id: 'reports', label: 'Reports', icon: FileText }
  ];

  const metrics = [
    { title: 'Total Records', value: '12,847', change: '+2.3%', icon: FileText, color: 'primary' as const },
    { title: 'Data Quality', value: '94.2%', change: '+5.1%', icon: Target, color: 'secondary' as const },
    { title: 'Processing Time', value: '2.4s', change: '-12.5%', icon: Activity, color: 'accent' as const },
    { title: 'Accuracy Score', value: '97.8%', change: '+1.2%', icon: Brain, color: 'primary' as const }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <Card className="glass-nature">
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
        );

      case 'preprocessing':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Missing Values', value: '2.3%', status: 'handled' },
                { title: 'Duplicates', value: '0.8%', status: 'removed' },
                { title: 'Outliers', value: '1.2%', status: 'processed' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-nature">
                    <CardContent className="p-4 text-center">
                      <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h3 className="font-semibold">{stat.title}</h3>
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                      <p className="text-sm text-muted-foreground capitalize">{stat.status}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'topic':
        return <TopicModelingSection />;

      case 'sentiment':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <SentimentChart />
            <Card className="glass-nature">
              <CardHeader>
                <CardTitle>Sentiment Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { sentiment: 'Positive', percentage: 65, trend: '+5.2%', color: 'hsl(120 60% 45%)' },
                    { sentiment: 'Neutral', percentage: 25, trend: '-1.8%', color: 'hsl(30 45% 50%)' },
                    { sentiment: 'Negative', percentage: 10, trend: '-3.4%', color: 'hsl(0 65% 50%)' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.sentiment}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-card/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-medium">{item.sentiment}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{item.percentage}%</div>
                        <div className="text-sm text-muted-foreground">{item.trend}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'classification':
        return <ClassificationMetrics />;

      case 'insights':
        return <InsightsSection />;

      case 'reports':
        return <ReportsSection />;

      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cosmic relative">
      <div className="nature-particles" />
      
      {/* Sticky Navigation */}
      <motion.nav 
        className="sticky top-0 z-50 glass-nature border-b border-card-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
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
              <Button variant="nature" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="forest" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="flex gap-1 overflow-x-auto pb-2">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "forest" : "ghost"}
                size="sm"
                onClick={() => setActiveSection(section.id)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <section.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{section.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </motion.nav>

      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderSectionContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnalysisPage;