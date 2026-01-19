import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | WebStudio",
  description:
    "Политика конфиденциальности WebStudio. Информация о сборе, использовании и защите персональных данных пользователей.",
  openGraph: {
    title: "Политика конфиденциальности | WebStudio",
    description: "Политика конфиденциальности и обработки персональных данных.",
    type: "website",
  },
};

/**
 * Privacy Page — страница политики конфиденциальности
 */
export default function PrivacyPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-[var(--color-background)]">
        <Container size="sm">
          <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
            Правовая информация
          </span>

          <h1 className="mb-6">
            <BrokenText
              text="ПОЛИТИКА"
              spaced
              mixPattern={[2, 5]}
              className="text-h1 font-display font-bold text-[var(--color-text-primary)]"
            />
            <span className="block text-h2 font-display font-bold text-[var(--color-text-secondary)] mt-2">
              конфиденциальности
            </span>
          </h1>

          <p className="text-body text-[var(--color-text-muted)]">
            Последнее обновление: 19 января 2026 года
          </p>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
        <Container size="sm">
          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <PolicySection number="01" title="Общие положения">
              <p>
                Настоящая Политика конфиденциальности (далее — «Политика») определяет
                порядок обработки и защиты персональных данных пользователей сайта
                webstudio.dev (далее — «Сайт»), принадлежащего WebStudio (далее —
                «Компания», «мы», «нас»).
              </p>
              <p>
                Используя Сайт и предоставляя нам свои персональные данные, вы
                подтверждаете своё согласие с условиями настоящей Политики.
              </p>
            </PolicySection>

            {/* Section 2 */}
            <PolicySection number="02" title="Какие данные мы собираем">
              <p>Мы можем собирать следующие категории персональных данных:</p>
              <ul>
                <li>
                  <strong>Контактные данные:</strong> имя, адрес электронной почты,
                  номер телефона, Telegram-аккаунт
                </li>
                <li>
                  <strong>Данные о проекте:</strong> тип сайта, цели, бюджет, сроки,
                  референсы и другая информация, предоставленная в формах заявок
                </li>
                <li>
                  <strong>Технические данные:</strong> IP-адрес, тип браузера,
                  операционная система, данные об устройстве
                </li>
                <li>
                  <strong>Данные об использовании:</strong> страницы, которые вы
                  посещаете, время визита, источник перехода
                </li>
              </ul>
            </PolicySection>

            {/* Section 3 */}
            <PolicySection number="03" title="Цели обработки данных">
              <p>Мы используем ваши персональные данные для:</p>
              <ul>
                <li>Обработки заявок и связи с вами по вопросам сотрудничества</li>
                <li>Предоставления информации о наших услугах</li>
                <li>Подготовки коммерческих предложений</li>
                <li>Улучшения качества Сайта и наших услуг</li>
                <li>Анализа посещаемости и поведения пользователей</li>
                <li>Выполнения требований законодательства</li>
              </ul>
            </PolicySection>

            {/* Section 4 */}
            <PolicySection number="04" title="Правовые основания обработки">
              <p>Мы обрабатываем ваши персональные данные на основании:</p>
              <ul>
                <li>Вашего согласия (при заполнении форм на Сайте)</li>
                <li>
                  Необходимости исполнения договора или совершения действий по вашему
                  запросу до заключения договора
                </li>
                <li>Наших законных интересов (улучшение услуг, безопасность)</li>
                <li>Выполнения юридических обязательств</li>
              </ul>
            </PolicySection>

            {/* Section 5 */}
            <PolicySection number="05" title="Передача данных третьим лицам">
              <p>
                Мы не продаём и не передаём ваши персональные данные третьим лицам,
                за исключением следующих случаев:
              </p>
              <ul>
                <li>
                  <strong>Сервисы аналитики:</strong> Google Analytics для анализа
                  посещаемости (данные анонимизированы)
                </li>
                <li>
                  <strong>Хостинг-провайдер:</strong> Vercel для размещения Сайта
                </li>
                <li>
                  <strong>Email-сервисы:</strong> для отправки уведомлений о заявках
                </li>
                <li>
                  <strong>По требованию закона:</strong> если это необходимо для
                  выполнения требований законодательства
                </li>
              </ul>
            </PolicySection>

            {/* Section 6 */}
            <PolicySection number="06" title="Файлы cookie">
              <p>
                Сайт использует файлы cookie для обеспечения корректной работы и
                улучшения пользовательского опыта:
              </p>
              <ul>
                <li>
                  <strong>Необходимые cookie:</strong> обеспечивают работу основных
                  функций Сайта
                </li>
                <li>
                  <strong>Аналитические cookie:</strong> помогают понять, как
                  пользователи взаимодействуют с Сайтом
                </li>
              </ul>
              <p>
                Вы можете отключить cookie в настройках браузера, однако это может
                повлиять на функциональность Сайта.
              </p>
            </PolicySection>

            {/* Section 7 */}
            <PolicySection number="07" title="Защита данных">
              <p>
                Мы принимаем технические и организационные меры для защиты ваших
                персональных данных:
              </p>
              <ul>
                <li>Использование защищённого протокола HTTPS</li>
                <li>Ограничение доступа к персональным данным</li>
                <li>Регулярное обновление программного обеспечения</li>
                <li>Резервное копирование данных</li>
              </ul>
            </PolicySection>

            {/* Section 8 */}
            <PolicySection number="08" title="Сроки хранения данных">
              <p>Мы храним ваши персональные данные в течение:</p>
              <ul>
                <li>Данные заявок — 3 года с момента последнего обращения</li>
                <li>
                  Данные клиентов — в течение срока действия договора и 5 лет после
                  его завершения
                </li>
                <li>Данные аналитики — до 26 месяцев</li>
              </ul>
              <p>
                По истечении указанных сроков данные удаляются или обезличиваются.
              </p>
            </PolicySection>

            {/* Section 9 */}
            <PolicySection number="09" title="Ваши права">
              <p>Вы имеете право:</p>
              <ul>
                <li>Запросить информацию о ваших персональных данных</li>
                <li>Исправить неточные данные</li>
                <li>Удалить ваши персональные данные</li>
                <li>Ограничить обработку данных</li>
                <li>Отозвать согласие на обработку данных</li>
                <li>Получить копию ваших данных в машиночитаемом формате</li>
              </ul>
              <p>
                Для реализации этих прав свяжитесь с нами по адресу{" "}
                <a
                  href="mailto:privacy@webstudio.dev"
                  className="text-[var(--color-text-primary)] underline hover:no-underline"
                >
                  privacy@webstudio.dev
                </a>
              </p>
            </PolicySection>

            {/* Section 10 */}
            <PolicySection number="10" title="Изменения в Политике">
              <p>
                Мы можем обновлять настоящую Политику время от времени. Актуальная
                версия всегда доступна на этой странице с указанием даты последнего
                обновления.
              </p>
              <p>
                При существенных изменениях мы уведомим вас через Сайт или по
                электронной почте.
              </p>
            </PolicySection>

            {/* Section 11 */}
            <PolicySection number="11" title="Контактная информация">
              <p>
                По вопросам, связанным с обработкой персональных данных, вы можете
                связаться с нами:
              </p>
              <ul>
                <li>
                  Email:{" "}
                  <a
                    href="mailto:privacy@webstudio.dev"
                    className="text-[var(--color-text-primary)] underline hover:no-underline"
                  >
                    privacy@webstudio.dev
                  </a>
                </li>
                <li>
                  Телефон:{" "}
                  <a
                    href="tel:+79991234567"
                    className="text-[var(--color-text-primary)] underline hover:no-underline"
                  >
                    +7 (999) 123-45-67
                  </a>
                </li>
                <li>Адрес: Москва, ул. Примерная, д. 1, офис 100</li>
              </ul>
            </PolicySection>
          </div>
        </Container>
      </section>
    </main>
  );
}

/**
 * PolicySection — секция политики
 */
function PolicySection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12 last:mb-0">
      <div className="flex items-start gap-4 mb-4">
        <span className="text-h3 font-display font-bold text-[var(--color-line-dark)]">
          {number}
        </span>
        <h2 className="text-h3 font-display font-bold text-[var(--color-text-primary)]">
          {title}
        </h2>
      </div>
      <div className="pl-0 lg:pl-16 space-y-4 text-body text-[var(--color-text-secondary)] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-[var(--color-text-secondary)] [&_strong]:text-[var(--color-text-primary)] [&_strong]:font-medium">
        {children}
      </div>
    </div>
  );
}
