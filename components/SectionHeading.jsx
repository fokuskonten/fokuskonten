export default function SectionHeading({ label, title, description, align = 'center' }) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center'

  return (
    <div className={`max-w-3xl lg:max-w-4xl mx-auto mb-12 ${alignClass}`}>
      {label && (
        <span className="label-brand mb-4 inline-block">{label}</span>
      )}
      {title && (
        <h2 className="heading-xl text-3xl sm:text-4xl lg:text-5xl text-neutral-900 text-balance">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-neutral-500 text-sm sm:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  )
}
