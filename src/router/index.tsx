import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { 
  Home, 
  Prices, 
  About, 
  Gallery, 
  Contact, 
  Booking, 
  NotFound 
} from '../pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'arak',
        element: <Prices />,
      },
      {
        path: 'rolam',
        element: <About />,
      },
      {
        path: 'galeria',
        element: <Gallery />,
      },
      {
        path: 'kapcsolat',
        element: <Contact />,
      },
      {
        path: 'idopontfoglalas',
        element: <Booking />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])
