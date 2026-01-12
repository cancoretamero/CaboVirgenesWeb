import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Play,
  Instagram,
  Linkedin,
  Facebook,
  MapPin,
  Thermometer,
  Award,
  Globe,
  Ship,
  Users,
  CheckCircle,
  ChevronDown,
  Leaf,
  Calendar,
  Mail,
  Phone,
  Send,
  Search,
  Clock,
  Droplets,
  ShieldCheck,
  Activity,
  Navigation,
  Wind,
  Fuel,
  Gauge,
  Fish,
  Box,
  Layers,
  ExternalLink,
  MessageCircle,
  Pause,
  Maximize2,
  Volume2,
  VolumeX,
  Settings,
  VideoOff,
  Anchor,
  X,
} from 'lucide-react';

import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';

/*
 * Main home page for the Cabo Vírgenes site. This component preserves the
 * structure and styling from the provided single file, with the navigation
 * bar and footer extracted into separate components for reuse. All other
 * content—including the hero, sections, carousels and modals—remains
 * untouched to match the original design exactly.
 */

const CaboVirgenesHome = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  // --- ESTADOS PARA MODAL VIDEO ---
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const videoRef = useRef(null);

  // Selección de la flota y productos para mostrar modales
  const [selectedShip, setSelectedShip] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Variable de control para el vídeo (null para simular que no hay)
  const videoSource = null;

  // --- HANDLERS VIDEO ---
  const togglePlay = () => {
    if (videoRef.current && videoSource) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current && videoSource) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changeSpeed = () => {
    const newSpeed =
      playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1;
    if (videoRef.current && videoSource) videoRef.current.playbackRate = newSpeed;
    setPlaybackSpeed(newSpeed);
  };

  const toggleFullscreen = () => {
    if (videoRef.current && videoSource) {
      if (videoRef.current.requestFullscreen)
        videoRef.current.requestFullscreen();
    }
  };

  // --- DATOS DE FLOTA (ACTUALIZADOS) ---
  const FLEET_DATA = [
    {
      id: 1,
      name: 'B/P Aton',
      type: 'Tangonero Congelador',
      year: '2023',
      img: 'https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=800',
      status: 'Faenando',
      coordinates: "42° 30' S, 60° 15' W",
      specs: {
        eslora: '42.5 m',
        manga: '10.0 m',
        bodega: '450 m³',
        motor: '2000 HP',
      },
      iot: {
        temp_bodega: '-24.5°C',
        velocidad: '11.2 kn',
        rumbo: 'SW 225°',
        combustible: '78%',
      },
    },
    {
      id: 2,
      name: 'B/P Iberia',
      type: 'Arrastrero',
      year: '2018',
      img: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800',
      status: 'En Tránsito',
      coordinates: "45° 12' S, 63° 44' W",
      specs: {
        eslora: '38.0 m',
        manga: '9.5 m',
        bodega: '380 m³',
        motor: '1800 HP',
      },
      iot: {
        temp_bodega: '-22.0°C',
        velocidad: '14.5 kn',
        rumbo: 'N 15°',
        combustible: '62%',
      },
    },
    {
      id: 3,
      name: 'B/P Prometeo',
      type: 'Potero',
      year: '2015',
      img: 'https://images.unsplash.com/photo-1589191995092-668887805631?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      status: 'En Puerto',
      coordinates: 'Puerto Deseado',
      specs: {
        eslora: '45.0 m',
        manga: '11.0 m',
        bodega: '500 m³',
        motor: '2200 HP',
      },
      iot: {
        temp_bodega: '-18.0°C',
        velocidad: '0.0 kn',
        rumbo: '-',
        combustible: '95%',
      },
    },
    {
      id: 4,
      name: 'B/P Austral',
      type: 'Tangonero',
      year: '2020',
      img: 'https://images.unsplash.com/photo-1552825716-2795fa5ab941?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      status: 'Faenando',
      coordinates: "41° 55' S, 59° 30' W",
      specs: {
        eslora: '40.0 m',
        manga: '9.8 m',
        bodega: '410 m³',
        motor: '1950 HP',
      },
      iot: {
        temp_bodega: '-23.8°C',
        velocidad: '3.5 kn',
        rumbo: 'E 90°',
        combustible: '45%',
      },
    },
  ];

  // --- DATOS DE PRODUCTOS (ACTUALIZADOS) ---
  const PRODUCTS_DATA = [
    {
      id: 'langostino_entero',
      title: 'Langostino Entero',
      subtitle: 'Salvaje Austral',
      tag: 'HOSO',
      img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=800',
      desc: 'Capturado en el sudoeste del océano Atlántico. Congelado a bordo para una calidad excepcional.',
      details: {
        especie: 'Pleoticus Müelleri',
        zona: 'FAO 41',
        metodo: 'Pesca extractiva (Tangonero)',
        clasificacion: 'L1 (10-20) a L5 (60-80) ppKg',
      },
      formatos: ['Caja 20x400g', 'Caja 10x800g', 'Caja 6x2kg', 'Granel 2x7kg'],
    },
    {
      id: 'cola_langostino',
      title: 'Cola de Langostino',
      subtitle: 'Salvaje',
      tag: 'Cola C1-C4',
      img: 'https://plus.unsplash.com/premium_photo-1674498270206-3e6861930f54?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      desc: 'Cola de langostino austral procesada. Disponible en múltiples clasificaciones y calidades.',
      details: {
        especie: 'Pleoticus Muelleri',
        zona: 'FAO 41',
        metodo: 'Pesca extractiva',
        clasificacion: 'C1 (30-55) a C4 (151-200) ppKg',
      },
      formatos: ['6x2kg', '2x6kg', '3x6kg', '2x10kg (Bloque)'],
    },
    {
      id: 'merluza',
      title: 'Merluza Argentina',
      subtitle: 'Hubbsi',
      tag: 'Filete / HGT',
      img: 'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      desc: 'Rico en Omega-3. Disponible en filetes con/sin piel, interfoliados o IQF, y HGT.',
      details: {
        especie: 'Merluccius Hubbsi',
        zona: 'Mar Argentino',
        presentacion: 'Con Piel, Sin Piel, HGT',
        tallas: '60-200g, 200-UP, 2-8oz',
      },
      formatos: ['IQF Granel 10kg', 'Interfoliado 7kg', 'Bolsas 1kg'],
    },
    {
      id: 'calamar',
      title: 'Calamar Illex',
      subtitle: 'Potero',
      tag: 'Illex',
      img: 'https://images.unsplash.com/photo-1623910270365-9b45727235c4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      desc: 'Capturado con buque potero. Alimento rico en minerales y proteínas.',
      details: {
        especie: 'Illex Argentinus',
        zona: 'FAO 41',
        arte: 'Anzuelos y sedales (Potera)',
        tallas: '100/200 a 800-UP g',
      },
      formatos: ['Bloque 1x12kg', 'Bloque 2x6kg'],
    },
    {
      id: 'vieira',
      title: 'Vieira del Pacífico',
      subtitle: 'Media Concha',
      tag: 'Scallop',
      img: 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?q=80&w=800',
      desc: 'Procesamiento de alta tecnología para un producto de primera calidad.',
      details: {
        especie: 'Argopecten Purpuratus',
        zona: 'FAO 87',
        variedades: 'Media concha (con coral), Tallo',
        clasificacion: '10-20 a 60-80 piezas/lb',
      },
      formatos: ['Cajas 10x1kg', 'Bolsas 500g', 'Granel 10kg'],
    },
    {
      id: 'pota',
      title: 'Pota de Perú',
      subtitle: 'Dosidicus Gigas',
      tag: 'Jumbo Squid',
      img: 'https://images.unsplash.com/photo-1551899714-406fb07fb6ae?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      desc: 'Calamar gigante comercializado en anillas, filetes, alas, rejos o tentáculos.',
      details: {
        especie: 'Dosidicus Gigas',
        zona: 'FAO 87',
        piezas: 'Filete, Alas, Rejo, Tubo',
        origen: 'Perú',
      },
      formatos: ['Anillas 1kg/20x1kg', 'Entero despiezado 2x10kg'],
    },
    {
      id: 'vannamei',
      title: 'Langostino Vannamei',
      subtitle: 'Acuicultura',
      tag: 'Vannamei',
      img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800',
      desc: 'Cría sostenible sin antibióticos. Congelado vivo para piel compacta.',
      details: {
        especie: 'Penaeus Vannamei',
        metodo: 'Acuicultura',
        origen: 'Varios',
        tallas: 'Entera (20/30 a 80/100), Cola (16/20 a 110 up)',
      },
      formatos: ['10x1kg', '6x2kg', '10x800g', '6x1.6kg'],
    },
  ];

  // --- DATOS DE NOTICIAS (NUEVOS) ---
  const NEWS_DATA = [
    {
      id: 1,
      medio: 'Revista Puerto',
      fecha: '13/05/2025',
      titulo:
        'El mercado y el consumidor son muy dinámicos, tenemos que adaptarnos',
      desc: 'Entrevista a Gastón Ortíz sobre la estrategia comercial y adaptación a la demanda tras la adquisición por AISA Group.',
      link: 'https://revistapuerto.com.ar/2025/05/gaston-ortiz-el-mercado-y-el-consumidor-son-muy-dinamicos-tenemos-que-adaptarnos-a-ellos/',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800',
    },
    {
      id: 2,
      medio: 'Marine Stewardship Council',
      fecha: '21/03/2025',
      titulo: 'Pesquería de langostino argentino logra certificación MSC',
      desc: 'Hito histórico tras una década de mejoras. Cabo Vírgenes lideró el proceso para mejorar el acceso a mercados globales.',
      link: 'https://www.msc.org/media-centre/press-releases/press-release/argentine-red-shrimp-fishery-achieves-msc-certification-following-decade-of-improvements',
      img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      medio: 'Consulado Argentino NY',
      fecha: '18/03/2025',
      titulo: 'Fuerte presencia argentina en Boston Seafood Expo 2025',
      desc: 'Nota oficial destacando a Cabo Vírgenes en la feria para consolidar el mercado en EE. UU.',
      link: 'https://cnyor.cancilleria.gob.ar/en/strong-presence-argentina%E2%80%99s-fishing-industry-boston-seafood-expo-2025',
      img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800',
    },
    {
      id: 4,
      medio: 'Canal 12 Web',
      fecha: '17/03/2025',
      titulo: '«Chubut es el núcleo de Cabo Vírgenes»',
      desc: 'Ejecutivos destacan la inversión y el impulso internacional tras la adquisición por AISA Group desde el origen.',
      link: 'https://canal12web.com/chubut-es-el-nucleo-de-cabo-virgenes/',
      img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800',
    },
    {
      id: 5,
      medio: 'Pescafácil',
      fecha: '26/02/2025',
      titulo: 'Cabo Vírgenes pasa a manos del grupo canadiense AISA',
      desc: 'Nota sectorial sobre el cambio de control y el rol de Palencia en la plataforma internacional del grupo.',
      link: 'https://www.pescafacil.com/2025/02/26/cabo-virgenes-pasa-a-manos-del-grupo-canadiense-aisa/',
      img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
    },
    {
      id: 6,
      medio: 'SeafoodSource',
      fecha: '10/02/2025',
      titulo: 'Avance hacia certificación MSC en Chubut',
      desc: 'Reporte internacional sobre el progreso de la pesquería costera, con Cabo Vírgenes como participante clave.',
      link: 'https://www.seafoodsource.com/news/environment-sustainability/argentina-s-chubut-shrimp-fishery-close-to-achieving-msc-certification-after-a-decade-of-work',
      img: 'https://images.unsplash.com/photo-1605433975283-263394f3514e?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 7,
      medio: 'iProfesional',
      fecha: '31/01/2025',
      titulo: 'Inversión de más de 42 millones de dólares en Chubut',
      desc: 'Impacto económico de la operación, destacando empleo, valor agregado y el rol de Palencia en la cadena.',
      link: 'https://www.iprofesional.com/actualidad/421615-que-provincia-se-beneficiara-con-inversion-42-millones-de-dolares',
      img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800',
    },
    {
      id: 8,
      medio: 'Seafood.media',
      fecha: '30/01/2025',
      titulo: 'AISA Group finally buys Cabo Virgenes',
      desc: 'Resumen internacional del deal con foco en capacidad industrial y la huella Argentina–España.',
      link: 'https://www.seafood.media/fis/worldnEws/search_brief.asp?id=133449&l=e&ndb=1',
      img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800',
    },
    {
      id: 9,
      medio: 'Diario Jornada',
      fecha: '26/01/2025',
      titulo: 'El grupo AISA llega a Chubut con inversión millonaria',
      desc: 'Nota sobre la inversión y el compromiso de ampliación de capacidad operativa, empleo y exportación.',
      link: 'https://www.diariojornada.com.ar/387089/politica/el_grupo_aisa_llega_a_chubut_con_una_inversion_de_us42_millones',
      img: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1612&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 10,
      medio: 'AISA Group',
      fecha: '24/01/2025',
      titulo: 'Aisa Group adquiere la pesquera Cabo Vírgenes SA',
      desc: 'Anuncio oficial posicionando a Cabo Vírgenes como plataforma exportadora con planes de crecimiento.',
      link: 'https://www.aisagroup.ca/noticias/aisa-group-adquiere-la-pesquera-cabo-virgenes-sa',
      img: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=800',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-['Poppins'] selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      {/* Global styles defined inline to mirror the original file. These definitions apply
          to classes used across NavBar, Footer and the remainder of the page. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }

        .glass-nav {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }

        .glass-submenu {
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        .glass-modal {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .text-glow { text-shadow: 0 0 30px rgba(255,255,255,0.2); }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        /* Ocultar barra de scroll pero mantener funcionalidad */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #06b6d4; }
      `}</style>

      {/* Navigation bar imported from separate component */}
      <NavBar onContactClick={() => setIsContactModalOpen(true)} />

      {/* --- HERO SECTION --- */}
      <header className="relative min-h-[110vh] w-full flex items-center justify-center overflow-hidden pb-32">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1498623116890-37e912163d5d?q=80&w=2576&auto=format&fit=crop"
            alt="Ocean Waves"
            className="w-full h-full object-cover opacity-50 scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/40 via-transparent to-[#0f172a]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-20 animate-float">
          <div className="inline-flex items-center gap-3 border border-white/10 bg-white/5 backdrop-blur-md rounded-full px-5 py-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <span className="text-cyan-100/80 text-[11px] font-medium tracking-[0.2em] uppercase">
              Premium Wild Catch
            </span>
          </div>
          <h1 className="text-6xl md:text-9xl font-extralight tracking-tighter mb-8 leading-[0.9] text-glow mix-blend-overlay opacity-90">
            MAR <br />{' '}
            <span className="font-semibold italic text-white opacity-100 mix-blend-normal">
              PROFUNDO
            </span>
          </h1>
          <p className="text-slate-200 text-lg md:text-2xl font-light max-w-2xl mx-auto mb-12 leading-relaxed tracking-wide opacity-90">
            Langostino Salvaje Patagónico. <br />{' '}
            <span className="text-cyan-200/60 text-base">
              Capturado en origen. Congelado a bordo.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-10 py-5 bg-white text-slate-900 rounded-full font-semibold tracking-wide overflow-hidden hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              <span className="relative z-10 flex items-center gap-2">
                Explorar Colección <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="flex items-center gap-4 text-sm font-light tracking-[0.2em] uppercase hover:text-cyan-300 transition-colors group px-6 py-4 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10"
            >
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-400/10 transition-all">
                <Play className="w-2.5 h-2.5 ml-0.5 fill-current" />
              </div>{' '}
              Ver Video
            </button>
          </div>
        </div>
      </header>

      {/* --- SEPARATOR 1: SWOOP --- */}
      <div className="relative w-full -mt-48 z-20 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto block align-middle"
        >
          <path
            fill="#0f172a"
            fillOpacity="1"
            d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,224C1120,245,1280,267,1360,277.3L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* --- SECTION: ORIGEN --- */}
      <section id="origen" className="py-20 bg-[#0f172a] relative z-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase mb-4 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-cyan-400"></span> Origen
              </span>
              <h2 className="text-4xl md:text-6xl font-light leading-tight text-white">
                De la Patagonia <br />{' '}
                <span className="font-serif italic text-slate-500">al mundo.</span>
              </h2>
            </div>
            <p className="text-slate-400 max-w-md text-sm leading-relaxed font-light border-l border-slate-700 pl-6">
              Operamos en la Zona FAO 41, un santuario natural donde las corrientes frías crean el hábitat perfecto para el langostino rojo salvaje.
            </p>
          </div>
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 relative group">
              <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1589191995092-668887805631?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Barco Pesquero"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
                {/* WIDGET ACTUALIZADO CON DATO REAL DE EXPORTACIÓN */}
                <div className="absolute top-10 right-10 glass-nav p-4 rounded-2xl flex flex-col items-center">
                  <span className="text-2xl font-bold text-white">+70</span>
                  <span className="text-[10px] uppercase tracking-widest text-cyan-300">Países</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 relative lg:-ml-24 mt-8 lg:mt-0 z-10">
              <div className="glass-nav p-10 rounded-[2.5rem] relative overflow-hidden group hover:bg-white/10 transition-colors duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-[50px] -mr-10 -mt-10"></div>
                <h3 className="text-2xl font-light mb-8">Nuestros Pilares</h3>
                <div className="space-y-8">
                  {[
                    { icon: Thermometer, title: 'Ultra Congelación', text: 'Proceso a bordo en menos de 2 horas.' },
                    { icon: Award, title: 'Calidad Premium', text: 'Textura firme y sabor dulce natural.' },
                    { icon: MapPin, title: 'Trazabilidad Total', text: 'Control completo hasta el cliente.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                        <item.icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-400 font-light">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- OLA SUPERIOR (TRANSICIÓN A BLANCO) --- */}
      <div className="relative w-full -mb-1 z-10 pointer-events-none bg-slate-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto block rotate-180 fill-[#0f172a]"
        >
          <path
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* --- SECCIÓN: PROCESO VERTICAL (BLANCA) --- */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <span className="text-cyan-600 font-bold tracking-[0.2em] text-xs uppercase mb-4 inline-block px-4 py-2 rounded-full bg-cyan-50 border border-cyan-200">
              Integración Vertical
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-[#0f172a] mb-6">Cadena de Valor</h2>
            <p className="text-slate-600 font-light max-w-2xl mx-auto text-lg">
              Controlamos cada etapa del proceso para garantizar una calidad sin compromisos.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent"></div>

            {[
              { step: '01', title: 'Captura', desc: 'Flota propia en FAO 41', icon: Anchor },
              { step: '02', title: 'Congelado', desc: 'Shock térmico a bordo', icon: Thermometer },
              { step: '03', title: 'Procesado', desc: 'Clasificación láser', icon: Activity },
              { step: '04', title: 'Logística', desc: 'Entrega global', icon: Globe },
            ].map((item, i) => (
              <div key={i} className="relative group text-center">
                <div className="w-24 h-24 mx-auto bg-white border border-slate-200 rounded-full flex items-center justify-center relative z-10 group-hover:border-cyan-500 transition-colors duration-500 mb-8 shadow-xl shadow-slate-200">
                  <div className="absolute inset-0 bg-cyan-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                  <item.icon className="w-8 h-8 text-[#0f172a] group-hover:text-cyan-600 transition-colors relative z-10" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#0f172a] text-white font-bold rounded-full flex items-center justify-center text-xs shadow-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-medium text-[#0f172a] mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- OLA INFERIOR (CORREGIDA: FONDO OSCURO, OLA BLANCA) --- */}
      <div className="relative w-full -mt-1 z-10 pointer-events-none bg-[#0a1120]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto block fill-slate-50"
        >
          <path
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* --- SECCIÓN: FLOTA --- */}
      <section id="flota" className="py-24 bg-[#0a1120] relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Nuestra Flota</h2>
              <p className="text-slate-400 font-light">
                Tecnología naval al servicio de la frescura. Monitoreo en tiempo real.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-xs text-slate-500 uppercase tracking-widest mr-2 animate-pulse">
                Desliza para ver más
              </span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </div>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-12 snap-x scrollbar-hide -mx-6 px-6">
            {FLEET_DATA.map((ship) => (
              <div
                key={ship.id}
                onClick={() => setSelectedShip(ship)}
                className="group relative min-w-[300px] md:min-w-[400px] aspect-[3/4] rounded-[2rem] overflow-hidden cursor-pointer snap-center shadow-xl border border-white/5 hover:border-cyan-500/50 transition-all duration-300"
              >
                <img
                  src={ship.img}
                  alt={ship.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent"></div>

                <div className="absolute top-6 right-6">
                  <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        ship.status === 'Faenando'
                          ? 'bg-green-500 animate-pulse'
                          : 'bg-yellow-500'
                      }`}
                    ></div>
                    <span className="text-[10px] text-white font-bold uppercase tracking-widest">
                      {ship.status}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="flex justify-between items-end mb-4 border-b border-white/20 pb-4">
                    <div>
                      <div className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                        {ship.type}
                      </div>
                        <h3 className="text-2xl font-bold text-white">{ship.name}</h3>
                    </div>
                    <div className="text-slate-400 text-xs font-mono">{ship.year}</div>
                  </div>
                  <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                    <span className="text-xs text-slate-300">Ver Dashboard IoT</span>
                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-[#0f172a]">
                      <Activity className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN: GLOBAL REACH --- */}
      <section className="py-32 bg-[#0f172a] relative overflow-hidden">
        {/* ... background images ... */}
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
            Alcance Global
          </span>
          <h2 className="text-5xl font-light text-white mb-8">
            Cabo Vírgenes en{' '}
            <span className="font-serif italic text-cyan-200">Cifras</span>
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto mb-20 text-lg font-light leading-relaxed">
            De la unión de más de cuarenta años de experiencia y un sistema de integración vertical desde la extracción y procesado del langostino austral hasta su posterior comercialización y distribución, surge Cabo Vírgenes, una de las principales empresas del sector en el mundo.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                num: '75',
                label: 'Países Exportados',
                icon: Globe,
                color: 'text-cyan-400',
                bg: 'from-cyan-500/20 to-blue-600/5',
                border: 'border-cyan-500/30',
              },
              {
                num: '2.000',
                label: 'Clientes que nos Avalan',
                icon: Users,
                color: 'text-emerald-400',
                bg: 'from-emerald-500/20 to-teal-600/5',
                border: 'border-emerald-500/30',
              },
              {
                num: '100.000',
                label: 'm³ Cámaras de Refrigerado',
                icon: Box,
                color: 'text-blue-400',
                bg: 'from-blue-500/20 to-indigo-600/5',
                border: 'border-blue-500/30',
              },
              {
                num: '17.000',
                label: 'Ton. Comercializadas / Año',
                icon: Ship,
                color: 'text-teal-300',
                bg: 'from-teal-400/20 to-cyan-600/5',
                border: 'border-teal-400/30',
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`relative p-8 rounded-[2.5rem] border ${stat.border} bg-gradient-to-br ${stat.bg} backdrop-blur-md group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,0,0,0.3)] overflow-hidden`}
              >
                {/* Animated Background Blob */}
                <div
                  className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[60px] opacity-20 bg-current ${stat.color} group-hover:opacity-40 transition-opacity`}
                ></div>

                <div
                  className={`w-16 h-16 mx-auto rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${stat.color}`}
                >
                  <stat.icon className="w-8 h-8" />
                </div>

                <div className={`text-4xl font-bold text-white mb-3 tracking-tight group-hover:scale-105 transition-transform`}>
                  {stat.num}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors px-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SEPARATOR 2 --- */}
      <div className="relative w-full -mb-1 z-10 pointer-events-none bg-[#0f172a]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto block"
        >
          <path
            fill="#111c35"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* --- SECCIÓN: PRODUCTOS (INTERACTIVA & SCROLLEABLE) --- */}
      <section id="producto" className="py-24 bg-[#111c35] relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[100px]"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-3xl">
              <span className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase mb-6 inline-block px-4 py-2 rounded-full bg-cyan-900/10 border border-cyan-500/20">
                Nuestra Selección
              </span>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                Excelencia del Atlántico
              </h2>
              <p className="text-slate-400 font-light text-lg">
                Catálogo premium de mariscos salvajes y procesados.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-xs text-slate-500 uppercase tracking-widest mr-2 animate-pulse">
                Explorar Catálogo
              </span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </div>
          </div>

          {/* CARRUSEL DE PRODUCTOS */}
          <div className="flex overflow-x-auto gap-6 pb-12 snap-x scrollbar-hide -mx-6 px-6">
            {PRODUCTS_DATA.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedProduct(item)}
                className="group relative min-w-[300px] md:min-w-[350px] aspect-[4/5] rounded-[2.5rem] overflow-hidden cursor-pointer snap-center shadow-xl border border-white/5 hover:border-cyan-500/50 transition-all duration-300"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent opacity-90 transition-opacity duration-300"></div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end items-start">
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold tracking-widest uppercase text-cyan-300 mb-4 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {item.tag}
                  </span>
                  <h3 className="text-3xl font-light text-white mb-2 group-hover:text-cyan-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm font-light mb-6 opacity-80 group-hover:opacity-100 max-w-[90%] line-clamp-2">
                    {item.desc}
                  </p>
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-[#0f172a] transition-all duration-500">
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="inline-flex items-center gap-3 text-sm font-light tracking-[0.2em] uppercase text-white hover:text-cyan-400 transition-colors border-b border-transparent hover:border-cyan-400 pb-1">
              Descargar Catálogo PDF Completo{' '}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN: NOTICIAS (ACTUALIZADA) --- */}
      <section className="py-24 bg-[#111c35] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-light text-white mb-2">
                Actualidad Cabo Vírgenes
              </h2>
              <p className="text-slate-400 text-sm">Últimas novedades y presencia en medios.</p>
            </div>
            <div className="flex gap-2">
              <span className="text-xs text-slate-500 uppercase tracking-widest mr-2 animate-pulse">
                Desliza para ver más
              </span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </div>
          </div>

          {/* CARRUSEL DE NOTICIAS SCROLLEABLE */}
          <div className="flex overflow-x-auto gap-6 pb-12 snap-x scrollbar-hide -mx-6 px-6">
            {NEWS_DATA.map((news) => (
              <article
                key={news.id}
                className="group relative min-w-[300px] md:min-w-[350px] bg-[#0f172a] rounded-2xl overflow-hidden cursor-pointer snap-center shadow-lg border border-white/5 hover:border-cyan-500/30 transition-all duration-300"
                onClick={() => window.open(news.link, '_blank')}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={news.img}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={news.titulo}
                  />
                  <div className="absolute top-4 left-4 bg-[#0b1221]/90 backdrop-blur text-cyan-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-cyan-500/20">
                    {news.medio}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-mono">
                    <Calendar className="w-3 h-3 text-cyan-500" /> {news.fecha}
                  </div>
                  <h3 className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors mb-3 line-clamp-2">
                    {news.titulo}
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-3 mb-4">{news.desc}</p>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                    Leer Noticia <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Include the footer component */}
      <Footer />

      {/* --- MODAL VIDEO LIQUID GLASS --- */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="glass-modal w-full max-w-5xl rounded-[2rem] overflow-hidden relative flex flex-col shadow-2xl shadow-cyan-900/30 border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Container */}
            <div className="relative aspect-video bg-black group flex items-center justify-center">
              {videoSource ? (
                <>
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    src={videoSource}
                    poster="https://images.unsplash.com/photo-1498623116890-37e912163d5d?q=80&w=2576"
                    onClick={togglePlay}
                  ></video>

                  {/* Custom Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Progress Bar (Static for demo) */}
                    <div className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer">
                      <div className="w-1/3 h-full bg-cyan-500 rounded-full relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button onClick={togglePlay} className="text-white hover:text-cyan-400 transition-colors">
                          {isPlaying ? (
                            <Pause className="w-6 h-6 fill-current" />
                          ) : (
                            <Play className="w-6 h-6 fill-current" />
                          )}
                        </button>
                        <button onClick={toggleMute} className="text-white hover:text-cyan-400 transition-colors">
                          {isMuted ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </button>
                        <span className="text-xs text-slate-300 font-mono">02:14 / 05:30</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={changeSpeed}
                          className="text-white hover:text-cyan-400 transition-colors flex items-center gap-1"
                        >
                          <Settings className="w-4 h-4" />
                          <span className="text-xs font-bold">{playbackSpeed}x</span>
                        </button>
                        <button
                          onClick={() => setShowSubtitles(!showSubtitles)}
                          className={`transition-colors ${
                            showSubtitles ? 'text-cyan-400' : 'text-white hover:text-cyan-400'
                          }`}
                        >
                          <span className="text-xs font-bold">CC</span>
                        </button>
                        <button onClick={toggleFullscreen} className="text-white hover:text-cyan-400 transition-colors">
                          <Maximize2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Subtitles Overlay */}
                  {showSubtitles && (
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-1 rounded-lg backdrop-blur-sm">
                      <p className="text-white text-sm font-medium text-center">
                        Capturando la esencia pura del Atlántico Sur...
                      </p>
                    </div>
                  )}
                </>
              ) : (
                /* ESTADO SIN VÍDEO */
                <div className="flex flex-col items-center justify-center text-slate-500 p-10">
                  <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <VideoOff className="w-8 h-8 opacity-50" />
                  </div>
                  <p className="text-sm uppercase tracking-widest font-bold text-slate-400">
                    No hay video disponible
                  </p>
                  <p className="text-xs text-slate-600 mt-2">
                    El contenido multimedia no se encuentra accesible.
                  </p>
                </div>
              )}
              {/* Close Button (Siempre visible) */}
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/10 z-20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Description Area */}
            <div className="p-8 bg-[#0b1221]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest border border-cyan-500/30 px-2 py-0.5 rounded">
                      Institucional
                    </span>
                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                      4K Ultra HD
                    </span>
                  </div>
                  <h3 className="text-2xl font-light text-white mb-2">Manifiesto Cabo Vírgenes</h3>
                  <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                    Un viaje visual desde las profundidades del mar argentino hasta las mesas más exigentes del mundo. Descubre cómo nuestra flota opera en condiciones extremas para garantizar la máxima frescura en cada captura.
                  </p>
                </div>
                {videoSource && (
                  <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-cyan-400 transition-colors border-b border-white/10 pb-1 hover:border-cyan-400">
                    Ver en YouTube <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL FLOTA LIQUID GLASS --- */}
      {selectedShip && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedShip(null)}
        >
          <div
            className="glass-modal w-full max-w-2xl rounded-[2rem] overflow-hidden relative flex flex-col max-h-[85vh] shadow-2xl shadow-cyan-900/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 shrink-0">
              <img
                src={selectedShip.img}
                className="w-full h-full object-cover"
                alt={selectedShip.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1221] to-transparent"></div>
              <button
                onClick={() => setSelectedShip(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="text-cyan-400 font-bold tracking-widest text-[10px] uppercase mb-1 block">
                  {selectedShip.type}
                </span>
                <h2 className="text-3xl font-light text-white">{selectedShip.name}</h2>
              </div>
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar bg-gradient-to-b from-[#0b1221]/90 to-[#0f172a]/90 space-y-8">
              <div>
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 uppercase tracking-wider">
                  <Navigation className="w-4 h-4 text-cyan-500" /> Especificaciones
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(selectedShip.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-white/5 border border-white/10 rounded-xl p-3 text-center"
                    >
                      <span className="text-[9px] text-slate-400 uppercase tracking-widest block mb-1">
                        {key}
                      </span>
                      <span className="text-white text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                    <Activity className="w-4 h-4 text-green-500 animate-pulse" /> Telemetría
                  </h3>
                  <span className="text-[9px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30 font-bold">
                    LIVE
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#0f172a] rounded-xl p-3 border border-cyan-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase mb-1">Bodega</div>
                      <div className="text-lg font-bold text-white">{selectedShip.iot.temp_bodega}</div>
                    </div>
                    <Thermometer className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="bg-[#0f172a] rounded-xl p-3 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase mb-1">Velocidad</div>
                      <div className="text-lg font-bold text-white">{selectedShip.iot.velocidad}</div>
                    </div>
                    <Gauge className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="bg-[#0f172a] rounded-xl p-3 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase mb-1">Rumbo</div>
                      <div className="text-lg font-bold text-white">{selectedShip.iot.rumbo}</div>
                    </div>
                    <Wind className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="bg-[#0f172a] rounded-xl p-3 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase mb-1">Fuel</div>
                      <div className="text-lg font-bold text-white">{selectedShip.iot.combustible}</div>
                    </div>
                    <Fuel className="w-5 h-5 text-slate-500" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-purple-500" /> Localización
                </h3>
                <div className="bg-[#0f172a] rounded-xl border border-white/10 p-1 h-48 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
                    alt="Map"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center animate-ping absolute"></div>
                    <div className="w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4] relative z-10 border-2 border-white"></div>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur px-2 py-1 rounded text-[9px] text-cyan-400 font-mono border border-white/10">
                    {selectedShip.coordinates}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL PRODUCTO LIQUID GLASS --- */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="glass-modal w-full max-w-2xl rounded-[2rem] overflow-hidden relative flex flex-col max-h-[85vh] shadow-2xl shadow-cyan-900/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Imagen */}
            <div className="relative h-64 shrink-0">
              <img
                src={selectedProduct.img}
                className="w-full h-full object-cover"
                alt={selectedProduct.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1221] to-transparent"></div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-6 left-8">
                <div className="flex gap-2 mb-2">
                  <span className="bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">
                    {selectedProduct.tag}
                  </span>
                  {selectedProduct.subtitle && (
                    <span className="bg-white/10 border border-white/10 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">
                      {selectedProduct.subtitle}
                    </span>
                  )}
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-white leading-none">
                  {selectedProduct.title}
                </h2>
              </div>
            </div>
            {/* Contenido Scrolleable */}
            <div className="p-8 overflow-y-auto custom-scrollbar bg-gradient-to-b from-[#0b1221]/95 to-[#0f172a]/95 space-y-8">
              {/* Descripción */}
              <div>
                <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-cyan-500 pl-4 italic">
                  {selectedProduct.desc}
                </p>
              </div>

              {/* Detalles Técnicos Grid */}
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Fish className="w-4 h-4" /> Ficha Técnica
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedProduct.details).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-white/5 p-3 rounded-xl border border-white/5"
                    >
                      <span className="text-[9px] text-slate-400 uppercase tracking-widest block mb-1">
                        {key.replace('_', ' ')}
                      </span>
                      <span className="text-white text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formatos Disponibles */}
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Box className="w-4 h-4" /> Presentaciones
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.formatos.map((fmt, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-[#0f172a] border border-white/10 text-xs text-slate-300 flex items-center gap-2"
                    >
                      <Layers className="w-3 h-3 text-cyan-500/50" /> {fmt}
                    </span>
                  ))}
                </div>
              </div>
              {/* Call to Action */}
              <div className="pt-4 border-t border-white/5 flex gap-4">
                <button className="flex-1 bg-cyan-500 text-[#0b1221] font-bold uppercase tracking-widest text-xs py-3 rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  Solicitar Ficha Técnica
                </button>
                <button className="px-6 border border-white/20 rounded-xl hover:bg-white/5 transition-all">
                  <Mail className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL CONTACTO LIQUID GLASS --- */}
      {isContactModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div
            className="glass-modal w-full max-w-lg rounded-[2rem] p-8 relative shadow-2xl shadow-cyan-900/20 border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all"
            >
              <X className="w-4 h-4" />
            </button>
            <h2 className="text-3xl font-light text-white mb-2">Hablemos</h2>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Completa el formulario para enviarnos un correo o contáctanos directamente por WhatsApp.
            </p>
            <form className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-sm"
                  placeholder="Tu nombre"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">
                  Email o Teléfono
                </label>
                <input
                  type="text"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-sm"
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">
                  Mensaje
                </label>
                <textarea
                  rows="3"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-sm resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                ></textarea>
              </div>
              <div className="pt-4 flex flex-col gap-3">
                <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2 group">
                  Enviar Correo{' '}
                  <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink-0 mx-4 text-[10px] text-slate-500 uppercase tracking-widest">
                    O contáctanos por
                  </span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>
                <button className="w-full bg-[#25D366] text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl hover:bg-[#20bd5a] hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all flex items-center justify-center gap-2">
                  WhatsApp <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaboVirgenesHome;