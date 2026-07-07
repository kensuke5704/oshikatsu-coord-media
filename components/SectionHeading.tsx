export function SectionHeading({
  number,
  title,
}: {
  number?: string;
  title: string;
}) {
  return (
    <h2 className="article-card-title mb-4 flex items-baseline gap-4 text-2xl text-[#2b2522]">
      {number ? <span className="text-3xl tracking-wide text-[#d7c5bf]">{number}</span> : null}
      <span>{title}</span>
    </h2>
  );
}
