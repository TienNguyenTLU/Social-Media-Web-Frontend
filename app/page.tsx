import Image from "next/image";
import Navbar from "./components/navigation/navLandingpage";
import Hero from "./components/hero";
import Features from "./components/featureGrid";
import FooterLandingpage from "./components/footerLandingpage";
export default function Home() {
  return (
    <main className=" dark:bg-gray-900 w-full h-auto transition-colors duration-500">
      <Image 
        src="/background.png"
        alt="Background Image"
        width={1920}
        height={1080}
        quality={100}
        className="absolute object-cover inset-0 w-full h-full"
      />
      <Navbar />
      <section className="pt-24 backdrop-blur-xs">
        <Hero />
        <Features />
      </section>
      <footer><FooterLandingpage /></footer>
    </main>
  );
}
