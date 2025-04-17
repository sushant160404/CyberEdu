import React from 'react';
import { Shield, Users, Brain, Lock } from 'lucide-react';

const Features = () => {
  const features = [
    {
      name: 'Interactive Learning',
      description: 'Engage with real-world scenarios and hands-on simulations.',
      icon: Brain,
    },
    {
      name: 'Expert Resources',
      description: 'Access comprehensive guides and best practices from security experts.',
      icon: Shield,
    },
    {
      name: 'Team Training',
      description: 'Train your entire team with collaborative learning tools.',
      icon: Users,
    },
    {
      name: 'Regular Updates',
      description: 'Stay current with the latest security threats and prevention techniques.',
      icon: Lock,
    },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Comprehensive Security Education
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Learn cybersecurity through our feature-rich platform designed for practical, hands-on education.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;