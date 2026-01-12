import React from 'react';
import {
  Anchor,
  Instagram,
  Linkedin,
  Facebook,
  Mail,
  Phone,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';

/*
 * Footer component extracted from the provided Cabo Vírgenes home page. It
 * preserves the original layout, styling and content, including the
 * newsletter widget and contact details. Icons from lucide‑react are
 * imported at the top. No interactive state is required here; forms do
 * not currently submit anywhere.
 */
function Footer() {
  return (
    <footer className="relative bg-[#050b14] pt-24 pb-12 border-t border-white/5 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* SECCIÓN SUPERIOR: HABLEMOS (CONTACTO) */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24 items-start" id="contacto">
          {/* Info Column */}
          <div className="space-y-12">
            <div>
              <span className="text-cyan-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                Contacto
              </span>
              <h2 className="text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
                Empecemos una <br />{' '}
                <span className="font-serif italic text-slate-400">conversación.</span>
              </h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed max-w-md">
                Desde consultas comerciales hasta oportunidades de colaboración. Nuestro equipo global está listo para escucharte.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Comercial</div>
                  <div className="text-white text-lg group-hover:text-cyan-400 transition-colors">
                    sales@cabovirgenes.es
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Oficina Central</div>
                  <div className="text-white text-lg group-hover:text-cyan-400 transition-colors">+34 979 718 134</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#050b14]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-[#050b14]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    placeholder="tucorreo@empresa.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Mensaje</label>
                <textarea
                  rows="4"
                  className="w-full bg-[#050b14]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                ></textarea>
              </div>
              <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold uppercase tracking-widest text-xs py-4 rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 group">
                Enviar Mensaje{' '}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* SEPARATOR */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16"></div>

        {/* SECCIÓN INFERIOR: LINKS & BRAND */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-cyan-900/20 p-2.5 rounded-full border border-cyan-500/20">
                <Anchor className="text-cyan-400 w-6 h-6" />
              </div>
              <span className="font-bold tracking-[0.2em] text-lg uppercase text-white">
                Cabo Vírgenes
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Líderes globales en la captura, procesamiento y comercialización de productos del mar de calidad premium.
            </p>
            <div className="flex gap-4">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links 1 - ACTUALIZADOS PARA COINCIDIR CON EL NAV BAR + EMPLEO */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Navegación</h4>
            <ul className="space-y-4">
              {['Quienes Somos', 'Productos', 'Calidad', 'Prensa', 'Empleo'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4">
              {['Aviso Legal', 'Política de Privacidad', 'Política de Cookies', 'Canal Ético'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Widget */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-slate-500 text-sm mb-4">
              Suscríbete para recibir novedades de la industria.
            </p>
            <div className="flex bg-white/5 rounded-lg border border-white/10 p-1">
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent text-white px-3 py-2 text-sm w-full focus:outline-none placeholder:text-slate-600"
              />
              <button className="bg-cyan-500 text-black rounded p-2 hover:bg-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <p className="text-slate-600 text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} Cabo Vírgenes S.R.L. | Todos los derechos reservados.
          </p>
          <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Mock logos for certs */}
            <div className="h-6 w-12 bg-white/10 rounded"></div>
            <div className="h-6 w-12 bg-white/10 rounded"></div>
            <div className="h-6 w-12 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
