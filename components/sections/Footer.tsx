import Link from "next/link";
import { a11y, contact, footer, nav, site } from "@/content";

const year = new Date().getFullYear();

const footerLink =
  "text-body text-text-secondary break-keep transition-colors duration-200 ease-apple " +
  "hover:text-text focus-visible:outline-none focus-visible:rounded-sm-el " +
  "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-bg";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg py-20 md:py-30">
      <div className="mx-auto w-full max-w-content px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          <div>
            <p className="text-body-l break-keep md:text-body-l-lg">
              {site.brand}
            </p>
            <p className="mt-3 max-w-[40ch] text-caption text-text-secondary break-keep">
              {site.brandTagline}
            </p>
          </div>

          <nav aria-label={a11y.footerNavLabel}>
            <p className="text-caption text-text-secondary break-keep">
              {footer.navLabel}
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-caption text-text-secondary break-keep">
              {footer.contactLabel}
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {/* 주소가 아직 없는 채널(href: null)은 푸터에 노출하지 않는다 */}
              {contact.channels
                .filter((channel) => channel.href)
                .map((channel) => (
                  <li key={channel.id}>
                    <a href={channel.href ?? undefined} className={footerLink}>
                      {channel.value}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <p className="mt-16 text-caption text-text-secondary break-keep">
          © {year} {footer.copyrightName}
        </p>
      </div>
    </footer>
  );
}
