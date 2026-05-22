import Link from 'next/link';
import { GraduationCap, Search, Scale, Heart, ArrowRight, Star, TrendingUp, Building2 } from 'lucide-react';

export default function Home() {
  const features = [
    { icon: Search, title: 'Explore Colleges', desc: 'Browse 50+ top Indian colleges with detailed info on courses, fees, and placements.', color: 'from-blue-500 to-cyan-500' },
    { icon: Scale, title: 'Compare Side-by-Side', desc: 'Compare up to 3 colleges on fees, ratings, placements, and more. Make informed decisions.', color: 'from-purple-500 to-pink-500' },
    { icon: Heart, title: 'Save & Track', desc: 'Save your favorite colleges and comparisons. Access them anytime from your dashboard.', color: 'from-orange-500 to-red-500' },
  ];

  const stats = [
    { value: '50+', label: 'Colleges', icon: Building2 },
    { value: '200+', label: 'Courses', icon: GraduationCap },
    { value: '4.5★', label: 'Avg Rating', icon: Star },
    { value: '90%+', label: 'Placement', icon: TrendingUp },
  ];

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNFYyNkgyNHYtMmgxMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-blue-100 font-medium">India&apos;s #1 College Discovery Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Find Your
              <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent"> Perfect </span>
              College
            </h1>

            <p className="mt-6 text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
              Explore, compare, and discover the best colleges across India. Make data-driven decisions about your future with comprehensive insights on fees, placements, and more.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link
                href="/colleges"
                className="group flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-semibold rounded-2xl hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <Search className="w-5 h-5" />
                Explore Colleges
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/compare"
                className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <Scale className="w-5 h-5" />
                Compare Colleges
              </Link>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H0Z" className="fill-gray-50" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-8 z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-5 text-center shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <stat.icon className="w-5 h-5 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Everything You Need to Decide</h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto">Powerful tools to help you find, compare, and choose the right college for your future.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${f.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNFYyNkgyNHYtMmgxMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Dream College?</h2>
            <p className="text-blue-100 mb-8 max-w-md mx-auto">Start exploring now and make the best decision for your academic future.</p>
            <Link href="/colleges" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-semibold rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-gray-800">CollegeScope</span>
          </div>
          <p className="text-sm text-gray-400">&copy; 2026 CollegeScope. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
