import { useCallback, useEffect, useRef, useState } from "react"
import type { CaptionedImage } from "../../types/profile"

/**
 * Accessible image viewer on the native <dialog> element.
 * Esc closes (native), ←/→ navigate, focus returns to the opener on close.
 */
export function useLightbox() {
  const [state, setState] = useState<{ title: string; images: CaptionedImage[]; index: number } | null>(null)
  const opener = useRef<HTMLElement | null>(null)
  const open = useCallback((title: string, images: CaptionedImage[], index = 0) => {
    if (!images.length) return
    opener.current = document.activeElement as HTMLElement | null
    setState({ title, images, index })
  }, [])
  const close = useCallback(() => {
    setState(null)
    opener.current?.focus()
  }, [])
  return { state, open, close, setIndex: (index: number) => setState((s) => (s ? { ...s, index } : s)) }
}

export function Lightbox({
  state,
  onClose,
  onIndex,
}: {
  state: { title: string; images: CaptionedImage[]; index: number } | null
  onClose: () => void
  onIndex: (index: number) => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (state && !d.open) d.showModal()
    if (!state && d.open) d.close()
  }, [state])

  const count = state?.images.length ?? 0
  const go = useCallback(
    (delta: number) => state && onIndex((state.index + delta + count) % count),
    [state, count, onIndex],
  )

  const current = state ? state.images[state.index] : null

  return (
    <dialog
      ref={dialog}
      className="rz-lightbox"
      aria-label={state ? `${state.title} — documentation` : "Documentation"}
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      onKeyDown={(e) => {
        if (count < 2) return
        if (e.key === "ArrowRight") {
          e.preventDefault()
          go(1)
        } else if (e.key === "ArrowLeft") {
          e.preventDefault()
          go(-1)
        }
      }}
    >
      {state && current && (
        <>
          <header className="rz-lightbox__head">
            <strong>{state.title}</strong>
            <span aria-live="polite">
              {state.index + 1} / {count}
            </span>
          </header>
          <figure>
            <img src={current.src} width={current.width} height={current.height} alt={current.alt} />
            <figcaption>
              {current.category && <small>{current.category}</small>}
              {current.caption}
            </figcaption>
          </figure>
          {count > 1 && (
            <ul className="rz-lightbox__thumbs" aria-label="All documentation">
              {state.images.map((img, i) => (
                <li key={img.src}>
                  <button
                    type="button"
                    aria-label={`Show ${img.caption}`}
                    aria-current={i === state.index ? "true" : undefined}
                    onClick={() => onIndex(i)}
                  >
                    <img src={img.src} width={img.width} height={img.height} alt="" loading="lazy" decoding="async" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="rz-lightbox__controls">
            {count > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label="Previous image">
                  ← Prev
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Next image">
                  Next →
                </button>
              </>
            )}
            <button type="button" className="rz-lightbox__close" onClick={() => dialog.current?.close()} autoFocus>
              Close
            </button>
          </div>
        </>
      )}
    </dialog>
  )
}
