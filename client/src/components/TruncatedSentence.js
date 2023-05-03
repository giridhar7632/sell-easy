import clsx from 'clsx'
import { useState } from 'react'

export default function TruncatedSentence({ className, children }) {
  const [showFull, setShowFull] = useState(false)
  const isLarge = children.split(' ').length > 50
  const truncatedSentence = children.split(' ').slice(0, 50).join(' ')
  const fullSentence = children

  return (
    <div className={clsx('flex flex-col', className)}>
      <p>{showFull ? fullSentence : isLarge ? `${truncatedSentence}...` : children}</p>
      {isLarge && (
        <button className="mt-2 text-sm text-teal-500" onClick={() => setShowFull(!showFull)}>
          Show {showFull ? 'Less' : 'More'}
        </button>
      )}
    </div>
  )
}
