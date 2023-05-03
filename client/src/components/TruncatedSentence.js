import { useState } from 'react'

export default function TruncatedSentence({ children }) {
  const [showFull, setShowFull] = useState(false)

  const truncatedSentence = children.split(' ').slice(0, 50).join(' ')
  const fullSentence = children

  return (
    <div className="flex flex-col">
      <p>{showFull ? fullSentence : truncatedSentence}...</p>
      <button className="mt-2 text-sm text-teal-500" onClick={() => setShowFull(!showFull)}>
        Show {showFull ? 'Less' : 'More'}
      </button>
    </div>
  )
}
