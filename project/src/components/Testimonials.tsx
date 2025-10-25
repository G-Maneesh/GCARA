import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Director of Emergency Response',
      organization: 'United Nations OCHA',
      location: 'Geneva, Switzerland',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'GCARA has revolutionized our crisis response capabilities. The AI predictions have been 98% accurate, allowing us to mobilize resources 48 hours earlier than before.',
      rating: 5,
      impact: '48h faster response'
    },
    {
      name: 'James Rodriguez',
      role: 'Emergency Management Coordinator',
      organization: 'FEMA',
      location: 'Washington, DC',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'The real-time coordination features have transformed how we manage multi-agency responses. Communication delays have been reduced by 75%.',
      rating: 5,
      impact: '75% faster coordination'
    },
    {
      name: 'Dr. Amara Okafor',
      role: 'Humanitarian Response Director',
      organization: 'Médecins Sans Frontières',
      location: 'Brussels, Belgium',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'GCARA\'s resource allocation algorithms have optimized our supply chain efficiency by 60%. We can now reach affected populations faster than ever.',
      rating: 5,
      impact: '60% efficiency gain'
    },
    {
      name: 'Colonel Michael Thompson',
      role: 'Disaster Response Commander',
      organization: 'National Guard',
      location: 'Colorado, USA',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'The simulation training modules have elevated our preparedness standards. Our response team\'s effectiveness has improved by 45% in drill evaluations.',
      rating: 5,
      impact: '45% better preparedness'
    },
    {
      name: 'Dr. Lisa Kim',
      role: 'Crisis Analytics Specialist',
      organization: 'World Health Organization',
      location: 'Geneva, Switzerland',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: 'The comprehensive reporting and audit capabilities have streamlined our post-crisis analysis. What used to take weeks now takes hours.',
      rating: 5,
      impact: '90% time reduction'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-24 px-6 bg-black/20">
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
            className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-500/10 rounded-full border border-yellow-500/20 mb-6"
          >
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">Trusted Worldwide</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Global Impact
            </span>
            <br />
            Stories
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Hear from crisis response leaders worldwide who are transforming emergency management 
            with GCARA's AI-powered platform.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10"
            >
              {/* Quote Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg"
              >
                <Quote className="w-8 h-8 text-white" />
              </motion.div>

              {/* Content */}
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl text-white leading-relaxed mb-8 font-light"
              >
                "{testimonials[currentIndex].content}"
              </motion.blockquote>

              {/* Author Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/50"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-blue-400 font-semibold">
                      {testimonials[currentIndex].role}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {testimonials[currentIndex].organization} • {testimonials[currentIndex].location}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end space-y-2">
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  {/* Impact Metric */}
                  <div className="px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                    <span className="text-green-400 text-sm font-semibold">
                      {testimonials[currentIndex].impact}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-blue-500 w-8' 
                      : 'bg-gray-500 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          </div>

          {/* Auto-play indicator */}
          {isAutoPlaying && (
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-1 bg-blue-500 rounded-full mt-4 mx-auto max-w-md"
              key={currentIndex}
            />
          )}
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-white/10"
        >
          {[
            { value: '150+', label: 'Organizations' },
            { value: '98%', label: 'Satisfaction' },
            { value: '45 countries', label: 'Deployed' },
            { value: '24/7', label: 'Support' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + (index * 0.1) }}
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

export default Testimonials;