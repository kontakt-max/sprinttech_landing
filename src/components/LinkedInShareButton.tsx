"use client";

import { useCallback } from "react";
import { Linkedin, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSiteUrl } from "@/lib/utils";

interface LinkedInShareButtonProps {
  url?: string;
  title: string;
  className?: string;
  variant?: "icon" | "button";
}

export function LinkedInShareButton({
  url,
  title,
  className,
  variant = "button",
}: LinkedInShareButtonProps) {
  const shareUrl =
    url ?? (typeof window !== "undefined" ? window.location.href : getSiteUrl());

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  const handleShare = useCallback(() => {
    window.open(linkedInShareUrl, "_blank", "noopener,noreferrer,width=600,height=600");
  }, [linkedInShareUrl]);

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleShare}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]",
          className
        )}
        aria-label={`Udostępnij na LinkedIn: ${title}`}
      >
        <Linkedin className="h-5 w-5" aria-hidden />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]",
        className
      )}
      aria-label={`Udostępnij na LinkedIn: ${title}`}
    >
      <Share2 className="h-4 w-4" aria-hidden />
      Udostępnij na LinkedIn
    </button>
  );
}
