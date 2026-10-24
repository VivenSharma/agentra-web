// The doors into Resources, shared by the nav dropdown and the hub.
// Whitepapers, Blog and Podcasts carry the live site's copy; Events was added
// in October 2026.
export const resourceDoors: {
  label: string;
  href: string;
  desc: string;
  cta: string;
}[] = [
  {
    label: "Whitepapers",
    href: "/resources/whitepapers",
    desc: "Deep-dive research on autonomy, ontology and governance.",
    cta: "Browse whitepapers",
  },
  {
    label: "Blog",
    href: "/resources/blog",
    desc: "Operator-grade perspectives and short reads.",
    cta: "Browse blog",
  },
  {
    label: "Podcasts",
    href: "/resources/podcasts",
    desc: "Conversations on the shift from automation to autonomy.",
    cta: "Browse podcasts",
  },
  {
    label: "Events",
    href: "/resources/events",
    desc: "Events we have hosted, sponsored and attended.",
    cta: "See events",
  },
];
