"use client";

import { clsx } from "clsx";
import {
  forwardRef,
  useId,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";

/** Код страны */
export interface CountryCode {
  code: string;      // "RU", "UA", etc.
  name: string;      // "Россия", "Украина"
  dialCode: string;  // "+7", "+380"
  flag: string;      // Emoji флаг
  mask: string;      // "### ###-##-##"
  maxLength: number; // Максимальная длина номера без кода
}

/** Предустановленные страны (CIS первыми, затем популярные) */
export const DEFAULT_COUNTRIES: CountryCode[] = [
  // CIS — приоритет для ЦА
  {
    code: "RU",
    name: "Россия",
    dialCode: "+7",
    flag: "🇷🇺",
    mask: "### ###-##-##",
    maxLength: 10,
  },
  {
    code: "UA",
    name: "Украина",
    dialCode: "+380",
    flag: "🇺🇦",
    mask: "## ###-##-##",
    maxLength: 9,
  },
  {
    code: "BY",
    name: "Беларусь",
    dialCode: "+375",
    flag: "🇧🇾",
    mask: "## ###-##-##",
    maxLength: 9,
  },
  {
    code: "KZ",
    name: "Казахстан",
    dialCode: "+7",
    flag: "🇰🇿",
    mask: "### ###-##-##",
    maxLength: 10,
  },
  {
    code: "MD",
    name: "Молдова",
    dialCode: "+373",
    flag: "🇲🇩",
    mask: "## ###-###",
    maxLength: 8,
  },
  // Европа
  {
    code: "DE",
    name: "Германия",
    dialCode: "+49",
    flag: "🇩🇪",
    mask: "### #######",
    maxLength: 10,
  },
  {
    code: "GB",
    name: "Великобритания",
    dialCode: "+44",
    flag: "🇬🇧",
    mask: "#### ######",
    maxLength: 10,
  },
  {
    code: "FR",
    name: "Франция",
    dialCode: "+33",
    flag: "🇫🇷",
    mask: "# ## ## ## ##",
    maxLength: 9,
  },
  {
    code: "PL",
    name: "Польша",
    dialCode: "+48",
    flag: "🇵🇱",
    mask: "### ### ###",
    maxLength: 9,
  },
  {
    code: "RO",
    name: "Румыния",
    dialCode: "+40",
    flag: "🇷🇴",
    mask: "### ### ###",
    maxLength: 9,
  },
  {
    code: "CZ",
    name: "Чехия",
    dialCode: "+420",
    flag: "🇨🇿",
    mask: "### ### ###",
    maxLength: 9,
  },
  // Ближний Восток и Кавказ
  {
    code: "IL",
    name: "Израиль",
    dialCode: "+972",
    flag: "🇮🇱",
    mask: "##-###-####",
    maxLength: 9,
  },
  {
    code: "TR",
    name: "Турция",
    dialCode: "+90",
    flag: "🇹🇷",
    mask: "### ### ## ##",
    maxLength: 10,
  },
  {
    code: "GE",
    name: "Грузия",
    dialCode: "+995",
    flag: "🇬🇪",
    mask: "### ## ## ##",
    maxLength: 9,
  },
  {
    code: "AM",
    name: "Армения",
    dialCode: "+374",
    flag: "🇦🇲",
    mask: "## ###-###",
    maxLength: 8,
  },
  {
    code: "AZ",
    name: "Азербайджан",
    dialCode: "+994",
    flag: "🇦🇿",
    mask: "## ###-##-##",
    maxLength: 9,
  },
  // Средняя Азия
  {
    code: "UZ",
    name: "Узбекистан",
    dialCode: "+998",
    flag: "🇺🇿",
    mask: "## ###-##-##",
    maxLength: 9,
  },
  // США
  {
    code: "US",
    name: "США",
    dialCode: "+1",
    flag: "🇺🇸",
    mask: "(###) ###-####",
    maxLength: 10,
  },
];

interface PhoneInputProps {
  /** Метка над полем */
  label?: string;
  /** Полный номер телефона (с кодом страны) */
  value?: string;
  /** Callback при изменении */
  onChange?: (value: string) => void;
  /** Callback при потере фокуса */
  onBlur?: () => void;
  /** Placeholder для номера */
  placeholder?: string;
  /** Текст ошибки */
  error?: string;
  /** Подсказка под полем */
  helperText?: string;
  /** Обязательное поле */
  required?: boolean;
  /** Отключено */
  disabled?: boolean;
  /** Код страны по умолчанию */
  defaultCountry?: string;
  /** Доступные страны */
  countries?: CountryCode[];
  /** Дополнительные CSS классы */
  className?: string;
  /** Дополнительные CSS классы для контейнера */
  containerClassName?: string;
}

/**
 * Применить маску к номеру телефона
 */
function applyMask(value: string, mask: string): string {
  const digits = value.replace(/\D/g, "");
  let result = "";
  let digitIndex = 0;

  for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
    if (mask[i] === "#") {
      result += digits[digitIndex];
      digitIndex++;
    } else {
      result += mask[i];
    }
  }

  return result;
}

/**
 * Извлечь только цифры из строки
 */
function extractDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * PhoneInput — компонент ввода телефона с выбором страны
 *
 * @example
 * // Базовое использование
 * <PhoneInput
 *   label="Телефон"
 *   value={phone}
 *   onChange={setPhone}
 * />
 *
 * @example
 * // С предустановленной страной
 * <PhoneInput
 *   label="Телефон"
 *   defaultCountry="UA"
 *   value={phone}
 *   onChange={setPhone}
 * />
 *
 * @example
 * // С ошибкой
 * <PhoneInput
 *   label="Телефон"
 *   error="Введите корректный номер"
 *   required
 * />
 */
export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      label,
      value = "",
      onChange,
      onBlur,
      placeholder,
      error,
      helperText,
      required = false,
      disabled = false,
      defaultCountry = "RU",
      countries = DEFAULT_COUNTRIES,
      className,
      containerClassName,
    },
    ref
  ) => {
    const generatedId = useId();
    const errorId = `${generatedId}-error`;
    const helperId = `${generatedId}-helper`;

    // Найти страну по коду или по dialCode в value
    const findCountryByValue = useCallback(
      (val: string): CountryCode => {
        if (!val) {
          return (
            countries.find((c) => c.code === defaultCountry) || countries[0]
          );
        }
        // Ищем страну по dialCode в начале значения
        const country = countries.find((c) => val.startsWith(c.dialCode));
        return country || countries.find((c) => c.code === defaultCountry) || countries[0];
      },
      [countries, defaultCountry]
    );

    // Вычисляем страну из value или используем selectedCountryCode
    const [selectedCountryCode, setSelectedCountryCode] = useState<string>(() => {
      const country = findCountryByValue(value);
      return country.code;
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Получаем текущую страну по коду
    const selectedCountry = useMemo(() => {
      return countries.find((c) => c.code === selectedCountryCode) || countries[0];
    }, [countries, selectedCountryCode]);

    // Вычисляем локальный номер из value
    const localNumber = useMemo(() => {
      if (value && value.startsWith(selectedCountry.dialCode)) {
        return extractDigits(value.slice(selectedCountry.dialCode.length));
      }
      return extractDigits(value);
    }, [value, selectedCountry.dialCode]);

    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const hasError = Boolean(error);
    const hasHelper = Boolean(helperText) && !hasError;

    // Закрытие dropdown при клике вне
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsDropdownOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Перехват wheel-событий внутри dropdown (предотвращает прокрутку страницы)
    useEffect(() => {
      const el = dropdownRef.current;
      if (!el || !isDropdownOpen) return;

      const handleWheel = (e: WheelEvent) => {
        const { scrollTop, scrollHeight, clientHeight } = el;
        const atTop = scrollTop <= 0 && e.deltaY < 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;

        if (!atTop && !atBottom) {
          e.stopPropagation();
        }
        // Всегда предотвращаем всплытие к странице когда dropdown открыт
        e.preventDefault();
        el.scrollTop += e.deltaY;
      };

      el.addEventListener("wheel", handleWheel, { passive: false });
      return () => el.removeEventListener("wheel", handleWheel);
    }, [isDropdownOpen]);

    // Отформатированный номер для отображения
    const displayValue = useMemo(() => {
      return applyMask(localNumber, selectedCountry.mask);
    }, [localNumber, selectedCountry.mask]);

    // Placeholder на основе маски
    const computedPlaceholder = useMemo(() => {
      if (placeholder) return placeholder;
      return selectedCountry.mask.replace(/#/g, "0");
    }, [placeholder, selectedCountry.mask]);

    // Обработчик изменения номера
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const digits = extractDigits(inputValue);

      // Ограничиваем длину
      const limitedDigits = digits.slice(0, selectedCountry.maxLength);

      // Формируем полный номер
      const fullNumber = selectedCountry.dialCode + limitedDigits;
      onChange?.(fullNumber);
    };

    // Выбор страны
    const handleCountrySelect = (country: CountryCode) => {
      setSelectedCountryCode(country.code);
      setIsDropdownOpen(false);

      // Обновляем полный номер с новым кодом
      const fullNumber = country.dialCode + localNumber.slice(0, country.maxLength);
      onChange?.(fullNumber);

      // Фокус на input
      inputRef.current?.focus();
    };

    // Keyboard navigation для dropdown
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    // Классы для контейнера input
    const inputContainerClasses = clsx(
      "flex",
      "border-2 border-[var(--color-line)]",
      "bg-[var(--color-background)]",
      "rounded-none",
      "transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
      // Focus within
      "focus-within:border-[var(--color-text-primary)]",
      "focus-within:ring-2 focus-within:ring-[var(--color-accent)] focus-within:ring-offset-2",
      // Hover
      !disabled && !hasError && "hover:border-[var(--color-line-dark)]",
      // Error
      hasError && [
        "border-red-500",
        "hover:border-red-600",
        "focus-within:border-red-500",
        "focus-within:ring-red-500/20",
      ],
      // Disabled
      disabled && [
        "opacity-50",
        "bg-[var(--color-background-alt)]",
      ]
    );

    // Классы для кнопки выбора страны
    const countryButtonClasses = clsx(
      "flex items-center gap-2",
      "h-11 px-3",
      "border-r-2 border-[var(--color-line)]",
      "bg-[var(--color-background-alt)]",
      "text-[16px]",
      "transition-colors duration-200",
      !disabled && "hover:bg-[var(--color-line)] cursor-pointer",
      disabled && "cursor-not-allowed"
    );

    // Классы для input
    const inputClasses = clsx(
      "flex-1",
      "h-11 px-4",
      "bg-transparent",
      "text-[16px] text-[var(--color-text-primary)]",
      "placeholder:text-[var(--color-text-light)]",
      "focus:outline-none",
      disabled && "cursor-not-allowed",
      className
    );

    // Классы для label
    const labelClasses = clsx(
      "block mb-2",
      "text-[14px] font-medium",
      "tracking-[var(--letter-spacing-wide)]",
      "transition-colors duration-200",
      hasError ? "text-red-500" : "text-[var(--color-text-primary)]",
      disabled && "opacity-50"
    );

    // Классы для dropdown
    const dropdownClasses = clsx(
      "absolute z-50 left-0 mt-1",
      "min-w-[200px] max-w-[calc(100vw-2.5rem)]",
      "bg-[var(--color-background)]",
      "border-2 border-[var(--color-text-primary)]",
      "shadow-lg",
      "max-h-72 overflow-y-scroll overscroll-contain",
      "[touch-action:pan-y] [-webkit-overflow-scrolling:touch]",
      "transition-[opacity,transform] duration-200",
      isDropdownOpen
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-2 pointer-events-none"
    );

    // Классы для helper/error
    const messageClasses = clsx(
      "mt-2 text-[13px]",
      hasError ? "text-red-500" : "text-[var(--color-text-muted)]"
    );

    return (
      <div
        ref={containerRef}
        className={clsx("w-full relative", containerClassName)}
        onKeyDown={handleKeyDown}
      >
        {/* Label */}
        {label && (
          <label htmlFor={generatedId} className={labelClasses}>
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Input Container */}
        <div className={inputContainerClasses}>
          {/* Country Selector */}
          <button
            type="button"
            disabled={disabled}
            className={countryButtonClasses}
            onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Выбрать страну"
            aria-expanded={isDropdownOpen}
          >
            <span className="text-[20px]">{selectedCountry.flag}</span>
            <span className="text-[var(--color-text-primary)] font-medium">
              {selectedCountry.dialCode}
            </span>
            <svg
              className={clsx(
                "w-4 h-4 transition-transform duration-200",
                isDropdownOpen && "rotate-180"
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Phone Input */}
          <input
            ref={(node) => {
              (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            id={generatedId}
            type="tel"
            inputMode="numeric"
            value={displayValue}
            onChange={handleInputChange}
            onBlur={onBlur}
            placeholder={computedPlaceholder}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : hasHelper ? helperId : undefined}
            className={inputClasses}
          />
        </div>

        {/* Country Dropdown */}
        <div ref={dropdownRef} className={dropdownClasses}>
          <ul role="listbox" className="py-1">
            {countries.map((country) => (
              <li
                key={country.code}
                role="option"
                aria-selected={country.code === selectedCountry.code}
                className={clsx(
                  "flex items-center gap-3",
                  "px-4 py-3",
                  "cursor-pointer",
                  "transition-colors duration-150",
                  "hover:bg-[var(--color-background-alt)]",
                  country.code === selectedCountry.code && [
                    "bg-[var(--color-background-alt)]",
                    "text-[var(--color-accent)]",
                  ]
                )}
                onClick={() => handleCountrySelect(country)}
              >
                <span className="text-[20px]">{country.flag}</span>
                <span className="flex-1">{country.name}</span>
                <span className="text-[var(--color-text-muted)]">
                  {country.dialCode}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Error message */}
        {hasError && (
          <p id={errorId} className={messageClasses} role="alert">
            {error}
          </p>
        )}

        {/* Helper text */}
        {hasHelper && (
          <p id={helperId} className={messageClasses}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
