import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { Zoom } from 'yet-another-react-lightbox/plugins'

const priceListImages = [
  {
    src: '/szalon-arlista1.jpg',
    alt: 'Ár lista 1 - Arckezelések',
    title: 'Arckezelések',
  },
  {
    src: '/szalon-arlista2.jpg',
    alt: 'Ár lista 2 - Testkezelések',
    title: 'Mikrotű, Gyanta, Egyebek',
  },
  {
    src: '/szalon-arlista3.jpg',
    alt: 'Ár lista 3 - Hajkezelések',
    title: 'Műszempilla, Smink, Géllakk',
  },
  {
    src: '/szalon-arlista4.jpg',
    alt: 'Ár lista 4 - További szolgáltatások',
    title: 'Lézeres szőrtelenítés',
  },
]

export function Prices() {
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const lightboxSlides = priceListImages.map((img) => ({
    src: img.src,
    alt: img.alt,
    title: img.title,
  }))

  return (
    <section className="section prices-section">
      <div className="container">
        <div className="section__header">
          <span className="section__subtitle">Árak</span>
          <h1 className="section__title">Árlistáink</h1>
          <p className="section__description">
            Fedezze fel professzionális kozmetikai kezeléseink széles választékát. Kattintson az árlista képekre a nagyításhoz.
          </p>
          <p className="prices__lead">
            Válassza ki a kategóriát, majd nyissa meg a képet, hogy nagyítva, részletesen átnézhesse árainkat.
          </p>
        </div>

        <div className="prices__section">

          <div className="gallery-grid">
            {priceListImages.map((image, index) => (
              <div
                key={index}
                className="gallery-item"
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="gallery-item__image"
                />
                <div className="gallery-item__overlay">
                  <span className="gallery-item__label">{image.title}</span>
                  <span className="gallery-item__icon">🔍</span>
                </div>
              </div>
            ))}
          </div>

          <Lightbox
            open={lightboxIndex >= 0}
            index={lightboxIndex}
            close={() => setLightboxIndex(-1)}
            slides={lightboxSlides}
            plugins={[Zoom]}
          />

          <div className="prices__cta">
            <a className="btn btn-primary" href="/idopontfoglalas">
              Foglalás
            </a>
          </div>
        </div>

        <div className="prices__info">
          <div className="prices__card">
            <h3>💆 Arckezelések</h3>
            <p>Luxus arckezelések a legmodernebb technológiával és prémium termékkekkel.</p>
          </div>
          <div className="prices__card">
            <h3>💅 Testkezelések</h3>
            <p>Teljes testkezelések relaxációhoz és regenerációhoz.</p>
          </div>
          <div className="prices__card">
            <h3>💇 Szőrtelenítés</h3>
            <p>Professzionális szőrtelenítési szolgáltatások a legújabb technológiával.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
