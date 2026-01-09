import { useState } from 'react'
import './ImageGallery.scss'

interface ImageGalleryProps {
  images: Array<{
    src: string
    alt: string
    title?: string
    transform?: string
  }>
  columns?: number
}

interface ModalImageState {
  isOpen: boolean
  currentIndex: number
  zoom: number
}

export function ImageGallery({ images, columns = 2 }: ImageGalleryProps) {
  const [modal, setModal] = useState<ModalImageState>({
    isOpen: false,
    currentIndex: 0,
    zoom: 100,
  })

  const openModal = (index: number) => {
    setModal({ isOpen: true, currentIndex: index, zoom: 100 })
  }

  const closeModal = () => {
    setModal({ ...modal, isOpen: false })
  }

  const nextImage = () => {
    setModal({
      ...modal,
      currentIndex: (modal.currentIndex + 1) % images.length,
      zoom: 100,
    })
  }

  const prevImage = () => {
    setModal({
      ...modal,
      currentIndex: (modal.currentIndex - 1 + images.length) % images.length,
      zoom: 100,
    })
  }

  const zoomIn = () => {
    setModal({
      ...modal,
      zoom: Math.min(modal.zoom + 20, 300),
    })
  }

  const zoomOut = () => {
    setModal({
      ...modal,
      zoom: Math.max(modal.zoom - 20, 50),
    })
  }

  const resetZoom = () => {
    setModal({
      ...modal,
      zoom: 100,
    })
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      zoomIn()
    } else {
      zoomOut()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight':
        nextImage()
        break
      case 'ArrowLeft':
        prevImage()
        break
      case '+':
      case '=':
        zoomIn()
        break
      case '-':
        zoomOut()
        break
      case '0':
        resetZoom()
        break
      case 'Escape':
        closeModal()
        break
      default:
        break
    }
  }

  return (
    <>
      <div className={`gallery gallery--col-${columns}`}>
        {images.map((image, index) => (
          <div
            key={index}
            className="gallery__item"
            onClick={() => openModal(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="gallery__image"
              style={image.transform ? { transform: image.transform } : undefined}
            />
            {image.title && <div className="gallery__title">{image.title}</div>}
            <div className="gallery__overlay">
              <span className="gallery__zoom-icon">🔍</span>
            </div>
          </div>
        ))}
      </div>

      {modal.isOpen && (
        <div
          className="modal-gallery"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-gallery__content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div
              className="modal-gallery__image-container"
              onWheel={handleWheel}
            >
              <img
                src={images[modal.currentIndex].src}
                alt={images[modal.currentIndex].alt}
                className="modal-gallery__image"
                style={{
                  transform: `scale(${modal.zoom / 100})`,
                }}
              />
            </div>

            {/* Close Button */}
            <button
              className="modal-gallery__close"
              onClick={closeModal}
              aria-label="Close"
              title="Close (Esc)"
            >
              ✕
            </button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  className="modal-gallery__nav modal-gallery__nav--prev"
                  onClick={prevImage}
                  aria-label="Previous image"
                  title="Previous (←)"
                >
                  ‹
                </button>
                <button
                  className="modal-gallery__nav modal-gallery__nav--next"
                  onClick={nextImage}
                  aria-label="Next image"
                  title="Next (→)"
                >
                  ›
                </button>
              </>
            )}

            {/* Controls */}
            <div className="modal-gallery__controls">
              <button
                className="modal-gallery__btn"
                onClick={zoomOut}
                disabled={modal.zoom <= 50}
                title="Zoom out (-)"
              >
                −
              </button>
              <span className="modal-gallery__zoom-level">
                {modal.zoom}%
              </span>
              <button
                className="modal-gallery__btn"
                onClick={zoomIn}
                disabled={modal.zoom >= 300}
                title="Zoom in (+)"
              >
                +
              </button>
              <button
                className="modal-gallery__btn"
                onClick={resetZoom}
                title="Reset zoom (0)"
              >
                Reset
              </button>
            </div>

            {/* Counter */}
            {images.length > 1 && (
              <div className="modal-gallery__counter">
                {modal.currentIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
