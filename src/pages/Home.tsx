import './Home.scss'
import { FadeIn } from '../components/FadeIn'

export function Home() {
  return (
    <>
      {/* Hero Section */}
      <FadeIn>
      <section className="hero">
        <div className="hero__background">
          <div className="hero__overlay"></div>
        </div>
        <div className="container hero__container">
          <div className="hero__content">
            <span className="hero__subtitle">Üdvözöljük</span>
            <h1 className="hero__title">
              Szépség és<br />
              <span className="hero__title-accent">Harmónia</span>
            </h1>
            <p className="hero__description">
              Professzionális kozmetikai kezelések a szép és egészséges bőrért. 
              Személyre szabott megoldások minden bőrtípusra.
            </p>
            <div className="hero__actions">
              <a href="/idopontfoglalas" className="btn btn--primary btn--lg">
                Időpontfoglalás
              </a>
              <a href="/szolgaltatasok" className="btn btn--secondary btn--lg">
                Szolgáltatások
              </a>
            </div>
          </div>
        </div>
        <div className="hero__scroll">
          <span>Görgess le</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
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
    </>
  )
}
