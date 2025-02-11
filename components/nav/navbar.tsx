"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/nav/user-nav"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Navbar() {
  const { theme, systemTheme } = useTheme()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b">
      <div className="bg-background/80 dark:bg-gradient-to-r dark:from-white dark:to-black backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              {mounted && (
                <Image
                  src={currentTheme === 'dark' ? '/images/ASVABProject-dark.png' : '/images/ASVABProject.png'}
                  alt="ASVABProject Logo"
                  width={150}
                  height={40}
                  className="cursor-pointer object-contain h-10 w-auto"
                  onClick={() => router.push('/')}
                  priority
                  style={{ maxWidth: '150px' }}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    if (img.src.includes('/images/')) {
                      img.src = currentTheme === 'dark' ? '/ASVABProject-dark.png' : '/ASVABProject.png';
                    }
                  }}
                />
              )}
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserNav />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 
