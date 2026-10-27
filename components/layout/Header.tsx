import { site } from "@/data/site";

export function Header() {
  return (
    <header className="bg-gradient-to-br from-indigo-500 to-violet-500 px-6 py-8 text-center text-white">
      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold">{site.name}</h1>
      <p className="mt-1 text-white/85">{site.tagline}</p>
    </header>
  );
}
