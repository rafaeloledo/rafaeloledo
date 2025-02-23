import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";

import Heading from '@theme/Heading'

import styles from './index.module.css'
import Layout from "@theme/Layout";
import ContactFeatures from "../components/ContactFeatures";
import { ReactNode } from "react";

function ContactHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            {`Contact Me`}
          </Heading>
        </div>
      </header>
    </>
  )
}

export default function Contact(): ReactNode {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout
      title={`About Me`}
      description=""
    >
      <ContactHeader />
      <ContactFeatures />
    </Layout>
  )
}
