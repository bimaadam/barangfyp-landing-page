"use client";

import {
  ShoppingBag,
  Heart,
  Instagram,
  MessageCircle,
  Mail,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const platforms = [
    {
      name: "TikTok Shop",
      description: "Produk viral dari kreator favorit",
      icon: "🎵",
      color: "from-pink-500 to-red-500",
      url: "#",
    },
    {
      name: "Shopee",
      description: "Belanja online terpercaya",
      icon: "🛒",
      color: "from-orange-500 to-red-500",
      url: "#",
    },
    {
      name: "Tokopedia",
      description: "Mulai aja dulu",
      icon: "🟢",
      color: "from-green-500 to-emerald-500",
      url: "#",
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/barangfyp.store",
      color: "hover:text-pink-500",
    },
    {
      name: "TikTok",
      icon: MessageCircle,
      url: "https://tiktok.com/@barangfyp",
      color: "hover:text-pink-500",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:hello@barangfyp.store",
      color: "hover:text-blue-500",
    },
  ];

  const quickLinks = [
    { name: "Tentang Kami", url: "#" },
    { name: "Cara Kerja", url: "#" },
    { name: "FAQ", url: "#" },
    { name: "Kontak", url: "#" },
    { name: "Privacy Policy", url: "#" },
    { name: "Terms of Service", url: "#" },
  ];

  return (
    <footer className="bg-gradient-to-t from-gray-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <ShoppingBag className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">🔥</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    BarangFYP.store
                  </h2>
                  <p className="text-purple-200 text-sm">
                    Your viral product destination
                  </p>
                </div>
              </div>

              <p className="text-purple-100 mb-6 leading-relaxed max-w-md">
                Platform terpercaya untuk menemukan produk viral terbaru dari
                TikTok Shop, Shopee, dan Tokopedia. Dapatkan barang trending
                dengan harga terbaik! ✨
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-purple-200 font-medium">
                  Follow us:
                </span>
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 bg-white/10 rounded-lg transition-all duration-300 hover:bg-white/20 hover:scale-110 ${social.color}`}
                      title={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
                <span>🛍️</span>
                <span>Platform</span>
              </h3>
              <div className="space-y-4">
                {platforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    className="block group"
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      <div
                        className={`w-8 h-8 bg-gradient-to-r ${platform.color} rounded-lg flex items-center justify-center text-sm`}
                      >
                        {platform.icon}
                      </div>
                      <div>
                        <div className="font-medium text-white group-hover:text-purple-200 transition-colors">
                          {platform.name}
                        </div>
                        <div className="text-xs text-purple-300">
                          {platform.description}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
                <span>⚡</span>
                <span>Quick Links</span>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      className="text-purple-200 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                    >
                      <span className="w-1 h-1 bg-purple-400 rounded-full group-hover:bg-white transition-colors"></span>
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-purple-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 text-center backdrop-blur-sm border border-purple-500/20">
              <h3 className="text-xl font-bold mb-2 flex items-center justify-center space-x-2">
                <Heart className="w-5 h-5 text-pink-400" />
                <span>Stay Updated!</span>
              </h3>
              <p className="text-purple-200 mb-4">
                Dapatkan notifikasi produk viral terbaru langsung ke email kamu
              </p>
              <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-3 sm:space-y-0 sm:space-x-3">
                <input
                  type="email"
                  placeholder="Email kamu..."
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-purple-300/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                />
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                  Subscribe 🚀
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-purple-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-purple-300 text-sm">
                  © {currentYear} BarangFYP.store. All rights reserved.
                </p>
                <p className="text-purple-400 text-xs mt-1">
                  Made with 💜 for Gen Z shoppers
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="font-bold text-yellow-400">10k+</div>
                  <div className="text-purple-300 text-xs">Happy Customers</div>
                </div>
                <div className="w-px h-8 bg-purple-600"></div>
                <div className="text-center">
                  <div className="font-bold text-green-400">500+</div>
                  <div className="text-purple-300 text-xs">Viral Products</div>
                </div>
                <div className="w-px h-8 bg-purple-600"></div>
                <div className="text-center">
                  <div className="font-bold text-pink-400">24/7</div>
                  <div className="text-purple-300 text-xs">Updated</div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="text-center md:text-right">
                <p className="text-purple-400 text-xs max-w-xs">
                  Affiliate partner dengan platform e-commerce terpercaya
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center z-50"
          title="Back to top"
        >
          <span className="text-lg">↑</span>
        </button>
      </div>
    </footer>
  );
}
