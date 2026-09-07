import Image from "next/image";
import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    title: "Products",
    items: ["AppointGem", "WelzoKart", "MapMyPay", "Truck Guru", "Trekvano", "TextGem"],
  },
  {
    title: "Industries",
    items: ["Logistics", "Healthcare", "Commerce", "Education", "Home services", "Communication"],
  },
  {
    title: "Resources",
    items: ["Customer Stories", "Documentation", "Help Center", "Release Notes", "Webinars", "Status"],
  },
  {
    title: "Company",
    items: ["About Us", "Careers", "Partners", "Contact Sales", "Support"],
  },
];

const LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Security"];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="top">
        <div className="brand">
          <Image src="/brand/logo-light.png" alt="Infinium Softech" width={154} height={35} />
          <p>
            Nine proprietary products. One unified platform. Built for operators across logistics,
            healthcare, commerce, education and services.
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title} className="column">
            <div className="column-title">{col.title}</div>
            <ul>
              {col.items.map((item) => (
                <li key={item}>
                  <Link href="#demo">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bottom">
        <div>© {year} Infinium Softech. All rights reserved.</div>
        <div className="legal">
          {LEGAL_LINKS.map((label) => (
            <Link key={label} href="#demo">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
