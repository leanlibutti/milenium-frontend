import { useEffect, useRef, useState } from 'react'

export const UseIntersection = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const elementRef = useRef()

  useEffect(() => {
    const element = elementRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting)
        })
      },
      {
        options
      }
    )

    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [options])

  return [elementRef, isIntersecting]
}
