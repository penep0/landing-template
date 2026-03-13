type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description
}: SectionHeadingProps) {
  return (
    <div>
      {eyebrow ? (
        <p className="text-sm font-semibold text-[var(--accent-strong)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 font-[var(--font-heading)] text-2xl font-bold leading-tight md:text-3xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
        {description}
      </p>
    </div>
  );
}
