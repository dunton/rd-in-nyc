import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Signup() {
  return (
    <div className={styles.container}>
      <Head>
        <title>RD in NYC | Signup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Sign up</h1>
      </main>
    </div>
  );
}
