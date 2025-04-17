import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  type: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, icon: Icon, type }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-300">
      <div className="flex items-center mb-4">
        <Icon className="h-8 w-8 text-blue-600" />
        <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {type}
        </span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="w-full bg-white border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-50 transition-colors">
        Access Resource
      </button>
    </div>
  );
};

export default ResourceCard;