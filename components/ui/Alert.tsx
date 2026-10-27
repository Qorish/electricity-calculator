export function Alert({ title, items }: { title: string; items: string[] }) {
  return (
    <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
      <strong>{title}</strong>
      <ul className="mt-1 list-disc pl-5">
        {items.map((e) => <li key={e}>{e}</li>)}
      </ul>
    </div>
  );
}
