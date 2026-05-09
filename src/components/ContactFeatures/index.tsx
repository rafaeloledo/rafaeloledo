import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Email',
    Svg: require('@site/static/img/email-outline.svg').default,
    description: (
      <a href="mailto:rafaeloliveiraledo@gmail.com" className={styles.contactLink}>
        rafaeloliveiraledo@gmail.com
      </a>
    ),
  },
  {
    title: 'WhatsApp',
    Svg: require('@site/static/img/whatsapp.svg').default,
    description: (
      <a href="https://wa.me/5571981059738" className={styles.contactLink} target="_blank" rel="noopener noreferrer">
        +55 71 98105-9738
      </a>
    ),
  },
  {
    title: 'LinkedIn',
    Svg: require('@site/static/img/social-linkedin.svg').default,
    description: (
      <a href="https://linkedin.com/in/rafaeloledo" className={styles.contactLink} target="_blank" rel="noopener noreferrer">
        linkedin.com/in/rafaeloledo
      </a>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function ContactFeatures(): ReactNode {
  return (
    <>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
