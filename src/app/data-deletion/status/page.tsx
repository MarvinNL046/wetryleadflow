import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deletion Status | LeadFlow",
  description: "Check the status of your data deletion request",
};

interface Props {
  searchParams: Promise<{ code?: string }>;
}

export default async function DeletionStatusPage({ searchParams }: Props) {
  const { code } = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Data Deletion Status</h1>

        {code ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-green-800 font-medium">Request Received</span>
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <strong>Confirmation Code:</strong>
              </p>
              <code className="block bg-gray-100 p-2 rounded text-xs break-all">
                {code}
              </code>
            </div>

            <div className="border-t pt-4 mt-4">
              <h2 className="font-medium text-gray-900 mb-2">What happens next?</h2>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Your data deletion request has been logged</li>
                <li>• We will process the request within 30 days</li>
                <li>• All your personal data will be permanently deleted</li>
                <li>• You will not receive any confirmation email (as per your request)</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p>No deletion request found.</p>
            <p className="mt-2 text-sm">
              If you submitted a deletion request, please use the link provided in your confirmation.
            </p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t">
          <p className="text-sm text-gray-500">
            Questions? Contact us at{" "}
            <a href="mailto:privacy@wetryleadflow.com" className="text-blue-600 hover:underline">
              privacy@wetryleadflow.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
