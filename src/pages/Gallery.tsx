import { FadeIn } from '../components/FadeIn'
import { ImageGallery } from '../components/ImageGallery'

const galleryImages = [
  {
    src: '/gallery/genoled-1.png',
    alt: 'Genoled kezelés 1',
    title: 'Genoled kezelés',
  },
  {
    src: '/gallery/genoled-2.png',
    alt: 'Genoled kezelés 2',
    title: 'Genoled kezelés',
  },
  {
    src: '/gallery/genoled-3.png',
    alt: 'Genoled kezelés 3',
    title: 'Genoled kezelés',
  },
  {
    src: '/gallery/microneedle-1.png',
    alt: 'Microneedle kezelés 1',
    title: 'Microneedle kezelés',
  },
  {
    src: '/gallery/microneedle-2.png',
    alt: 'Microneedle kezelés 2',
    title: 'Microneedle kezelés',
  },
  {
    src: '/gallery/microneedle-3.png',
    alt: 'Microneedle kezelés 3',
    title: 'Microneedle kezelés',
  },
  {
    src: '/gallery/steaming-1.png',
    alt: 'Gőzölés kezelés 1',
    title: 'Gőzölés kezelés',
  },
  {
    src: '/gallery/steaming-2.png',
    alt: 'Gőzölés kezelés 2',
    title: 'Gőzölés kezelés',
  },
  {
    src: '/gallery/steaming-3.png',
    alt: 'Gőzölés kezelés 3',
    title: 'Gőzölés kezelés',
  },
  {
    src: '/gallery/ultrasound-1.png',
    alt: 'Ultrahangos kezelés 1',
    title: 'Ultrahangos kezelés',
  },
  {
    src: '/gallery/ultrasound-2.png',
    alt: 'Ultrahangos kezelés 2',
    title: 'Ultrahangos kezelés',
  },
  {
    src: '/gallery/ultrasound-3.png',
    alt: 'Ultrahangos kezelés 3',
    title: 'Ultrahangos kezelés',
    transform: 'rotate(180deg)',
  },
]

export function Gallery() {
  return (
    <FadeIn>
      <section className="section">
        <div className="container">
          <div className="section__header">
            <span className="section__subtitle">Munkáim</span>
            <h1 className="section__title">Galéria</h1>
            <p className="section__description">
              Inspirálódjon a korábbi munkáimból. A képekre kattintva teljes
              méretben, nagyítható nézetben is megtekinthetők.
            </p>
          </div>

          <ImageGallery images={galleryImages} columns={4} />
        </div>
      </section>
    </FadeIn>
  )
}
