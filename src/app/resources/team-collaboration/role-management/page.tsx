"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Users,
  Settings,
  Lock,
  CheckCircle2,
  ArrowRight,
  UserCog,
  Building2,
  Eye,
  Layers
} from "lucide-react";
import { LandingHeader } from "@/components/landing/layout/landing-header";
import { LandingFooter } from "@/components/landing/layout/landing-footer";
import { GlowButton } from "@/components/landing/ui/glow-button";
import { GradientText } from "@/components/landing/ui/gradient-text";

export default function RoleManagementPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Shield className="w-4 h-4 mr-2" />
              Team Collaboration Guide
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Complete CRM <GradientText>Role Management</GradientText> Guide for Growing Teams
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Learn how to effectively structure your CRM roles and responsibilities. Discover best practices for assigning permissions, managing access levels, and building a scalable team hierarchy that drives sales success.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Managing Roles Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </GlowButton>
              </Link>
              <Link
                href="/resources/team-collaboration/user-permissions"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                Learn about permissions
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Understanding Role Management */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What is CRM Role Management and Why Does It Matter?
            </h2>

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                CRM role management is the systematic approach to defining, assigning, and maintaining user roles within your customer relationship management system. It serves as the backbone of your sales organization, determining who can access what information, perform which actions, and manage specific aspects of your customer data. Without proper role management, your CRM becomes either too restrictive, hindering productivity, or too open, creating security vulnerabilities and data integrity issues.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                In LeadFlow, role management goes beyond simple access control. Our system enables you to create a dynamic hierarchy that reflects your actual organizational structure while maintaining the flexibility to adapt as your team grows. Whether you are running a five-person startup or managing a global sales force of hundreds, effective role management ensures that every team member has exactly the access they need to perform their job efficiently without compromising sensitive data or overstepping their responsibilities.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed">
                The impact of well-implemented role management extends throughout your entire sales operation. It reduces onboarding time for new team members, minimizes the risk of accidental data modifications, ensures compliance with data protection regulations, and creates clear accountability chains. When roles are properly configured, your team spends less time asking for permissions and more time closing deals.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Role Types */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Essential CRM <GradientText>Role Types</GradientText> for Sales Teams
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Understanding the fundamental role types helps you design a permission structure that scales with your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: UserCog,
                title: "System Administrator",
                description: "Full system access with the ability to configure settings, manage integrations, create custom fields, and oversee all user accounts. Administrators shape how your entire CRM operates and maintain system health.",
                responsibilities: ["User management", "System configuration", "Integration setup", "Security policies"]
              },
              {
                icon: Building2,
                title: "Sales Manager",
                description: "Team leadership role with access to team performance metrics, pipeline oversight, and reporting capabilities. Managers can view all team member activities and reassign leads as needed.",
                responsibilities: ["Team oversight", "Pipeline management", "Performance reviews", "Lead distribution"]
              },
              {
                icon: Users,
                title: "Sales Representative",
                description: "Core user role focused on lead engagement and deal progression. Representatives manage their assigned leads, log activities, and move opportunities through the sales pipeline.",
                responsibilities: ["Lead management", "Activity logging", "Deal progression", "Customer communication"]
              },
              {
                icon: Eye,
                title: "Viewer/Analyst",
                description: "Read-only access for stakeholders who need visibility into CRM data without modification rights. Perfect for executives, marketing teams, or external consultants.",
                responsibilities: ["Report viewing", "Data analysis", "Performance monitoring", "Strategic planning"]
              }
            ].map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-background to-muted border border-border hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                  <role.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{role.title}</h3>
                <p className="text-muted-foreground mb-4">{role.description}</p>
                <ul className="space-y-2">
                  {role.responsibilities.map((item) => (
                    <li key={item} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Strategy */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Implementing Role Management: A Step-by-Step Approach
              </h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Audit Your Current Organization Structure</h3>
                    <p className="text-muted-foreground">
                      Begin by mapping your existing team hierarchy. Document every position that will interact with your CRM, from entry-level sales development representatives to C-suite executives who need dashboard access. Consider not just current team members but anticipated growth over the next twelve to twenty-four months. This forward-thinking approach prevents the need for major restructuring as your team expands.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Define Clear Responsibility Boundaries</h3>
                    <p className="text-muted-foreground">
                      For each role, establish explicit boundaries around what users can view, create, edit, and delete. The principle of least privilege should guide your decisions: grant only the minimum permissions necessary for each role to function effectively. This reduces risk while maintaining operational efficiency. LeadFlow makes this easy with granular permission controls that can be adjusted at any time.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Create Role Templates</h3>
                    <p className="text-muted-foreground">
                      Rather than configuring permissions for each individual user, create standardized role templates that can be quickly assigned to new team members. These templates should cover your most common positions and include detailed documentation of what each permission level allows. When someone joins your team, assigning the appropriate template takes seconds rather than hours.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Establish Approval Workflows</h3>
                    <p className="text-muted-foreground">
                      Define clear processes for role changes and permission requests. Who can approve a permission upgrade? How are temporary elevated permissions handled? What happens when someone changes departments? Having documented workflows prevents confusion and ensures consistent application of your role management policies across the organization.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Regular Review and Optimization</h3>
                    <p className="text-muted-foreground">
                      Role management is not a set-and-forget task. Schedule quarterly reviews to assess whether your current role structure still serves your team effectively. Look for patterns in permission requests, identify bottlenecks caused by overly restrictive access, and adjust roles to reflect evolving business needs. LeadFlow provides audit logs that make these reviews straightforward and data-driven.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Role Management <GradientText>Best Practices</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn from industry leaders and avoid common pitfalls in role configuration.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Layers,
                title: "Use Role Hierarchies Wisely",
                description: "Structure your roles in logical hierarchies where higher-level roles inherit permissions from lower levels. This simplifies management and ensures consistency. A sales manager automatically has all permissions their team members have, plus additional management capabilities."
              },
              {
                icon: Lock,
                title: "Separate Duties Appropriately",
                description: "Ensure that no single role has unchecked power over critical operations. For example, the person who can delete records should not be the only one who can audit deletions. This separation of duties creates natural checks and balances within your system."
              },
              {
                icon: Settings,
                title: "Document Everything",
                description: "Maintain clear documentation for each role including its purpose, included permissions, and typical assignments. This documentation becomes invaluable during audits, onboarding, and troubleshooting access issues."
              },
              {
                icon: Shield,
                title: "Plan for Edge Cases",
                description: "Consider temporary situations like covering for a colleague on leave, cross-departmental projects, or external consultant access. Having pre-defined protocols for these scenarios prevents ad-hoc decisions that might compromise security."
              }
            ].map((practice, index) => (
              <motion.div
                key={practice.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-background to-muted border border-border"
              >
                <practice.icon className="w-10 h-10 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{practice.title}</h3>
                <p className="text-muted-foreground">{practice.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Streamline Your <GradientText>Team Roles</GradientText>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              LeadFlow makes role management intuitive and powerful. Set up your entire team structure in minutes, not hours, and adapt easily as your organization grows.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </GlowButton>
              </Link>
              <Link
                href="/resources/team-collaboration/team-features"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                Explore team features
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Continue Learning About Team Collaboration
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Team Features Guide", href: "/resources/team-collaboration/team-features", description: "Discover collaboration tools" },
              { title: "User Permissions", href: "/resources/team-collaboration/user-permissions", description: "Configure access levels" },
              { title: "Lead Handoffs", href: "/resources/team-collaboration/lead-handoffs", description: "Master lead transitions" },
              { title: "Team Communication", href: "/resources/team-collaboration/team-communication", description: "Improve team messaging" }
            ].map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={resource.href}
                  className="block p-6 rounded-xl bg-muted/50 border border-border hover:border-purple-500/50 transition-all duration-300"
                >
                  <h3 className="font-semibold mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
