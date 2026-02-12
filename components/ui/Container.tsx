import { clsx } from "clsx";

interface ContainerProps {
  /** Дочерние элементы */
  children: React.ReactNode;
  /** Размер контейнера */
  size?: "sm" | "default" | "lg";
  /** HTML тег для рендеринга */
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Container — компонент контейнера с max-width и боковыми отступами
 *
 * Размеры:
 * - sm: max-width 960px
 * - default: max-width 1280px
 * - lg: max-width 1440px
 *
 * @example
 * <Container>
 *   <h1>Контент</h1>
 * </Container>
 *
 * @example
 * <Container size="lg" as="section">
 *   <Grid>...</Grid>
 * </Container>
 */
export function Container({
  children,
  size = "default",
  as: Component = "div",
  className,
}: ContainerProps) {
  const classes = clsx(
    "w-full mx-auto",
    "px-8 lg:px-16 xl:px-24",
    size === "sm" && "max-w-[var(--container-max-width-sm)]",
    size === "default" && "max-w-[var(--container-max-width)]",
    size === "lg" && "max-w-[var(--container-max-width-lg)]",
    className
  );

  return <Component className={classes}>{children}</Component>;
}

export default Container;
