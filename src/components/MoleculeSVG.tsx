import { useState } from "react";

// Renders a substance's 2D structure from a pre-generated, themed SVG file in
// public/structures/<id>.svg (built by scripts/generate-molecule-svgs.mjs).
// Lazy-loaded and CDN-cached — no chemistry library or PubChem call at runtime.
// Falls back to the "not available" image if the file is missing.

type Props = {
  id: number;
  alt: string;
  className?: string;
  placeholderClassName?: string;
};

function MoleculeSVG({ id, alt, className, placeholderClassName }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <img
        className={placeholderClassName ?? className}
        src={new URL("../assets/notfound.png", import.meta.url).href}
        alt={alt}
      />
    );
  }

  return (
    <img
      className={className}
      src={`/structures/${id}.svg`}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default MoleculeSVG;
