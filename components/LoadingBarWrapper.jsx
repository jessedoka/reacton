'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import LoadingBar from 'react-top-loading-bar'

export default function LoadingBarWrapper() {
  const ref = useRef(null)
  const pathname = usePathname()

  useEffect(() => {
    ref.current?.complete()
  }, [pathname])

  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a')
      if (anchor && anchor.href && new URL(anchor.href).pathname !== pathname) {
        ref.current?.continuousStart()
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [pathname])

  return <LoadingBar color="#4ecf68" ref={ref} shadow={false} height={3} />
}
