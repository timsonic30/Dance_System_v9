"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, ShoppingCart, Menu, X } from "lucide-react"


export default function XtraLabHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className="bg-[#FF9933] text-white py-3 px-4 md:px-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" className="text-2xl font-bold">
                        XtraLab.
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button className="md:hidden text-white" onClick={toggleMenu} aria-label="Toggle menu">
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    <Link href="/about" className="hover:underline">
                        About US
                    </Link>
                    <Link href="/tutor" className="hover:underline">
                        Tutor
                    </Link>
                    <Link href="/dance-path" className="hover:underline">
                        Dance Path
                    </Link>
                    <Link href="/member-score" className="hover:underline">
                        Member Score
                    </Link>
                    <Link href="/rent" className="hover:underline">
                        Rent
                    </Link>
                </nav>

                {/* Icons and buttons */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/favorites" aria-label="Favorites">
                        <Heart className="h-6 w-6" />
                    </Link>
                    <Link href="/cart" aria-label="Shopping Cart">
                        <ShoppingCart className="h-6 w-6" />
                    </Link>
                    <button variant="outline" className="bg-white text-[#FF9933] hover:bg-gray-100 border-none">
                        Login
                    </button>
                    <button className="bg-black text-white hover:bg-gray-800 border-none">SignUp</button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="absolute top-16 left-0 right-0 bg-[#FF9933] z-50 md:hidden">
                        <div className="flex flex-col p-4 space-y-3">
                            <Link href="/about" className="hover:bg-[#e68a2e] py-2 px-3 rounded" onClick={() => setIsMenuOpen(false)}>
                                About US
                            </Link>
                            <Link href="/tutor" className="hover:bg-[#e68a2e] py-2 px-3 rounded" onClick={() => setIsMenuOpen(false)}>
                                Tutor
                            </Link>
                            <Link
                                href="/dance-path"
                                className="hover:bg-[#e68a2e] py-2 px-3 rounded"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Dance Path
                            </Link>
                            <Link
                                href="/member-score"
                                className="hover:bg-[#e68a2e] py-2 px-3 rounded"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Member Score
                            </Link>
                            <Link href="/rent" className="hover:bg-[#e68a2e] py-2 px-3 rounded" onClick={() => setIsMenuOpen(false)}>
                                Rent
                            </Link>
                            <div className="flex items-center space-x-4 pt-2">
                                <Link href="/favorites" aria-label="Favorites">
                                    <Heart className="h-6 w-6" />
                                </Link>
                                <Link href="/cart" aria-label="Shopping Cart">
                                    <ShoppingCart className="h-6 w-6" />
                                </Link>
                            </div>
                            <div className="flex flex-col space-y-2 pt-2">
                                <button
                                    variant="outline"
                                    className="bg-white text-[#FF9933] hover:bg-[#FF9933] hover:text-white hover:cursor-pointer hover:px-4 hover:py-4 border-none w-full transition-all duration-200 ease-in-out"
                                >
                                    Login
                                </button>

                                <button className="bg-black text-white hover:bg-gray-800 border-none w-full">SignUp</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

