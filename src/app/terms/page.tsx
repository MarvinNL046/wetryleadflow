import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | LeadFlow",
  description: "Terms of Service for LeadFlow CRM",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong>{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing or using LeadFlow (&quot;Service&quot;), you agree to be bound by these Terms
              of Service (&quot;Terms&quot;). If you do not agree to these Terms, do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              LeadFlow is a lead management platform that helps businesses collect, organize, and
              manage leads from various sources including Meta (Facebook) Lead Ads. The Service
              includes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Integration with Meta Lead Ads</li>
              <li>Lead storage and management</li>
              <li>Contact relationship management (CRM)</li>
              <li>Pipeline and opportunity tracking</li>
              <li>Team collaboration features</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Account Registration</h2>
            <p className="text-gray-700 mb-4">To use the Service, you must:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Create an account with accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Promptly notify us of any unauthorized access</li>
              <li>Be at least 18 years old or the legal age in your jurisdiction</li>
            </ul>
            <p className="text-gray-700 mb-4">
              You are responsible for all activities that occur under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Acceptable Use</h2>
            <p className="text-gray-700 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the rights of others</li>
              <li>Send spam or unsolicited communications to leads</li>
              <li>Upload malicious code or interfere with the Service</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use the Service for any illegal or fraudulent purposes</li>
              <li>Resell or redistribute the Service without authorization</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Data and Privacy</h2>
            <p className="text-gray-700 mb-4">
              Your use of the Service is also governed by our{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              . You acknowledge that:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>You have the right to collect and process the lead data you receive</li>
              <li>You will comply with all applicable data protection laws (GDPR, CCPA, etc.)</li>
              <li>You are responsible for obtaining necessary consents from your leads</li>
              <li>You will handle lead data in accordance with your own privacy policy</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Meta Platform Integration</h2>
            <p className="text-gray-700 mb-4">
              When connecting your Facebook Page to LeadFlow, you also agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>
                <a
                  href="https://www.facebook.com/terms.php"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Meta Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="https://developers.facebook.com/terms/"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Meta Platform Terms
                </a>
              </li>
              <li>
                <a
                  href="https://developers.facebook.com/devpolicy/"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Meta Developer Policies
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The Service, including its design, features, and content, is owned by LeadFlow and
              protected by intellectual property laws. You retain ownership of your data and content
              uploaded to the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Service Availability</h2>
            <p className="text-gray-700 mb-4">
              We strive to maintain high availability but do not guarantee uninterrupted access.
              We may:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Perform maintenance with or without notice</li>
              <li>Modify or discontinue features</li>
              <li>Suspend accounts that violate these Terms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, LEADFLOW SHALL NOT BE LIABLE FOR ANY
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS
              OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES, ARISING FROM YOUR USE OF THE SERVICE.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Disclaimer of Warranties</h2>
            <p className="text-gray-700 mb-4">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY
              KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Termination</h2>
            <p className="text-gray-700 mb-4">
              You may terminate your account at any time. We may suspend or terminate your access
              if you violate these Terms. Upon termination:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Your right to use the Service ends immediately</li>
              <li>You may request export of your data</li>
              <li>We may delete your data after a reasonable retention period</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We may update these Terms from time to time. We will notify you of significant
              changes by email or through the Service. Continued use after changes constitutes
              acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These Terms are governed by the laws of the Netherlands. Any disputes shall be
              resolved in the courts of the Netherlands.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">14. Contact</h2>
            <p className="text-gray-700">
              For questions about these Terms, contact us at:{" "}
              <a href="mailto:legal@wetryleadflow.com" className="text-blue-600 hover:underline">
                legal@wetryleadflow.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
