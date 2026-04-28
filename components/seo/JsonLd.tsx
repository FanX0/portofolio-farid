import React from "react";

export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://faridazhari.com";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Farid Azhari",
    url: baseUrl,
    jobTitle: "Creative Developer & Frontend Specialist",
    description:
      "Creative Developer focusing on turning digital interfaces into immersive experiences. Specialized in GSAP, ScrollTrigger, Three.js, and high-performance storytelling websites.",
    knowsAbout: [
      "Frontend Development",
      "UI/UX Design",
      "Interactive Experiences",
      "GSAP",
      "ScrollTrigger",
      "Three.js",
      "Framer Motion",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Storytelling",
    ],
    sameAs: [
      "https://github.com/FanX0",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Farid Azhari Portfolio",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
