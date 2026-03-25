// Consistent section padding + max-width wrapper.

interface Props {
  children: React.ReactNode
  dark?: boolean
  className?: string
}

export default function SectionWrapper({ children, dark = false, className = '' }: Props) {
  return (
    <section
      className={`section-pad ${dark ? 'bg-ink text-white' : 'bg-surface text-ink'} ${className}`}
    >
      <div className="site-container">{children}</div>
    </section>
  )
}
