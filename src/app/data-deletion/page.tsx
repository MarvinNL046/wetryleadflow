import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Deletion | LeadFlow",
  description: "Request deletion of your data from LeadFlow",
};

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Data Deletion Request</h1>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Right to Data Deletion</h2>
            <p className="text-gray-700 mb-4">
              In accordance with GDPR, CCPA, and other applicable privacy regulations, you have the right
              to request the deletion of your personal data from our systems.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What Data We Store</h2>
            <p className="text-gray-700 mb-4">When you use LeadFlow, we may store:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Lead information received from Meta (Facebook) Lead Ads</li>
              <li>Your account information (name, email)</li>
              <li>Connected Facebook Page information</li>
              <li>Activity logs and audit trails</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Request Data Deletion</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-blue-900 mb-3">Option 1: Email Request</h3>
              <p className="text-blue-800 mb-2">
                Send an email to{" "}
                <a href="mailto:privacy@wetryleadflow.com" className="font-medium underline">
                  privacy@wetryleadflow.com
                </a>{" "}
                with the subject line &quot;Data Deletion Request&quot;.
              </p>
              <p className="text-blue-800 text-sm">
                Please include the email address associated with your account.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Option 2: In-App Deletion</h3>
              <p className="text-gray-700 mb-2">
                If you have an active account, you can delete your data directly from your account settings:
              </p>
              <ol className="list-decimal pl-6 text-gray-700">
                <li>Log in to your LeadFlow account</li>
                <li>Go to Settings → Privacy</li>
                <li>Click &quot;Delete My Data&quot;</li>
                <li>Confirm the deletion request</li>
              </ol>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What Happens After Your Request</h2>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>We will verify your identity to protect your data</li>
              <li>Your data will be deleted within <strong>30 days</strong> of verification</li>
              <li>You will receive a confirmation email once deletion is complete</li>
              <li>Some data may be retained for legal compliance (audit logs, billing records)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Facebook Data</h2>
            <p className="text-gray-700 mb-4">
              If you connected your Facebook account to LeadFlow and wish to remove the connection:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 mb-4">
              <li>
                Go to your{" "}
                <a
                  href="https://www.facebook.com/settings?tab=business_tools"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook Business Integrations settings
                </a>
              </li>
              <li>Find LeadFlow in the list</li>
              <li>Click &quot;Remove&quot; to disconnect the integration</li>
            </ol>
            <p className="text-gray-700">
              This will prevent any new data from being sent to LeadFlow. To delete existing data,
              please follow the deletion request process above.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about data deletion, contact us at:{" "}
              <a href="mailto:privacy@wetryleadflow.com" className="text-blue-600 hover:underline">
                privacy@wetryleadflow.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
