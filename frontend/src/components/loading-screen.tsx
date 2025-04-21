"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const [visible, setVisible] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 10000); // 10 segundos

      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ opacity: { duration: 0.5 } }}
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ backgroundColor: 'var(--foreground)' }}
    >
      <div className="flex flex-col items-center justify-center space-y-8 p-8 rounded-lg shadow-lg bg-opacity-90">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0 }}
        >
          <Image
            src="/logo.png"
            alt="Avalia Logo"
            width={200}
            height={80}
            priority
          />
        </motion.div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Loader className="w-12 h-12 text-blue-600" />
        </motion.div>

        <p className="text-gray-200 font-medium">Carregando...</p>
      </div>
    </motion.div>
  );
}
