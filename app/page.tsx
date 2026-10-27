import { CalculatorForm } from "@/components/calculator/CalculatorForm";
import { Intro } from "@/components/calculator/Intro";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="container">
      <Header />
      <main className="pb-[var(--section-gap-s)] pt-[var(--space-xl)] lg:pt-[var(--space-2xl)]">
        <CalculatorForm intro={<Intro />} />
      </main>
      <Footer />
    </div>
  );
}
