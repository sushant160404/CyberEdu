import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SimulationCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  difficulty: string;
}

const SimulationCard: React.FC<SimulationCardProps> = ({ title, description, icon: Icon, difficulty }) => {
  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Icon className="h-8 w-8 text-blue-600" />
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[difficulty as keyof typeof difficultyColors]}`}>
            {difficulty}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
          Start Simulation
        </button>
      </div>
    </div>
  );
};

export default SimulationCard;