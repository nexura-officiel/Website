"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Terminal, Cpu, ShieldCheck, Wifi } from "lucide-react";

const bootSequence = [
  "Initializing Core Systems...",
  "Loading Neural Modules...",
  "Establishing Secure Connection...",
  "Optimizing Graphics Engine...",
  "System Operational."
];

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Progress Timer
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 100);

    // Log Timer
    let logIndex = 0;
    const logTimer = setInterval(() => {
      if (logIndex < bootSequence.length) {
        setLogs((prev) => [...prev, bootSequence[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logTimer);
      }
    }, 400);

    // Finish Loading
    const finishTimer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[#020617] flex flex-col items-center justify-center font-mono text-electric-cyan overflow-hidden"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.05]"></div>

          <div className="relative z-10 w-full max-w-md px-6">
            {/* Icons Strip */}
            <div className="flex justify-center gap-8 mb-8 text-slate-500">
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }}><Cpu size={24} /></motion.div>
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, delay: 0.2, repeat: Infinity }}><Terminal size={24} /></motion.div>
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, delay: 0.4, repeat: Infinity }}><ShieldCheck size={24} /></motion.div>
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, delay: 0.6, repeat: Infinity }}><Wifi size={24} /></motion.div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 w-full bg-slate-800 rounded-full mb-4 overflow-hidden">
              <motion.div
                className="h-full bg-electric-cyan shadow-[0_0_10px_#00D7D7]"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-slate-400 mb-8">
              <span>NEXURA_OS_BOOT_V1.0</span>
              <span>{Math.floor(Math.min(progress, 100))}%</span>
            </div>

            {/* Logs */}
            <div className="h-32 flex flex-col justify-end space-y-1">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs text-electric-cyan/80"
                >
                  <span className="mr-2 text-slate-600">[{new Date().toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })}]</span>
                  &gt; {log}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
