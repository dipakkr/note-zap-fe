import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <div className="h-6">
                        <Logo className="h-6 text-gray-900" />
                    </div>
                </div>
            </nav>

            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8">
                    The Anti-Hoarding Tool.
                </h1>

                <div className="prose prose-lg prose-blue max-w-none text-gray-600">
                    <p className="lead text-2xl text-gray-500 mb-12 font-light leading-relaxed">
                        We built PostZaper because we were tired of "Read Later" becoming "Read Never."
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-6">Our Story</h2>
                    <p>
                        Like you, we live on the internet. We find incredible stuff on Twitter, LinkedIn, Indiehacker forums, and random blogs.
                    </p>
                    <p>
                        But our method of saving this stuff was broken.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-8">
                        <li>Twitter bookmarks are a black hole.</li>
                        <li>LinkedIn saved posts are impossible to search.</li>
                        <li>Browser bookmarks are a graveyard.</li>
                    </ul>
                    <p>
                        We realized that <strong>collecting</strong> isn't the same as <strong>curating</strong>. We needed a tool that was fast enough to keep up with our feed, but powerful enough to help us actually use the information later.
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-6">Our Philosophy</h2>
                    <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. One Home Base</h3>
                    <p>
                        It shouldn't matter <em>where</em> you find the content. It should all live in one place. PostZaper unifies your scattered digital life.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. You Are The Customer</h3>
                    <p>
                        We are a bootstrapped, profitable company. We don't answer to VCs. We answer to you. This means we will never sell your data or fill the app with ads. You pay us, we build great software.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Simplicity Wins</h3>
                    <p>
                        We add features very carefully. We'd rather have a fast, focused tool than a bloated Swiss Army knife that does everything poorly.
                    </p>


                    <div className="mt-20 p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Join the movement</h3>
                        <p className="mb-8 text-gray-600">Stop scrolling past your best ideas. Start capturing them.</p>
                        <Link to="/" className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-md hover:shadow-lg">
                            Get PostZaper
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
