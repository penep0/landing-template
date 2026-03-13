import { FAQItem } from "@/content/types";

type FAQProps = {
  items: FAQItem[];
};

export function FAQ({ items }: FAQProps) {
  return (
    <section id="faq" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-[var(--font-heading)] text-3xl font-bold">
          자주 묻는 질문
        </h2>
        <div className="mt-12 space-y-4">
        {items.map((item) => (
          <details
            key={item.question}
            className="overflow-hidden rounded-3xl border border-[var(--border)]"
            open={item === items[0]}
          >
            <summary className="cursor-pointer list-none px-6 py-6 text-base font-bold hover:bg-slate-50">
              {item.question}
            </summary>
            <p className="border-t border-[var(--border)] px-6 pb-6 pt-4 text-sm leading-7 text-slate-500">
              {item.answer}
            </p>
          </details>
        ))}
        </div>
      </div>
    </section>
  );
}
