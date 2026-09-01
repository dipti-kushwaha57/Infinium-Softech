import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <span className={styles.logo}>Infinium Softech</span>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1>Infinium Softech</h1>
            <p>Next.js project scaffolded — ready to build out the real site.</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; {new Date().getFullYear()} Infinium Softech. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
