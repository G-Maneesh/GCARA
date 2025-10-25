import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Shield, Globe, BarChart3, Users, AlertTriangle, Map, FileText } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Crisis Prediction',
      description: 'Advanced machine learning models analyze global data patterns to predict potential crises before they escalate.',
      color: 'from-purple-500 to-pink-500',
      delay: 0.1
    },
    {
      icon: Shield,
      title: 'Real-time Response',
      description: 'Instant alert systems and coordinated response protocols activate the moment crisis indicators are detected.',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.2
    },
    {
      icon: Globe,
      title: 'Global Coordination',
      description: 'Seamless collaboration between governments, NGOs, and international organizations across all regions.',
      color: 'from-green-500 to-teal-500',
      delay: 0.3
    },
    {
      icon: BarChart3,
      title: 'Data Analytics',
      description: 'Comprehensive analytics dashboard providing actionable insights from multi-source crisis data.',
      color: 'from-orange-500 to-red-500',
      delay: 0.4
    },
    {
      icon: Users,
      title: 'Multi-Role Access',
      description: 'Tailored interfaces for analysts, responders, administrators, and trainers with role-based permissions.',
      color: 'from-indigo-500 to-purple-500',
      delay: 0.5
    },
    {
      icon: AlertTriangle,
      title: 'Crisis Simulation',
      description: 'Interactive 3D training simulations for crisis preparedness and response team training.',
      color: 'from-yellow-500 to-orange-500',
      delay: 0.6
    },
    {
      icon: Map,
      title: 'GIS Integration',
      description: 'Advanced mapping and geospatial analysis for precise crisis location tracking and resource deployment.',
      color: 'from-emerald-500 to-green-500',
      delay: 0.7
    },
    {
      icon: FileText,
      title: 'Automated Reporting',
      description: 'AI-generated comprehensive crisis reports, audit logs, and resource allocation summaries.',
      color: 'from-violet-500 to-purple-500',
      delay: 0.8
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <section id="features" className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-6"
          >
            <Brain className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-semibold">AI-Powered Features</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Revolutionary
            </span>
            <br />
            Crisis Management
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the future of crisis response with our comprehensive suite of AI-driven tools 
            designed to save lives and protect communities worldwide.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className={`w-14 h-14 mb-4 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>

                {/* Hover Effect Lines */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;