/* Past events for the Events page. Copy is from "Briefs for Website's Event
   Page" (Oct 2026); keep it as written unless Marketing changes it.
   Newest first. Only Supply Chain Nexus has photos so far: the others render
   as text-led cards until photos are supplied (add them to `photos`). */

export type EventPhoto = { src: string; alt: string };

export type PastEvent = {
  id: string;
  name: string;
  role: string; // Agentra's part in it
  date: string;
  location: string;
  body: string;
  photos: EventPhoto[];
  link?: { href: string; label: string };
};

export const pastEvents: PastEvent[] = [
  {
    id: "reuters-events-supply-chain-2026",
    name: "Reuters Events: Supply Chain",
    role: "Attended",
    date: "29 and 30 September 2026",
    location: "Amsterdam, Netherlands",
    body:
      "At Reuters Events: Supply Chain, the most memorable conversation wasn't on the agenda. An existing customer spotted the Agentra team near the coffee station, and a quick hello turned into a 20-minute conversation about what was working and what they wanted next. It's the kind of candid feedback that's hard to replicate on a video call. The team also met supply chain operators and analysts, gaining fresh perspectives from people close to the decisions shaping the industry. They came away with a full notebook, sore feet and a reminder of why staying close to customers matters.",
    photos: [],
  },
  {
    id: "supply-chain-nexus-chapter-02",
    name: "Supply Chain Nexus, Chapter 02",
    role: "Hosted",
    date: "24 September 2026",
    location: "Amsterdam, Netherlands",
    body:
      "Agentra hosted the second edition of Supply Chain Nexus in Amsterdam, bringing together voices from across the supply chain and AI community for an evening of thoughtful discussion. Hosted by Agentra Founder & CEO Lalit Das in collaboration with Erasmus University Alumni (Rotterdam School of Management), the event explored where agentic AI in supply chain is heading, beginning with an opening talk by Prof. Ioannis Fragkos, followed by a panel featuring four perspectives on the challenges and opportunities ahead. A quiz and casual conversations added to the evening, with discussions continuing long after the programme ended. For Agentra, it was an opportunity to bring people together around a technology reshaping supply chain conversations.",
    photos: [
      { src: "/events/scn-ch02/host.jpg", alt: "Lalit Das opening Supply Chain Nexus, Chapter 02" },
      { src: "/events/scn-ch02/conversation.jpg", alt: "Guests in conversation at Supply Chain Nexus, Chapter 02" },
      { src: "/events/scn-ch02/networking.jpg", alt: "A table discussion during the evening" },
      { src: "/events/scn-ch02/close.jpg", alt: "Guests talking after the programme ended" },
    ],
    link: { href: "/rsm-nexus-v2", label: "See the event page" },
  },
  {
    id: "tiecon-amsterdam-2026",
    name: "TiEcon Amsterdam",
    role: "Sponsor",
    date: "24 September 2026",
    location: "Amsterdam, Netherlands",
    body:
      "Agentra was proud to sponsor TiEcon Amsterdam, joining founders, investors, and business leaders from across the India-Europe ecosystem. Founder & CEO Lalit Das joined a panel discussion on the questions facing supply chain leaders, while the Agentra booth brought conversations with attendees throughout the event. Beyond the sessions, it was the exchanges over coffee and dinner that offered lasting perspective. Building a company is demanding, and learning from others makes the journey richer. Thank you to TiE Amsterdam and Dr. Vikas S. Chaturvedi for bringing the community together.",
    photos: [],
  },
];
