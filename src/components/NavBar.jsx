import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Anchor,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

/*
 * Navigation bar component used across the site. It replicates the
 * layout, styling and interactions defined in the provided Cabo Vírgenes
 * homepage. The component manages its own scroll and menu state and
 * exposes a callback to trigger the contact modal in the parent when
 * the "Contacto" button is clicked.
 */

// Static navigation definition. Each item can optionally have a list of
// subitems to render a mega menu. This structure mirrors the original
// data supplied by the user.
/*
 * Navigation definitions. Each item optionally includes a list of
 * subitems with ids used for deep linking. The `id` field on
 * top-level items corresponds to an anchor on the current page.
 * Subitems under "Quienes Somos" include an `id` property which
 * matches the section ids defined on the About page. This allows
 * navigation links to point either to anchors on the home page or
 * to the dedicated about page and its sections.
 */
const NAV_ITEMS = [
  {
    label: 'Quienes Somos',
    id: 'quienes_somos',
    subitems: [
      { title: 'Cabo Vírgenes', desc: 'Nuestra identidad e historia.', id: 'historia' },
      { title: 'Flota', desc: 'Tecnología naval propia.', id: 'flota' },
      { title: 'Plantas', desc: 'Procesamiento en origen.', id: 'plantas' },
      { title: 'Dónde Estamos', desc: 'Sedes globales.', id: 'ubicacion' },
      { title: 'Mercados', desc: 'Presencia internacional.', id: 'mercados' },
    ],
  },
  {
    label: 'Productos',
    id: 'productos',
    subitems: [
      { title: 'Langostino Austral', desc: 'Salvaje y natural.' },
      { title: 'Merluza Argentina', desc: 'Calidad Hubbsi.' },
      { title: 'Calamar Illex', desc: 'Captura potera.' },
      { title: 'Vieira del Pacífico', desc: 'Sabor exclusivo.' },
      { title: 'Pota de Perú', desc: 'Dosidicus Gigas.' },
      { title: 'Langostino Vannamei', desc: 'Acuicultura responsable.' },
      { title: 'Otros', desc: 'Variedad de orígenes.' },
    ],
  },
  { label: 'Calidad', id: 'calidad', subitems: [] },
  { label: 'Prensa', id: 'prensa', subitems: [] },
];

function NavBar({ onContactClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // Track scroll position to shrink the navbar when the user scrolls down.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-500 ${
        isScrolled ? 'top-4 scale-95' : 'top-8'
      }`}
      onMouseLeave={() => setActiveSubmenu(null)}
    >
      <div
        className={`glass-nav rounded-3xl px-6 py-4 transition-all duration-300 relative ${
          isScrolled ? 'bg-[#0f172a]/90' : ''
        }`}
      >
        <div className="flex items-center justify-between gap-8">
          {/* Logo and brand */}
          <div className="flex items-center gap-3">
            <div className="bg-cyan-500/20 p-2 rounded-full">
              <Anchor className="text-cyan-400 w-5 h-5" />
            </div>
            <span className="font-medium tracking-[0.2em] text-sm uppercase text-white/90">
              Cabo Vírgenes
            </span>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-10 text-xs font-medium tracking-widest uppercase text-slate-300">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.id}
                className="relative group py-2"
                onMouseEnter={() =>
                  item.subitems.length > 0
                    ? setActiveSubmenu(item.id)
                    : setActiveSubmenu(null)
                }
              >
                <a
                  href={
                    // If "Quienes Somos", navigate to the dedicated about page.
                    item.id === 'quienes_somos'
                      ? '/quienes-somos.html'
                      : `#${item.id}`
                  }
                  className={`hover:text-white transition-all flex items-center gap-1 ${
                    activeSubmenu === item.id ? 'text-white' : ''
                  }`}
                >
                  {item.label}
                  {item.subitems.length > 0 && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-300 ${
                        activeSubmenu === item.id
                          ? 'rotate-180 text-cyan-400'
                          : ''
                      }`}
                    />
                  )}
                </a>
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-cyan-400 transition-all duration-300 ${
                    activeSubmenu === item.id
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </div>
            ))}
          </div>

          {/* Contact and mobile menu buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={onContactClick}
              className="hidden md:block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-2.5 rounded-full text-xs font-semibold tracking-wide hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Contacto
            </button>
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Submenu panel */}
        <div
          className={`absolute top-full left-0 w-full pt-4 transition-all duration-300 origin-top ${
            activeSubmenu ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
          }`}
        >
          <div className="glass-submenu rounded-2xl p-8 grid grid-cols-12 gap-8">
            <div className="col-span-4 border-r border-white/10 pr-6">
              <h3 className="text-2xl font-light text-white mb-2">
                {NAV_ITEMS.find((i) => i.id === activeSubmenu)?.label}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {activeSubmenu === 'quienes_somos' &&
                  'Tradición pesquera e infraestructura global de primer nivel.'}
                {activeSubmenu === 'productos' &&
                  'Excelencia en mariscos salvajes y procesados del Atlántico Sur.'}
              </p>
              <div className="mt-6 flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-white transition-colors">
                Ver Detalles <ArrowRight className="w-3 h-3" />
              </div>
            </div>
            <div className="col-span-8 grid grid-cols-2 gap-4">
                {NAV_ITEMS.find((i) => i.id === activeSubmenu)?.subitems.map((sub, idx) => (
                <a
                  key={idx}
                  href={
                    // If in Quienes Somos submenu and sub.id exists, link to about page section
                    activeSubmenu === 'quienes_somos' && sub.id
                      ? `/quienes-somos.html#${sub.id}`
                      : '#'
                  }
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-500 group-hover:shadow-[0_0_10px_#06b6d4] transition-all"></div>
                  <div>
                    <div className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                      {sub.title}
                    </div>
                    <div className="text-[10px] text-slate-500">{sub.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;