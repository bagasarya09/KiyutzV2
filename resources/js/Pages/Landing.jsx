import Navbar from '@/Components/Layout/Navbar';
import BlurCircle from '@/Components/Sections/BlurCircle';
import Hero from '@/Components/Sections/Hero';
import Gallery from '@/Components/Sections/Gallery';
import WhyKiyutz from '@/Components/Sections/WhyKiyutz';
import AboutUs from '@/Components/Sections/AboutUs';
import Products from '@/Components/Sections/Products';
import Contact from '@/Components/Sections/Contact';
import Footer from '@/Components/Sections/Footer';

export default function Landing() {
    return (
        <div className="relative min-h-screen w-full overflow-x-clip bg-base font-sans text-primary">

            {/* ===== LAYER BACKGROUND (di belakang semua konten) ===== */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <BlurCircle className="h-[673px] w-[673px] top-[200px] left-[-371px]" />
                <BlurCircle className="h-[673px] w-[673px] top-[1200px] right-[-300px]" />
                <BlurCircle className="h-[673px] w-[673px] top-[2400px] left-[-250px]" />
                {/* tambah lagi sesuai kebutuhan section berikutnya */}
            </div>

            {/* ===== KONTEN (di atas background) ===== */}
            <div className="relative z-10 mx-auto w-full max-w-[1812px]">
                <Navbar />
                <Hero />

                {/* Gallery full-bleed */}
                <div className="relative left-1/2 w-screen -translate-x-1/2">
                    <Gallery />
                </div>

                <WhyKiyutz />
                <AboutUs/>
                <Products/>
                <Contact/>
            </div>

            <Footer/>
        </div>
    );
}