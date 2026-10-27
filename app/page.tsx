import { CalculatorForm } from "@/components/calculator/CalculatorForm";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <article className="overflow-hidden rounded-3xl bg-white shadow-2xl">
        <Header />
        <div className="p-6 sm:p-8">
          <CalculatorForm />
        </div>
        <Footer />
      </article>
    </main>
  );
}
