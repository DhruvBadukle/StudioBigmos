interface Props {
  visible: number;
  total: number;
  onLoadMore: () => void;
}

export function LoadMore({ visible, total, onLoadMore }: Props) {
  const done = visible >= total;
  return (
    <div className="flex flex-col items-center gap-4 py-16">
      {!done && (
        <button
          onClick={onLoadMore}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-px"
        >
          Load more
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </button>
      )}
      <p className="text-[12.5px] text-muted">
        Showing <b>{Math.min(visible, total)}</b> of <b>{total}</b> pieces
      </p>
    </div>
  );
}