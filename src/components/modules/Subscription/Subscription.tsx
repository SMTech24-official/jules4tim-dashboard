import { CircleCheck } from "lucide-react";

const Subscription = () => {
  return (
    <div>
      <div className="flex gap-5">
        <h3 className="bg-secondary p-3 text-primary rounded-lg border border-white/50">
          User Subscription model
        </h3>
        <h3 className="bg-secondary p-3 text-white/50 rounded-lg border border-white/50">
          User Subscription model
        </h3>
      </div>

      <h2 className="text-xl font-medium my-8">Uploaded videos by category</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="space-y-6 bg-secondary p-5 rounded-lg border border-white/50">
            <h3 className="text-lg font-semibold">Direct pay</h3>
            <p className="flex gap-2 items-center">
              <CircleCheck className="text-primary" /> Access to mentor
              communities
            </p>
            <p className="flex gap-2 items-center">
              <CircleCheck className="text-primary" /> Access to weekly live
              streams
            </p>
            <p className="flex gap-2 items-center">
              <CircleCheck className="text-primary" /> 20+ Mentorship Categories
            </p>
            <p className="flex gap-2 items-center">
              <CircleCheck className="text-primary" /> 12 month commitment
              access
            </p>
            <p className="flex gap-2 items-center">
              <CircleCheck className="text-primary" /> Access to mentor
              communities
            </p>
            <p className="flex gap-2 items-center">
              <CircleCheck className="text-primary" /> Access to mentor
              communities
            </p>
          </div>
          <h3 className="bg-secondary p-3 rounded-lg border border-white/50">
            Billed annually at $1,999.
          </h3>
        </div>
        <div className="space-y-5">
          <div className="space-y-6 bg-secondary p-5 rounded-lg border border-white/50">
            <h3 className="text-lg font-semibold">Direct pay</h3>
            <p className="flex gap-2 items-center">
              <CircleCheck className="text-primary" /> Access to mentor
              communities
            </p>
            <p className="flex gap-2 items-center">
              <CircleCheck className="text-primary" /> Access to weekly live
              streams
            </p>
            <p className="flex gap-2 items-center">
              <CircleCheck className="text-primary" /> 20+ Mentorship Categories
            </p>
            <p className="flex gap-2 items-center">
              <CircleCheck className="text-primary" /> 12 month commitment
              access
            </p>
            <p className="flex gap-2 items-center">
              <CircleCheck className="text-primary" /> Access to mentor
              communities
            </p>
            <p className="flex gap-2 items-center">
              <CircleCheck className="text-primary" /> Access to mentor
              communities
            </p>
          </div>
          <h3 className="bg-secondary p-3 rounded-lg border border-white/50">
            Billed annually at $1,999.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
