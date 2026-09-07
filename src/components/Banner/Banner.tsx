import Image from "next/image";
import Link from "next/link";
import "./Banner.scss";

const STAT_CARDS = [
  {
    id: "appointgem",
    mark: "AG",
    tint: "#1F31E8",
    name: "AppointGem",
    value: "18,412",
    label: "bookings this month",
    className: "stat-card-one",
  },
  {
    id: "truckguru",
    mark: "TG",
    tint: "#E8A21F",
    name: "Truck Guru",
    value: "482",
    label: "trucks on road now",
    className: "stat-card-two",
  },
];

export function Banner() {
  return (
    <section className="banner">
      <div className="glow" aria-hidden="true" />

      <div className="content">
        <div className="eyebrow">
          <span className="eyebrow-dot" />
          Product ecosystem
          <span className="eyebrow-pill">9 products. One platform.</span>
        </div>

        <h1 className="headline">
          One Platform. Multiple Industries. <span className="accent">Infinite Possibilities.</span>
        </h1>

        <p className="lede">
          From logistics and healthcare to commerce and education, Infinium Softech powers businesses
          with intelligent digital products designed to scale.
        </p>

        <div className="actions">
          <Link href="#demo" className="primary-cta">
            Book Live Demo <span aria-hidden="true">→</span>
          </Link>
          <Link href="#products" className="secondary-cta">
            Explore Products
          </Link>
        </div>
      </div>

      <div className="deck">
        <div className="deck-image">
          <Image
            src="/brand/hero-platform.png"
            alt="Infinium Softech platform dashboard"
            width={1976}
            height={962}
            sizes="(min-width: 1024px) 992px, 100vw"
            priority
          />
        </div>

        {STAT_CARDS.map((card) => (
          <div key={card.id} className={`stat-card ${card.className}`}>
            <div className="stat-card-head">
              <span className="stat-card-mark" style={{ background: card.tint }}>
                {card.mark}
              </span>
              <span>{card.name}</span>
            </div>
            <div className="stat-card-value">{card.value}</div>
            <div className="stat-card-label">{card.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
