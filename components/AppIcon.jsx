export default function AppIcon({ src, name, size = 'medium' }) {
  const sizeMap = {
    small: 'w-10 h-10 text-sm rounded-xl',
    medium: 'w-12 h-12 text-base rounded-xl',
    large: 'w-14 h-14 text-lg rounded-2xl',
    xlarge: 'w-20 h-20 text-2xl rounded-2xl',
  }

  const sizeClass = sizeMap[size] || sizeMap.medium

  if (!src) {
    return (
      <div className={`${sizeClass} bg-gradient-brand flex items-center justify-center text-white font-display font-bold shrink-0`}>
        {name?.charAt(0) || '?'}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={`${name} icon`}
      className={`${sizeClass} object-cover shrink-0 shadow-soft`}
      loading="lazy"
    />
  )
}
