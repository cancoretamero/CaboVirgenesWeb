import React, { useMemo, useState } from 'react';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import WorldMap from './components/WorldMap.jsx';
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
  Navigation,
  Image as ImageIcon,
  Video,
  Map as MapIcon,
  Info,
  X,
  ZoomIn,
  ZoomOut,
  Fish,
  ShoppingBag
} from 'lucide-react';

/*
 * AboutCaboVirgenes
 * Página principal de "Quiénes Somos".
 * Integra historia, flota, plantas y mapa interactivo global.
 */

const AboutCaboVirgenes = () => {
  // --- Estados de la UI ---
  const [selectedShip, setSelectedShip] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState('info');
  
  // --- Estados del Mapa ---
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [mapState, setMapState] = useState({ center: [0, 20], zoom: 1 });
  const [selectedCountryInfo, setSelectedCountryInfo] = useState(null);

  // --- Datos de Mercado Interactivos (Info para el Widget) ---
  const MARKET_DATA = {
    'Spain': { products: ['Langostino Austral', 'Merluza', 'Gambón'], volume: 'Hub Principal', type: 'Mercado Doméstico' },
    'Argentina': { products: ['Origen', 'Procesado'], volume: 'Origen', type: 'Producción' },
    'United States of America': { products: ['Colas de Langostino', 'Valor Añadido'], volume: 'Alto Volumen', type: 'Exportación' },
    'China': { products: ['Langostino Entero L1/L2'], volume: 'Gran Escala', type: 'Exportación' },
    'Italy': { products: ['Langostino', 'Merluza'], volume: 'Premium', type: 'Exportación' },
    'France': { products: ['Langostino Cocido', 'Fresco'], volume: 'Estable', type: 'Exportación' },
    'Japan': { products: ['Langostino Sashimi Quality'], volume: 'Premium', type: 'Exportación' },
    'South Africa': { products: ['Langostino Entero'], volume: 'Emergente', type: 'Distribución' },
    'Australia': { products: ['Valor Añadido'], volume: 'Nicho', type: 'Exportación' },
    // Configuración por defecto para países sin datos específicos
    'default': { products: ['Langostino Congelado'], volume: 'Emergente', type: 'Distribución Global' }
  };

  const HUBS = {
    SPAIN: [-4.53, 42.01],
    ARGENTINA: [-65.10, -43.30]
  };

  // Calcula las líneas de conexión dinámicamente desde el hub más cercano
  const mapLines = useMemo(() => {
    if (!selectedCountryInfo) return [];
    // Si la longitud es menor a -30 (América), conecta con Argentina, si no con España
    const targetLon = selectedCountryInfo.coords[0];
    const source = targetLon < -30 ? HUBS.ARGENTINA : HUBS.SPAIN;
    return [{ from: source, to: selectedCountryInfo.coords }];
  }, [selectedCountryInfo]);

  // Maneja el clic en un país: hace zoom y muestra el widget
  const handleCountryClick = (name, centroid) => {
    // Ajusta el zoom y centra el mapa en el país clicado
    setMapState({ center: centroid, zoom: 4 });
    
    // Obtiene datos del país o usa los por defecto
    const data = MARKET_DATA[name] || MARKET_DATA['default'];
    setSelectedCountryInfo({
      name,
      coords: centroid,
      ...data
    });
  };

  // Maneja los botones de filtro de región
  const handleRegionChange = (region) => {
    const views = {
      'global': { center: [0, 20], zoom: 1 },
      'nam': { center: [-100, 40], zoom: 2.5 },
      'eur': { center: [15, 50], zoom: 3.5 },
      'asia': { center: [90, 35], zoom: 2.5 },
      'afr': { center: [20, 0], zoom: 2.5 },
      'oce': { center: [135, -25], zoom: 3 }
    };
    const view = views[region] || views['global'];
    setMapState(view);
    setSelectedCountryInfo(null); // Oculta el widget al cambiar de vista
  };

  // --- Datos Estáticos (Historia, Flota, Plantas) ---
  const HISTORY_DATA = [
    { year: 'Origen', title: 'La Unión de Experiencia', text: 'Cabo Vírgenes surge de la unión de más de 48 años de experiencia y conocimientos del sector de los actuales gerentes, Pedro Mielgo en España, y Eduardo del Rio en Argentina.' },
    { year: '2008', title: 'Nace la Alianza', text: 'Se estableció dicha alianza Hispano/Argentina y se comienza a operar desde Argentina con dos barcos fresqueros: el Cabo Vírgenes y el Nueva Esperanza.' },
    { year: '2012', title: 'Expansión Internacional', text: 'El 18 de enero del 2012, se establece en Palencia (España), Cabo Vírgenes España, S.L, que se convierte en el perfecto aliado de Argentina.' },
    { year: '2016', title: 'Flota Tangonera', text: 'Argentina comienza a operar con dos barcos tangoneros congeladores: Mar de Oro y Anita Álvarez con una capacidad de pesca de 1400 toneladas.' },
    { year: '2017', title: 'Valor Añadido', text: 'España construye la planta de reprocesado en Palencia, complementando la producción con líneas de Skin y Doy Pack.' },
    { year: '2019', title: 'Innovación Naval', text: 'Botadura del Luca Santino, primer barco fresquero de la flota argentina con hielo líquido. Comienza a operar el potero Orión 2.' },
    { year: '2020', title: 'Nuevos Horizontes', text: 'Argentina incorpora una planta en Comodoro Rivadavia y el buque Perla Negra. Comienza a operar el Espartano.' },
    { year: '2022', title: 'El Gigante Atón', text: 'Se produce la botadura del Atón. Se amplía la planta de Palencia y se construye un nuevo Frigorífico.' },
    { year: 'Futuro', title: 'Expansión Continua', text: 'El negocio está en plena expansión. Capacidad de producción diaria >120 toneladas.' }
  ];

  const FLOTA_FRESQUERA = [
    {
      id: 'f1', name: 'Cabo Vírgenes', type: 'Fresquero Costero',
      img: 'https://images.unsplash.com/photo-1544256277-c956403239a5?auto=format&fit=crop&w=800',
      specs: { eslora: '28 m', manga: '7 m', bodega: 'Fresca', motor: '1200 HP' },
      video: 'https://media.istockphoto.com/id/1169273299/video/fishing-boat-sailing-in-the-atlantic-ocean.mp4?s=mp4-640x640-is&k=20&c=L_qJOV9J9ZtZ7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z',
      location: { lat: '-43.300', lng: '-65.102', label: 'Puerto Rawson' }
    },
    {
      id: 'f2', name: 'Nueva Esperanza', type: 'Fresquero Costero',
      img: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=800',
      specs: { eslora: '26 m', manga: '6.5 m', bodega: 'Fresca', motor: '1100 HP' },
      location: { lat: '-43.350', lng: '-65.050', label: 'Zona Pesca' }
    },
    {
      id: 'f3', name: 'Luca Santino', type: 'Fresquero Hielo Líquido',
      img: 'https://images.unsplash.com/photo-1612686635542-2244f734544e?auto=format&fit=crop&w=800',
      specs: { eslora: '32 m', manga: '8 m', sistema: 'Hielo Líquido', motor: '1500 HP' },
      location: { lat: '-43.300', lng: '-65.102', label: 'Puerto Rawson' }
    },
    {
      id: 'f4', name: 'Espartano', type: 'Proa Invertida',
      img: 'https://images.unsplash.com/photo-1559798402-9ae19f032232?auto=format&fit=crop&w=800',
      specs: { diseño: 'Astillero Cortessi', innovacion: 'Estabilidad', tipo: 'Polivalente', eslora: '29 m' },
      location: { lat: '-43.400', lng: '-65.000', label: 'Zona Pesca' }
    }
  ];

  const FLOTA_CONGELADORA = [
    {
      id: 'c1', name: 'Atón', type: 'Tangonero Moderno',
      img: 'https://images.unsplash.com/photo-1516216628859-9bccecab13ca?auto=format&fit=crop&w=800',
      specs: { año: '2022', puerto: 'Madryn', eslora: '42.5 m', capacidad: '180 Ton' },
      location: { lat: '-42.700', lng: '-60.500', label: 'Alta Mar' }
    },
    {
      id: 'c2', name: 'Mar de Oro', type: 'Tangonero Congelador',
      img: 'https://images.unsplash.com/photo-1589191995092-668887805631?auto=format&fit=crop&w=800',
      specs: { capacidad: '1400 Ton', puerto: 'Madryn', tipo: 'Congelador', eslora: '40 m' },
      location: { lat: '-42.500', lng: '-61.000', label: 'Alta Mar' }
    },
    {
      id: 'c3', name: 'Anita Álvarez', type: 'Tangonero Congelador',
      img: 'https://images.unsplash.com/photo-1552825716-2795fa5ab941?auto=format&fit=crop&w=800',
      specs: { capacidad: '1400 Ton', puerto: 'Madryn', tipo: 'Congelador', eslora: '41 m' },
      location: { lat: '-42.000', lng: '-60.000', label: 'Alta Mar' }
    },
    {
      id: 'c4', name: 'Orión 2', type: 'Potero',
      img: 'https://images.unsplash.com/photo-1502126233261-39578ae1f544?auto=format&fit=crop&w=800',
      specs: { especie: 'Calamar Illex', sistema: 'Potera', luces: 'LED', eslora: '45 m' },
      location: { lat: '-44.000', lng: '-62.000', label: 'Alta Mar' }
    }
  ];

  const PLANTS_DATA = [
    {
      id: 'p1', title: 'Puerto Rawson', type: 'Procesado Fresco',
      desc: 'Ubicada a solo 400 metros del puerto, asegurando una llegada inmediata del producto. Equipada con tecnología punta, fábricas de hielo en escama y líquido.',
      img: 'https://images.unsplash.com/photo-1533235652514-c36399182390?auto=format&fit=crop&w=800',
      features: ['Recepción Inmediata', 'Clasificación Automática', 'Túneles de Congelación', 'Sala de Envasado'],
      gallery: ['https://images.unsplash.com/photo-1628186743158-73236e81031d?auto=format&fit=crop&w=800', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800'],
      location: { address: 'Av. M. González y S.J.C. Marsengo (9103)', city: 'Puerto Rawson, Argentina' }
    },
    {
      id: 'p2', title: 'Palencia (España)', type: 'Reprocesado & Logística',
      desc: 'Centro logístico europeo con 4.600 m². Capacidad de producción de 8.000 toneladas y almacenamiento de 5.500 ton (-27ºC). Especialistas en valor añadido.',
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800',
      features: ['Máquinas de reproceso', 'Sistema de cocción', 'Túnel continuo IQF', 'Líneas Skin y Doy Pack'],
      gallery: ['https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800'],
      location: { address: 'Calle Torneros 18, Polígono San Antolín', city: 'Palencia, España' }
    },
    {
      id: 'p3', title: 'Comodoro Rivadavia', type: 'Merluza & Langostino',
      desc: 'Planta especializada en procesado y reprocesado. Ampliación estratégica para la línea de Merluza Argentina, mejorando la competitividad y oferta global.',
      img: 'https://images.unsplash.com/photo-1598514930190-3cb83e449265?auto=format&fit=crop&w=800',
      features: ['Procesado de Merluza', 'Congelación Rápida', 'Línea de Fileteado'],
      gallery: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800'],
      location: { address: 'Las Toninas 636', city: 'Comodoro Rivadavia, Argentina' }
    }
  ];

  // Lista de países para la nube de etiquetas
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

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-['Poppins'] selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      {/* --- ESTILOS GLOBALES --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        
        .glass-panel { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.05); }
        .glass-modal { background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(40px); border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
        .glass-apple { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.2); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3); }
        
        /* Animación para el widget */
        @keyframes float-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-float-up { animation: float-up 0.5s ease-out forwards; }
        
        .scrollbar-hide::-webkit-scrollbar { display: none; }

        /* Forzar transparencia del NavBar */
        .glass-nav {
          background-color: rgba(255, 255, 255, 0.25) !important;
          backdrop-filter: blur(4px) saturate(180%);
        }
      `}</style>
      
      {/* NavBar: Posición absoluta para overlay transparente */}
      <div className="absolute top-0 w-full z-50">
        <NavBar onContactClick={() => setIsContactModalOpen(true)} />
      </div>
      
      {/* --- HEADER --- */}
      <div className="relative pt-48 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div className="container mx-auto relative z-10 text-center">
          <span className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase mb-6 inline-block px-4 py-2 rounded-full bg-cyan-900/10 border border-cyan-500/20">Sobre Nosotros</span>
          <h1 className="text-5xl md:text-7xl font-light text-white mb-8">Nuestra Historia<br/><span className="font-serif italic text-slate-400">y Legado</span></h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg font-light leading-relaxed">Una alianza Hispano/Argentina forjada a través de décadas de experiencia, dedicada a la excelencia en la captura y elaboración de productos del mar salvajes.</p>
        </div>
      </div>

      {/* --- HISTORIA --- */}
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

      {/* Separador de Ola */}
      <div className="relative w-full -mb-1 z-10 pointer-events-none bg-[#0a1120]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block fill-[#0f172a]"><path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
      </div>

      {/* --- FLOTA --- */}
      <section id="flota" className="py-24 bg-[#0f172a] relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Nuestra Flota</span>
            <h2 className="text-4xl font-light text-white mb-6">Operativa en FAO 41</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Contamos con una flota propia que cumple con la más estricta reglamentación internacional.</p>
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
                <div key={ship.id} onClick={() => setSelectedShip(ship)} className="min-w-[300px] md:min-w-[350px] glass-panel rounded-[2rem] overflow-hidden cursor-pointer hover:border-cyan-500/50 transition-all group snap-center relative">
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
                <div key={ship.id} onClick={() => setSelectedShip(ship)} className="min-w-[300px] md:min-w-[350px] glass-panel rounded-[2rem] overflow-hidden cursor-pointer hover:border-cyan-500/50 transition-all group snap-center relative">
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

      <div className="relative w-full -mt-1 z-10 pointer-events-none bg-slate-50"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block fill-[#0a1120]"><path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg></div>

      {/* --- PLANTAS --- */}
      <section id="plantas" className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16"><span className="text-cyan-600 font-bold tracking-[0.2em] text-xs uppercase mb-4 inline-block px-4 py-2 rounded-full bg-cyan-50 border border-cyan-200">Infraestructura</span><h2 className="text-4xl md:text-5xl font-light text-[#0f172a] mb-6">Nuestras Plantas</h2><p className="text-slate-600 font-light max-w-2xl mx-auto text-lg">Tecnología de punta en origen y destino.</p></div>
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

      <div className="relative w-full -mt-1 z-10 pointer-events-none bg-slate-50"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block fill-[#0a1120]"><path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg></div>

      {/* --- UBICACIÓN --- */}
      <section id="ubicacion" className="py-24 bg-[#0a1120] relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-light text-white mb-16 text-center">Dónde Estamos</h2>
          <div className="grid md:grid-cols-2 gap-16"><div className="glass-panel p-10 rounded-[3rem] border border-white/10 hover:border-cyan-500/30 transition-all"><div className="flex items-center gap-4 mb-8"><span className="text-6xl">🇪🇸</span><div><h3 className="text-3xl font-bold text-white">España</h3><p className="text-cyan-400 text-sm uppercase tracking-widest">Hub Logístico & Distribución</p></div></div><div className="space-y-8"><div><h4 className="text-white font-bold mb-2 flex items-center gap-2"><MapPin className="w-4 h-4 text-cyan-500" /> Palencia (HQ)</h4><p className="text-slate-400 text-sm ml-6">Calle Torneros 18, Polígono San Antolín<br/>34004 – Palencia</p><p className="text-slate-400 text-sm ml-6 mt-1">+34 979 181 438 | info@cabovirgenes.es</p></div><div><h4 className="text-white font-bold mb-2 flex items-center gap-2"><Anchor className="w-4 h-4 text-cyan-500" /> Puerto de Vigo</h4><p className="text-slate-400 text-sm ml-6">Frigoríficos de Vigo<br/>Puerto Pesquero de Berbés, Dársena 4</p></div><div><h4 className="text-white font-bold mb-2 flex items-center gap-2"><Anchor className="w-4 h-4 text-cyan-500" /> Canarias</h4><p className="text-slate-400 text-sm ml-6">FRIGORIFICO DECOEXA<br/>Muelle pesquero, 38008 Puerto de Las Palmas</p></div></div></div><div className="glass-panel p-10 rounded-[3rem] border border-white/10 hover:border-cyan-500/30 transition-all"><div className="flex items-center gap-4 mb-8"><span className="text-6xl">🇦🇷</span><div><h3 className="text-3xl font-bold text-white">Argentina</h3><p className="text-cyan-400 text-sm uppercase tracking-widest">Origen & Procesamiento</p></div></div><div className="space-y-8"><div><h4 className="text-white font-bold mb-2 flex items-center gap-2"><Factory className="w-4 h-4 text-cyan-500" /> Puerto Rawson</h4><p className="text-slate-400 text-sm ml-6">Av. M. González y S.J.C. Marsengo (9103)<br/>Chubut, Argentina</p><p className="text-slate-400 text-sm ml-6 mt-1">Planta de 35.000 m²</p></div><div><h4 className="text-white font-bold mb-2 flex items-center gap-2"><Factory className="w-4 h-4 text-cyan-500" /> Comodoro Rivadavia</h4><p className="text-slate-400 text-sm ml-6">Las Toninas 636<br/>Chubut, Argentina</p></div></div></div></div>
        </div>
      </section>

      {/* --- MERCADOS (MAPA INTERACTIVO) --- */}
      <section id="mercados" className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 block">Red Operativa Global</span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">Conectando con el Mundo</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">Estructura global integrada. Seleccione una región para explorar nuestras conexiones.</p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['Global','América','Europa','Asia','África','Oceanía'].map((region) => {
                const value = region === 'Global' ? 'global' : region === 'América' ? 'nam' : region.slice(0,3).toLowerCase();
                return (
                  <button
                    key={region}
                    onClick={() => handleRegionChange(value)}
                    className="px-6 py-2 rounded-full glass-apple text-xs font-bold uppercase hover:bg-white/20 transition-all text-white"
                  >
                    {region}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="glass-apple rounded-[3rem] p-4 relative shadow-2xl border border-white/10 bg-[#080808] aspect-[16/9] md:aspect-[21/9] overflow-hidden">
             <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-[#080808]">
                {/* --- COMPONENTE DE MAPA --- */}
                <WorldMap 
                  center={mapState.center}
                  zoom={mapState.zoom}
                  onCountryClick={handleCountryClick}
                  hoveredCountry={hoveredCountry}
                  onHoverCountry={setHoveredCountry}
                  activeCountry={selectedCountryInfo?.name}
                  lines={mapLines}
                />

                {/* --- WIDGET LIQUID GLASS (Info del país) --- */}
                {selectedCountryInfo && (
                  <div className="absolute bottom-8 left-8 z-50 animate-float-up max-w-sm w-full">
                    <div className="glass-modal rounded-3xl p-6 border border-white/20 backdrop-blur-xl bg-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white">{selectedCountryInfo.name}</h3>
                          <span className="text-cyan-400 text-xs uppercase tracking-widest">{selectedCountryInfo.type}</span>
                        </div>
                        <button onClick={() => { setSelectedCountryInfo(null); setMapState({center:[0,20], zoom:1}); }} className="p-1 hover:bg-white/20 rounded-full text-white transition"><X className="w-4 h-4"/></button>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-white/5">
                          <Fish className="w-5 h-5 text-cyan-400" />
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Productos</p>
                            <p className="text-sm text-white font-medium">{selectedCountryInfo.products.join(', ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-white/5">
                          <ShoppingBag className="w-5 h-5 text-purple-400" />
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Volumen</p>
                            <p className="text-sm text-white font-medium">{selectedCountryInfo.volume}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Controles de Zoom */}
                <div className="absolute top-8 right-8 flex flex-col gap-2">
                  <button onClick={() => setMapState(prev => ({ ...prev, zoom: prev.zoom * 1.2 }))} className="w-10 h-10 rounded-full glass-apple flex items-center justify-center text-white hover:bg-white/20 transition-all"><ZoomIn className="w-4 h-4" /></button>
                  <button onClick={() => setMapState(prev => ({ ...prev, zoom: prev.zoom / 1.2 }))} className="w-10 h-10 rounded-full glass-apple flex items-center justify-center text-white hover:bg-white/20 transition-all"><ZoomOut className="w-4 h-4" /></button>
                </div>
             </div>
          </div>

          {/* Lista de países clicables */}
          <div className="mt-12 flex flex-wrap justify-center gap-3 max-w-6xl mx-auto">
            {COUNTRIES_LIST.map((country, i) => (
              <span
                key={i}
                // Fallback para click en texto (aunque idealmente se usa el mapa)
                onClick={() => {
                   /* Nota: El clic en texto requeriría coordenadas hardcodeadas para todos. 
                      El clic en mapa es la vía principal. */
                }}
                onMouseEnter={() => setHoveredCountry(country)}
                onMouseLeave={() => setHoveredCountry(null)}
                className={`px-4 py-2 rounded-full border text-xs font-medium cursor-pointer transition-all duration-300 ${
                  hoveredCountry === country || selectedCountryInfo?.name === country
                    ? 'bg-cyan-500 border-cyan-400 text-[#0f172a] scale-110 shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/30'
                }`}
              >
                {country}
              </span>
            ))}
          </div>

          <div className="flex justify-center gap-6 mt-12 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22D3EE]"></span>
              <span className="text-xs text-gray-400 uppercase tracking-widest">Pesca / Origen</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-0.5 bg-cyan-400/50 shadow-[0_0_10px_#22D3EE]"></span>
              <span className="text-xs text-gray-400 uppercase tracking-widest">Rutas de Exportación</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* --- MODAL FLOTA --- */}
      {selectedShip && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in" onClick={() => setSelectedShip(null)}>
          <div className="glass-modal w-full max-w-4xl rounded-[2rem] overflow-hidden relative flex flex-col max-h-[90vh] shadow-2xl shadow-cyan-900/30 border border-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-64 shrink-0">
              <img src={selectedShip.img} className="w-full h-full object-cover" alt={selectedShip.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1221] to-transparent"></div>
              <button onClick={() => setSelectedShip(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/10"><X className="w-4 h-4" /></button>
              <div className="absolute bottom-6 left-8"><span className="text-cyan-400 font-bold tracking-widest text-[10px] uppercase mb-1 block">{selectedShip.type}</span><h2 className="text-4xl font-light text-white">{selectedShip.name}</h2></div>
            </div>
            <div className="flex border-b border-white/10 bg-[#0b1221]/50 backdrop-blur-md">
              {[{ id: 'info', icon: Info, label: 'Info' }, { id: 'gallery', icon: ImageIcon, label: 'Galería' }, { id: 'video', icon: Video, label: 'Video' }, { id: 'map', icon: MapIcon, label: 'Ubicación' }].map((tab) => (
                <button key={tab.id} onClick={() => setActiveModalTab(tab.id)} className={`flex-1 py-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${activeModalTab === tab.id ? 'text-cyan-400 border-b-2 border-cyan-400 bg-white/5' : 'text-slate-500 hover:text-white'}`}><tab.icon className="w-4 h-4" /> {tab.label}</button>
              ))}
            </div>
            <div className="p-8 overflow-y-auto custom-scrollbar bg-[#0b1221] h-full">
              {activeModalTab === 'info' && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2"><Navigation className="w-4 h-4 text-cyan-500" /> Especificaciones</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(selectedShip.specs).map(([k, v]) => (
                        <div key={k} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">{k}</span>
                          <span className="text-white text-sm font-medium">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeModalTab === 'gallery' && (
                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                  {selectedShip.gallery && selectedShip.gallery.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden h-48 border border-white/10">
                      <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="Galería" />
                    </div>
                  ))}
                </div>
              )}
              {activeModalTab === 'video' && (
                <div className="animate-fade-in">
                  {selectedShip.video ? (
                    <div className="rounded-xl overflow-hidden border border-white/10 aspect-video">
                      <video controls className="w-full h-full object-cover">
                        <source src={selectedShip.video} type="video/mp4" />
                        Tu navegador no soporta videos.
                      </video>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-500 bg-white/5 rounded-xl">
                      <Video className="w-12 h-12 mb-4 opacity-50" />
                      <p>Video no disponible para esta embarcación</p>
                    </div>
                  )}
                </div>
              )}
              {activeModalTab === 'map' && (
                <div className="animate-fade-in">
                  <div className="bg-[#0f172a] rounded-xl border border-white/10 p-1 h-64 relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" alt="Map" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center animate-ping absolute"></div>
                      <div className="w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4] relative z-10 border-2 border-white"></div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur px-3 py-2 rounded-lg border border-white/10">
                      <div className="text-[10px] text-slate-400 uppercase mb-1">Última Señal</div>
                      <div className="text-cyan-400 font-mono text-sm">{selectedShip.location ? `${selectedShip.location.lat}, ${selectedShip.location.lng}` : 'Señal Privada'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL PLANTAS --- */}
      {selectedPlant && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in" onClick={() => setSelectedPlant(null)}>
          <div className="glass-modal w-full max-w-4xl rounded-[2rem] overflow-hidden relative flex flex-col max-h-[90vh] shadow-2xl shadow-cyan-900/30 border border-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-64 shrink-0">
              <img src={selectedPlant.img} className="w-full h-full object-cover" alt={selectedPlant.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1221] to-transparent"></div>
              <button onClick={() => setSelectedPlant(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/10"><X className="w-4 h-4" /></button>
              <div className="absolute bottom-6 left-8"><span className="text-cyan-400 font-bold tracking-widest text-[10px] uppercase mb-1 block">{selectedPlant.type}</span><h2 className="text-4xl font-light text-white">{selectedPlant.title}</h2></div>
            </div>
            <div className="flex border-b border-white/10 bg-[#0b1221]/50 backdrop-blur-md">
              {[{ id: 'info', icon: Info, label: 'Detalles' }, { id: 'gallery', icon: ImageIcon, label: 'Instalaciones' }, { id: 'video', icon: Video, label: 'Proceso' }, { id: 'map', icon: MapIcon, label: 'Mapa' }].map((tab) => (
                <button key={tab.id} onClick={() => setActiveModalTab(tab.id)} className={`flex-1 py-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${activeModalTab === tab.id ? 'text-cyan-400 border-b-2 border-cyan-400 bg-white/5' : 'text-slate-500 hover:text-white'}`}><tab.icon className="w-4 h-4" /> {tab.label}</button>
              ))}
            </div>
            <div className="p-8 overflow-y-auto custom-scrollbar bg-[#0b1221] h-full">
              {activeModalTab === 'info' && (
                <div className="animate-fade-in">
                  <p className="text-slate-300 text-lg font-light leading-relaxed mb-8">{selectedPlant.desc}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedPlant.features.map((feat, i) => (
                      <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-cyan-500" />
                        <span className="text-white text-sm">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeModalTab === 'gallery' && (
                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                  {selectedPlant.gallery.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden h-48 border border-white/10">
                      <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="Instalación" />
                    </div>
                  ))}
                </div>
              )}
              {activeModalTab === 'video' && (
                <div className="animate-fade-in">
                  {selectedPlant.video ? (
                    <div className="rounded-xl overflow-hidden border border-white/10 aspect-video">
                      <video controls className="w-full h-full object-cover">
                        <source src={selectedPlant.video} type="video/mp4" />
                        Tu navegador no soporta videos.
                      </video>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-500 bg-white/5 rounded-xl">
                      <Video className="w-12 h-12 mb-4 opacity-50" />
                      <p>Video no disponible para esta planta</p>
                    </div>
                  )}
                </div>
              )}
              {activeModalTab === 'map' && (
                <div className="animate-fade-in">
                  <div className="bg-[#0f172a] rounded-xl border border-white/10 p-1 h-64 relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" alt="Map" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <Factory className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-bounce" />
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur px-3 py-2 rounded-lg border border-white/10">
                      <div className="text-[10px] text-slate-400 uppercase mb-1">Dirección</div>
                      <div className="text-white font-medium text-sm">{selectedPlant.location.address}</div>
                      <div className="text-cyan-400 text-xs">{selectedPlant.location.city}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL CONTACTO --- */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setIsContactModalOpen(false)}>
          <div className="glass-modal w-full max-w-lg rounded-[2rem] p-8 relative shadow-2xl shadow-cyan-900/20 border border-white/10" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsContactModalOpen(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all"><X className="w-4 h-4" /></button>
            <h2 className="text-3xl font-light text-white mb-2">Hablemos</h2>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">Completa el formulario para enviarnos un correo o contáctanos directamente por WhatsApp.</p>
            <form className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Nombre</label>
                <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-sm" placeholder="Tu nombre" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Email o Teléfono</label>
                <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-sm" placeholder="tucorreo@ejemplo.com" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Mensaje</label>
                <textarea rows="3" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-all text-sm resize-none" placeholder="¿En qué podemos ayudarte?"></textarea>
              </div>
              <div className="pt-4 flex flex-col gap-3">
                <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2 group">Enviar Correo <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></button>
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink-0 mx-4 text-[10px] text-slate-500 uppercase tracking-widest">o contáctanos por</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>
                <button className="w-full bg-[#25D366] text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl hover:bg-[#20bd5a] hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all flex items-center justify-center gap-2">WhatsApp <Phone className="w-4 h-4" /></button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutCaboVirgenes;
