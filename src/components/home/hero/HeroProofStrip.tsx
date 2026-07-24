import { SecurityBadges } from "@/components/SecurityBadges";

export function HeroProofStrip() {
  return (
    <div className="mt-8 hidden border-t border-white/10 pt-6 md:block">
      <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-white/40">
        Zaufanie enterprise
      </p>
      <SecurityBadges compact />
    </div>
  );
}
