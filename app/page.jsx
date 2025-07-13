
import Hero from './components/hero';
import Navbar from './components/navbar';
import WhatWeServe from './components/about';
import MenuSection from './components/menu';
import CustomerTestimonialSection from './components/feedback';
import AppLinkSection from './components/applink'
import Footer from './components/footer';



export default function Home() {
  return (
    <div className="">
      <Navbar />
    <main className="container mx-auto px-4">
    {/* Demo Content */}
    <Hero />
    <WhatWeServe />
    <MenuSection />
    <CustomerTestimonialSection />
    <AppLinkSection />

    <Footer />
    </main>
    </div>
  );
}
