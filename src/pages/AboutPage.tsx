import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

export default function AboutPage() {
    return (
        <>
            <SEO
                title="About PostZaper - Save Posts, Generate Content, Own Your Feed"
                description="We built PostZaper because we were tired of 'Read Later' becoming 'Read Never'. Save posts from X & LinkedIn, generate original content with AI, and own your feed."
                keywords="about postzaper, bookmark manager, ai content generation, content studio, save tweets, linkedin bookmarks"
            />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
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
            </div>
        </>
    );
}
