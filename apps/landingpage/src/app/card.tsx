import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-10  shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <div className="text-gray-700 text-base">{children}</div>
      </div>
    </div>
  );
};

export default Card;
