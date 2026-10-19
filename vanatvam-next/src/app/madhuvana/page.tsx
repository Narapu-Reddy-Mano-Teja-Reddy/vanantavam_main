'use client';
import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import AccordionGallery from '@/components/premium/AccordionGallery';
import Counter from '@/components/premium/Counter';
import Magnetic from '@/components/premium/Magnetic';
import { useLenis } from '@/components/premium/SmoothScroll';


type PlotInfo = {
  title: string;
  area: string;
  dim: string;
  facing: string;
  status: string;
  trees: string;
};

const plotHotspots: { id: string; top: string; left: string; premium?: boolean }[] = [
  { id: 'A1', top: '9%', left: '63%' },
  { id: 'A2', top: '13%', left: '65%' },
  { id: 'A3', top: '17%', left: '67%' },
  { id: 'A4', top: '21%', left: '71%' },
  { id: 'A5', top: '22%', left: '63%' },
  { id: 'A13', top: '35%', left: '71%', premium: true },
  { id: 'A10', top: '41%', left: '67%' },
  { id: 'A11', top: '44%', left: '74%' },
  { id: 'A12', top: '47%', left: '77%' },
  { id: 'A14', top: '52%', left: '83%' },
  { id: 'A15', top: '54%', left: '85%' },
  { id: 'B1', top: '46%', left: '59%' },
  { id: 'B2', top: '49%', left: '61%' },
  { id: 'B3', top: '52%', left: '64%' },
  { id: 'B4', top: '54%', left: '69%' },
  { id: 'B5', top: '56%', left: '73%' },
  { id: 'B12', top: '63%', left: '62%' },
  { id: 'B13', top: '65%', left: '65%' },
  { id: 'B14', top: '67%', left: '69%' },
  { id: 'B15', top: '68%', left: '74%', premium: true },
  { id: 'B21', top: '78%', left: '60%' },
  { id: 'B22', top: '80%', left: '62%' },
  { id: 'B23', top: '81%', left: '68%' },
  { id: 'B24', top: '83%', left: '73%' },
  { id: 'B25', top: '86%', left: '78%' },
  { id: 'B28', top: '89%', left: '83%' },
];

const amenityHotspots: { id: string; top: string; left: string; title: string }[] = [
  { id: 'A', top: '5%', left: '44%', title: 'Entrance / Site for School' },
  { id: 'B', top: '14%', left: '44%', title: 'Theme park' },
  { id: 'C', top: '27%', left: '44%', title: 'Mud House' },
  { id: 'D', top: '32%', left: '44%', title: 'Cottage' },
  { id: 'E', top: '37%', left: '44%', title: 'Pond' },
  { id: 'F', top: '42%', left: '44%', title: 'Tree House' },
  { id: 'G', top: '71%', left: '44%', title: 'Road & Circular Garden' },
  { id: 'H', top: '79%', left: '44%', title: 'Natural Pond' },
];

const plotData: Record<string, PlotInfo> = {
  A1: { title: 'Plot A1', area: '10,200 sq. ft', dim: '85 ft × 120 ft', facing: 'North-East', status: 'Available', trees: '3 Mahogany trees, 2 Jackfruit trees, rich fertile soil.' },
  A2: { title: 'Plot A2', area: '10,500 sq. ft', dim: '85 ft × 123 ft', facing: 'East Facing', status: 'Available', trees: '4 Alphonso Mango trees, 1 Coconut palm.' },
  A3: { title: 'Plot A3', area: '10,100 sq. ft', dim: '80 ft × 126 ft', facing: 'North Facing', status: 'Available', trees: '5 Mango trees, 2 Rosewood saplings.' },
  A4: { title: 'Plot A4', area: '10,800 sq. ft', dim: '90 ft × 120 ft', facing: 'East Facing', status: 'Available', trees: '4 Mango trees, drip irrigation line pre-installed.' },
  A5: { title: 'Plot A5', area: '10,000 sq. ft', dim: '80 ft × 125 ft', facing: 'North Facing', status: 'Available', trees: '3 Teakwood trees, 2 Jackfruit trees.' },
  A13: { title: 'Plot A13 (Cottage & Water Body)', area: '15,000 sq. ft', dim: '120 ft × 125 ft', facing: 'East Facing (Waterfront)', status: 'Premium Waterfront', trees: 'Prime cottage plot adjacent to natural water body & mature orchard.' },
  A10: { title: 'Plot A10', area: '10,400 sq. ft', dim: '85 ft × 122 ft', facing: 'East Facing', status: 'Available', trees: '4 Alphonso Mango trees, fertile red loam soil.' },
  A11: { title: 'Plot A11', area: '10,600 sq. ft', dim: '85 ft × 124 ft', facing: 'East Facing', status: 'Available', trees: '5 Mango trees, 2 Teakwood trees.' },
  A12: { title: 'Plot A12', area: '10,200 sq. ft', dim: '82 ft × 124 ft', facing: 'North Facing', status: 'Available', trees: '3 Mahogany trees, rich organic soil.' },
  A14: { title: 'Plot A14', area: '10,450 sq. ft', dim: '85 ft × 123 ft', facing: 'East Facing', status: 'Available', trees: 'Rich fertile red soil with 4 mature Alphonso Mango trees.' },
  A15: { title: 'Plot A15', area: '10,800 sq. ft', dim: '88 ft × 123 ft', facing: 'North Facing', status: 'Reserved', trees: 'Pre-reserved parcel with mature teakwood canopy.' },
  B1: { title: 'Plot B1', area: '10,200 sq. ft', dim: '82 ft × 124 ft', facing: 'East Facing', status: 'Available', trees: '4 Mango trees, 2 Coconut trees.' },
  B2: { title: 'Plot B2', area: '10,500 sq. ft', dim: '85 ft × 123 ft', facing: 'East Facing', status: 'Available', trees: '3 Teakwood trees, fertile soil.' },
  B3: { title: 'Plot B3', area: '10,800 sq. ft', dim: '88 ft × 123 ft', facing: 'North-East', status: 'Available', trees: '5 Alphonso Mango trees.' },
  B15: { title: 'Plot B15 (Garden Circle)', area: '12,500 sq. ft', dim: '100 ft × 125 ft', facing: 'North-East Corner', status: 'Premium Corner', trees: 'Estate parcel facing circular garden with 6 fruit trees.' },
  B28: { title: 'Plot B28', area: '11,000 sq. ft', dim: '90 ft × 122 ft', facing: 'East Facing', status: 'Available', trees: '4 Mango trees, 3 Coconut palms.' },
};

const amenityData: Record<string, PlotInfo> = {
  A: { title: 'Amenity A: Entrance Arch', area: 'Site for School & Security', dim: 'Main Gate Access', facing: 'North Entry', status: 'Community Zone', trees: 'Grand entry gate with school site & shaded avenue trees.' },
  B: { title: 'Amenity B: Theme Park', area: '2.5 Acres Green Park', dim: 'Central Sector', facing: 'All Directions', status: 'Green Zone', trees: 'Lush botanical theme park with native flowering plants.' },
  C: { title: 'Amenity C: Mud House', area: 'Eco Living Center', dim: '50 ft × 80 ft', facing: 'East Facing', status: 'Heritage Zone', trees: 'Sustainable mud block architecture with traditional clay tiles.' },
  D: { title: 'Amenity D: Cottage', area: 'Guest Retreat', dim: '60 ft × 90 ft', facing: 'Waterfront', status: 'Heritage Zone', trees: 'Serene eco-cottages overlooking the water body.' },
  E: { title: 'Amenity E: Pond', area: 'Rainwater Pond', dim: 'Natural Contour', facing: 'Waterfront', status: 'Eco Zone', trees: 'Natural water reservoir supporting birds & aquatic flora.' },
  F: { title: 'Amenity F: Tree House', area: 'Canopy Deck', dim: 'Elevated Platform', facing: 'Canopy View', status: 'Adventure Zone', trees: 'Wooden tree house built amidst mature native trees.' },
  G: { title: 'Amenity G: Road & Circular Garden', area: 'Tree-lined Avenues', dim: '30 ft Wide Road', facing: 'Circulation', status: 'Infrastructure', trees: 'Tree-lined asphalt & paver roads with circular garden hub.' },
  H: { title: 'Amenity H: Natural Pond', area: 'Secluded Lotus Pond', dim: 'Natural Basin', facing: 'Waterfront', status: 'Eco Reserve', trees: 'Secluded lotus pond surrounded by fruit-bearing trees.' },
};

function fallbackPlot(id: string): PlotInfo {
  return { title: `Plot ${id}`, area: '10,000 sq. ft', dim: '80 ft × 125 ft', facing: 'East Facing', status: 'Available', trees: '4 Native fruit trees pre-planted with drip lines.' };
}

function statusColors(status: string) {
  if (status === 'Reserved') return { bg: 'rgba(180, 80, 60, 0.15)', color: '#B4503C' };
  if (status.includes('Premium')) return { bg: 'rgba(198, 162, 101, 0.2)', color: '#9E7A3E' };
  return { bg: 'rgba(46, 125, 50, 0.15)', color: '#2E7D32' };
}

const amenities = [
  { letter: 'A', icon: 'fa-archway', name: 'Entrance & Site', desc: 'Grand eco-entrance arch with security and school site access.', img: '/assets/project-images/Maduvana/Rustic Tropical Garden Gateway.png' },
  { letter: 'B', icon: 'fa-tree', name: 'Theme Park', desc: 'Lush botanical theme park and green biodiversity trails.', img: '/assets/project-images/Maduvana/Aerial Spiral Garden in Bloom.png' },
  { letter: 'C', icon: 'fa-house', name: 'Mud House', desc: 'Traditional eco-friendly mud house built with sustainable earth blocks.', img: '/assets/project-images/Maduvana/a114d324-c066-402d-8ebe-32f8f8a65bc4.png' },
  { letter: 'D', icon: 'fa-house-chimney', name: 'Cottage Retreat', desc: 'Serene heritage cottages overlooking private water bodies.', img: '/assets/project-images/Maduvana/Sunlit Terracotta Cottage and Lush Garden.png' },
  { letter: 'E', icon: 'fa-water', name: 'Pond', desc: 'Rainwater harvesting pond supporting native flora and aquatic life.', img: '/assets/project-images/Maduvana/Tropical Garden Pond Oasis.png' },
  { letter: 'F', icon: 'fa-tree-city', name: 'Tree House', desc: 'Elevated wooden tree house perched amidst ancient canopy trees.', img: '/assets/project-images/Maduvana/72b47d11-1784-4ca8-bcad-b18bdfe4c679.png' },
  { letter: 'G', icon: 'fa-route', name: 'Tree-lined Roads', desc: 'Organic paved avenues with tree-lined walking tracks.', img: '/assets/project-images/Maduvana/0cb87566-31bb-4ed5-8e5d-f2e8e6ae3d6e.png' },
  { letter: 'H', icon: 'fa-droplet', name: 'Natural Pond', desc: 'Secluded natural lotus pond for relaxation and bird watching.', img: '/assets/project-images/Maduvana/Serene Tropical Garden Pond Retreat.png' },
];

const birds = [
  { img: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=500&q=80', name: 'Indian Grey Hornbill', sub: 'Canopy Resident' },
  { img: 'https://images.unsplash.com/photo-1574063413132-355dbfd83e0c?auto=format&fit=crop&w=500&q=80', name: 'Woolly-necked Stork', sub: 'Wetland Visitor' },
  { img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=500&q=80', name: 'Asian Green Bee-eater', sub: 'Meadow Hunter' },
  { img: 'https://images.unsplash.com/photo-1549608276-5786777e6587?auto=format&fit=crop&w=500&q=80', name: 'Baya Weaver', sub: 'Nest Builder' },
  { img: 'https://images.unsplash.com/photo-1518992028580-6d57bd80f2dd?auto=format&fit=crop&w=500&q=80', name: 'Purple-rumped Sunbird', sub: 'Nectar Feeder' },
  { img: 'https://images.unsplash.com/photo-1551085254-e96b210df58a?auto=format&fit=crop&w=500&q=80', name: 'Purple Heron', sub: 'Pond Wader' },
];

export default function Madhuvana() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], ['0%', '15%'], { clamp: true });
  const heroScale = useTransform(scrollY, [0, 1000], [1, 1.15], { clamp: true });

  const galleryItems = [
    { img: '/assets/project-images/Maduvana/Tropical Garden Pond Oasis.png', title: 'Water-Led Ecology', desc: 'A landscape sculpted around flowing water channels and scenic ponds.' },
    { img: '/assets/project-images/Maduvana/Serene Tropical Garden Pond Retreat.png', title: 'The Sacred Vanas', desc: 'Sacred grove experiences inspired by ancient traditions like Nakshatra Vana.' },
    { img: '/assets/project-images/Maduvana/Sunlit Terracotta Cottage and Lush Garden.png', title: 'Cozy Cottages', desc: 'Beautiful cottages designed for peaceful living immersed in nature.' },
    { img: '/assets/project-images/Maduvana/Aerial Spiral Garden in Bloom.png', title: 'Farm Parcels', desc: 'Spacious parcels designed for rare species plantations and biodiversity spaces.' },
  ];

  const [selected, setSelected] = useState<{ kind: 'plot' | 'amenity'; id: string } | null>(null);
  const lenisRef = useLenis();

  const scrollToMasterPlan = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (lenisRef?.current) {
      lenisRef.current.scrollTo('#master-plan', { offset: -70, duration: 1.4 });
    } else {
      document.querySelector('#master-plan')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAmenities = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (lenisRef?.current) {
      lenisRef.current.scrollTo('#amenities', { offset: -70, duration: 1.4 });
    } else {
      document.querySelector('#amenities')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const info = selected
    ? selected.kind === 'plot'
      ? plotData[selected.id] ?? fallbackPlot(selected.id)
      : amenityData[selected.id]
    : null;
  const badge = info ? statusColors(info.status) : null;

  return (
    <>
      <Navigation />

      <section className="hero" style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <motion.div style={{ position: 'absolute', inset: 0, zIndex: 0, top: '-15%', height: '130%', y: heroY, scale: heroScale, transformOrigin: 'center center' }}>
          <img src="/assets/project-images/Maduvana/hero.png" alt="MadhuVana Cottages & Landscape" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14, 26, 18, 0.4) 0%, rgba(14, 26, 18, 0.88) 100%)' }} />
        </motion.div>

        <div className="container relative" style={{ zIndex: 1, paddingTop: '60px' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: '640px' }}>
            <span style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', color: '#FFF', borderRadius: '30px', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px' }}>
              Maddur, Karnataka
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 5.5vw, 5rem)', color: '#FFF', lineHeight: 1.05, marginBottom: '20px' }}>
              MadhuVana<br /><span style={{ fontStyle: 'italic', fontWeight: 300 }}>The Sweet Symphony of Nature</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, fontWeight: 300, marginBottom: '35px' }}>
              MadhuVana is an immersive natural ecosystem where over 20% of the land is reserved for common spaces. Discover scenic ponds, herbal gardens, rare species plantations, and cozy cottages.
            </p>
            <div style={{ display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Magnetic strength={0.3}>
                <a href="#master-plan" onClick={scrollToMasterPlan} className="btn-pill btn-pill-white">
                  <i className="fa-solid fa-cube"></i> Explore 3D Master Plan
                </a>
              </Magnetic>
              <a href="#amenities" onClick={scrollToAmenities} className="link-underline" style={{ color: '#FFFFFF' }}>
                View Core Amenities <i className="fa-solid fa-arrow-right arrow"></i>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: '#17271B', color: '#FFFFFF', padding: '40px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '30px', textAlign: 'center' }}>
            {[
              { value: 18, suffix: ' Acres', label: 'Total Ecosystem' },
              { value: 200, suffix: '+', label: 'Rare Trees' },
              { value: 8000, suffix: '+ sq.ft', label: 'Farm Parcels' },
              { value: 20, suffix: '%+', label: 'Open & Green Spaces' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--accent-gold)' }}>
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section style={{ padding: 'clamp(60px, 8vh, 90px) 0', background: 'var(--bg-cream)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '80px', alignItems: 'flex-start' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ flex: '1.2 1 400px' }}>
              <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em', display: 'block', marginBottom: '20px' }}>PROJECT OVERVIEW</span>

              <div style={{ marginBottom: '40px' }}>
                <img src="/assets/images/Project-Logos/Logo-MadhuVana.svg" alt="MADHUVANA Logo" style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain' }} />
              </div>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 2.8vw, 2.8rem)', color: 'var(--bg-dark-forest)', marginBottom: '30px', lineHeight: 1.2 }} dangerouslySetInnerHTML={{ __html: 'Ancient forest wisdom<br/>meets modern living.' }}>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text-dark)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                <p>Immersed in Nature, Designed with Care.</p>
                <p>MadhuVana is a unique ecosystem designed to balance mindful living and environmental restoration. With over 20% of the land reserved for common spaces, you will discover scenic ponds, lakes, flowing water channels, and lush walking trails. Retreat into our tree houses or cozy cottages amidst the verdant greenery.</p>
                <p>The community is a sanctuary for rare species plantations, herbal gardens, fruit-bearing trees, and sacred Vana experiences inspired by ancient traditions.</p>
                <div>
                  <a href="#" className="btn-pill btn-pill-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginTop: '30px' }}><i className="fa-solid fa-download"></i> Download Brochure</a>
                </div>
              </div>

              <div style={{ marginTop: '60px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--bg-dark-forest)', marginBottom: '30px' }}>TheVanaTvam Advantage</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { title: 'Close Comfort', desc: 'Modern amenities seamlessly integrated with natural landscapes.' },
                    { title: 'Ready and Waiting', desc: 'Fully established infrastructure so you can build your dream farm home immediately.' },
                    { title: 'Growth Corridor', desc: 'Located in high-appreciation zones while maintaining ecological sanctity.' }
                  ].map((adv, i) => (
                    <div key={i} style={{ display: 'flex', gap: '20px', background: '#FFF', padding: '24px', borderRadius: '16px', boxShadow: '0 10px 20px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.02)' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-cream)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold' }}>0{i + 1}</div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', color: 'var(--bg-dark-forest)', marginBottom: '8px' }}>{adv.title}</h4>
                        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)' }}>{adv.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ position: 'sticky', top: '120px' }}>
              <div style={{ position: 'relative', marginBottom: '60px' }}>
                <img src="/assets/project-images/Esahavana/EV Arial View 1.png" alt="Master Plan" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }} />
                <div style={{ position: 'absolute', bottom: '-24px', left: '-24px', background: 'var(--bg-dark-forest)', color: '#FFF', padding: '40px', borderRadius: '24px', maxWidth: '300px', boxShadow: '0 20px 40px rgba(24, 44, 30, 0.4)', zIndex: 2 }}>
                  <i className="fa-solid fa-leaf" style={{ fontSize: '2rem', color: 'var(--accent-gold)', marginBottom: '20px' }}></i>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '10px' }}>Sustainable Design</h4>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6, margin: 0 }}>Every aspect of the master plan is dictated by the natural topography and water flow.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* 12 Amenities Grid */}
      <section id="amenities" style={{ padding: 'clamp(60px, 8vh, 90px) 0', background: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="subtitle-tag">Master Plan Amenities</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 3.5vw, 3rem)', color: 'var(--bg-dark-forest)' }}>
              Designed for Slower, Holistic Living
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0' }}>
              Explore the key community spaces and natural sanctuaries thoughtfully embedded within MadhuVana.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {amenities.map((a, i) => (
              <motion.div key={a.letter} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
                style={{ background: '#FFF', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.03)' }}>
                <div style={{ height: '200px', width: '100%', position: 'relative' }}>
                  <img src={a.img} alt={a.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '15px', left: '15px', background: 'var(--bg-dark-forest)', color: '#FFF', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600 }}>
                    {a.letter}
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <i className={`fa-solid ${a.icon}`} style={{ color: 'var(--accent-gold)', fontSize: '1.2rem' }}></i>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--bg-dark-forest)', margin: 0 }}>{a.name}</h4>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {galleryItems.length > 0 && (
        <section style={{ padding: 'clamp(60px, 8vh, 90px) 0', background: '#FFF' }}>
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em', display: 'block', marginBottom: '20px', textAlign: 'center' }}>GALLERY</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.0vw, 3.0rem)', color: 'var(--bg-dark-forest)', marginBottom: '60px', textAlign: 'center' }}>
                Life at MADHUVANA
              </h2>
            </motion.div>

            <AccordionGallery items={galleryItems} height="500px" />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-bg">
          <img src="/assets/project-images/Esahavana/EV River View 1.jpg" alt="Sunset landscape" />
        </div>
        <div className="cta-overlay"></div>
        <div className="container relative-z">
          <motion.div className="cta-content" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', margin: '0 auto', maxWidth: '650px' }}>
            <h2 className="cta-title">Own Your Piece of MadhuVana.</h2>
            <p className="cta-sub">18 Acres · Maddur · Farm Parcels from 8,000 sq.ft</p>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '30px', fontWeight: 300 }}>
              Become part of a sustainable, nature-connected community where the sweet symphony of nature plays every day.
            </p>
            <Magnetic strength={0.3}>
              <Link href="/contact" className="btn-pill btn-pill-white" style={{ margin: '0 auto 40px' }}>
                Schedule Site Visit &amp; Plot Inspection <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </Magnetic>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '25px', display: 'flex', justifyContent: 'center', gap: '40px', color: '#FFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
                <i className="fa-solid fa-phone" style={{ color: 'var(--accent-gold)' }}></i>
                <span>080 47095111</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
                <i className="fa-solid fa-globe" style={{ color: 'var(--accent-gold)' }}></i>
                <span>www.vanatvam.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vh, 90px) 0', background: 'var(--bg-cream)' }}>
        <div className="container">
           <div style={{ textAlign: 'center', marginBottom: '60px' }}>
             <span style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>Prime Connectivity</span>
             <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--bg-dark-forest)' }}>Located off the Bangalore-Mysore Highway.</h2>
           </div>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px' }}>
              {[
                { time: '10', unit: 'Minutes', desc: 'To Bangalore-Mysore Highway', icon: 'fa-road' },
                { time: '80', unit: 'Kilometers', desc: 'To Bangalore City', icon: 'fa-city' },
                { time: '60', unit: 'Kilometers', desc: 'To Historic Mysore', icon: 'fa-landmark' },
                { time: '5', unit: 'Minutes', desc: 'To Cauvery River Access', icon: 'fa-water' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ background: '#FFF', padding: '30px', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.03)', boxShadow: '0 10px 20px rgba(0,0,0,0.03)' }}>
                  <div style={{ fontSize: '2rem', color: 'var(--accent-gold)', marginBottom: '16px' }}><i className={`fa-solid ${item.icon}`}></i></div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--bg-dark-forest)', lineHeight: 1, marginBottom: '8px' }}>{item.time}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-dark)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>{item.unit}</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>{item.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vh, 90px) 0', background: '#FFFFFF', borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)', color: 'var(--bg-dark-forest)' }}>Discover Other Projects</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '1000px', margin: '0 auto' }}>
            {[
              { id: 'brindavana', name: 'BRINDAVANA', loc: 'Pavagada', img: '/assets/images/Project-Logos/BrindaVana.webp' },
              { id: 'anantavana', name: 'ANANTAVANA', loc: 'Kabini', img: '/assets/images/Project-Logos/Anantavana.webp' },
              { id: 'eeshavana', name: 'EESHAVANA', loc: 'Kollegala', img: '/assets/images/Project-Logos/eeshavanaalogo.webp' }
            ].map((p, i) => (
              <Link key={p.id} href={`/${p.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ background: 'var(--bg-cream)', borderRadius: '24px', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', border: '1px solid rgba(0,0,0,0.02)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'transform 0.3s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '20px', fontWeight: 600 }}>{p.loc}</span>
                  <img src={p.img} alt={p.name} style={{ maxHeight: '60px', maxWidth: '180px', objectFit: 'contain' }} />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Plot / Amenity Detail Modal */}
      <AnimatePresence>
        {selected && info && badge && (
          <div className="modal-overlay active" style={{ display: 'flex' }} onClick={() => setSelected(null)}>
            <motion.div
              className="modal-card plot-modal-card"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="modal-close-btn" onClick={() => setSelected(null)}>&times;</span>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '15px', marginBottom: '20px' }}>
                <div>
                  <span className="subtitle-tag" style={{ margin: 0 }}>{selected.kind === 'plot' ? 'MADHUVANA PARCEL' : 'MADHUVANA AMENITY'}</span>
                  <h3 style={{ fontFamily: 'Roboto, sans-serif', fontSize: '2rem', color: 'var(--text-dark)' }}>{info.title}</h3>
                </div>
                <div style={{ background: badge.bg, color: badge.color, padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500, height: 'fit-content' }}>
                  {info.status}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: '#F7F5F0', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{selected.kind === 'plot' ? 'Parcel Area' : 'Scope'}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-dark)' }}>{info.area}</div>
                </div>
                <div style={{ background: '#F7F5F0', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Dimensions</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-dark)' }}>{info.dim}</div>
                </div>
                <div style={{ background: '#F7F5F0', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Orientation</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-dark)' }}>{info.facing}</div>
                </div>
                <div style={{ background: '#F7F5F0', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pricing</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent-gold)' }}>Contact for Pricing</div>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-dark)', marginBottom: '8px' }}>Trees &amp; Soil Profile</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{info.trees}</p>
              </div>

              <Magnetic strength={0.15} style={{ display: 'block', width: '100%' }}>
                <Link href="/contact" className="btn-pill btn-pill-dark" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setSelected(null)}>
                  Book Site Visit for This {selected.kind === 'plot' ? 'Plot' : 'Amenity'} <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </Magnetic>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
