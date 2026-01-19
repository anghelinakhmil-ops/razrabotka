"use client";

import { clsx } from "clsx";
import { forwardRef, useId } from "react";

interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "size"> {
  /** Текст метки */
  label?: string;
  /** Значение radio */
  value: string;
  /** Состояние checked */
  checked?: boolean;
  /** Callback при изменении */
  onChange?: (value: string) => void;
  /** Имя группы */
  name: string;
  /** Текст ошибки */
  error?: string;
  /** Размер radio */
  size?: "sm" | "md" | "lg";
  /** Дополнительные CSS классы для контейнера */
  containerClassName?: string;
}

/**
 * Radio — кастомная радио-кнопка с анимацией
 *
 * @example
 * // Базовое использование
 * <Radio
 *   name="plan"
 *   value="basic"
 *   label="Базовый план"
 *   checked={plan === "basic"}
 *   onChange={setPlan}
 * />
 *
 * @example
 * // Группа радио-кнопок
 * <div className="flex flex-col gap-3">
 *   <Radio name="type" value="expert" label="Сайт для эксперта" checked={type === "expert"} onChange={setType} />
 *   <Radio name="type" value="ecommerce" label="Интернет-магазин" checked={type === "ecommerce"} onChange={setType} />
 *   <Radio name="type" value="landing" label="Лендинг" checked={type === "landing"} onChange={setType} />
 * </div>
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      value,
      checked = false,
      onChange,
      name,
      error,
      size = "md",
      disabled = false,
      className,
      containerClassName,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;

    const hasError = Boolean(error);

    // Размеры
    const sizeConfig = {
      sm: { box: "w-4 h-4", dot: "w-1.5 h-1.5", text: "text-[14px]" },
      md: { box: "w-5 h-5", dot: "w-2 h-2", text: "text-[16px]" },
      lg: { box: "w-6 h-6", dot: "w-2.5 h-2.5", text: "text-[18px]" },
    };

    const handleChange = () => {
      onChange?.(value);
    };

    // Классы для контейнера
    const containerClasses = clsx(
      "inline-flex items-center gap-3",
      disabled && "opacity-50 cursor-not-allowed",
      containerClassName
    );

    // Классы для кастомной радио-кнопки
    const radioClasses = clsx(
      // Размер
      sizeConfig[size].box,
      // Базовые стили
      "relative shrink-0",
      "border-2 border-[var(--color-line-dark)]",
      "bg-[var(--color-background)]",
      "rounded-full",
      "transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
      // Hover
      !disabled && "group-hover:border-[var(--color-text-primary)]",
      // Checked
      checked && "border-[var(--color-accent)]",
      // Error
      hasError && !checked && "border-red-500",
      className
    );

    // Классы для внутренней точки
    const dotClasses = clsx(
      sizeConfig[size].dot,
      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      "bg-[var(--color-accent)]",
      "rounded-full",
      "transition-all duration-200",
      checked ? "opacity-100 scale-100" : "opacity-0 scale-0"
    );

    // Классы для label
    const labelClasses = clsx(
      sizeConfig[size].text,
      "select-none",
      "text-[var(--color-text-primary)]",
      !disabled && "cursor-pointer"
    );

    return (
      <div className={clsx("w-fit", containerClassName)}>
        <label className={containerClasses}>
          {/* Скрытый нативный input */}
          <input
            ref={ref}
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            aria-describedby={hasError ? errorId : undefined}
            className="peer sr-only"
            {...props}
          />

          {/* Кастомная радио-кнопка */}
          <span
            className={clsx(
              radioClasses,
              "group",
              // Focus ring через peer
              "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-accent)] peer-focus-visible:ring-offset-2"
            )}
          >
            {/* Внутренняя точка */}
            <span className={dotClasses} />
          </span>

          {/* Label */}
          {label && <span className={labelClasses}>{label}</span>}
        </label>

        {/* Error message */}
        {hasError && (
          <p id={errorId} className="mt-1 text-[13px] text-red-500 ml-8" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";

/**
 * RadioGroup — контейнер для группы Radio кнопок
 */
interface RadioGroupProps {
  /** Имя группы */
  name: string;
  /** Текущее выбранное значение */
  value?: string;
  /** Callback при изменении */
  onChange?: (value: string) => void;
  /** Метка группы */
  label?: string;
  /** Текст ошибки */
  error?: string;
  /** Направление */
  direction?: "horizontal" | "vertical";
  /** Дочерние Radio компоненты */
  children: React.ReactNode;
  /** Дополнительные CSS классы */
  className?: string;
}

export function RadioGroup({
  name,
  value,
  onChange,
  label,
  error,
  direction = "vertical",
  children,
  className,
}: RadioGroupProps) {
  const generatedId = useId();
  const errorId = `${generatedId}-error`;
  const hasError = Boolean(error);

  return (
    <fieldset className={clsx("w-full", className)}>
      {/* Legend/Label */}
      {label && (
        <legend
          className={clsx(
            "mb-3 text-[14px] font-medium",
            "tracking-[var(--letter-spacing-wide)]",
            hasError ? "text-red-500" : "text-[var(--color-text-primary)]"
          )}
        >
          {label}
        </legend>
      )}

      {/* Radio items */}
      <div
        role="radiogroup"
        aria-describedby={hasError ? errorId : undefined}
        className={clsx(
          "flex",
          direction === "vertical" ? "flex-col gap-3" : "flex-row flex-wrap gap-4"
        )}
      >
        {/* Клонируем children и передаем name, value, onChange */}
        {Array.isArray(children)
          ? children.map((child, index) => {
              if (
                child &&
                typeof child === "object" &&
                "type" in child &&
                child.type === Radio
              ) {
                return (
                  <Radio
                    key={child.props.value || index}
                    {...child.props}
                    name={name}
                    checked={child.props.value === value}
                    onChange={onChange}
                  />
                );
              }
              return child;
            })
          : children}
      </div>

      {/* Error message */}
      {hasError && (
        <p id={errorId} className="mt-2 text-[13px] text-red-500" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export default Radio;
