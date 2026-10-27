import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-rule py-8 text-sm text-muted">
      <p>
        {site.name} &copy; {new Date().getFullYear()}. Everything is worked out in your browser; nothing is sent anywhere.
      </p>
    </footer>
  );
}
