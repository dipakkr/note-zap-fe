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
                        Your privacy is non-negotiable. We don't sell your data, we don't track you across the web, and we don't use your content to train AI models without your permission.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. What We Collect</h2>
                    <p className="mb-6">
                        We only collect what is strictly necessary to provide the PostZaper service:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Account Information:</strong> Your name, email, and profile picture (via Google Auth) to identify you.</li>
                        <li><strong>Bookmarks:</strong> The URLs, titles, descriptions, and content snippets of the pages you save.</li>
                        <li><strong>Usage Data:</strong> Basic logs of when you interact with the app to help us debug issues (e.g., successful API calls).</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. What We DO NOT Collect</h2>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>We do <strong>not</strong> track your browsing history. The extension only activates when you explicitly click "Save".</li>
                        <li>We do <strong>not</strong> read your emails or private messages.</li>
                        <li>We do <strong>not</strong> sell your personal information to data brokers or advertisers.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Where Your Data Lives</h2>
                    <p className="mb-6">
                        Your data is stored securely in MongoDB databases hosted in the United States. We use industry-standard encryption for data in transit (TLS) and at rest.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Your Rights</h2>
                    <p className="mb-6">
                        You own your bookmarks. You can:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Export:</strong> Download all your bookmarks as a CSV or JSON file at any time.</li>
                        <li><strong>Delete:</strong> Permanently delete your account and all associated data from our servers.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Contact Us</h2>
                    <p>
                        If you have any questions about this policy, please reach out to us at <a href="mailto:axivionlabs@gmail.com" className="text-blue-600 hover:underline">axivionlabs@gmail.com</a>.
                    </p>
                    <p className="mt-8 text-sm text-gray-400">
                        Last updated: January 12, 2026
                    </p>
                </div>
            </div>
        </>
    );
}
