import * as React from "react"

export function useSize(elementRef) {
  const [size, setSize] = React.useState(undefined)

  React.useLayoutEffect(() => {
    if (!elementRef.current) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        const { width, height } = entry.contentRect
        setSize({ width: Math.round(width), height: Math.round(height) })
      }
    })

    observer.observe(elementRef.current)

    return () => observer.disconnect()
  }, [elementRef])

  return size
}
