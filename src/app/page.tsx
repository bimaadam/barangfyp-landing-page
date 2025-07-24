'use client';

import { useState, useEffect, SetStateAction } from 'react';
import Layout from './components/Layout';
import ProductList from './components/ProductList';
import { TrendingUp, Zap, Gift, Clock, Users, Eye } from 'lucide-react';


export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [totalClicks, setTotalClicks] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(2847);

  // Load total clicks from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('total_clicks');
    if (stored) {
      setTotalClicks(parseInt(stored));
    }
  }, []);

  // Simulate online users fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => {
        const change = Math.floor(Math.random() * 20) - 10;
        return Math.max(2000, Math.min(3500, prev + change));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (term: SetStateAction<string>) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category: SetStateAction<string>) => {
    setSelectedCategory(category);
  };

  const stats = [
    { label: 'Produk Viral', value: '500+', icon: Zap, color: 'text-yellow-500' },
    { label: 'Happy Customers', value: '10k+', icon: Users, color: 'text-green-500' },
    { label: 'Total Clicks', value: totalClicks.toLocaleString(), icon: Eye, color: 'text-blue-500' },
  ];


  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Trending Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-full px-6 py-3 border border-purple-300/30 mb-8">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span className="text-purple-800 font-semibold text-sm">
                🔥 Trending di TikTok, Shopee & Tokped
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="title-responsive font-black text-4xl text-gray-900 mb-6 leading-tight">
              Barang <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">FYP</span> yang
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Lagi Viral! </span>
              <span className="inline-block animate-wiggle">🚀</span>
            </h1>

            {/* Subtitle */}
            <p className="text-responsive text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Temukan produk yang lagi <span className="font-bold text-purple-600">hits banget</span> di media sosial!
              Dari gadget kece, fashion trendy, sampai skincare viral - semuanya ada di sini dengan
              <span className="font-bold text-green-600"> harga terbaik</span> ✨
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                    <div className="text-left">
                      <div className="font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={() => {
                  const el = document.getElementById('products');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center space-x-3"
              >
                <Gift className="w-6 h-6 group-hover:animate-bounce" />
                <span>Gaskeun Belanja!</span>
                <span className="text-2xl">💸</span>
              </button>

              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-5 h-5 text-red-500" />
                <span className="font-medium">Flash Sale berakhir dalam:</span>
                <div className="bg-red-500 text-white px-3 py-1 rounded-lg font-mono font-bold text-sm">
                  23:45:12
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span><span className="font-semibold text-green-600">{onlineUsers.toLocaleString()}</span> orang lagi belanja</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <span>🛡️</span>
                <span>100% <span className="font-semibold">Produk Original</span></span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <span>⚡</span>
                <span><span className="font-semibold">Gratis Ongkir</span> se-Indonesia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Showcase */}
      <section className="py-12 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Partner dengan Platform Terpercaya
            </h2>
            <p className="text-gray-600">Belanja aman dari seller verified</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: 'TikTok Shop',
                desc: 'Produk viral dari kreator favorit',
                icon: '🎵',
                color: 'from-pink-500 to-red-500',
                badge: 'Most Viral'
              },
              {
                name: 'Shopee',
                desc: 'Belanja online #1 di Indonesia',
                icon: '🛒',
                color: 'from-orange-500 to-red-500',
                badge: 'Best Deals'
              },
              {
                name: 'Tokopedia',
                desc: 'Mulai aja dulu, lengkap banget',
                icon: '🟢',
                color: 'from-green-500 to-emerald-500',
                badge: 'Most Trusted'
              }
            ].map((platform, index) => (
              <div
                key={index}
                className="relative group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                  {platform.badge}
                </div>

                <div className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {platform.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{platform.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{platform.desc}</p>

                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-semibold text-sm">✓ Verified Partner</span>
                  <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                    →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <ProductList
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
        />
      </section>

      {/* CTA Banner */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">
                Jangan Sampai <span className="animate-pulse">Kehabisan!</span> 🔥
              </h2>
              <p className="text-xl mb-8 text-purple-100">
                Produk viral ini terbatas banget. Ambil sekarang sebelum sold out!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-2">
                  <Zap className="w-6 h-6" />
                  <span>Belanja Sekarang Juga!</span>
                </button>
                <div className="text-white/80 text-sm">
                  💎 <span className="font-semibold">Limited Stock Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}