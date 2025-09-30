import type { WeightDisplayProps } from "../../types";
export const WeightDisplay = ({ weight }: WeightDisplayProps) => {
  return (
    <div className="flex items-center justify-center w-80 h-32 bg-gray-900 rounded-xl shadow-lg border-2 border-gray-700">
      <h2 className="text-6xl text-lime-400 font-mono tracking-wide">
        {weight} <span className="text-4xl text-gray-400">kg</span>
      </h2>
    </div>
  );
};