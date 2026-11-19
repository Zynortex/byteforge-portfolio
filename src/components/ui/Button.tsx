import { Link } from 'react-router-dom';
import type { ComponentType, MouseEventHandler, ReactNode, SVGProps } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

type IconType = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string }>;

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconType;
  /** Icon nudges diagonally (external) or horizontally (internal) on hover. */
  iconMotion?: 'right' | 'diagonal' | 'none';
  className?: string;
  ariaLabel?: string;
}

type ButtonProps = BaseProps &
  (
    | { to: string; href?: never; onClick?: MouseEventHandler<HTMLAnchorElement> }
    | { href: string; to?: never; external?: boolean; onClick?: MouseEventHandler<HTMLAnchorElement> }
    | { onClick: MouseEventHandler<HTMLButtonElement>; to?: never; href?: never }
  );

const base =
  'group relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-ink-950 shadow-[0_0_0_1px_rgb(61_230_214/0.5),0_10px_40px_-12px_rgb(61_230_214/0.6)] hover:bg-accent-soft hover:shadow-[0_0_0_1px_rgb(143_243_233/0.7),0_14px_50px_-12px_rgb(61_230_214/0.75)]',
  secondary:
    'border border-line-strong bg-white/[0.03] text-fg backdrop-blur hover:border-accent/50 hover:bg-accent/[0.06]',
  ghost: 'text-fg-muted hover:text-fg',
};

const sizes: Record<Size, string> = {
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-6 text-[0.95rem]',
};

export function Button(props: ButtonProps) {
  const { children, variant = 'primary', size = 'md', icon: Icon, iconMotion = 'right', className = '', ariaLabel } = props;

  const iconCls =
    iconMotion === 'diagonal'
      ? 'transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
      : iconMotion === 'right'
        ? 'transition-transform duration-300 group-hover:translate-x-1'
        : '';

  const content = (
    <>
      {variant === 'primary' && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition-[transform,opacity] duration-700 group-hover:translate-x-[300%] group-hover:opacity-100"
        />
      )}
      <span className="relative">{children}</span>
      {Icon && <Icon size={16} strokeWidth={2} className={`relative ${iconCls}`} aria-hidden />}
    </>
  );

  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={cls} aria-label={ariaLabel} onClick={props.onClick}>
        {content}
      </Link>
    );
  }
  if ('href' in props && props.href) {
    const ext = props.external;
    return (
      <a
        href={props.href}
        className={cls}
        aria-label={ariaLabel}
        onClick={props.onClick}
        {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={cls}
      aria-label={ariaLabel}
      onClick={(props as { onClick: MouseEventHandler<HTMLButtonElement> }).onClick}
    >
      {content}
    </button>
  );
}
