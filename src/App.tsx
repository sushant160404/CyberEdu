import React from 'react';
import { Shield, Book, AlertTriangle, Users, Brain, Trophy, Mail } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import SimulationCard from './components/SimulationCard';
import ResourceCard from './components/ResourceCard';
import PhishingDetector from './components/PhishingDetector';

function App() {
  const simulations = [
    {
      title: 'Phishing Email Detector',
      description: 'Use AI to analyze and detect potential phishing attempts in emails.',
      icon: Mail,
      difficulty: 'Beginner'
    },
    {
      title: 'Phishing Attack Simulator',
      description: 'Learn to identify and avoid phishing attempts through interactive scenarios.',
      icon: AlertTriangle,
      difficulty: 'Beginner'
    },
    {
      title: 'Password Security Challenge',
      description: 'Test your password strength and learn best practices for secure authentication.',
      icon: Shield,
      difficulty: 'Intermediate'
    },
    {
      title: 'Social Engineering Defense',
      description: 'Practice identifying social engineering tactics in real-world scenarios.',
      icon: Users,
      difficulty: 'Advanced'
    }
  ];

  const resources = [
    {
      title: 'Cybersecurity Basics Guide',
      description: 'Essential knowledge for protecting your digital assets.',
      icon: Book,
      type: 'Guide'
    },
    {
      title: 'Security Awareness Training',
      description: 'Comprehensive training modules for small business teams.',
      icon: Brain,
      type: 'Course'
    },
    {
      title: 'Security Certification Prep',
      description: 'Prepare for industry-recognized security certifications.',
      icon: Trophy,
      type: 'Certification'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <Features />
      
      {/* Phishing Detector Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">AI-Powered Phishing Detection</h2>
          <PhishingDetector />
        </div>
      </section>
      
      {/* Simulations Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Interactive Simulations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {simulations.map((simulation, index) => (
            <SimulationCard key={index} {...simulation} />
          ))}
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Learning Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400">© 2025 CyberEdu Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;