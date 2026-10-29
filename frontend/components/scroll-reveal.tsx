'use client'

import { motion, useInView } from 'framer-motion'
import type { ReactNode } from 'react'
import { useRef } from 'react'

type ScrollRevealProps = {
  children: ReactNode
}

export default function ScrollReveal({ children }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.2, once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export { ScrollReveal }
