import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | LeadFlow",
  description: "Privacy Policy for LeadFlow CRM",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              LeadFlow (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you use our lead management platform and related services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <h3 className="text-lg font-medium text-gray-800 mb-2">2.1 Information from Meta (Facebook) Lead Ads</h3>
            <p className="text-gray-700 mb-4">
              When you connect your Facebook Page to LeadFlow, we receive lead information submitted
              through your Lead Ad forms, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Name and contact information (email, phone number)</li>
              <li>Any custom fields included in your lead forms</li>
              <li>Lead submission timestamps</li>
              <li>Associated ad and campaign identifiers</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 mb-2">2.2 Account Information</h3>
            <p className="text-gray-700 mb-4">
              When you create an account, we collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Email address</li>
              <li>Name</li>
              <li>Organization/company name</li>
              <li>Authentication credentials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use the collected information to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Provide and maintain our lead management services</li>
              <li>Process and organize leads from your connected platforms</li>
              <li>Send notifications about new leads (if enabled)</li>
              <li>Improve and optimize our services</li>
              <li>Communicate with you about your account and our services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">
              We do not sell your personal information. We may share information with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Service Providers:</strong> Third-party services that help us operate our platform (hosting, analytics)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational measures to protect your data, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Encryption of data in transit (TLS/SSL)</li>
              <li>Encryption of sensitive data at rest</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
            <p className="text-gray-700 mb-4">
              We retain your data for as long as your account is active or as needed to provide services.
              You can request deletion of your data at any time through our data deletion process.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Withdraw consent for data processing</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Meta (Facebook) Platform Data</h2>
            <p className="text-gray-700 mb-4">
              Our use of information received from Meta APIs adheres to the
              <a href="https://developers.facebook.com/terms/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer"> Meta Platform Terms</a> and
              <a href="https://developers.facebook.com/devpolicy/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer"> Developer Policies</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="text-gray-700">
              Email: <a href="mailto:privacy@wetryleadflow.com" className="text-blue-600 hover:underline">privacy@wetryleadflow.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
