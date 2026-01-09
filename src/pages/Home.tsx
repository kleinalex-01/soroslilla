import './Home.scss'
import { FadeIn } from '../components/FadeIn'

export function Home() {
  return (
    <>
      {/* Hero Section */}
      <FadeIn>
      <section className="hero">
        <video 
          className="hero__video" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/szalon-video.mp4" type="video/mp4" />
        </video>
        <div className="hero__overlay"></div>
        
        <div className="hero__content">
          <div className="hero__logo">
            <img src="/szalon-logo.jpg" alt="Soros Lilla Kozmetika" />
          </div>
        </div>

        <div className="hero__cta">
          <a href="/idopontfoglalas" className="hero__btn">
            <span>Időpontfoglalás</span>
          </a>
          <a href="/arak" className="hero__btn">
            <span>Áraink</span>
          </a>
        </div>
      </section>
      </FadeIn>

      {/* Features Section */}
      <FadeIn delay={0.2}>
      <section className="section features">
        <div className="container">
          <div className="section__header">
            <span className="section__subtitle">Miért minket válasszon?</span>
            <h2 className="section__title">Prémium Kozmetikai Szolgáltatások</h2>
          </div>
          <div className="features__grid">
            {[
              { icon: '✨', title: 'Személyre Szabott', text: 'Minden kezelést az Ön egyedi igényeihez igazítunk.' },
              { icon: '🌿', title: 'Természetes Összetevők', text: 'Prémium minőségű, természetes alapanyagok használata.' },
              { icon: '💆', title: 'Relaxáció', text: 'Nyugodt, kellemes környezet a teljes kikapcsolódásért.' }
            ].map((card, index) => (
              <FadeIn key={index} delay={0.3 + index * 0.1} direction="up">
                <div className="feature-card">
                  <div className="feature-card__icon">{card.icon}</div>
                  <h3 className="feature-card__title">{card.title}</h3>
                  <p className="feature-card__text">{card.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* CTA Navigation Section */}
      <FadeIn delay={0.4}>
      <section className="section cta-nav">
        <div className="container">
          <div className="section__header">
            <span className="section__subtitle">Fedezze fel</span>
            <h2 className="section__title">Tekintse meg kínálatunkat</h2>
            <p className="section__description">
              Ismerje meg szolgáltatásainkat, tekintse meg korábbi munkáinkat és foglaljon időpontot könnyedén.
            </p>
          </div>
          <div className="cta-nav__grid">
            <a href="/arak" className="cta-nav__card">
              <div className="cta-nav__icon">💰</div>
              <h3 className="cta-nav__title">Áraink</h3>
              <p className="cta-nav__text">Tekintse meg szolgáltatásaink árait és kezelési lehetőségeinket.</p>
              <span className="cta-nav__arrow">→</span>
            </a>
            <a href="/galeria" className="cta-nav__card">
              <div className="cta-nav__icon">🖼️</div>
              <h3 className="cta-nav__title">Galéria</h3>
              <p className="cta-nav__text">Inspirálódjon korábbi munkáink képeiből.</p>
              <span className="cta-nav__arrow">→</span>
            </a>
            <a href="/idopontfoglalas" className="cta-nav__card">
              <div className="cta-nav__icon">📅</div>
              <h3 className="cta-nav__title">Időpontfoglalás</h3>
              <p className="cta-nav__text">Foglaljon időpontot online, egyszerűen és gyorsan.</p>
              <span className="cta-nav__arrow">→</span>
            </a>
            <a href="/kapcsolat" className="cta-nav__card">
              <div className="cta-nav__icon">📧</div>
              <h3 className="cta-nav__title">Kapcsolat</h3>
              <p className="cta-nav__text">Vegye fel velünk a kapcsolatot kérdéseivel.</p>
              <span className="cta-nav__arrow">→</span>
            </a>
          </div>
        </div>
      </section>
      </FadeIn>
    </>
  )
}
