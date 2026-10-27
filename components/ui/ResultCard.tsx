import Image, { type StaticImageData } from "next/image";

type Props = { icon: StaticImageData; title: string; value: string; children: React.ReactNode };

export function ResultCard({ icon, title, value, children }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="flex items-center gap-2 font-semibold text-slate-700">
        <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-slate-200 bg-white">
          <Image src={icon} alt="" width={40} height={40} className="object-contain" unoptimized />
        </span>
        {title}
      </h3>
      <div className="mt-3 text-2xl font-bold text-indigo-600">{value}</div>
      <p className="mt-1 text-sm text-slate-600">{children}</p>
    </div>
  );
}
