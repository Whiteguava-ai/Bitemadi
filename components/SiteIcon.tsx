import {
  Armchair,
  BadgeCheck,
  Handshake,
  Leaf,
  Recycle,
  Sparkles,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

const icons = {
  food: UtensilsCrossed,
  ambience: Armchair,
  service: Handshake,
  fresh: Leaf,
  sustainability: Recycle,
  quality: BadgeCheck,
  community: Users,
  excellence: Sparkles,
} as const;

export type SiteIconName = keyof typeof icons;

export default function SiteIcon({
  name,
  className = "h-10 w-10",
}: {
  name: SiteIconName;
  className?: string;
}) {
  const Icon: LucideIcon = icons[name];
  return <Icon className={className} strokeWidth={1.6} aria-hidden="true" />;
}
