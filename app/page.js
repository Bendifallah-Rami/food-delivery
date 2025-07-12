
import Hero from './components/hero';
import Navbar from './components/navbar';

export default function Home() {
  return (
    <div className="">
      <Navbar />
    <main className="container mx-auto px-4">
    {/* Demo Content */}
    <Hero />
    </main>
    </div>
  );
}
