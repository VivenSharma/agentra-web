import { Cpu, HeartPulse, Wheat, Zap } from "lucide-react";
import type { Sector } from "@/lib/sectors";

const map = { zap: Zap, heart: HeartPulse, cpu: Cpu, wheat: Wheat };

export function SectorIcon({ icon, className = "h-4 w-4" }: { icon: Sector["icon"]; className?: string }) {
  const I = map[icon];
  return <I className={className} strokeWidth={1.5} aria-hidden />;
}
