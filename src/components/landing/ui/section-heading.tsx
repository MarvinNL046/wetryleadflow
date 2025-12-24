"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GradientText } from "./gradient-text";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  titleGradient?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  titleGradient,
  description,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "max-w-3xl",
        centered && "mx-auto text-center",
        className
      )}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
        >
          {badge}
        </motion.div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        {titleGradient ? (
          <>
            {title.split(titleGradient)[0]}
            <GradientText>{titleGradient}</GradientText>
            {title.split(titleGradient)[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p className="text-lg md:text-xl text-muted-foreground">
          {description}
        </p>
      )}
    </motion.div>
  );
}
