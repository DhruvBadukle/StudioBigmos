interface Props {
  id?: string;
  text: string;
  sub?: string;
}

export function SectionLabel({ id, text, sub }: Props) {
  return (
    <div id={id} className="col-span-full scroll-mt-24 flex items-center gap-3.5 pt-2">
      <span className="h-2 w-2 rounded-full bg-accent" />
      <h3 className="font-serif text-[20px] font-semibold tracking-tight">
        {text}
        {sub ? <span className="ml-2 text-[15px] font-normal text-muted">· {sub}</span> : null}
      </h3>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}