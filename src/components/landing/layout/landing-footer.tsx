"use client";

import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Resources: [
    { label: "Resource Center", href: "/resources" },
    { label: "Lead Generation", href: "/resources/lead-generation" },
    { label: "AI & Automation", href: "/resources/ai-automation" },
    { label: "CRM Best Practices", href: "/resources/crm-best-practices" },
    { label: "Meta Ads", href: "/resources/meta-ads" },
  ],
  "More Resources": [
    { label: "Sales Automation", href: "/resources/sales-automation" },
    { label: "Pipeline Management", href: "/resources/pipeline-management" },
    { label: "Contact Management", href: "/resources/contact-management" },
    { label: "Sales Analytics", href: "/resources/sales-analytics" },
    { label: "Industry Solutions", href: "/resources/industry-solutions" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Data Deletion", href: "/data-deletion" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Documentation", href: "/resources" },
    { label: "API Reference", href: "#" },
    { label: "Status", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 lg:gap-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">LF</span>
              </div>
              <span className="text-xl font-bold">LeadFlow</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              The modern CRM that helps you capture, score, and convert more leads with AI-powered automation.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-purple-500/50 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 text-sm">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LeadFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/sitemap.xml" className="hover:text-foreground transition-colors">
              Sitemap
            </Link>
            <span>•</span>
            <span>Made with ❤️ in the Netherlands</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
