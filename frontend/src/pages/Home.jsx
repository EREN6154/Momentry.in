import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useStore";

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-alabaster">
      {/* Splash/Welcome Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-alabaster via-cream to-alabaster">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 bg-olive rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-champagne rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-olive rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-2xl px-6 py-12">
          {/* Logo */}
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-espresso mb-6">
            MOMENTRY
            <span className="text-champagne text-5xl md:text-6xl">.</span>
          </h1>

          {/* Tagline */}
          <p className="font-serif text-2xl md:text-3xl text-espresso italic mb-8 leading-relaxed">
            Travel elegantly. Explore deeply.
          </p>

          {/* Decorative line */}
          <div className="w-12 h-0.5 bg-champagne mx-auto mb-8"></div>

          {/* Description */}
          <p className="text-lg text-espresso/70 mb-12 font-light tracking-wide">
            Handpicked boutique journeys,
            <br />
            curated by local storytellers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/packages"
              className="px-12 py-4 bg-gradient-to-br from-[#E2C766] to-[#C9A535] text-white font-semibold rounded-sm hover:opacity-90 hover:shadow-lg transition-all duration-300 text-lg tracking-wide"
            >
              Explore Trips →
            </Link>

            {user ? (
              <Link
                to="/bookings"
                className="px-12 py-4 border-2 border-espresso text-espresso font-semibold rounded-sm hover:bg-espresso hover:text-white transition-all duration-300 text-lg tracking-wide"
              >
                My Journeys
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-12 py-4 border-2 border-espresso text-espresso font-semibold rounded-sm hover:bg-espresso hover:text-white transition-all duration-300 text-lg tracking-wide"
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-espresso/40 text-sm tracking-[0.3em] z-10">
          SCROLL TO DISCOVER ▾
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <p className="text-champagne text-sm font-semibold tracking-widest mb-4">
                OUR PHILOSOPHY
              </p>
              <h2 className="font-serif text-5xl text-espresso mb-8 leading-tight">
                We don't sell tours.
                <br />
                <span className="italic">We curate stories.</span>
              </h2>
              <p className="text-espresso/70 text-lg leading-relaxed mb-6 font-light">
                MOMENTRY was born from a simple frustration — rushed tourism
                that skims the surface. We believe in slow, deep-dive travel:
                boutique stays run by families, meals cooked by grandmothers,
                and trails known only to locals.
              </p>
              <p className="text-espresso/70 text-lg leading-relaxed font-light">
                Every curation is scouted in person by our team, and every
                journey gives back to the communities that host it.
              </p>
            </div>

            {/* Stats */}
            <div className="space-y-12">
              <div>
                <p className="font-serif text-5xl text-champagne font-bold mb-2">
                  150+
                </p>
                <p className="text-espresso/60 text-sm font-semibold tracking-widest">
                  HIDDEN GEMS UNCOVERED
                </p>
              </div>
              <div>
                <p className="font-serif text-5xl text-champagne font-bold mb-2">
                  98%
                </p>
                <p className="text-espresso/60 text-sm font-semibold tracking-widest">
                  HAPPY EXPLORERS
                </p>
              </div>
              <div>
                <p className="font-serif text-5xl text-champagne font-bold mb-2">
                  126
                </p>
                <p className="text-espresso/60 text-sm font-semibold tracking-widest">
                  LOCAL COMMUNITIES SUPPORTED
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-espresso text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-5xl mb-8 leading-tight">
            Your next adventure awaits
          </h2>
          <p className="text-lg mb-12 font-light opacity-90">
            Explore our curated collection of boutique journeys
          </p>
          <Link
            to="/packages"
            className="inline-block px-12 py-4 bg-gradient-to-br from-[#E2C766] to-[#C9A535] text-white font-semibold rounded-sm hover:opacity-90 hover:shadow-lg transition-all duration-300 text-lg tracking-wide"
          >
            Discover Journeys →
          </Link>
        </div>
      </section>
    </div>
  );
}
