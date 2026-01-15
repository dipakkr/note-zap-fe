import SEO from '@/components/SEO';

export default function PrivacyPage() {
    return (
        <>
            <SEO
                title="Privacy Policy - PostZaper"
                description="Your privacy is non-negotiable. Learn how PostZaper protects your data, what we collect, and your rights as a user."
                keywords="postzaper privacy policy, data protection, bookmark privacy, user data rights"
            />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-lg prose-blue max-w-none text-gray-600">
                    <p className="lead text-xl text-gray-500 mb-8">
                        Your privacy is non-negotiable. We don't sell your data and we don't track you across the web.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. What We Collect & Why</h2>
                    <p className="mb-6">
                        We only collect what is strictly necessary to provide the PostZaper bookmarking service. Each data type has a specific, limited purpose:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Account Information:</strong> Your name, email address, and profile picture (via Google Authentication) — collected <em>solely</em> to identify your account and enable login functionality.</li>
                        <li><strong>Authentication Tokens:</strong> Secure tokens stored locally in your browser — collected <em>solely</em> to keep you logged in and authenticate API requests. These tokens expire and are refreshed automatically.</li>
                        <li><strong>Bookmarks:</strong> The URLs, titles, descriptions, and content snippets of the pages you explicitly choose to save — collected <em>solely</em> to provide bookmarking and organization functionality. We do not use this data for any other purpose.</li>
                        <li><strong>Usage Data:</strong> Basic logs of when you interact with the app — collected <em>solely</em> to help us debug issues and improve service reliability (e.g., successful API calls, error logs).</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. Data Access Transparency</h2>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                        <p className="text-blue-900 font-medium">
                            PostZaper only accesses the active tab's content when the user clicks the "Save" button. We do not run in the background, do not scan pages automatically, and do not save any content without explicit user action.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Chrome Extension Data</h2>
                    <p className="mb-6">
                        The PostZaper Chrome Extension collects and stores the following data locally on your device:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Authentication Token:</strong> Stored in Chrome's local storage to authenticate API requests. This token is encrypted in transit and expires after a set period.</li>
                        <li><strong>Workspace ID:</strong> A unique identifier linking your bookmarks to your account.</li>
                        <li><strong>Page Metadata:</strong> When you click "Save", the extension reads the current page's URL, title, description, and favicon. This data is <strong>only</strong> collected when you explicitly initiate a save action.</li>
                    </ul>
                    <p className="mb-6">
                        <strong>The extension does NOT:</strong>
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Track your browsing history or background activity</li>
                        <li>Access pages you don't explicitly bookmark</li>
                        <li>Read your emails, messages, or private content</li>
                        <li>Collect keystrokes, mouse movements, or form inputs</li>
                        <li>Send any data without your explicit action (clicking Save)</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. What We DO NOT Collect</h2>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>We do <strong>not</strong> track your browsing history. The extension only activates when you explicitly click "Save".</li>
                        <li>We do <strong>not</strong> read your emails, private messages, or personal communications.</li>
                        <li>We do <strong>not</strong> sell, rent, or trade your personal information to data brokers or advertisers.</li>
                        <li>We do <strong>not</strong> use your data to determine creditworthiness or for lending purposes.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Purpose Limitation</h2>
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                        <p className="text-green-900 font-medium">
                            All collected data is used exclusively to provide bookmarking and organization features. We do not use your data for any other purpose.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. How We Use Your Data</h2>
                    <p className="mb-6">
                        Your data is used solely for the following purposes:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Providing the Service:</strong> Storing and displaying your bookmarks, syncing across devices.</li>
                        <li><strong>Authentication:</strong> Verifying your identity and maintaining secure sessions.</li>
                        <li><strong>Improving the Service:</strong> Analyzing aggregate, anonymized usage patterns to improve features.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">7. Third-Party Services</h2>
                    <p className="mb-6">
                        We use the following third-party services:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Google Firebase:</strong> For authentication (Google Sign-In). Subject to <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.</li>
                        <li><strong>MongoDB Atlas:</strong> For secure database storage (hosted in the United States).</li>
                        <li><strong>Vercel:</strong> For web hosting and API infrastructure.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">8. Data Storage & Security</h2>
                    <p className="mb-6">
                        Your data is stored securely in MongoDB databases hosted in the United States. We use industry-standard encryption for data in transit (TLS 1.2+) and implement security best practices for data at rest.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">9. Data Retention</h2>
                    <p className="mb-6">
                        We retain your data for as long as your account is active. If you delete your account, all associated data will be permanently removed from our servers within 30 days.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">10. Your Rights</h2>
                    <p className="mb-6">
                        You own your bookmarks. You can:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Access:</strong> View all data we have about you at any time in your dashboard.</li>
                        <li><strong>Export:</strong> Download all your bookmarks as a CSV or JSON file at any time.</li>
                        <li><strong>Delete:</strong> Permanently delete your account and all associated data from our servers.</li>
                        <li><strong>Revoke Access:</strong> Uninstall the extension at any time to remove local data from your browser.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">11. Changes to This Policy</h2>
                    <p className="mb-6">
                        We may update this privacy policy from time to time. We will notify you of any significant changes by posting a notice in the app or sending an email.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">12. Contact Us</h2>
                    <p>
                        If you have any questions about this policy, please reach out to us at <a href="mailto:axivionlabs@gmail.com" className="text-blue-600 hover:underline">axivionlabs@gmail.com</a>.
                    </p>
                    <p className="mt-8 text-sm text-gray-400">
                        Last updated: January 15, 2026
                    </p>
                </div>
            </div>
        </>
    );
}
