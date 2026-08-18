import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: never;
  };

const baseClassName =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-paper)]";

const variants = {
  primary:
    "border border-transparent bg-[var(--color-brand)] text-[var(--color-paper)] shadow-[0_12px_30px_rgba(22,66,69,0.22)] hover:bg-[var(--color-brand-strong)]",
  secondary:
    "border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-brand)] hover:bg-[var(--color-surface-strong)]",
} as const;

export function Button(props: LinkButtonProps): ReactElement;
export function Button(props: NativeButtonProps): ReactElement;
export function Button(props: LinkButtonProps | NativeButtonProps): ReactElement {
  const {
    children,
    className = "",
    variant = "primary",
    ...rest
  } = props;

  const composedClassName = [baseClassName, variants[variant], className]
    .filter(Boolean)
    .join(" ");

  if ("href" in props) {
    const { href, ...linkProps } = rest as Omit<LinkButtonProps, "children" | "className" | "variant">;

    return (
      <Link className={composedClassName} href={href} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as Omit<NativeButtonProps, "children" | "className" | "variant">;
  const { type = "button", ...buttonRest } = buttonProps;

  return (
    <button className={composedClassName} type={type} {...buttonRest}>
      {children}
    </button>
  );
}
