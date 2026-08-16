"use client";

import { motion } from "framer-motion";

export const Left = ({ children, className = "" }) => {
      return (
            <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={className}
            >
                  {children}
            </motion.div>
      );
};

export const Right = ({ children, className = "" }) => {
      return (
            <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={className}
            >
                  {children}
            </motion.div>
      );
};

export const Bottom = ({ children, className = "" }) => {
      return (
            <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={className}
            >
                  {children}
            </motion.div>
      );
};