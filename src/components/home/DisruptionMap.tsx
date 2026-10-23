import {
  worldMapSvg,
  worldMapWidth as W,
  worldMapHeight as H,
  worldMapHubs as hubs,
} from "@/lib/worldmap.generated";

/* Backdrop for the problem statement: the real dotted world map, with
   signals going off at major trade hubs at uneven intervals. It shows the
   point the copy makes (disruption is constant and everywhere) without
   competing with it. Pure CSS animation, static under reduced motion. */
export function DisruptionMap({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      <div
        className="w-full opacity-25 md:opacity-35 [&>svg]:h-auto [&>svg]:w-full"
        dangerouslySetInnerHTML={{ __html: worldMapSvg }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        {hubs.map((h, i) => {
          // uneven rhythm so the pulses never read as a loading spinner
          const style = { animationDelay: `${(i * 1.7) % 6.3}s`, animationDuration: `${4.6 + (i % 3) * 1.3}s` };
          return (
            <g key={h.city}>
              <circle cx={h.x} cy={h.y} r={2.2} fill="none" stroke="#9a71ef" strokeWidth={0.14} className="hub-ring" style={style} />
              <circle cx={h.x} cy={h.y} r={0.38} fill="#b89bf5" className="hub-dot" style={style} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
