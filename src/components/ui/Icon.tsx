import {
  Zap,
  Layers,
  Crosshair,
  Shield,
  Clock,
  Target,
  Activity,
  Network,
  ShieldCheck,
  Search,
  Lock,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  zap: Zap,
  layers: Layers,
  crosshair: Crosshair,
  shield: Shield,
  clock: Clock,
  target: Target,
  activity: Activity,
  network: Network,
  shieldcheck: ShieldCheck,
  search: Search,
  lock: Lock,
};

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const C = map[name] ?? Zap;
  return <C className={className} />;
}
