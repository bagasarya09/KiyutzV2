import { lazy, Suspense } from 'react';
import Navbar from '@/Layouts/Navbar';
import Hero from '@/Components/Sections/Hero';
import BlurCircle from '@/Components/Sections/BlurCircle';
import WhyKiyutz from '@/Components/Sections/WhyKiyutz';
import AboutUs from '@/Components/Sections/AboutUs';
import Products from '@/Components/Sections/Products';
import Footer from '@/Components/Sections/Footer';
import { Head } from '@inertiajs/react';

const Certifications = lazy(() => import('@/Components/Sections/Certifications'));
const Contact = lazy(() => import('@/Components/Sections/Contact'));

export default function Landing({ products, categories, about }) {
    return (
        <>
        <Head>
        <title>Kiyutz — Camilan & Makanan Enak</title>
        <meta name="description" content="Temukan camilan gurih & manis favorit di Kiyutz. Pesan mudah, rasa istimewa." />
        <link rel="canonical" href="https://domainmu.com/" />
        {/* Open Graph (buat preview saat di-share ke WA/FB) */}
        <meta property="og:title" content="Kiyutz" />
        <meta property="og:description" content="Camilan enak untuk setiap suasana." />
        <meta property="og:image" content="https://domainmu.com/og-image.jpg" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": products.map((p, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "item": {
                "@type": "Product",
                "name": p.name,
                "description": p.description,
                "image": p.image ? `/storage/${p.image}` : undefined,
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "IDR",
                  "price": p.price,
                },
              },
            })),
          })}
        </script>
      </Head>

        <div className="relative min-h-screen w-full overflow-x-clip bg-base font-sans text-primary">

            {/* ===== LAYER BACKGROUND (di belakang semua konten) ===== */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <BlurCircle className="h-[673px] w-[673px] top-[400px] left-[-371px]" />
                <BlurCircle className="h-[673px] w-[673px] top-[1200px] right-[-300px]" />
                <BlurCircle className="h-[673px] w-[673px] top-[2400px] left-[-250px]" />
                {/* tambah lagi sesuai kebutuhan section berikutnya */}
            </div>

            {/* ===== KONTEN (di atas background) ===== */}
            <div className="relative z-10 mx-auto w-full max-w-[1812px]">
                <Navbar />
                <Hero />

                <WhyKiyutz />
                <AboutUs about={about}/>
                <Products products={products} categories={categories} /> 
                <Suspense fallback={<div className="h-40" />}>
                    <Certifications />
                    <Contact />
                </Suspense>
            </div>

            <Footer/>
        </div>
        </>
    );
}