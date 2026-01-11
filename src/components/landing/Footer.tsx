import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-white pt-16 pb-8">
      <div className="container-tight px-4 md:px-8">

        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 mb-16">

          {/* Brand Column (Spans 4 columns on desktop) */}
          <div className="col-span-2 md:col-span-12 lg:col-span-4">
            <Link to="/" className="inline-block">
              <img src="/logo.svg" alt="PostZaper" className="h-8" />
            </Link>
            <p className="mt-6 text-sm text-gray-500 leading-relaxed max-w-xs">
              The smartest bookmark manager for creators. Save, organize, and repurpose content from Twitter, LinkedIn, and the web.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://twitter.com/postzaper"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-[#0077b5] hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-800 hover:text-white transition-all duration-300"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
            </div>
          </div>

          {/* Links Section (Spans 8 columns on desktop) */}
          <div className="col-span-2 md:col-span-12 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 lg:pl-12">

            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Product</h4>
              <ul className="space-y-3">
                <li><Link to="/tools" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">Free Tools</Link></li>
                <li><Link to="/pricing" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">Pricing</Link></li>
                <li><span className="text-sm text-gray-400 cursor-not-allowed">Chrome Extension</span></li>
                <li><span className="text-sm text-gray-400 cursor-not-allowed">Creator Studio <span className="text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded ml-1">Soon</span></span></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">About Us</Link></li>
                <li><span className="text-sm text-gray-400 cursor-not-allowed">Blog</span></li>
                <li><span className="text-sm text-gray-400 cursor-not-allowed">Community</span></li>
                <li><a href="mailto:support@postzaper.com" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">Contact Support</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/privacy" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">Terms of Service</Link></li>
                <li><span className="text-sm text-gray-400 cursor-not-allowed">Cookie Policy</span></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} PostZaper. All rights reserved. Built by <span className="font-medium text-gray-500">AxivionLabs</span>.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              All systems normal
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
