import { site } from "@/data/site";

export function Header() {
  return (
    <header className="rise flex h-16 items-center gap-3 sm:h-20">
      <span
        className="flex h-9 w-9 items-center justify-center rounded-control bg-accent text-accent-ink"
        aria-hidden
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </span>
      <span className="font-semibold tracking-tight text-ink">{site.name}</span>
    </header>
  );
}
