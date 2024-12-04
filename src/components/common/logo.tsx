import { cn } from "@/lib/utils";

const Logo = () => {
  return (
    <div className="border w-fit p-1 rounded-full bg-gradient-to-r from-brand-orange via-brand-red to-brand-purple">
      <div
        className={cn(
          "text-black relative font-bold size-4   bg-white rounded-full"
        )}
      ></div>
    </div>
  );
};

export default Logo;
