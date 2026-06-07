'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Users, ArrowLeftRight, LayoutDashboard, Library } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/books', label: 'Books', icon: BookOpen },
  { href: '/members', label: 'Members', icon: Users },
  { href: '/issues', label: 'Issues', icon: ArrowLeftRight },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Library className="w-6 h-6 text-primary-400" />
            <span className="text-lg font-bold gradient-text">LibraryMS</span>
          </Link>
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary-500/20 text-primary-300'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.05]'
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
