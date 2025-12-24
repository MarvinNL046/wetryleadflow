"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Lock,
  Key,
  Shield,
  Eye,
  Edit3,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Settings,
  AlertTriangle,
  FileCheck,
  Users
} from "lucide-react";
import { LandingHeader } from "@/components/landing/layout/landing-header";
import { LandingFooter } from "@/components/landing/layout/landing-footer";
import { GlowButton } from "@/components/landing/ui/glow-button";
import { GradientText } from "@/components/landing/ui/gradient-text";

export default function UserPermissionsPage() {
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
              <Key className="w-4 h-4 mr-2" />
              Access Control Guide
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Complete Guide to Setting Up <GradientText>User Permissions</GradientText> in Your CRM
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Master the art of CRM permission configuration. Learn how to balance security with productivity, protect sensitive data, and create a permission structure that scales seamlessly with your growing sales organization.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Configure Permissions Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </GlowButton>
              </Link>
              <Link
                href="/resources/team-collaboration/role-management"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                Explore role management
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Understanding Permissions */}
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
              Understanding CRM Permissions: The Foundation of Data Security
            </h2>

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Permissions in your CRM determine exactly what each user can see, create, modify, and delete within the system. They form the security backbone of your sales data, protecting sensitive customer information while enabling team members to work efficiently. A well-designed permission system is invisible to users who have the access they need but provides robust guardrails that prevent accidental data loss and unauthorized access.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                The challenge lies in finding the right balance. Permissions that are too restrictive create bottlenecks where team members constantly need to request access or wait for approvals. Permissions that are too loose expose your organization to data breaches, compliance violations, and the risk of accidental modifications that can corrupt your sales data. LeadFlow provides granular permission controls that let you find the perfect balance for your specific organizational needs.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Understanding permissions starts with recognizing the four fundamental access levels that apply to every piece of data in your CRM: create, read, update, and delete. These are commonly abbreviated as CRUD permissions. Each user or role in your system should have explicitly defined CRUD permissions for every type of record they might encounter, from leads and contacts to deals, activities, and reports. LeadFlow makes this configuration intuitive while maintaining the depth needed for enterprise security requirements.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Permission Types */}
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
              The Four <GradientText>Permission Types</GradientText> Explained
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Understanding these core permission types helps you design access controls that work for every scenario.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Eye,
                title: "Read (View)",
                color: "from-blue-500 to-cyan-500",
                description: "The ability to see and access records. Users with read permissions can view data but cannot make changes. This is the foundation level of access, typically granted to analysts, executives, and team members who need visibility without modification rights.",
                examples: ["View lead details", "Access reports", "See pipeline data", "Browse customer history"]
              },
              {
                icon: Edit3,
                title: "Create (Add)",
                color: "from-green-500 to-emerald-500",
                description: "The ability to add new records to the system. Users with create permissions can input new leads, log activities, and add notes. This permission is essential for sales reps who need to capture new opportunities and customer interactions.",
                examples: ["Add new leads", "Log activities", "Create deals", "Add notes and comments"]
              },
              {
                icon: Settings,
                title: "Update (Edit)",
                color: "from-purple-500 to-pink-500",
                description: "The ability to modify existing records. Update permissions allow users to change field values, update statuses, and refine data as situations evolve. Most active CRM users need update access for records they own or manage.",
                examples: ["Update lead status", "Modify deal values", "Edit contact info", "Change assignments"]
              },
              {
                icon: Trash2,
                title: "Delete (Remove)",
                color: "from-red-500 to-orange-500",
                description: "The ability to permanently remove records. Delete permissions should be granted cautiously as they enable irreversible data loss. Many organizations restrict delete access to administrators or require soft-delete workflows.",
                examples: ["Remove duplicate leads", "Delete test data", "Archive old records", "Clean up imports"]
              }
            ].map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-background to-muted border border-border hover:border-purple-500/50 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-4`}>
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{type.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{type.description}</p>
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2 font-medium">Examples:</p>
                  <ul className="space-y-1">
                    {type.examples.map((example) => (
                      <li key={example} className="flex items-center text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Permission Scopes */}
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
                Permission Scopes: Controlling What Users Can Access
              </h2>

              <p className="text-xl text-muted-foreground mb-10">
                Beyond the type of action, permissions also define the scope of records a user can affect. LeadFlow supports multiple scope levels that can be combined for precise access control.
              </p>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-background border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Own Records Only</h3>
                      <p className="text-muted-foreground mb-3">
                        The most restrictive scope limits users to records they personally own or are assigned to. This is appropriate for individual contributors who should focus on their own pipeline without visibility into colleague activities. A sales development representative working their assigned leads exemplifies this scope level.
                      </p>
                      <p className="text-muted-foreground">
                        This scope protects lead ownership and prevents accidental cross-contamination of accounts. When combined with clear lead assignment rules, it ensures accountability while maintaining appropriate boundaries between team members working on different accounts or territories.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-background border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Team Records</h3>
                      <p className="text-muted-foreground mb-3">
                        Team scope grants access to all records owned by members of the same team. This enables managers to oversee their direct reports and facilitates collaboration within working groups. It also allows for backup coverage when team members are unavailable without exposing data to the entire organization.
                      </p>
                      <p className="text-muted-foreground">
                        Team-scoped permissions are ideal for sales managers who need full visibility into their team's activities and performance. They can view all deals, reassign leads between team members, and ensure nothing falls through the cracks during vacations or transitions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-background border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Organization-Wide</h3>
                      <p className="text-muted-foreground mb-3">
                        The broadest scope grants access to all records in the organization regardless of ownership. This level is typically reserved for administrators, executives, and specialized roles like revenue operations that require complete visibility across the business.
                      </p>
                      <p className="text-muted-foreground">
                        Organization-wide permissions should be granted thoughtfully. While they eliminate access barriers, they also remove the natural segmentation that helps teams stay focused. Consider whether full access is truly necessary or whether team-level scope with specific exceptions might better serve your needs.
                      </p>
                    </div>
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
              Permission Configuration <GradientText>Best Practices</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow these proven strategies to build a permission system that scales with your organization.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Apply the Principle of Least Privilege",
                description: "Start with minimal permissions and add access as needed. It is much easier to grant additional permissions than to revoke ones that have been abused or led to data issues. When in doubt, err on the side of restriction and establish clear processes for permission escalation requests."
              },
              {
                icon: FileCheck,
                title: "Use Role-Based Permissions",
                description: "Rather than configuring permissions for individual users, create well-defined roles with specific permission sets. Assign users to roles based on their job function. This approach dramatically simplifies management as your team grows and ensures consistency across similar positions."
              },
              {
                icon: AlertTriangle,
                title: "Protect Sensitive Fields",
                description: "Apply field-level permissions to sensitive data like deal amounts, commission rates, or competitive intelligence. Not everyone who can view a lead needs to see every field. LeadFlow supports granular field visibility controls that let you hide specific information from certain roles."
              },
              {
                icon: Lock,
                title: "Implement Audit Logging",
                description: "Enable comprehensive audit trails for sensitive actions. Knowing who accessed or modified data and when is essential for compliance and troubleshooting. LeadFlow automatically logs all permission-related activities, giving you complete visibility into system access."
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

      {/* Common Permission Scenarios */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                Common Permission Scenarios and Solutions
              </h2>

              <p className="text-xl text-muted-foreground text-center mb-12">
                Real-world situations require thoughtful permission design. Here is how to handle typical challenges.
              </p>

              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-background border border-border">
                  <h3 className="text-lg font-semibold mb-3">Territory-Based Access Control</h3>
                  <p className="text-muted-foreground">
                    When your sales team is organized by territory, you need permissions that automatically segment data by geographic region or account characteristics. LeadFlow supports dynamic permission rules that can filter access based on any field value. This means a rep assigned to the Northeast territory only sees leads and accounts in that region, without requiring manual access grants for each record.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-background border border-border">
                  <h3 className="text-lg font-semibold mb-3">Partner and Channel Access</h3>
                  <p className="text-muted-foreground">
                    External partners often need limited CRM access to manage shared leads or submit referrals. Create dedicated partner roles with carefully scoped permissions that grant access only to relevant records and restrict sensitive fields. Consider implementing separate partner portals that provide necessary functionality without exposing your core CRM data.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-background border border-border">
                  <h3 className="text-lg font-semibold mb-3">Temporary Elevated Access</h3>
                  <p className="text-muted-foreground">
                    Sometimes team members need temporary access beyond their normal permissions for special projects or coverage situations. Implement time-limited permission grants that automatically expire after a set period. This prevents permission creep where temporary access becomes permanent without review.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-background border border-border">
                  <h3 className="text-lg font-semibold mb-3">Cross-Functional Collaboration</h3>
                  <p className="text-muted-foreground">
                    Marketing, customer success, and support teams often need CRM visibility without full sales permissions. Create specialized read-focused roles that provide the context these teams need while protecting sales-sensitive data. Consider which fields and record types each department genuinely requires and limit access accordingly.
                  </p>
                </div>
              </div>
            </motion.div>
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
              Ready to Configure <GradientText>Smart Permissions</GradientText>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              LeadFlow makes permission management intuitive without sacrificing power. Set up your entire team with appropriate access in minutes and adjust easily as your needs evolve.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </GlowButton>
              </Link>
              <Link
                href="/resources/team-collaboration/lead-handoffs"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                Learn about lead handoffs
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
              More Team Collaboration Resources
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Role Management", href: "/resources/team-collaboration/role-management", description: "Build effective team hierarchies" },
              { title: "Team Features", href: "/resources/team-collaboration/team-features", description: "Explore collaboration tools" },
              { title: "Lead Handoffs", href: "/resources/team-collaboration/lead-handoffs", description: "Perfect your handoff process" },
              { title: "Team Communication", href: "/resources/team-collaboration/team-communication", description: "Improve internal messaging" }
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
