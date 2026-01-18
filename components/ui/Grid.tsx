import { clsx } from "clsx";

interface GridProps {
  /** Дочерние элементы (Col компоненты) */
  children: React.ReactNode;
  /** Количество колонок (переопределяет CSS переменную) */
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  /** Количество колонок на tablet */
  colsTablet?: 1 | 2 | 3 | 4 | 6 | 8;
  /** Количество колонок на mobile */
  colsMobile?: 1 | 2 | 4;
  /** Gap между элементами */
  gap?: "sm" | "default" | "lg" | "xl";
  /** Вертикальное выравнивание */
  alignItems?: "start" | "center" | "end" | "stretch";
  /** HTML тег для рендеринга */
  as?: "div" | "section" | "ul";
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Grid — компонент 12-колоночной сетки
 *
 * По умолчанию:
 * - Desktop: 12 колонок
 * - Tablet (< 1024px): 8 колонок
 * - Mobile (< 768px): 4 колонки
 *
 * @example
 * <Grid>
 *   <Col span={6}>Левая колонка</Col>
 *   <Col span={6}>Правая колонка</Col>
 * </Grid>
 *
 * @example
 * <Grid cols={3} gap="lg">
 *   <Col>Карточка 1</Col>
 *   <Col>Карточка 2</Col>
 *   <Col>Карточка 3</Col>
 * </Grid>
 */
export function Grid({
  children,
  cols,
  // colsTablet и colsMobile зарезервированы для будущего использования
  // colsTablet,
  // colsMobile,
  gap = "default",
  alignItems = "stretch",
  as: Component = "div",
  className,
}: GridProps) {
  const gapClasses = {
    sm: "gap-[var(--grid-gutter-sm)]",
    default: "gap-[var(--grid-gutter)]",
    lg: "gap-[var(--element-gap-lg)]",
    xl: "gap-[var(--element-gap-xl)]",
  };

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  // Формируем grid-template-columns
  const getGridCols = (num: number) => `repeat(${num}, minmax(0, 1fr))`;

  const style: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: cols
      ? getGridCols(cols)
      : `repeat(var(--grid-columns), minmax(0, 1fr))`,
  };

  const classes = clsx(
    gapClasses[gap],
    alignClasses[alignItems],
    // Responsive grid columns через CSS classes
    !cols && "grid-cols-[repeat(var(--grid-columns),minmax(0,1fr))]",
    !cols && "max-lg:grid-cols-[repeat(var(--grid-columns-tablet),minmax(0,1fr))]",
    !cols && "max-md:grid-cols-[repeat(var(--grid-columns-mobile),minmax(0,1fr))]",
    // Explicit cols override
    cols === 1 && "grid-cols-1",
    cols === 2 && "grid-cols-2 max-md:grid-cols-1",
    cols === 3 && "grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1",
    cols === 4 && "grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1",
    cols === 6 && "grid-cols-6 max-lg:grid-cols-3 max-md:grid-cols-2",
    cols === 12 && "grid-cols-12 max-lg:grid-cols-8 max-md:grid-cols-4",
    className
  );

  return (
    <Component className={classes} style={!cols ? style : undefined}>
      {children}
    </Component>
  );
}

export default Grid;
