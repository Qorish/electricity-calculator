import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 px-6 py-4 text-center text-sm text-slate-500">
      {site.name} &copy; {new Date().getFullYear()}
    </footer>
  );
}
