import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Blog() {
  return (
    <div className={styles.container}>
      <Head>
        <title>RD in NYC | Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Blog</h1>
      </main>
    </div>
  );
}
