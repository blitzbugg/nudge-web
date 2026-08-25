import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import { brand, text, radii } from '../design/tokens'

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }
type ButtonAsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

interface ButtonBase {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

type ButtonProps = ButtonBase & (ButtonAsButton | ButtonAsAnchor)

const sizes = {
  sm: { padding: '6px 16px', fontSize: '0.8125rem' },
  md: { padding: '10px 24px', fontSize: '0.9375rem' },
  lg: { padding: '12px 32px', fontSize: '1rem' },
} as const

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  style,
  ...props
}: ButtonProps) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 600,
    borderRadius: radii.full,
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.15s ease',
    fontFamily: 'inherit',
    ...sizes[size],
  }

  const variants: Record<string, React.CSSProperties> = {
    primary: { background: brand.primary, color: text.inverse },
    secondary: { background: 'transparent', color: brand.primary, border: `1.5px solid ${brand.primary}` },
    ghost: { background: 'transparent', color: text.secondary },
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (variant === 'primary') e.currentTarget.style.background = brand.primaryLight
    if (variant === 'secondary') e.currentTarget.style.background = brand.primarySoft
  }
  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (variant === 'primary') e.currentTarget.style.background = brand.primary
    if (variant === 'secondary') e.currentTarget.style.background = 'transparent'
  }

  const combinedStyle = { ...base, ...variants[variant], ...style }

  if ('href' in props && props.href) {
    const { href, ...rest } = props as ButtonAsAnchor
    return (
      <a
        href={href}
        style={combinedStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      style={combinedStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...(props as ButtonAsButton)}
    >
      {children}
    </button>
  )
}
