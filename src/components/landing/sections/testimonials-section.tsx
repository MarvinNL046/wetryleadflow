"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";

const testimonials = [
  {
    quote:
      "LeadFlow transformed how we handle Meta leads. We went from losing 40% of leads to converting 3x more in just two months.",
    author: "Sarah van den Berg",
    role: "Head of Sales",
    company: "TechStart BV",
    rating: 5,
  },
  {
    quote:
      "The AI lead scoring is a game-changer. My team now focuses on leads that actually close instead of chasing dead ends.",
    author: "Michael de Vries",
    role: "Sales Director",
    company: "GrowthCo",
    rating: 5,
  },
  {
    quote:
      "Finally, a CRM that doesn't require a PhD to use. We were up and running in 30 minutes with our entire pipeline migrated.",
    author: "Emma Bakker",
    role: "Founder",
    company: "Digital Agency X",
    rating: 5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function TestimonialsSection() {
  return (
    <section className="landing-section relative bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Testimonials"
          title="Loved by sales teams"
          description="See what our customers have to say about LeadFlow."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.author}
              variants={cardVariants}
              className="relative p-6 rounded-2xl bg-card border border-border hover:border-purple-500/30 transition-all duration-300 glow-card"
            >
              {/* Quote icon */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <Quote className="w-4 h-4 text-white" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400" />
                <div>
                  <p className="font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
