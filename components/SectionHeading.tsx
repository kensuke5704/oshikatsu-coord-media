export function SectionHeading({
  number,
  title,
}: {
  number?: string;
  title: string;
}) {
  return (
    <h2 className="section-heading article-card-title mb-4 flex items-center gap-4 text-[1.35rem] leading-tight text-[#2b2522] sm:text-2xl">
      {number ? <span className="section-heading-number text-[0.82rem] tracking-[0.18em] text-[#8b7b74]">{number}</span> : null}
      <span>{title}</span>
    </h2>
  );
}
