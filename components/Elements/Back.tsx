'use client'

import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Back() {
  return (
    <motion.div
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      initial={{ x: -50, opacity: 0 }}
    >
      <Link className="flex items-center space-x-2 text-primary" href="/">
        <ArrowLeftIcon className="h-5"></ArrowLeftIcon>
        <span className="underline">Zurück</span>
      </Link>
    </motion.div>
  )
}
