import Head from "next/head";
import styled from "styled-components";
import ReactHTMLParser from "react-html-parser";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Movies() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [newestPost, setNewestPost] = useState({
    title: "",
    excerpt: "",
    post_thumbnail: "",
  });
  useEffect(() => {
    (async function () {
      const res = await axios
        .get(`${process.env.API_ROOT}/posts`)
        .then(({ data }) => data)
        .catch((err) => console.log(err));

      const { posts } = res;

      setNewestPost(posts[0]);
      setRecentPosts(posts.slice(1, 4));
    })();
  }, []);

  const { title, excerpt, post_thumbnail } = newestPost;
  return (
    <div>
      <Head>
        <title>RD in NYC | Movies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="hero">
          <h1>Movies</h1>
        </div>
        <div className="posts">
          <Movie>
            <div>Movie Name: {ReactHTMLParser(title)}</div>
            <div>{ReactHTMLParser(excerpt)}</div>
          </Movie>
          <div>
            {recentPosts.map((post) => (
              <Movie key={post.ID}>
                <div>Movie Name: {ReactHTMLParser(post.title)}</div>
                <div>{ReactHTMLParser(post.excerpt)}</div>
              </Movie>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

const Container = styled.div``;

const Movie = styled.div`
  border: 1px solid black;
  background: url(${(props) => props.thumbail});
`;
