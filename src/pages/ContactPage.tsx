import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { Mail, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    return (
        <>
            <SEO
                title="Contact Us - PostZaper"
                description="Get in touch with the team behind PostZaper. We're here to help you organize your digital life."
            />

            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-24 w-full flex-grow">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-2xl mb-6">
                            <MessageSquare className="w-6 h-6 text-blue-600" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Have questions, feedback, or just want to say hello? We'd love to hear from you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {/* Company Info Card */}
                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                                <img src="/logo-icon.svg" alt="Axivion Labs" className="w-6 h-6" />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Maker</h2>

                            <div className="prose prose-blue text-gray-600 flex-grow">
                                <p className="font-medium text-md text-gray-900 mb-4">
                                    PostZaper is a product by <span className="text-purple-600 font-bold">Axivion Labs</span>.
                                </p>
                                <p className="leading-relaxed mb-4">
                                    We are a team of passionate developers and curators who believe that the internet is full of gold, but our pockets are full of holes.
                                </p>
                                <p className="leading-relaxed">
                                    Our mission is to build tools that help you capture, organize, and actually use the knowledge you find online. We believe in sustainable software that respects your privacy and your time.
                                </p>
                            </div>
                        </div>

                        {/* Contact Info Card */}
                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                                <Mail className="w-6 h-6 text-blue-600" />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>

                            <div className="flex-grow flex flex-col justify-center">
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Whether you need support, have a feature request, or want to discuss a partnership, drop us a line. We read every email.
                                </p>

                                <div className="p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center group cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-colors">
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Email Support</p>
                                    <a
                                        href="mailto:axivionlabs@gmail.com"
                                        className="text-xl md:text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors break-all"
                                    >
                                        axivionlabs@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ / Direct Help Section */}
                    <div className="text-center bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Need immediate help?</h3>
                        <p className="text-gray-500 mb-6">
                            Check out our other resources or follow us for updates.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/privacy" className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
