import './Home.scss'

export function Home() {
  return (
    <>
      {/* Hero Section */}
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

      {/* Features Section */}
      <section className="section features">
        <div className="container">
          <div className="section__header">
            <span className="section__subtitle">Miért minket válasszon?</span>
            <h2 className="section__title">Prémium Kozmetikai Szolgáltatások</h2>
          </div>
          <div className="features__grid">
            <div className="feature-card">
              <div className="feature-card__icon">✨</div>
              <h3 className="feature-card__title">Személyre Szabott</h3>
              <p className="feature-card__text">
                Minden kezelést az Ön egyedi igényeihez igazítunk.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">🌿</div>
              <h3 className="feature-card__title">Természetes Összetevők</h3>
              <p className="feature-card__text">
                Prémium minőségű, természetes alapanyagok használata.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">💆</div>
              <h3 className="feature-card__title">Relaxáció</h3>
              <p className="feature-card__text">
                Nyugodt, kellemes környezet a teljes kikapcsolódásért.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
