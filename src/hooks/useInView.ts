import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  /** Trigger when this much of the element is visible (0–1) */
  threshold?: number
  /** Root margin for early/late triggering */
  rootMargin?: string
  /** Only trigger once */
  triggerOnce?: boolean
}

/**
 * IntersectionObserver hook. Returns [ref, isInView].
 *
 * When the element enters the viewport, isInView becomes true.
 * With triggerOnce (default true), it stays true permanently.
 */
export function useInView({
  threshold = 0.15,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (triggerOnce) observer.unobserve(el)
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isInView }
}
