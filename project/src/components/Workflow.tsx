import React from 'react';
import { motion } from 'framer-motion';
import { Brain, AlertTriangle, Users, BarChart3, ArrowRight } from 'lucide-react';

const Workflow: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'AI Prediction',
      description: 'Advanced algorithms analyze global data patterns to identify potential crisis indicators and risk factors.',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      features: ['Real-time data analysis', 'Pattern recognition', 'Risk assessment', 'Early warning alerts']
    },
    {
      number: '02',
      title: 'Alert & Coordination',
      description: 'Instant notifications activate response teams and coordinate resources across multiple organizations.',
      icon: AlertTriangle,
      color: 'from-orange-500 to-red-500',
      features: ['Multi-channel alerts', 'Resource mobilization', 'Team coordination', 'Communication protocols']
    },
    {
      number: '03',
      title: 'Response & Management',
      description: 'Coordinated response execution with real-time tracking, resource allocation, and impact monitoring.',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      features: ['Response deployment', 'Real-time tracking', 'Resource allocation', 'Progress monitoring']
    }
  ];

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { duration: 2, ease: "easeInOut" }
    }
  };

  return (
    <section id="workflow" className="py-24 px-6">
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
            className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20 mb-6"
          >
            <BarChart3 className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">Three-Step Process</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Intelligent
            </span>
            <br />
            Crisis Workflow
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our streamlined three-step process leverages AI intelligence to transform crisis response 
            from reactive to proactive, saving precious time and lives.
          </p>
        </motion.div>

        {/* Workflow Steps */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
            <svg className="w-full h-2" viewBox="0 0 100 2" preserveAspectRatio="none">
              <motion.path
                d="M 10 1 Q 30 1 50 1 T 90 1"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                variants={pathVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative group"
                >
                  {/* Card */}
                  <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                    {/* Gradient Background on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`} />
                    
                    {/* Step Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`text-6xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                        {step.number}
                      </div>
                      
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                      {step.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3">
                      {step.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: (index * 0.2) + (featureIndex * 0.1) }}
                          className="flex items-center space-x-3"
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color}`} />
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Bottom Accent */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-3xl`} />
                  </div>

                  {/* Arrow (Desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-10">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.2) + 0.5 }}
                        className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
                      >
                        <ArrowRight className="w-6 h-6 text-blue-400" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-full text-white font-semibold hover:from-green-700 hover:to-blue-700 transition-all shadow-lg"
          >
            See Workflow in Action
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Workflow;