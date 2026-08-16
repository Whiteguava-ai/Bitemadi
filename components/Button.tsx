import Link from "next/link";

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3.5 12.5L12.5 3.5M12.5 3.5H5.5M12.5 3.5V10.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowButton({
  href,
  children,
  variant = "burgundy",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "burgundy" | "cream" | "outline";
  className?: string;
}) {
  const styles = {
    burgundy: "bg-burgundy text-white hover:bg-burgundy-dark",
    cream: "bg-cream text-burgundy hover:bg-white",
    outline:
      "bg-transparent text-white border border-white/40 hover:bg-white hover:text-burgundy",
  }[variant];

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[15px] font-medium transition-all duration-300 ${styles} ${className}`}
    >
      {children}
      <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15">
        <ArrowIcon className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}
