import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import TechStack from '../components/TechStack';
import Workflow from '../components/Workflow';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen"
    >
      <Header />
      <Hero />
      <Features />
      <TechStack />
      <Workflow />
      <Testimonials />
      <Footer />
    </motion.div>
  );
};

export default LandingPage;