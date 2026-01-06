import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <div className="h-6">
                        <Logo className="h-6 text-gray-900" />
                    </div>
                </div>
            </nav>

            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-lg prose-blue max-w-none text-gray-600">
                    <p className="lead text-xl text-gray-500 mb-8">
                        These terms are simple because we treat you like an adult. You pay us, we provide a service. We don't play games.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. The Agreement</h2>
                    <p className="mb-6">
                        By using PostZaper ("the Service"), you agree to these terms. If you don't agree, please don't use the Service.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. One-Time Payment</h2>
                    <p className="mb-6">
                        PostZaper PRO is sold as a one-time purchase. "lifetime access" means for the lifetime of the product. While we intend to maintain PostZaper indefinitely, if we ever shut down, we will provide at least 6 months notice and tools to export your data.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Acceptable Use</h2>
                    <p className="mb-6">
                        You agree not to misuse the Service. For example, do not:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Probe, scan, or test the vulnerability of our system.</li>
                        <li>Access, tamper with, or use non-public areas of the Service.</li>
                        <li>Interfere with or disrupt the access of any user, host, or network.</li>
                        <li>Use the Service to distribute malware or illegal content.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. No Warranty</h2>
                    <p className="mb-6">
                        The Service is provided "as is," without warranty of any kind. We try our best to keep things running smoothly, but we can't promise 100% uptime or that we'll never have bugs.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Limitation of Liability</h2>
                    <p className="mb-6">
                        To the maximum extent permitted by law, PostZaper's liability shall be limited to the amount you paid for the Service.
                    </p>

                    <p className="mt-12 text-sm text-gray-400">
                        Last updated: January 6, 2026
                    </p>
                </div>
            </main>
        </div>
    );
}
