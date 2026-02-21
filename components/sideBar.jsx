'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menu = [
  { title: 'Test', path: '/' },
  { title: 'About', path: '/about' },
  { title: 'Stats', path: '/stats' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <ul className="flex gap-4">
      {menu.map((item) => (
        <li key={item.path}>
          <Link
            href={item.path}
            className={
              pathname === item.path
                ? 'bg-card text-white block px-4 py-3 sm:px-3 sm:py-2 rounded-md text-base'
                : 'text-gray-300 hover:bg-card hover:text-white block px-4 py-3 sm:px-3 sm:py-2 rounded-md text-base ease-in-out duration-500'
            }
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
