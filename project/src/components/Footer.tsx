import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, Mail, Phone, MapPin, 
  Twitter, Linkedin, Github, 
  ArrowRight, Globe, Clock 
} from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: 'Crisis Analytics', href: '#' },
        { label: 'Response Management', href: '#' },
        { label: 'Training Simulations', href: '#' },
        { label: 'Audit & Reporting', href: '#' }
      ]
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Government', href: '#' },
        { label: 'NGOs', href: '#' },
        { label: 'International Organizations', href: '#' },
        { label: 'Emergency Services', href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'API Reference', href: '#' },
        { label: 'Training Materials', href: '#' },
        { label: 'Best Practices', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Contact', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' }
  ];

  return (
    <footer className="bg-black/40 backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto px-6">
        
        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-16 border-b border-white/10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-6"
            >
              <Mail className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-semibold">Stay Updated</span>
            </motion.div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join the Crisis Response Revolution
            </h3>
            
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get the latest updates on GCARA features, crisis management insights, 
              and emergency response best practices delivered to your inbox.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold flex items-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg whitespace-nowrap"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-3 group mb-6">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Shield className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    GCARA
                  </h1>
                  <p className="text-sm text-gray-400 -mt-1">Crisis Response AI</p>
                </div>
              </Link>

              <p className="text-gray-400 mb-6 leading-relaxed">
                Empowering global crisis response with AI-driven prediction, coordination, 
                and management systems trusted by governments and organizations worldwide.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <span>Serving 150+ countries globally</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span>24/7 Emergency Response</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <span>+1 (555) GCARA-24</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="w-5 h-5 text-orange-400" />
                  <span>emergency@gcara.ai</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-bold text-white">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <motion.a
                        href={link.href}
                        whileHover={{ x: 5 }}
                        className="text-gray-400 hover:text-white transition-all duration-200 flex items-center group"
                      >
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity mr-2" />
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-gray-400 text-center md:text-left">
              <p>© 2025 GCARA. All rights reserved.</p>
              <p className="text-sm mt-1">
                Protecting lives through intelligent crisis response.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm text-gray-400">
              <motion.a
                href="#"
                whileHover={{ color: '#ffffff' }}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ color: '#ffffff' }}
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ color: '#ffffff' }}
                className="hover:text-white transition-colors"
              >
                Security
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;