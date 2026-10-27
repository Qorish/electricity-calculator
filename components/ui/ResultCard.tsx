import Image, { type StaticImageData } from "next/image";

type Props = { icon: StaticImageData; title: string; value: string; children: React.ReactNode };

export function ResultCard({ icon, title, value, children }: Readonly<Props>) {
  return (
    <div className="card h-full p-6">
      <h3 className="flex items-center gap-3 text-base font-semibold text-ink-2">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-ink">
          <Image src={icon} alt="" width={40} height={40} className="object-contain" unoptimized />
        </span>
        {title}
      </h3>
      <div className="num mt-5 text-2xl text-accent">{value}</div>
      <p className="mt-2 text-sm text-muted">{children}</p>
    </div>
  );
}
