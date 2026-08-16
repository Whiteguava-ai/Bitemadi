export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      {eyebrow ? (
        <p
          className={`text-sm font-medium ${light ? "text-gold" : "text-burgundy"}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-2 font-display text-4xl uppercase leading-[0.95] md:text-5xl lg:text-[56px] ${
          light ? "text-white" : "text-brown"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-[16px] leading-relaxed ${
            light ? "text-white/75" : "text-muted"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
