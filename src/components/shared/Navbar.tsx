"use client";

import Link from "next/link";
import { Github, Sun, Moon, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!mounted) return null;

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[1001] w-max">
      <div className="glass flex items-center gap-2 px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-shadow">
        <Link 
          href="/" 
          onClick={scrollToTop}
          className="px-3 py-1.5 text-xs font-medium hover:text-muted-foreground transition-all duration-200 hover:scale-110"
        >
          Home
        </Link>
        <div className="w-px h-4 bg-border mx-1" />
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-muted transition-all duration-200 hover:scale-125"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>
        <Link 
          href="https://github.com/adeebik" 
          target="_blank" 
          className="p-2 rounded-full hover:bg-muted transition-all duration-200 hover:scale-125"
        >
          <Github className="w-3.5 h-3.5" />
        </Link>
        <Link 
          href="https://www.linkedin.com/in/adeebiqbalkhan/" 
          target="_blank" 
          className="p-2 rounded-full hover:bg-muted transition-all duration-200 hover:scale-125 text-muted-foreground hover:text-foreground"
        >
          <Linkedin className="w-3.5 h-3.5" />
        </Link>
        <Link 
          href="#contact" 
          className="p-2 rounded-full hover:bg-muted transition-all duration-200 hover:scale-125 text-muted-foreground hover:text-foreground"
        >
          <Mail className="w-3.5 h-3.5" />
        </Link>
      </div>
    </nav>
  );
}


