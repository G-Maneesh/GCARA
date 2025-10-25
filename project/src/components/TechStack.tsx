import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Brain, Cloud, Shield, Zap } from 'lucide-react';

const TechStack: React.FC = () => {
  const technologies = [
    {
      category: 'Frontend',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
    },
    {
      category: 'Backend',
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      technologies: ['Java Spring Boot', 'PostgreSQL', 'RESTful APIs', 'Microservices']
    },
    {
      category: 'AI/ML',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      technologies: ['OpenAI API', 'Machine Learning', 'Predictive Analytics', 'NLP']
    },
    {
      category: 'Cloud & DevOps',
      icon: Cloud,
      color: 'from-orange-500 to-red-500',
      technologies: ['AWS/GCP', 'CI/CD Pipelines', 'Docker', 'Kubernetes']
    },
    {
      category: 'Security',
      icon: Shield,
      color: 'from-indigo-500 to-blue-500',
      technologies: ['OAuth 2.0', 'Role-based Access', 'Data Encryption', 'Audit Logs']
    },
    {
      category: 'Performance',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      technologies: ['Real-time Updates', 'Caching', 'CDN', 'Load Balancing']
    }
  ];

  return (
    <section id="tech" className="py-24 px-6 bg-black/20">
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
            className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20 mb-6"
          >
            <Code className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-semibold">Technology Stack</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Enterprise-Grade
            </span>
            <br />
            Technology
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Built on cutting-edge technologies to ensure scalability, security, and reliability 
            for mission-critical crisis response operations.
          </p>
        </motion.div>

        {/* Technology Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`w-16 h-16 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {tech.category}
                    </h3>
                  </div>
                </div>

                {/* Technology List */}
                <div className="space-y-3">
                  {tech.technologies.map((technology, techIndex) => (
                    <motion.div
                      key={techIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index * 0.1) + (techIndex * 0.05) }}
                      className="flex items-center space-x-3 group/item"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${tech.color}`} />
                      <span className="text-gray-300 group-hover:text-white transition-colors group-hover/item:text-blue-300">
                        {technology}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tech.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-white/10"
        >
          {[
            { value: '99.9%', label: 'Uptime' },
            { value: '<100ms', label: 'Response Time' },
            { value: '256-bit', label: 'Encryption' },
            { value: 'ISO 27001', label: 'Certified' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + (index * 0.1) }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;