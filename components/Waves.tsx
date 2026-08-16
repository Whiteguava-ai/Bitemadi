export function WaveDown({ fill = "#fff7e8" }: { fill?: string }) {
  return (
    <svg
      className="wave-bottom"
      viewBox="0 0 1200 180"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 0V40H0C80 110 180 150 300 120C420 90 520 40 640 55C760 70 860 140 980 150C1080 158 1140 120 1200 90V180H0V0Z"
        fill={fill}
      />
    </svg>
  );
}

export function WaveUp({ fill = "#920711" }: { fill?: string }) {
  return (
    <svg
      className="scallop"
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 80V20C80 50 160 0 240 10C320 20 400 70 480 60C560 50 640 0 720 8C800 16 880 70 960 62C1040 54 1120 8 1200 24V80H0Z"
        fill={fill}
      />
    </svg>
  );
}

export function ScallopTop({ fill = "#920711" }: { fill?: string }) {
  return (
    <svg
      className="scallop"
      viewBox="0 0 1200 70"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 70V8C40 40 90 55 150 42C220 26 280 0 360 8C440 16 500 55 580 48C660 40 720 0 800 10C880 20 940 58 1020 50C1080 44 1140 12 1200 28V70H0Z"
        fill={fill}
      />
    </svg>
  );
}
