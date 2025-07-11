"use client";
import { Users } from "lucide-react";

const OverView = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="border border-white/50 p-4 rounded-lg space-y-6 bg-secondary">
          <div className="bg-white rounded-lg inline-block text-black p-3">
            <Users />
          </div>
          <p className="text-lg">10K</p>
          <h3 className="text-xl text-white/50">Total Visitor</h3>
        </div>
        <div className="border border-white/50 p-4 rounded-lg space-y-6 bg-secondary">
          <div className="bg-white rounded-lg inline-block text-black p-3">
            <Users />
          </div>
          <p className="text-lg">10K</p>
          <h3 className="text-xl text-white/50">Total subscriber</h3>
        </div>
        <div className="border border-white/50 p-4 rounded-lg space-y-6 bg-secondary">
          <div className="bg-white rounded-lg inline-block text-black p-3">
            <Users />
          </div>
          <p className="text-lg">10K</p>
          <h3 className="text-xl text-white/50">Total Mentor</h3>
        </div>
        <div className="border border-white/50 p-4 rounded-lg space-y-6 bg-secondary">
          <div className="bg-white rounded-lg inline-block text-black p-3">
            <Users />
          </div>
          <p className="text-lg">10K</p>
          <h3 className="text-xl text-white/50">Active usersr</h3>
        </div>
      </div>
    </div>
  );
};

export default OverView;
