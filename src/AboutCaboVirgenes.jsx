import React, { useState } from 'react';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import {
  Anchor,
  ArrowRight,
  Play,
  Ship,
  Snowflake,
  Factory,
  Warehouse,
  CheckCircle,
  MapPin,
  Thermometer,
  Award,
  Globe,
  Users,
  Calendar,
  Mail,
  Phone,
  Activity,
  Navigation,
  Wind,
  Fuel,
  Gauge,
  Layers,
  Fish,
  Image as ImageIcon,
  Video,
  Map as MapIcon,
  Info,
  X,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

/*
 * AboutCaboVirgenes
 *
 * This component renders the "Quienes Somos" (About Us) page for
 * Cabo Vírgenes. It reuses the NavBar and Footer components defined
 * elsewhere in the project to ensure a consistent look and feel across
 * all pages. The page is divided into several sections: history,
 * fleet (fresqueros and congeladores), plants, locations and an
 * interactive map of global markets. Modals are used to display
 * additional information for ships and plants. A contact modal is
 * included to mirror the functionality found on the home page.
 */

const AboutCaboVirgenes = () => {
  // State management for modals and interactive widgets
  const [selectedShip, setSelectedShip] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState('info');
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [mapView, setMapView] = useState('global');

  /* -----------------------------------------------------------------
   * Data Definitions
   */
  const HISTORY_DATA = [
    { year: 'Origen', title: 'La Unión de Experiencia', text: 'Cabo Vírgenes surge de la unión de más de 48 años de experiencia y conocimientos del sector de los actuales gerentes, Pedro Mielgo en España, y Eduardo del Rio en Argentina. Nuestra actividad se basa en una alianza Hispano/Argentina a través de un sistema de integración vertical desde la extracción y procesado del langostino austral hasta su posterior comercialización y distribución.' },
    { year: '2008', title: 'Nace la Alianza', text: 'Se estableció dicha alianza Hispano/Argentina y se comienza a operar desde Argentina con dos barcos fresqueros: el Cabo Vírgenes y el Nueva Esperanza. También, Argentina adquiere una planta en Rawson al Grupo Pescanova, realizando una gran obra de reformas e implantación de las últimas tecnologías en congelación. Esta planta está situada a tan solo 400 metros del puerto de Rawson.' },
    { year: '2012', title: 'Expansión Internacional', text: 'El 18 de enero del 2012, se establece en Palencia (España), Cabo Vírgenes España, S.L, que se convierte en el perfecto aliado de Argentina, pasando a ser su principal centro de operaciones y logístico a nivel internacional, encargándose de la comercialización del producto.' },
    { year: '2016', title: 'Flota Tangonera', text: 'Argentina comienza a operar con dos barcos tangoneros congeladores: Mar de Oro y Anita Álvarez con una capacidad de pesca de 1400 toneladas.' },
    { year: '2017', title: 'Valor Añadido en España', text: 'España construye la planta de reprocesado en Palencia, complementando la producción con líneas de Skin y Doy Pack, líneas de peladoras automáticas y frío con la última tecnología de CO2 totalmente inocuo.' },
    { year: '2019', title: 'Innovación Naval', text: 'En marzo se produce la botadura del Luca Santino, primer barco fresquero de la flota argentina con hielo líquido. También comienza a operar un barco potero, el Orión 2 además de otras embarcaciones como El Malo I, el Sofía B y el Natale.' },
    { year: '2020', title: 'Nuevos Horizontes', text: 'Argentina incorpora una planta en la ciudad de Comodoro Rivadavia y el buque Perla Negra, ampliando la gama a la merluza argentina. Comienza a operar el Espartano, primer prototipo de proa invertida.' },
    { year: '2021', title: 'Logística Portuaria', text: 'Argentina comienza a operar en un muelle de uso exclusivo en el puerto de Rawson para agilizar todavía más la descarga y procesado en planta del producto congelado en tierra.' },
    { year: '2022', title: 'El Gigante Atón', text: 'Se produce la botadura de un nuevo barco tangonero: el Atón. Por parte de España se amplía la planta de Palencia y se construye un Frigorífico que aumentará a más de 5.500 ton la capacidad de almacenamiento.' },
    { year: 'Futuro', title: 'Expansión Continua', text: 'El negocio está en plena expansión. La capacidad de producción diaria se encuentra por encima de las 120 toneladas con crecimientos anuales que superan el 150%, consolidando nuestra marca como referente en el mercado internacional.' }
  ];

  const FLOTA_FRESQUERA = [
    {
      id: 'f1',
      name: 'Cabo Vírgenes',
      type: 'Fresquero Costero',
      img: 'https://images.unsplash.com/photo-1544256272-4632be53841a?q=80&w=800',
      status: 'Operando',
      specs: {
        eslora: '28 m',
        manga: '7 m',
        bodega: 'Fresca',
        motor: '1200 HP',
        zona: 'Costera < 12 millas',
        puerto: 'Rawson'
      },
      gallery: [
        'https://images.unsplash.com/photo-1544256272-4632be53841a?q=80&w=800',
        'https://images.unsplash.com/photo-1566375638419-1f97116013ba?q=80&w=800'
      ],
      video: 'https://media.istockphoto.com/id/1169273299/video/fishing-boat-sailing-in-the-atlantic-ocean.mp4?s=mp4-640x640-is&k=20&c=L_qJOV9J9ZtZ7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z',
      location: { lat: '-43.300', lng: '-65.102', label: 'Puerto Rawson' }
    },
    {
      id: 'f2',
      name: 'Nueva Esperanza',
      type: 'Fresquero Costero',
      img: 'https://images.unsplash.com/photo-1559792070-4965893e62f0?q=80&w=800',
      status: 'Operando',
      specs: {
        eslora: '26 m',
        manga: '6.5 m',
        bodega: 'Fresca',
        motor: '1100 HP',
        zona: 'Costera < 12 millas',
        puerto: 'Rawson'
      },
      gallery: [
        'https://images.unsplash.com/photo-1559792070-4965893e62f0?q=80&w=800',
        'https://images.unsplash.com/photo-1520116468816-95b69f847357?q=80&w=800'
      ],
      video: null,
      location: { lat: '-43.350', lng: '-65.050', label: 'Zona Pesca' }
    },
    {
      id: 'f3',
      name: 'Luca Santino',
      type: 'Fresquero Hielo Líquido',
      img: 'https://images.unsplash.com/photo-1616682708226-785311025528?q=80&w=800',
      status: 'Innovación',
      specs: {
        eslora: '32 m',
        manga: '8 m',
        sistema: 'Hielo Líquido',
        tecno: 'Calidad Premium',
        motor: '1500 HP'
      },
      gallery: [
        'https://images.unsplash.com/photo-1616682708226-785311025528?q=80&w=800',
        'https://images.unsplash.com/photo-1500996657904-74972f779779?q=80&w=800'
      ],
      video: null,
      location: { lat: '-43.300', lng: '-65.102', label: 'Puerto Rawson' }
    },
    {
      id: 'f4',
      name: 'Espartano',
      type: 'Proa Invertida',
      img: 'https://images.unsplash.com/photo-1566375638419-1f97116013ba?q=80&w=800',
      status: 'Prototipo',
      specs: {
        diseño: 'Astillero Cortessi',
        innovacion: 'Estabilidad',
        tipo: 'Polivalente',
        eslora: '29 m',
        manga: '7.5 m'
      },
      gallery: [
        'https://images.unsplash.com/photo-1566375638419-1f97116013ba?q=80&w=800'
      ],
      video: null,
      location: { lat: '-43.400', lng: '-65.000', label: 'Zona Pesca' }
    }
  ];

  const FLOTA_CONGELADORA = [
    {
      id: 'c1',
      name: 'Atón',
      type: 'Tangonero Moderno',
      img: 'https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=800',
      status: 'Buque Insignia',
      specs: {
        año: '2022',
        puerto: 'Madryn',
        proceso: 'A Bordo',
        eslora: '42.5 m',
        capacidad: '180 Ton',
        motor: '2500 HP'
      },
      gallery: [
        'https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=800',
        'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800'
      ],
      video: 'https://media.istockphoto.com/id/1169273299/video/fishing-boat-sailing-in-the-atlantic-ocean.mp4?s=mp4-640x640-is&k=20&c=L_qJOV9J9ZtZ7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z',
      location: { lat: '-42.700', lng: '-60.500', label: 'Alta Mar' }
    },
    {
      id: 'c2',
      name: 'Mar de Oro',
      type: 'Tangonero Congelador',
      img: 'https://images.unsplash.com/photo-1500996657904-74972f779779?q=80&w=800',
      status: 'Alta Mar',
      specs: {
        capacidad: '1400 Ton',
        puerto: 'Madryn',
        tipo: 'Congelador',
        eslora: '40 m',
        manga: '9 m'
      },
      gallery: [
        'https://images.unsplash.com/photo-1500996657904-74972f779779?q=80&w=800'
      ],
      video: null,
      location: { lat: '-42.500', lng: '-61.000', label: 'Alta Mar' }
    },
    {
      id: 'c3',
      name: 'Anita Álvarez',
      type: 'Tangonero Congelador',
      img: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800',
      status: 'Alta Mar',
      specs: {
        capacidad: '1400 Ton',
        puerto: 'Madryn',
        tipo: 'Congelador',
        eslora: '41 m',
        manga: '9.5 m'
      },
      gallery: [
        'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800'
      ],
      video: null,
      location: { lat: '-42.000', lng: '-60.000', label: 'Alta Mar' }
    },
    {
      id: 'c4',
      name: 'Orión 2',
      type: 'Potero',
      img: 'https://images.unsplash.com/photo-1589191995092-668887805631?q=80&w=800',
      status: 'Campaña Illex',
      specs: {
        especie: 'Calamar Illex',
        sistema: 'Potera',
        luces: 'LED',
        eslora: '45 m',
        capacidad: '300 Ton'
      },
      gallery: [
        'https://images.unsplash.com/photo-1589191995092-668887805631?q=80&w=800'
      ],
      video: null,
      location: { lat: '-44.000', lng: '-62.000', label: 'Alta Mar' }
    }
  ];

  const PLANTS_DATA = [
    {
      id: 'p1',
      title: 'Puerto Rawson',
      type: 'Procesado Fresco',
      desc: 'Ubicada a solo 400 metros del puerto, asegurando una llegada inmediata del producto. Equipada con tecnología punta, fábricas de hielo en escama y líquido.',
      img: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=1200',
      features: ['Recepción Inmediata', 'Clasificación Automática', 'Túneles de Congelación', 'Sala de Envasado', 'Muelle Privado'],
      gallery: [
        'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=1200',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800',
        'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?q=80&w=800'
      ],
      video: 'https://media.istockphoto.com/id/1324391698/video/modern-factory-production-line.mp4?s=mp4-640x640-is&k=20&c=...',
      location: { address: 'Av. M. González y S.J.C. Marsengo (9103)', city: 'Puerto Rawson, Argentina' }
    },
    {
      id: 'p2',
      title: 'Palencia (España)',
      type: 'Reprocesado & Logística',
      desc: 'Centro logístico europeo con 4.600 m². Capacidad de producción de 8.000 toneladas y almacenamiento de 5.500 ton (-27ºC). Especialistas en valor añadido.',
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200',
      features: ['Máquinas de reproceso automáticas', 'Sistema de cocción moderno', 'Túnel continuo IQF y secado', 'Líneas de Skin y Doy Pack'],
      gallery: [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200',
        'https://images.unsplash.com/photo-1551899714-406fb07fb6ae?q=80&w=800'
      ],
      video: null,
      location: { address: 'Calle Torneros 18, Polígono San Antolín', city: 'Palencia, España' }
    },
    {
      id: 'p3',
      title: 'Comodoro Rivadavia',
      type: 'Merluza & Langostino',
      desc: 'Planta especializada en procesado y reprocesado. Ampliación estratégica para la línea de Merluza Argentina, mejorando la competitividad y oferta global.',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200',
      features: ['Procesado de Merluza', 'Congelación Rápida', 'Línea de Fileteado', 'Almacenamiento en Frío'],
      gallery: [
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200'
      ],
      video: null,
      location: { address: 'Las Toninas 636', city: 'Comodoro Rivadavia, Argentina' }
    }
  ];

  const COUNTRIES_LIST = [
    'Albania', 'Alemania', 'Angola', 'Arabia Saudita', 'Argelia', 'Argentina', 'Austria', 'Australia',
    'Bélgica', 'Bosnia', 'Bulgaria', 'Canadá', 'Chipre', 'China', 'Corea del Sur', 'Costa Rica',
    'Croacia', 'Dinamarca', 'Eslovaquia', 'Eslovenia', 'Egipto', 'Emiratos Árabes', 'Estados Unidos',
    'España', 'Estonia', 'Finlandia', 'Francia', 'Grecia', 'Guatemala', 'Holanda', 'Hong Kong',
    'Honduras', 'Hungría', 'India', 'Indonesia', 'Irlanda', 'Islandia', 'Israel', 'Italia', 'Japón',
    'Kuwait', 'Letonia', 'Lituania', 'Luxemburgo', 'Malta', 'Macedonia', 'Malasia', 'Marruecos',
    'Mozambique', 'Mongolia', 'Montenegro', 'Myanmar', 'Noruega', 'Nueva Zelanda', 'Polonia',
    'Portugal', 'Perú', 'Reino Unido', 'Rep. Dominicana', 'Rep. Checa', 'Rumanía', 'Rusia', 'Serbia',
    'Slovenia', 'Sudáfrica', 'Suecia', 'Tailandia', 'Taiwán', 'Turquía', 'Ucrania', 'Uruguay', 'Vietnam'
  ];

  // Helper functions to open modals and compute map view
  const handleOpenShipModal = (ship) => {
    setSelectedShip(ship);
    setActiveModalTab('info');
  };
  const handleOpenPlantModal = (plant) => {
    setSelectedPlant(plant);
    setActiveModalTab('info');
  };
  const getViewBox = () => {
    switch (mapView) {
      case 'nam':
        return '50 0 350 250';
      case 'sam':
        return '150 200 250 300';
      case 'eur':
        return '400 50 250 150';
      case 'asia':
        return '600 50 400 300';
      case 'afr':
        return '400 150 300 300';
      case 'oce':
        return '750 250 250 250';
      // Support lowercase region names used by the menu buttons
      case 'europa':
        return '400 50 250 150';
      case 'áfrica':
        return '400 150 300 300';
      case 'oceania':
      case 'oceanía':
        return '750 250 250 250';
      case 'américa':
        // Approximate the Americas by focusing on the North American sector
        return '50 0 350 250';
      default:
        return '0 0 1000 500';
    }
  };

  // Mapping for region names to internal viewBox identifiers. This ensures
  // that when users click a region filter, the map zooms to the correct
  // portion of the world. Without this mapping, clicking "Europa" would
  // incorrectly set `mapView` to "europa", which is not recognized by
  // `getViewBox()`.
  const regionMap = {
    Global: 'global',
    'América': 'nam',
    'Europa': 'eur',
    'Asia': 'asia',
    'África': 'afr',
    'Oceanía': 'oce'
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-['Poppins'] selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      {/* Global styling and utilities */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .glass-panel { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.05); }
        .glass-modal { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(40px); border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
        .glass-apple { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.2); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .map-region { transition: all 0.5s ease; cursor: pointer; }
        .map-region:hover { fill: rgba(6, 182, 212, 0.6); filter: drop-shadow(0 0 10px rgba(6,182,212,0.5)); }
      `}</style>
      <NavBar onContactClick={() => setIsContactModalOpen(true)} />
      {/* Header */}
      <div className="relative pt-48 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div className="container mx-auto relative z-10 text-center">
          <span className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase mb-6 inline-block px-4 py-2 rounded-full bg-cyan-900/10 border border-cyan-500/20">Sobre Nosotros</span>
          <h1 className="text-5xl md:text-7xl font-light text-white mb-8">Nuestra Historia<br/><span className="font-serif italic text-slate-400">y Legado</span></h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg font-light leading-relaxed">Una alianza Hispano/Argentina forjada a través de décadas de experiencia, dedicada a la excelencia en la captura y elaboración de productos del mar salvajes.</p>
        </div>
      </div>
      {/* History */}
      <section id="historia" className="py-24 bg-[#0a1120] relative border-t border-white/5">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto space-y-12">
            {HISTORY_DATA.map((item, i) => (
              <div key={i} className="group relative flex gap-8">
                <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 to-transparent group-last:hidden"></div>
                <div className="relative shrink-0 w-10 h-10 rounded-full bg-[#0f172a] border border-cyan-500/30 flex items-center justify-center z-10 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_#06b6d4] transition-all">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                </div>
                <div className="glass-panel p-8 rounded-[2rem] flex-1 hover:bg-white/5 transition-colors duration-500 border border-white/5 hover:border-cyan-500/20">
                  <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-2 block">{item.year}</span>
                  <h3 className="text-2xl font-light text-white mb-4">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Wave separator */}
      <div className="relative w-full -mb-1 z-10 pointer-events-none bg-[#0a1120]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block fill-[#0f172a]"><path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
      </div>
      {/* Fleet */}
      <section id="flota" className="py-24 bg-[#0f172a] relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Nuestra Flota</span>
            <h2 className="text-4xl font-light text-white mb-6">Operativa en FAO 41</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Contamos con una flota propia que cumple con la más estricta reglamentación internacional en cuanto a conservación de especies y medio ambiente.</p>
          </div>
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
              <Ship className="w-6 h-6 text-cyan-400" />
              <div>
                <h3 className="text-2xl text-white font-medium">Barcos Fresqueros</h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Puerto Rawson • Pesca Costera (12 millas)</p>
              </div>
            </div>
            <div className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide">
              {FLOTA_FRESQUERA.map((ship) => (
                <div key={ship.id} onClick={() => handleOpenShipModal(ship)} className="min-w-[300px] md:min-w-[350px] glass-panel rounded-[2rem] overflow-hidden cursor-pointer hover:border-cyan-500/50 transition-all group snap-center relative">
                  <div className="h-56 overflow-hidden relative">
                    <img src={ship.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={ship.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent opacity-80"></div>
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur rounded-full p-2 hover:bg-white/20 transition-all"><Play className="w-4 h-4 text-white" /></div>
                    <div className="absolute bottom-4 left-6"><h4 className="text-xl text-white font-bold mb-1">{ship.name}</h4><p className="text-[10px] text-cyan-400 uppercase tracking-widest">{ship.type}</p></div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(ship.specs).slice(0, 4).map(([k, v]) => (
                        <div key={k}><span className="text-[9px] text-slate-500 uppercase block">{k}</span><span className="text-sm text-white">{v}</span></div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-cyan-400 font-bold uppercase tracking-widest group-hover:text-white transition-colors"><span>Ver Detalles</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4"><Snowflake className="w-6 h-6 text-cyan-400" /><div><h3 className="text-2xl text-white font-medium">Barcos Congeladores</h3><p className="text-xs text-slate-500 uppercase tracking-widest">Puerto Madryn • Procesado a Bordo</p></div></div>
            <div className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide">
              {FLOTA_CONGELADORA.map((ship) => (
                <div key={ship.id} onClick={() => handleOpenShipModal(ship)} className="min-w-[300px] md:min-w-[350px] glass-panel rounded-[2rem] overflow-hidden cursor-pointer hover:border-cyan-500/50 transition-all group snap-center relative">
                  <div className="h-56 overflow-hidden relative">
                    <img src={ship.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={ship.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent opacity-80"></div>
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur rounded-full p-2 hover:bg-white/20 transition-all"><Play className="w-4 h-4 text-white" /></div>
                    <div className="absolute bottom-4 left-6"><h4 className="text-xl text-white font-bold mb-1">{ship.name}</h4><p className="text-[10px] text-cyan-400 uppercase tracking-widest">{ship.type}</p></div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(ship.specs).slice(0, 4).map(([k, v]) => (
                        <div key={k}><span className="text-[9px] text-slate-500 uppercase block">{k}</span><span className="text-sm text-white">{v}</span></div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-cyan-400 font-bold uppercase tracking-widest group-hover:text-white transition-colors"><span>Ver Detalles</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Separator */}
      <div className="relative w-full -mt-1 z-10 pointer-events-none bg-slate-50"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block fill-[#0a1120]"><path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg></div>
      {/* Plants */}
      <section id="plantas" className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16"><span className="text-cyan-600 font-bold tracking-[0.2em] text-xs uppercase mb-4 inline-block px-4 py-2 rounded-full bg-cyan-50 border border-cyan-200">Infraestructura</span><h2 className="text-4xl md:text-5xl font-light text-[#0f172a] mb-6">Nuestras Plantas</h2><p className="text-slate-600 font-light max-w-2xl mx-auto text-lg">Tecnología de punta en origen y destino para garantizar la máxima calidad.</p></div>
          <div className="space-y-24">
            {PLANTS_DATA.map((plant, index) => (
              <div key={plant.id} className="grid lg:grid-cols-2 gap-12 items-center group">
                <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}><div className="flex items-center gap-3 mb-6">{plant.id === 'p2' ? <Warehouse className="w-8 h-8 text-cyan-600" /> : <Factory className="w-8 h-8 text-cyan-600" />}<h3 className="text-3xl font-bold text-[#0f172a]">{plant.title}</h3></div><p className="text-slate-600 leading-relaxed mb-6">{plant.desc}</p><div className="grid grid-cols-2 gap-4 mb-8">{plant.features.slice(0, 4).map((feature, i) => (<div key={i} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-600" /><span className="text-sm text-slate-700 font-medium">{feature}</span></div>))}</div><button onClick={() => handleOpenPlantModal(plant)} className="inline-flex items-center gap-2 bg-[#0f172a] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-cyan-600 transition-all shadow-lg hover:shadow-cyan-600/30">Ver Instalaciones <ArrowRight className="w-4 h-4" /></button></div>
                <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl cursor-pointer`} onClick={() => handleOpenPlantModal(plant)}><img src={plant.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={plant.title} /><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20"><Play className="w-8 h-8 text-white fill-current" /></div></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Separator to location */}
      <div className="relative w-full -mt-1 z-10 pointer-events-none bg-slate-50"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block fill-[#0a1120]"><path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg></div>
      {/* Location */}
      <section id="ubicacion" className="py-24 bg-[#0a1120] relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-light text-white mb-16 text-center">Dónde Estamos</h2>
          <div className="grid md:grid-cols-2 gap-16"><div className="glass-panel p-10 rounded-[3rem] border border-white/10 hover:border-cyan-500/30 transition-all"><div className="flex items-center gap-4 mb-8"><span className="text-6xl">🇪🇸</span><div><h3 className="text-3xl font-bold text-white">España</h3><p className="text-cyan-400 text-sm uppercase tracking-widest">Hub Logístico & Distribución</p></div></div><div className="space-y-8"><div><h4 className="text-white font-bold mb-2 flex items-center gap-2"><MapPin className="w-4 h-4 text-cyan-500" /> Palencia (HQ)</h4><p className="text-slate-400 text-sm ml-6">Calle Torneros 18, Polígono San Antolín<br/>34004 – Palencia</p><p className="text-slate-400 text-sm ml-6 mt-1">+34 979 181 438 | info@cabovirgenes.es</p></div><div><h4 className="text-white font-bold mb-2 flex items-center gap-2"><Anchor className="w-4 h-4 text-cyan-500" /> Puerto de Vigo</h4><p className="text-slate-400 text-sm ml-6">Frigoríficos de Vigo<br/>Puerto Pesquero de Berbés, Dársena 4</p></div><div><h4 className="text-white font-bold mb-2 flex items-center gap-2"><Anchor className="w-4 h-4 text-cyan-500" /> Canarias</h4><p className="text-slate-400 text-sm ml-6">FRIGORIFICO DECOEXA<br/>Muelle pesquero, 38008 Puerto de Las Palmas</p></div></div></div><div className="glass-panel p-10 rounded-[3rem] border border-white/10 hover:border-cyan-500/30 transition-all"><div className="flex items-center gap-4 mb-8"><span className="text-6xl">🇦🇷</span><div><h3 className="text-3xl font-bold text-white">Argentina</h3><p className="text-cyan-400 text-sm uppercase tracking-widest">Origen & Procesamiento</p></div></div><div className="space-y-8"><div><h4 className="text-white font-bold mb-2 flex items-center gap-2"><Factory className="w-4 h-4 text-cyan-500" /> Puerto Rawson</h4><p className="text-slate-400 text-sm ml-6">Av. M. González y S.J.C. Marsengo (9103)<br/>Chubut, Argentina</p><p className="text-slate-400 text-sm ml-6 mt-1">Planta de 35.000 m²</p></div><div><h4 className="text-white font-bold mb-2 flex items-center gap-2"><Factory className="w-4 h-4 text-cyan-500" /> Comodoro Rivadavia</h4><p className="text-slate-400 text-sm ml-6">Las Toninas 636<br/>Chubut, Argentina</p></div></div></div></div>
        </div>
      </section>
      {/* Markets */}
      <section id="mercados" className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"><div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div></div>
        <div className="max-w-[1800px] mx-auto px-6 relative z-10">
          <div className="text-center mb-12"><span className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 block">Red Operativa Global</span><h2 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">Conectando con el Mundo</h2><p className="text-gray-400 max-w-2xl mx-auto mb-8">Estructura global integrada. Seleccione una región para explorar nuestras conexiones desde los hubs de Argentina y España.</p><div className="flex flex-wrap justify-center gap-2 mb-8">{['Global','América','Europa','Asia','África','Oceanía'].map((region) => {
            // Determine the internal view identifier for a given region. Use the
            // regionMap defined above when available, falling back to the
            // lowercase string. This allows Spanish names like “Europa” and
            // “África” to map correctly to the view boxes defined in getViewBox().
            const value = regionMap[region] || region.toLowerCase();
            return (
              <button
                key={region}
                onClick={() => setMapView(value)}
                className={`px-6 py-2 rounded-full glass-apple text-xs font-bold uppercase hover:bg-white/20 transition-all border border-white/10 ${mapView === value ? 'border-cyan-400 text-cyan-400' : 'text-white'}`}
              >
                {region}
              </button>
            );
          })}</div></div>
          <div className="glass-apple rounded-[3rem] p-4 relative shadow-2xl border border-white/10 bg-[#080808] aspect-[16/9] md:aspect-[21/9] overflow-hidden"><div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-[#080808]"><svg viewBox={getViewBox()} className="w-full h-full transition-all duration-1000 ease-in-out"><path d="M150,120 Q180,80 220,100 T280,150 T200,250 T150,350 T100,250 T120,150 Z" className="fill-[#1a1a1a] stroke-[#333] stroke-1 map-region" /><path d="M450,80 Q500,60 550,80 T600,150 T550,200 T480,180 T450,150 Z" className="fill-[#1a1a1a] stroke-[#333] stroke-1 map-region" /><path d="M480,220 Q550,200 600,250 T550,350 T450,300 T480,220 Z" className="fill-[#1a1a1a] stroke-[#333] stroke-1 map-region" /><path d="M650,100 Q750,80 850,120 T800,250 T700,200 T650,150 Z" className="fill-[#1a1a1a] stroke-[#333] stroke-1 map-region" /><path d="M800,300 Q850,300 880,350 T800,400 T750,350 Z" className="fill-[#1a1a1a] stroke-[#333] stroke-1 map-region" /><defs><linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="rgba(6, 182, 212, 0)" /><stop offset="50%" stopColor="rgba(6, 182, 212, 0.6)" /><stop offset="100%" stopColor="rgba(6, 182, 212, 0)" /></linearGradient></defs>{[{ x1: 290, y1: 390, x2: 200, y2: 150 },{ x1: 290, y1: 390, x2: 520, y2: 125 },{ x1: 490, y1: 160, x2: 750, y2: 175 },{ x1: 490, y1: 160, x2: 530, y2: 275 },{ x1: 290, y1: 390, x2: 880, y2: 375 }].map((line, i) => (<path key={i} d={`M${line.x1},${line.y1} Q${(line.x1 + line.x2) / 2},${(line.y1 + line.y2) / 2 - 50} ${line.x2},${line.y2}`} fill="none" stroke="url(#lineGrad2)" strokeWidth="1" className="map-path opacity-50" style={{ animationDelay: `${i * 0.5}s` }} />))}{COUNTRIES_LIST.map((country, i) => {let cx = 500;let cy = 250;if (['Argentina','Uruguay','Perú','Brasil','Chile','Honduras','Costa Rica','Guatemala','Rep. Dominicana'].includes(country)) {cx = 200 + Math.random() * 80;cy = 250 + Math.random() * 100;} else if (['Estados Unidos','Canadá','México'].includes(country)) {cx = 150 + Math.random() * 100;cy = 100 + Math.random() * 80;} else if (['España','Francia','Italia','Alemania','Reino Unido','Portugal','Grecia','Holanda','Bélgica','Rusia','Ucrania','Polonia','Dinamarca','Noruega','Suecia'].includes(country)) {cx = 450 + Math.random() * 100;cy = 80 + Math.random() * 80;} else if (['China','Japón','Corea','Vietnam','Tailandia','India','Indonesia','Malasia','Israel','Arabia','Emiratos','Kuwait','Mongolia','Myanmar','Taiwán','Hong Kong'].some((c) => country.includes(c))) {cx = 650 + Math.random() * 150;cy = 100 + Math.random() * 100;} else if (['Marruecos','Sudáfrica','Egipto','Angola','Argelia','Mozambique'].includes(country)) {cx = 480 + Math.random() * 100;cy = 220 + Math.random() * 100;} else if (['Australia','Nueva Zelanda'].includes(country)) {cx = 800 + Math.random() * 80;cy = 300 + Math.random() * 80;}const isHovered = hoveredCountry === country;return (<circle key={i} cx={cx} cy={cy} r={isHovered ? 4 : 1.5} fill={isHovered ? '#22D3EE' : '#ffffff'} className="transition-all duration-300 cursor-pointer" opacity={isHovered ? 1 : 0.6} />);})}</svg><div className="absolute top-4 right-4 flex flex-col gap-2 z-50"><button onClick={() => setMapView('global')} className="w-10 h-10 rounded-full glass-apple flex items-center justify-center text-white hover:bg-white/20 transition-all"><ZoomOut className="w-4 h-4" /></button></div></div></div><div className="mt-12 flex flex-wrap justify-center gap-3 max-w-6xl mx-auto">{COUNTRIES_LIST.map((country, i) => (<span key={i} onMouseEnter={() => setHoveredCountry(country)} onMouseLeave={() => setHoveredCountry(null)} className={`px-4 py-2 rounded-full border text-xs font-medium cursor-pointer transition-all duration-300 ${hoveredCountry === country ? 'bg-cyan-500 border-cyan-400 text-[#0f172a] scale-110 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/30'}`}>{country}</span>))}</div><div className="flex justify-center gap-6 mt-12 flex-wrap"><div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22D3EE]"></span><span className="text-xs text-gray-400 uppercase tracking-widest">Pesca / Origen</span></div><div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_#ffffff]"></span><span className="text-xs text-gray-400 uppercase tracking-widest">Hub Logístico</span></div></div></div></section>
      <Footer />
      {selectedShip && (<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in" onClick={() => setSelectedShip(null)}><div className="glass-modal w-full max-w-4xl rounded-[2rem] overflow-hidden relative flex flex-col max-h-[90vh] shadow-2xl shadow-cyan-900/30 border border-white/10" onClick={(e) => e.stopPropagation()}><div className="relative h-64 shrink-0"><img src={selectedShip.img} className="w-full h-full object-cover" alt={selectedShip.name} /><div className="absolute inset-0 bg-gradient-to-t from-[#0b1221] to-transparent"></div><button onClick={() => setSelectedShip(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/10"><X className="w-4 h-4" /></button><div className="absolute bottom-6 left-8"><span className="text-cyan-400 font-bold tracking-widest text-[10px] uppercase mb-1 block">{selectedShip.type}</span><h2 className="text-4xl font-light text-white">{selectedShip.name}</h2></div></div><div className="flex border-b border-white/10 bg-[#0b1221]/50 backdrop-blur-md">{[{ id: 'info', icon: Info, label: 'Info' }, { id: 'gallery', icon: ImageIcon, label: 'Galería' }, { id: 'video', icon: Video, label: 'Video' }, { id: 'map', icon: MapIcon, label: 'Ubicación' }].map((tab) => (<button key={tab.id} onClick={() => setActiveModalTab(tab.id)} className={`flex-1 py-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${activeModalTab === tab.id ? 'text-cyan-400 border-b-2 border-cyan-400 bg-white/5' : 'text-slate-500 hover:text-white'}`}><tab.icon className="w-4 h-4" /> {tab.label}</button>))}</div><div className="p-8 overflow-y-auto custom-scrollbar bg-[#0b1221] h-full">{activeModalTab === 'info' && (<div className="space-y-8 animate-fade-in"><div><h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2"><Navigation className="w-4 h-4 text-cyan-500" /> Especificaciones</h3><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{Object.entries(selectedShip.specs).map(([k, v]) => (<div key={k} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"><span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">{k}</span><span className="text-white text-sm font-medium">{v}</span></div>))}</div></div></div>)}{activeModalTab === 'gallery' && (<div className="grid grid-cols-2 gap-4 animate-fade-in">{selectedShip.gallery && selectedShip.gallery.map((img, i) => (<div key={i} className="rounded-xl overflow-hidden h-48 border border-white/10"><img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="Galería" /></div>))}</div>)}{activeModalTab === 'video' && (<div className="animate-fade-in">{selectedShip.video ? (<div className="rounded-xl overflow-hidden border border-white/10 aspect-video"><video controls className="w-full h-full object-cover"><source src={selectedShip.video} type="video/mp4" />Tu navegador no soporta videos.</video></div>) : (<div className="flex flex-col items-center justify-center py-20 text-slate-500 bg-white/5 rounded-xl"><Video className="w-12 h-12 mb-4 opacity-50" /><p>Video no disponible para esta embarcación</p></div>)}</div>)}{activeModalTab === 'map' && (<div className="animate-fade-in"><div className="bg-[#0f172a] rounded-xl border border-white/10 p-1 h-64 relative overflow-hidden"><img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" alt="Map" /><div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"><div className="w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center animate-ping absolute"></div><div className="w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4] relative z-10 border-2 border-white"></div></div><div class creativity="absolute bottom-4 left-4 bg-black/80 backdrop-blur px-3 py-2 rounded-lg border border-white/10"><div className="text-[10px] text-slate-400 uppercase mb-1">Última Señal</div><div className="text-cyan-400 font-mono text-sm">{selectedShip.location ? `${selectedShip.location.lat}, ${selectedShip.location.lng}` : 'Señal Privada'}</div></div></div></div>)}</div></div></div>)}
      {selectedPlant && (<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in" onClick={() => setSelectedPlant(null)}><div className="glass-modal w-full max-w-4xl rounded-[2rem] overflow-hidden relative flex flex-col max-h-[90vh] shadow-2xl shadow-cyan-900/30 border border-white/10" onClick={(e) => e.stopPropagation()}><div className="relative h-64 shrink-0"><img src={selectedPlant.img} className="w-full h-full object-cover" alt={selectedPlant.title} /><div className="absolute inset-0 bg-gradient-to-t from-[#0b1221] to-transparent"></div><button onClick={() => setSelectedPlant(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/10"><X className="w-4 h-4" /></button><div className="absolute bottom-6 left-8"><span className="text-cyan-400 font-bold tracking-widest text-[10px] uppercase mb-1 block">{selectedPlant.type}</span><h2 className="text-4xl font-light text-white">{selectedPlant.title}</h2></div></div><div className="flex border-b border-white/10 bg-[#0b1221]/50 backdrop-blur-md">{[{ id: 'info', icon: Info, label: 'Detalles' }, { id: 'gallery', icon: ImageIcon, label: 'Instalaciones' }, { id: 'video', icon: Video, label: 'Proceso' }, { id: 'map', icon: MapIcon, label: 'Mapa' }].map((tab) => (<button key={tab.id} onClick={() => setActiveModalTab(tab.id)} className={`flex-1 py-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${activeModalTab === tab.id ? 'text-cyan-400 border-b-2 border-cyan-400 bg-white/5' : 'text-slate-500 hover:text-white'}`}><tab.icon className="w-4 h-4" /> {tab.label}</button>))}</div><div className="p-8 overflow-y-auto custom-scrollbar bg-[#0b1221] h-full">{activeModalTab === 'info' && (<div className="animate-fade-in"><p className="text-slate-300 text-lg font-light leading-relaxed mb-8">{selectedPlant.desc}</p><div className="grid grid-cols-2 gap-4">{selectedPlant.features.map((feat, i) => (<div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center gap-3"><CheckCircle className="w-5 h-5 text-cyan-500" /><span className="text-white text-sm">{feat}</span></div>))}</div></div>)}{activeModalTab === 'gallery' && (<div className="grid grid-cols-2 gap-4 animate-fade-in">{selectedPlant.gallery.map((img, i) => (<div key={i} className="rounded-xl overflow-hidden h-48 border border-white/10"><img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="Instalación" /></div>))}</div>)}{activeModalTab === 'video' && (<div className="animate-fade-in">{selectedPlant.video ? (<div className="rounded-xl overflow-hidden border border-white/10 aspect-video"><video controls className="w-full h-full object-cover"><source src={selectedPlant.video} type="video/mp4" />Tu navegador no soporta videos.</video></div>) : (<div className="flex flex-col items-center justify-center py-20 text-slate-500 bg-white/5 rounded-xl"><Video className="w-12 h-12 mb-4 opacity-50" /><p>Video no disponible para esta planta</p></div>)}</div>)}{activeModalTab === 'map' && (<div className="animate-fade-in"><div className="bg-[#0f172a] rounded-xl border border-white/10 p-1 h-64 relative overflow-hidden"><img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" alt="Map" /><div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"><Factory className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-bounce" /></div><div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur px-3 py-2 rounded-lg border border-white/10"><div className="text-[10px] text-slate-400 uppercase mb-1">Dirección</div><div className="text-white font-medium text-sm">{selectedPlant.location.address}</div><div className="text-cyan-400 text-xs">{selectedPlant.location.city}</div></div></div></div>)}</div></div></div>)}
      {isContactModalOpen && (<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setIsContactModalOpen(false)}><div className="glass-modal w-full max-w-lg rounded-[2rem] p-8 relative shadow-2xl shadow-cyan-900/20 border border-white/10" onClick={(e) => e.stopPropagation()}><button onClick={() => setIsContactModalOpen(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all"><X className="w-4 h-4" /></button><h2 className="text-3xl font-light text-white mb-2">Hablemos</h2><p className="text-slate-400 text-sm mb-8 leading-relaxed">Completa el formulario para enviarnos un correo o contáctanos directamente por WhatsApp.</p><form className="space-y-4"><div className="space-y-1"><label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Nombre</label><input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-sm" placeholder="Tu nombre" /></div><div className="space-y-1"><label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Email o Teléfono</label><input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-sm" placeholder="tucorreo@ejemplo.com" /></div><div className="space-y-1"><label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Mensaje</label><textarea rows="3" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-sm resize-none" placeholder="¿En qué podemos ayudarte?"></textarea></div><div className="pt-4 flex flex-col gap-3"><button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2 group">Enviar Correo <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></button><div className="relative flex py-2 items-center"><div className="flex-grow border-t border-white/10"></div><span className="flex-shrink-0 mx-4 text-[10px] text-slate-500 uppercase tracking-widest">o contáctanos por</span><div className="flex-grow border-t border-white/10"></div></div><button className="w-full bg-[#25D366] text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl hover:bg-[#20bd5a] hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all flex items-center justify-center gap-2">WhatsApp <Phone className="w-4 h-4" /></button></div></form></div></div>)}
    </div>
  );
};

export default AboutCaboVirgenes;