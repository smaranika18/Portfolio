interface SectionHeadingProps {
  kicker: string;
  prefix: string;
  highlight: string;
}

export function SectionHeading({ kicker, prefix, highlight }: SectionHeadingProps): JSX.Element {
  return (
    <div className="section-heading reveal">
      <p className="section-kicker">{kicker}</p>
      <h2>
        {prefix} <span className="gradient-text">{highlight}</span>
      </h2>
    </div>
  );
}
