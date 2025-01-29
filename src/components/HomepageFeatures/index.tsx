import type {ReactNode} from 'react';
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
    title: 'Fullstack Developer',
    Svg: require('@site/static/img/code.svg').default,
    description: (
      <>
        Starting with C/C++ on simple college projects.
        Learned Java in back-end. At this date, having at least
        20+ languages and frameworks used. Professional experience in at
        least 10 of them.
      </>
    ),
  },
  {
    title: 'Since 2019',
    Svg: require('@site/static/img/books.svg').default,
    description: (
      <>
        Experience on multiple College and Freelance projects.
        Learning technologies from bottom to top. Including assembly. System Analysis and Development
        at IFBA and Computer Science at UNIFACS.
      </>
    ),
  },
  {
    title: 'Using Triple OS',
    Svg: require('@site/static/img/triple-os.svg').default,
    description: (
      <>
        Generic workflow for NixOS, ArchLinux and Windows with Github monorepo.
        Focus on adaptivity. Rights reserved to NixOS Foundation, ArchLinux Foundation and Microsoft from above icons.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
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

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
