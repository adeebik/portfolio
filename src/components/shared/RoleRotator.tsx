"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const roles = [
  "Backend Engineer",
  "Software Engineer",
  "DevOps Engineer"
];

export function RoleRotator() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typeSpeed = isDeleting ? 50 : 100; // Faster when deleting
    const pauseTime = 2000; // Pause at the end of typing

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          // Finished typing, wait before deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
          return; // Return to avoid rescheduling immediately
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        } else {
          // Finished deleting, move to next role
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }
    };

    const timer = setTimeout(handleTyping, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <span className="inline-flex items-center text-muted-foreground">
      <span>{displayText}</span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="ml-1 w-[2px] h-6 bg-primary"
      />
    </span>
  );
}
