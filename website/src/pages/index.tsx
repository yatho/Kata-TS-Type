import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

const modules = [
  {
    emoji: "🏷️",
    title: "Branded Types",
    num: "01",
    desc: "Distinguer TicketId de VisitorId — et EUR de USD — pour que le compilateur refuse les confusions d'identifiants.",
    to: "/modules/01-branded-types",
  },
  {
    emoji: "🔀",
    title: "Unions Discriminées",
    num: "02",
    desc: "Modéliser les états d'une attraction pour qu'une attraction fermée ne puisse jamais porter un temps d'attente.",
    to: "/modules/02-discriminated-unions",
  },
  {
    emoji: "✅",
    title: "Exhaustivité",
    num: "03",
    desc: "Remplacer le default silencieux par assertNever pour que tout nouveau cas casse la compilation immédiatement.",
    to: "/modules/03-exhaustiveness",
  },
  {
    emoji: "🔤",
    title: "Template Literal Types",
    num: "04",
    desc: 'Encoder la forme d\'un code de zone ("A-12") dans le type, et supprimer la regex de validation.',
    to: "/modules/04-template-literal-types",
  },
  {
    emoji: "🚫",
    title: "États illégaux",
    num: "05",
    desc: "Rendre impossible de créer un visiteur avec hasWristband=true mais sans wristbandId. Et interdire le panier vide au type.",
    to: "/modules/05-illegal-states",
  },
  {
    emoji: "🛡️",
    title: "Frontière de parsing",
    num: "06",
    desc: "Remplacer le as Ticket par un type predicate qui valide réellement les données à l'entrée du système.",
    to: "/modules/06-parsing-boundary",
  },
];

function ModuleCard({
  emoji,
  title,
  num,
  desc,
  to,
}: (typeof modules)[0]): ReactNode {
  return (
    <div className={clsx("col col--4", styles.moduleCard)}>
      <div className={styles.moduleCardInner}>
        <div className={styles.moduleEmoji}>{emoji}</div>
        <div className={styles.moduleNum}>Module {num}</div>
        <Heading as="h3">{title}</Heading>
        <p>{desc}</p>
        <Link
          className="button button--outline button--primary button--sm"
          to={to}
        >
          Commencer →
        </Link>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Kata TypeScript — rendre les états invalides impossibles à représenter"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <div className={styles.heroEmoji}>🎢</div>
          <Heading as="h1" className="hero__title">
            Type-Driven TS
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link className="button button--secondary button--lg" to="/setup">
              ⚙️ Installation
            </Link>
            <Link
              className="button button--outline button--lg"
              to="/modules/01-branded-types"
              style={{
                marginLeft: "1rem",
                color: "white",
                borderColor: "white",
              }}
            >
              Module 1 →
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.thesis}>
          <div className="container">
            <blockquote className={styles.thesisQuote}>
              <p>
                Chaque <code>??</code> défensif, chaque{" "}
                <code>?.toISOString()</code>, chaque{" "}
                <code>if (cart.length === 0) throw</code> est le symptôme d'un
                type qui <strong>ment</strong>.
                <br />
                Ce kata vous apprend à les éliminer à la source.
              </p>
            </blockquote>
          </div>
        </section>

        <section className={styles.modulesSection}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>
              6 techniques, 6 modules
            </Heading>
            <div className="row">
              {modules.map((m) => (
                <ModuleCard key={m.num} {...m} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.howItWorks}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>
              Comment ça marche
            </Heading>
            <div className="row">
              <div className="col col--4">
                <h3>🔴 Code naïf</h3>
                <p>
                  Chaque module part d'un code TypeScript "classique" —
                  fonctionnel, mais avec des types trop permissifs qui laissent
                  passer des bugs.
                </p>
              </div>
              <div className="col col--4">
                <h3>🔧 Votre refactor</h3>
                <p>
                  Vous modifiez uniquement les types. Les tests Vitest restent
                  verts. La validation ? <code>npm run typecheck</code>.
                </p>
              </div>
              <div className="col col--4">
                <h3>🟢 Le compilateur protège</h3>
                <p>
                  Après refactor, certains bugs ne compilent plus. Zéro overhead
                  runtime — les types n'existent qu'à la compilation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
