export function Hero() {
  return (
    <section className="px-6 py-12 md:py-14">
      <div className="mx-auto max-w-[1280px] text-center">
        <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.18em] text-accent">
          New drop · 4 pieces
        </p>
        <h1 className="mb-4 font-serif text-[clamp(44px,6vw,72px)] font-semibold leading-[1.05] tracking-[-0.035em]">
          Steal The Style
        </h1>
        <p className="mx-auto max-w-[600px] text-[16px] leading-relaxed text-muted md:text-[18px]">
          Trust issues?{" "}
          <span className="inline-block rounded-full bg-[#f7eee9] px-2.5 py-0.5 font-semibold text-accent">
            100%
          </span>
          . Tap any product to get redirected to{" "}
          <span className="font-semibold text-ink underline decoration-accent/50 decoration-2 underline-offset-5">
            Amazon
          </span>
        </p>
      </div>
    </section>
  );
}