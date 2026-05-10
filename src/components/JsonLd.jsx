export default function JsonLd({ data }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be a string; keep it deterministic.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

