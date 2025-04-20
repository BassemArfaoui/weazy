import { motion } from "framer-motion";

export default function PulseLoader() {
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-2">
      <motion.span
        className="size-3 rounded-full"
        animate={{
          scale: [1, 1.4, 1],
          backgroundColor: [
   
            "#9CA3AF", 
       
          ],
        }}
        transition={{
          scale: {
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          },
          backgroundColor: {
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />
      
      <span className="text-gray-400 text-lg font-medium ml-1">
        Searching...
      </span>
    </div>
  );
}
