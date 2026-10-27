export function Alert({ title, items }: Readonly<{ title: string; items: string[] }>) {
  return (
    <div role="alert" className="mb-6 rounded-control border border-danger bg-danger-field p-4 text-danger">
      <strong className="font-semibold">{title}</strong>
      <ul className="mt-1 list-disc pl-5">
        {items.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    </div>
  );
}
