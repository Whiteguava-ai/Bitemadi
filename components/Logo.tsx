import Link from "next/link";

export default function Logo({
  light = false,
  href = "/",
}: {
  light?: boolean;
  href?: string;
}) {
  return (
    <Link href={href} className="inline-flex items-center" aria-label="Bite Maadi">
      <span className={`logo-mark${light ? " is-light" : ""}`}>Bite Maadi</span>
    </Link>
  );
}
