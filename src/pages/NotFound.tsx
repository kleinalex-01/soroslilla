import { Link } from 'react-router-dom'
import './NotFound.scss'

export function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <div className="not-found__content">
          <span className="not-found__code">404</span>
          <h1 className="not-found__title">Az oldal nem található</h1>
          <p className="not-found__text">
            A keresett oldal nem létezik vagy áthelyezésre került.
          </p>
          <Link to="/" className="btn btn--primary">
            Vissza a főoldalra
          </Link>
        </div>
      </div>
    </section>
  )
}
