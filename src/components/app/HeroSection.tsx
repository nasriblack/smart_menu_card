import { Utensils } from "lucide-react";
import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-[#2c2c2c] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Utensils className="mx-auto mb-6" size={48} />
        <h1 className="text-5xl font-bold mb-4 font-serif">La Maison Délice</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto italic">
          Experience the art of fine dining with our carefully curated menu
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
