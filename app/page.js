
import Hero from './components/hero';
import Navbar from './components/navbar';
import WhatWeServe from './components/about';
import MenuSection from './components/menu';

export default function Home() {
  return (
    <div className="">
      <Navbar />
    <main className="container mx-auto px-4">
    {/* Demo Content */}
    <Hero />
    <WhatWeServe />
    <MenuSection />
    </main>
    </div>
  );
}
