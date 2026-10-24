import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import styles from "./studio-card.module.css";

export type StudioCardVariant = "default" | "inverse";
export type StudioCardSize = "default" | "compact";

type CardContent = {
  title: string;
  description?: ReactNode;
  eyebrow?: string;
  icon?: ReactNode;
  badge?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  variant?: StudioCardVariant;
  size?: StudioCardSize;
  headingLevel?: 2 | 3 | 4;
  id?: string;
  className?: string;
};

type CardMedia =
  | { preview?: ReactNode; image?: never }
  | { preview?: never; image: { src: ImageProps["src"]; alt: string; width: number; height: number } };

export type StudioCardProps = CardContent & CardMedia;

function hasContent(value: ReactNode) {
  return value !== undefined && value !== null && typeof value !== "boolean" && value !== "";
}

/** A content card with an indexed shoulder, clipped corner, and offset backing. */
export function StudioCard({
  title,
  description,
  eyebrow,
  icon,
  badge,
  preview,
  image,
  children,
  actions,
  footer,
  variant = "default",
  size = "default",
  headingLevel = 3,
  id,
  className,
}: StudioCardProps) {
  const Heading = headingLevel === 2 ? "h2" : headingLevel === 4 ? "h4" : "h3";
  const hasHeader = hasContent(eyebrow) || hasContent(icon) || hasContent(badge);
  const hasMedia = hasContent(preview) || Boolean(image);

  return (
    <article
      id={id}
      aria-label={title}
      data-studio-card=""
      data-variant={variant}
      data-size={size}
      className={cn(styles.root, className)}
    >
      <div data-card-face="" className={styles.face}>
        {hasHeader && (
          <header className={styles.header}>
            <div className={styles.identity}>
              {hasContent(icon) && <span aria-hidden="true" className={styles.icon}>{icon}</span>}
              {hasContent(eyebrow) && <span className={styles.eyebrow}>{eyebrow}</span>}
            </div>
            {hasContent(badge) && <span className={styles.badge}>{badge}</span>}
          </header>
        )}

        {image ? (
          <div className={styles.imageFrame}>
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} className={styles.image} />
          </div>
        ) : hasContent(preview) ? (
          <div data-card-preview="" className={styles.preview}>{preview}</div>
        ) : null}

        <div className={cn(styles.body, hasMedia && styles.afterMedia, !hasHeader && !hasMedia && styles.withoutHeader)}>
          <Heading className={styles.title}>{title}</Heading>
          {hasContent(description) && <div className={styles.description}>{description}</div>}
          {hasContent(children) && <div className={styles.content}>{children}</div>}
          {hasContent(actions) && <div className={styles.actions}>{actions}</div>}
        </div>

        {hasContent(footer) && <footer className={styles.footer}>{footer}</footer>}
        <span aria-hidden="true" className={styles.corner} />
      </div>
    </article>
  );
}
