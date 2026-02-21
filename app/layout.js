import { Rubik } from 'next/font/google'
import './globals.css'
import Sidebar from '../components/sideBar'
import LoadingBarWrapper from '../components/LoadingBarWrapper'

const rubik = Rubik({ subsets: ['latin'], weight: ['500'] })

export const metadata = {
  title: 'Reacton',
  description: 'Test your reaction time',
  icons: { icon: '/favicon.svg' },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <LoadingBarWrapper />
        <div className="flex w-full items-center flex-col">
          <h1 className="bg-card p-4 rounded-lg cursor-pointer font-medium text-3xl">
            Reacton<span className="text-accent-green">.tech</span>
          </h1>
          <header className="mt-12">
            <nav>
              <Sidebar />
            </nav>
          </header>
        </div>
        {children}
      </body>
    </html>
  )
}
