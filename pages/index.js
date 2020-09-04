import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>RD in NYC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>life</h1>
      </div>
      <div>
        <Link href="/movies">
          <h1>Movies</h1>
        </Link>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  div {
    width: 50%;
  }
`;
