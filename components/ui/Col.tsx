import { clsx } from "clsx";

type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";

interface ColProps {
  /** Дочерние элементы */
  children: React.ReactNode;
  /** Количество колонок на Desktop (из 12) */
  span?: ColSpan;
  /** Количество колонок на Tablet (< 1024px) */
  spanTablet?: ColSpan;
  /** Количество колонок на Mobile (< 768px) */
  spanMobile?: ColSpan;
  /** Смещение слева (в колонках) */
  offset?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Смещение на Tablet */
  offsetTablet?: 0 | 1 | 2 | 3 | 4;
  /** Смещение на Mobile */
  offsetMobile?: 0 | 1 | 2;
  /** HTML тег для рендеринга */
  as?: "div" | "article" | "aside" | "li";
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Col — колонка для Grid компонента
 *
 * Span определяет ширину колонки из 12 возможных на Desktop.
 * Можно задать отдельные значения для Tablet и Mobile.
 *
 * @example
 * <Grid>
 *   <Col span={8} spanMobile="full">Основной контент</Col>
 *   <Col span={4} spanMobile="full">Сайдбар</Col>
 * </Grid>
 *
 * @example
 * <Grid>
 *   <Col span={6} offset={3}>Центрированный контент</Col>
 * </Grid>
 */
export function Col({
  children,
  span,
  spanTablet,
  spanMobile,
  offset = 0,
  offsetTablet,
  offsetMobile,
  as: Component = "div",
  className,
}: ColProps) {
  // Маппинг span на Tailwind классы
  const spanClasses: Record<ColSpan, string> = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12",
    full: "col-span-full",
  };

  // Маппинг offset на Tailwind классы
  const offsetClasses: Record<number, string> = {
    0: "",
    1: "col-start-2",
    2: "col-start-3",
    3: "col-start-4",
    4: "col-start-5",
    5: "col-start-6",
    6: "col-start-7",
  };

  // Tablet span классы
  const spanTabletClasses: Record<ColSpan, string> = {
    1: "max-lg:col-span-1",
    2: "max-lg:col-span-2",
    3: "max-lg:col-span-3",
    4: "max-lg:col-span-4",
    5: "max-lg:col-span-5",
    6: "max-lg:col-span-6",
    7: "max-lg:col-span-7",
    8: "max-lg:col-span-8",
    9: "max-lg:col-span-8",
    10: "max-lg:col-span-8",
    11: "max-lg:col-span-8",
    12: "max-lg:col-span-8",
    full: "max-lg:col-span-full",
  };

  // Mobile span классы
  const spanMobileClasses: Record<ColSpan, string> = {
    1: "max-md:col-span-1",
    2: "max-md:col-span-2",
    3: "max-md:col-span-3",
    4: "max-md:col-span-4",
    5: "max-md:col-span-4",
    6: "max-md:col-span-4",
    7: "max-md:col-span-4",
    8: "max-md:col-span-4",
    9: "max-md:col-span-4",
    10: "max-md:col-span-4",
    11: "max-md:col-span-4",
    12: "max-md:col-span-4",
    full: "max-md:col-span-full",
  };

  const classes = clsx(
    span && spanClasses[span],
    spanTablet && spanTabletClasses[spanTablet],
    spanMobile && spanMobileClasses[spanMobile],
    // Если span не указан на mobile, по умолчанию full
    !spanMobile && span && "max-md:col-span-full",
    offset > 0 && offsetClasses[offset],
    offsetTablet !== undefined && offsetTablet > 0 && `max-lg:col-start-${offsetTablet + 1}`,
    offsetMobile !== undefined && offsetMobile > 0 && `max-md:col-start-${offsetMobile + 1}`,
    // Сброс offset на mobile если не указан
    offsetMobile === undefined && offset > 0 && "max-md:col-start-1",
    className
  );

  return <Component className={classes}>{children}</Component>;
}

export default Col;
