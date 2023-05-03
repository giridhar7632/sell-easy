export default function getRandomColor() {
  const colors = ['red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink', 'orange']
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}
