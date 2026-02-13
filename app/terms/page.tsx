import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";

export const metadata: Metadata = {
  title: "Условия использования | WebStudio",
  description:
    "Условия использования сайта WebStudio. Правила пользования сайтом, ограничения ответственности и порядок разрешения споров.",
  openGraph: {
    title: "Условия использования | WebStudio",
    description: "Условия использования сайта и правила пользования услугами.",
    type: "website",
  },
};

/**
 * Terms Page — страница условий использования
 */
export default function TermsPage() {
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
              text="УСЛОВИЯ"
              spaced
              mixPattern={[2, 4]}
              className="text-h1 font-display font-bold text-[var(--color-text-primary)]"
            />
            <span className="block text-h2 font-display font-bold text-[var(--color-text-secondary)] mt-2">
              использования
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
            <TermsSection number="01" title="Общие положения">
              <p>
                Настоящие Условия использования (далее — «Условия») регулируют
                порядок использования сайта webstudio.dev (далее — «Сайт»),
                принадлежащего WebStudio (далее — «Компания», «мы»).
              </p>
              <p>
                Используя Сайт, вы подтверждаете, что прочитали, поняли и согласны
                соблюдать настоящие Условия. Если вы не согласны с какими-либо
                положениями, пожалуйста, прекратите использование Сайта.
              </p>
            </TermsSection>

            {/* Section 2 */}
            <TermsSection number="02" title="Описание услуг">
              <p>Компания предоставляет следующие услуги:</p>
              <ul>
                <li>Разработка веб-сайтов под ключ</li>
                <li>Дизайн пользовательских интерфейсов</li>
                <li>Техническая поддержка и сопровождение сайтов</li>
                <li>Консультации по веб-разработке</li>
              </ul>
              <p>
                Подробная информация об услугах, их стоимости и сроках
                предоставляется по запросу и фиксируется в индивидуальном договоре.
              </p>
            </TermsSection>

            {/* Section 3 */}
            <TermsSection number="03" title="Использование Сайта">
              <p>При использовании Сайта вы обязуетесь:</p>
              <ul>
                <li>Предоставлять достоверную информацию в формах заявок</li>
                <li>Не нарушать права интеллектуальной собственности</li>
                <li>Не использовать Сайт для незаконных целей</li>
                <li>Не пытаться получить несанкционированный доступ к системам</li>
                <li>Не распространять вредоносное программное обеспечение</li>
                <li>Не создавать помехи в работе Сайта</li>
              </ul>
            </TermsSection>

            {/* Section 4 */}
            <TermsSection number="04" title="Интеллектуальная собственность">
              <p>
                Все материалы, размещённые на Сайте, включая тексты, графику,
                логотипы, изображения, дизайн и код, являются интеллектуальной
                собственностью Компании или её партнёров и защищены законодательством
                об авторском праве.
              </p>
              <p>Без письменного разрешения Компании запрещается:</p>
              <ul>
                <li>Копировать и воспроизводить материалы Сайта</li>
                <li>Модифицировать или создавать производные работы</li>
                <li>Распространять материалы в коммерческих целях</li>
                <li>Использовать логотип и фирменный стиль Компании</li>
              </ul>
            </TermsSection>

            {/* Section 5 */}
            <TermsSection number="05" title="Порядок оказания услуг">
              <p>
                Оказание услуг осуществляется на основании договора, заключаемого
                между Компанией и Заказчиком. Договор определяет:
              </p>
              <ul>
                <li>Объём и состав работ</li>
                <li>Сроки выполнения</li>
                <li>Стоимость и порядок оплаты</li>
                <li>Права и обязанности сторон</li>
                <li>Порядок приёмки работ</li>
                <li>Гарантийные обязательства</li>
              </ul>
              <p>
                Заявка на Сайте не является офертой или договором. Она служит
                основанием для начала переговоров и подготовки коммерческого
                предложения.
              </p>
            </TermsSection>

            {/* Section 6 */}
            <TermsSection number="06" title="Оплата услуг">
              <p>Условия оплаты определяются индивидуально и могут включать:</p>
              <ul>
                <li>Предоплату (обычно 50% от стоимости проекта)</li>
                <li>Поэтапную оплату по мере выполнения работ</li>
                <li>Финальный платёж после сдачи проекта</li>
              </ul>
              <p>
                Способы оплаты: банковский перевод, оплата по счёту для юридических
                лиц. Подробности уточняйте при обсуждении проекта.
              </p>
            </TermsSection>

            {/* Section 7 */}
            <TermsSection number="07" title="Ограничение ответственности">
              <p>
                Компания прилагает все усилия для обеспечения корректной работы
                Сайта, однако не гарантирует:
              </p>
              <ul>
                <li>Бесперебойную работу Сайта</li>
                <li>Отсутствие технических ошибок</li>
                <li>Совместимость со всеми устройствами и браузерами</li>
                <li>Защиту от всех возможных угроз безопасности</li>
              </ul>
              <p>
                Компания не несёт ответственности за любые убытки, возникшие в
                результате использования или невозможности использования Сайта.
              </p>
            </TermsSection>

            {/* Section 8 */}
            <TermsSection number="08" title="Отказ от гарантий">
              <p>
                Информация на Сайте предоставляется «как есть» без каких-либо
                гарантий, явных или подразумеваемых. Компания не гарантирует:
              </p>
              <ul>
                <li>Актуальность и полноту представленной информации</li>
                <li>Соответствие услуг конкретным ожиданиям</li>
                <li>Достижение определённых бизнес-результатов</li>
              </ul>
              <p>
                Конкретные гарантии фиксируются в индивидуальном договоре на
                оказание услуг.
              </p>
            </TermsSection>

            {/* Section 9 */}
            <TermsSection number="09" title="Ссылки на сторонние ресурсы">
              <p>
                Сайт может содержать ссылки на сторонние веб-сайты и сервисы.
                Компания не контролирует содержание этих ресурсов и не несёт
                ответственности за:
              </p>
              <ul>
                <li>Содержание сторонних сайтов</li>
                <li>Политику конфиденциальности сторонних сайтов</li>
                <li>Любой ущерб от использования сторонних сервисов</li>
              </ul>
            </TermsSection>

            {/* Section 10 */}
            <TermsSection number="10" title="Изменение Условий">
              <p>
                Компания оставляет за собой право изменять настоящие Условия в
                любое время. Изменения вступают в силу с момента публикации на
                Сайте.
              </p>
              <p>
                Продолжая использовать Сайт после внесения изменений, вы
                подтверждаете своё согласие с обновлёнными Условиями.
              </p>
            </TermsSection>

            {/* Section 11 */}
            <TermsSection number="11" title="Применимое право">
              <p>
                Настоящие Условия регулируются законодательством Российской
                Федерации. Все споры, возникающие в связи с использованием Сайта,
                подлежат разрешению в соответствии с действующим законодательством.
              </p>
              <p>
                Стороны обязуются предпринять все усилия для разрешения споров путём
                переговоров до обращения в суд.
              </p>
            </TermsSection>

            {/* Section 12 */}
            <TermsSection number="12" title="Контактная информация">
              <p>
                По вопросам, связанным с настоящими Условиями, вы можете связаться с
                нами:
              </p>
              <ul>
                <li>
                  Email:{" "}
                  <a
                    href="mailto:anghelinakhmil@gmail.com"
                    className="text-[var(--color-text-primary)] underline hover:no-underline"
                  >
                    anghelinakhmil@gmail.com
                  </a>
                </li>
                <li>
                  Телефон:{" "}
                  <a
                    href="tel:+37376966746"
                    className="text-[var(--color-text-primary)] underline hover:no-underline"
                  >
                    +373 76 966 746
                  </a>
                </li>
              </ul>
            </TermsSection>
          </div>
        </Container>
      </section>
    </main>
  );
}

/**
 * TermsSection — секция условий
 */
function TermsSection({
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
