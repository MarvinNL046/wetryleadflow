"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Shield,
  Database,
  Zap,
  Settings,
  FileCheck,
  Table,
  ArrowLeftRight,
  Clock,
  Server
} from "lucide-react";
import { LandingHeader } from "@/components/landing/layout/landing-header";
import { LandingFooter } from "@/components/landing/layout/landing-footer";
import { GlowButton } from "@/components/landing/ui/glow-button";
import { GradientText } from "@/components/landing/ui/gradient-text";
import { SectionHeading } from "@/components/landing/ui/section-heading";

export default function ImportExportPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-medium text-purple-400 mb-6">
              <ArrowLeftRight className="w-4 h-4" />
              Contact Management
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Contact Import & Export{" "}
              <GradientText animated>Complete Guide</GradientText>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Move your contacts seamlessly between systems. Whether you&apos;re migrating
              from another CRM, importing fresh leads, or exporting for analysis,
              this guide covers everything you need to know.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg" className="group">
                  Start Importing Free
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </GlowButton>
              </Link>
              <Link href="/resources/contact-management/notes-history" className="text-muted-foreground hover:text-foreground transition-colors">
                ← Back to Notes & History
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Import Overview Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Import Contacts"
            title="Importing Contacts Into LeadFlow"
            titleGradient="Importing"
            description="Multiple ways to bring your contacts into LeadFlow, from simple CSV uploads to full CRM migrations."
          />

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileSpreadsheet,
                title: "CSV/Excel Import",
                description: "Upload spreadsheets with your contact data. Map columns to LeadFlow fields and import thousands of contacts in minutes.",
                features: ["Flexible column mapping", "Duplicate detection", "Error preview before import"]
              },
              {
                icon: RefreshCw,
                title: "CRM Migration",
                description: "Seamlessly migrate from Salesforce, HubSpot, Pipedrive, and other CRMs. Preserve all your data and history.",
                features: ["Full data migration", "Field mapping wizard", "Relationship preservation"]
              },
              {
                icon: Zap,
                title: "API Integration",
                description: "Connect external systems to push contacts directly into LeadFlow via our REST API. Perfect for automated workflows.",
                features: ["Real-time sync", "Webhook support", "Bulk operations"]
              }
            ].map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-purple-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <method.icon className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{method.title}</h3>
                <p className="text-muted-foreground mb-4">{method.description}</p>
                <ul className="space-y-2">
                  {method.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CSV Import Guide Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Step-by-Step"
            title="CSV Import: Complete Walkthrough"
            titleGradient="Complete"
            description="Follow these steps to import contacts from a CSV or Excel file successfully."
          />

          <div className="mt-16 space-y-12">
            {[
              {
                step: "01",
                title: "Prepare Your Data",
                description: "Before importing, clean and structure your data for best results. Remove duplicates, standardize formats, and ensure required fields are complete.",
                content: (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Required Fields</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { field: "Email", required: true, note: "Primary identifier" },
                        { field: "First Name", required: true, note: "Contact personalization" },
                        { field: "Last Name", required: true, note: "Contact personalization" },
                        { field: "Company", required: false, note: "B2B recommended" }
                      ].map((item) => (
                        <div key={item.field} className="p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.field}</span>
                            {item.required && (
                              <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs">Required</span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{item.note}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-500">Data Preparation Tips</p>
                          <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                            <li>• Use consistent date formats (YYYY-MM-DD recommended)</li>
                            <li>• Remove special characters from phone numbers</li>
                            <li>• Standardize country names or use ISO codes</li>
                            <li>• Ensure emails are valid format</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                step: "02",
                title: "Upload Your File",
                description: "Navigate to Contacts → Import and upload your CSV or Excel file. LeadFlow accepts files up to 50MB and 100,000 rows per import.",
                content: (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Supported Formats</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { format: ".csv", description: "Comma-separated values" },
                        { format: ".xlsx", description: "Excel 2007+" },
                        { format: ".xls", description: "Excel 97-2003" }
                      ].map((item) => (
                        <div key={item.format} className="p-4 rounded-lg bg-muted/50 text-center">
                          <span className="text-2xl font-bold text-purple-500">{item.format}</span>
                          <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Maximum file size</span>
                        <span className="text-purple-500 font-semibold">50 MB</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-medium">Maximum rows</span>
                        <span className="text-purple-500 font-semibold">100,000</span>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                step: "03",
                title: "Map Your Columns",
                description: "Match your spreadsheet columns to LeadFlow fields. The system auto-detects common field names but you can adjust mappings as needed.",
                content: (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Field Mapping Example</h4>
                    <div className="p-4 rounded-xl bg-card border border-border">
                      <Table className="w-5 h-5 text-purple-500 mb-4" />
                      <div className="space-y-3">
                        {[
                          { source: "email_address", target: "Email", status: "auto" },
                          { source: "first", target: "First Name", status: "auto" },
                          { source: "last", target: "Last Name", status: "auto" },
                          { source: "org_name", target: "Company", status: "manual" },
                          { source: "phone_num", target: "Phone", status: "manual" },
                          { source: "lead_source", target: "Source", status: "auto" }
                        ].map((mapping) => (
                          <div key={mapping.source} className="flex items-center gap-4 p-2 rounded-lg bg-muted/30">
                            <span className="font-mono text-sm flex-1">{mapping.source}</span>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium flex-1">{mapping.target}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              mapping.status === "auto" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                            }`}>
                              {mapping.status === "auto" ? "Auto-mapped" : "Manual"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              },
              {
                step: "04",
                title: "Configure Import Settings",
                description: "Choose how to handle duplicates, assign tags, and set ownership. These settings determine how contacts are processed.",
                content: (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Import Options</h4>
                    <div className="space-y-3">
                      {[
                        {
                          option: "Duplicate Handling",
                          choices: ["Skip duplicates", "Update existing", "Create new anyway"],
                          default: "Update existing"
                        },
                        {
                          option: "Owner Assignment",
                          choices: ["Assign to me", "Round-robin", "By territory"],
                          default: "Assign to me"
                        },
                        {
                          option: "Auto-tagging",
                          choices: ["No tags", "Import date tag", "Custom tag"],
                          default: "Import date tag"
                        }
                      ].map((setting) => (
                        <div key={setting.option} className="p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{setting.option}</span>
                            <span className="text-xs text-muted-foreground">Default: {setting.default}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {setting.choices.map((choice) => (
                              <span
                                key={choice}
                                className={`px-3 py-1 rounded-full text-sm ${
                                  choice === setting.default
                                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {choice}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              },
              {
                step: "05",
                title: "Review and Import",
                description: "Preview the import results before committing. Check for errors, warnings, and the final contact count.",
                content: (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Import Preview</h4>
                    <div className="p-6 rounded-xl bg-card border border-border">
                      <div className="grid grid-cols-4 gap-4 mb-6">
                        {[
                          { label: "Total Rows", value: "5,847", color: "text-foreground" },
                          { label: "New Contacts", value: "4,203", color: "text-green-500" },
                          { label: "Updates", value: "1,612", color: "text-blue-500" },
                          { label: "Errors", value: "32", color: "text-red-500" }
                        ].map((stat) => (
                          <div key={stat.label} className="text-center">
                            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                        <p className="font-medium text-red-400 mb-2">32 rows with errors</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• 18 rows: Invalid email format</li>
                          <li>• 9 rows: Missing required field (First Name)</li>
                          <li>• 5 rows: Duplicate within file</li>
                        </ul>
                        <button className="mt-3 text-sm text-red-400 hover:text-red-300 underline">
                          Download error report
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="grid lg:grid-cols-2 gap-8 items-start"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-start gap-4">
                    <span className="text-5xl font-bold text-purple-500/30">{item.step}</span>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
                <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl blur-2xl opacity-60" />
                  <div className="relative p-6 rounded-2xl bg-card border border-border">
                    {item.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Export Contacts"
            title="Exporting Your Contact Data"
            titleGradient="Exporting"
            description="Export contacts for analysis, backup, or migration to other systems."
          />

          <div className="mt-16 grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6">Export Options</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: FileSpreadsheet,
                    title: "CSV/Excel Export",
                    description: "Download contacts as a spreadsheet file. Choose which fields to include and apply filters."
                  },
                  {
                    icon: Database,
                    title: "Full Data Export",
                    description: "Export all contact data including notes, activities, and custom fields in JSON format."
                  },
                  {
                    icon: Clock,
                    title: "Scheduled Exports",
                    description: "Set up automatic exports on a schedule. Perfect for regular reporting and backups."
                  },
                  {
                    icon: Server,
                    title: "API Access",
                    description: "Access contact data programmatically via REST API for custom integrations."
                  }
                ].map((option) => (
                  <div key={option.title} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                      <option.icon className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{option.title}</h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6">Export Best Practices</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Filter Before Export",
                    description: "Apply filters to export only the contacts you need. This reduces file size and processing time."
                  },
                  {
                    title: "Choose Fields Wisely",
                    description: "Include only the fields you need. Exporting everything creates unnecessarily large files."
                  },
                  {
                    title: "Regular Backups",
                    description: "Schedule weekly full exports as backups. Store them securely off-site."
                  },
                  {
                    title: "Compliance Awareness",
                    description: "Be mindful of data privacy regulations (GDPR, CCPA) when exporting and sharing contact data."
                  }
                ].map((practice, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-semibold">{practice.title}</h4>
                      <p className="text-sm text-muted-foreground">{practice.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-xl bg-card border border-border">
                <h4 className="font-semibold mb-4">Export Format Comparison</h4>
                <div className="space-y-3">
                  {[
                    { format: "CSV", size: "Smallest", use: "Spreadsheet analysis" },
                    { format: "Excel", size: "Small", use: "Multiple sheets, formatting" },
                    { format: "JSON", size: "Medium", use: "Development, full data" },
                    { format: "XML", size: "Large", use: "Legacy system integration" }
                  ].map((item) => (
                    <div key={item.format} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{item.format}</span>
                      <span className="text-sm text-muted-foreground">{item.size}</span>
                      <span className="text-sm text-purple-400">{item.use}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Data Security Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Security"
            title="Data Security During Import & Export"
            titleGradient="Security"
            description="Your contact data is protected at every step of the import and export process."
          />

          <div className="mt-16 grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Encrypted Transfer",
                description: "All data transfers use TLS 1.3 encryption. Your files are never transmitted in plain text."
              },
              {
                icon: FileCheck,
                title: "Validation",
                description: "Every import is scanned for malware and validated for data integrity before processing."
              },
              {
                icon: Clock,
                title: "Audit Logging",
                description: "All import and export activities are logged with timestamps and user attribution."
              },
              {
                icon: Settings,
                title: "Access Control",
                description: "Role-based permissions determine who can import, export, and delete contact data."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CRM Migration Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Migration"
            title="Migrating From Other CRMs"
            titleGradient="Migrating"
            description="LeadFlow offers dedicated migration paths for popular CRM platforms."
          />

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Salesforce",
                features: ["Full contact & account migration", "Custom field mapping", "Activity history import", "Opportunity data"],
                time: "2-4 hours"
              },
              {
                name: "HubSpot",
                features: ["Contact & company records", "Deal pipeline migration", "Email history import", "Form submissions"],
                time: "1-2 hours"
              },
              {
                name: "Pipedrive",
                features: ["Person & organization data", "Deal stages mapping", "Activity timeline", "Custom fields"],
                time: "1-2 hours"
              }
            ].map((crm, index) => (
              <motion.div
                key={crm.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <h3 className="text-xl font-bold mb-4">{crm.name}</h3>
                <ul className="space-y-2 mb-6">
                  {crm.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Typical migration time</span>
                    <span className="font-semibold text-purple-500">{crm.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-muted-foreground mt-8"
          >
            Don&apos;t see your CRM? Contact our migration team for custom migration support.
          </motion.p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-60" />
            <div className="relative p-12 rounded-2xl bg-card border border-border text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Move Your Contacts to LeadFlow?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our migration wizards make it easy to bring your contacts from anywhere.
                Start with a free trial and import your data in minutes, not days.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link href="/resources/contact-management/contact-organization" className="text-muted-foreground hover:text-foreground transition-colors">
                  Back to Organization Guide →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Contact Organization",
                description: "After import, learn how to organize contacts for maximum efficiency.",
                href: "/resources/contact-management/contact-organization"
              },
              {
                title: "Lead Segmentation",
                description: "Segment imported contacts for targeted outreach campaigns.",
                href: "/resources/contact-management/lead-segmentation"
              },
              {
                title: "Notes & History",
                description: "Preserve and leverage notes during migration.",
                href: "/resources/contact-management/notes-history"
              }
            ].map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                className="p-6 rounded-xl bg-card border border-border hover:border-purple-500/50 transition-colors"
              >
                <h3 className="font-semibold mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
