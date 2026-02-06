"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Globe, Play, X, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";



interface ProjectProps {
  title: string;
  description: string;
  image?: string;
  hoverImage?: string;
  tags: string[];
  github?: string;
  demo?: string;
  video?: string;
}


export function ProjectCard({ title, description, image, hoverImage, tags, github, demo, video }: ProjectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const loomToEmbed = (url: string) => {
    if (!url) return "";
    const id = url.split("/").pop();
    return `https://www.loom.com/embed/${id}?hide_owner=true&hide_share=true&hide_title=true&hide_embed_params=true`;
  };

  return (
    <>
      <div 
        className="group relative flex flex-col gap-6 p-1 bg-card/20 border border-border/50 rounded-[2.5rem] glass hover:bg-card/40 transition-all duration-500 mb-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Media Thumbnail */}
        <div 
          className="relative w-full aspect-[16/10] rounded-[2.2rem] overflow-hidden border border-border/30 cursor-pointer"
          onClick={() => video && setIsOpen(true)}
        >
          <Image 
            src={(isHovered && hoverImage) ? hoverImage : (image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000")} 
            alt={title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
            unoptimized
          />
          {video && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 scale-90 group-hover:scale-100 transition-transform duration-500">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 px-8 pb-8">
          {/* Header with Title and Links */}
          <div className="flex justify-between items-center gap-4">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">{title}</h3>
            <div className="flex gap-2">
              {demo && (
                <Link 
                  href={demo}
                  target="_blank"
                  className="p-2.5 bg-muted/20 border border-border rounded-xl text-foreground hover:bg-muted/40 transition-all hover:scale-105"
                  title="Live Demo"
                >
                  <Globe className="w-5 h-5" />
                </Link>
              )}
              {github && (
                <Link 
                  href={github}
                  target="_blank"
                  className="p-2.5 bg-muted/20 border border-border rounded-xl text-foreground hover:bg-muted/40 transition-all hover:scale-105"
                  title="Source Code"
                >
                  <Github className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>

          {/* Description below title/links */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>

          {/* Footer Tech stack */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
            {tags.map((tag) => (
              <div 
                key={tag} 
                className="group/icon relative flex items-center justify-center p-2 bg-muted/30 border border-border/50 rounded-lg transition-transform hover:scale-110"
              >
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  <span className="bg-background border border-border px-2 py-1 rounded-md text-[10px] font-bold shadow-xl whitespace-nowrap">
                    {tag}
                  </span>
                </div>
                <Image 
                  src={`https://skillicons.dev/icons?i=${tag.toLowerCase().replace(/[\s.]/g, '')}`}
                  alt={tag}
                  width={20}
                  height={20}
                  className="grayscale opacity-70 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 transition-all"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isOpen && video && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe 
                src={loomToEmbed(video)}
                className="w-full h-full"
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

