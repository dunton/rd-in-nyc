import Head from "next/head";
import styled from "styled-components";
import ReactHTMLParser from "react-html-parser";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Movies() {
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async function () {
      const res = await axios
        .get(`${process.env.API_ROOT}/posts`)
        .then(({ data }) => data)
        .catch((err) => console.log(err));

      const { posts } = res;

      setPosts(posts);
      setDisplayedPosts(posts);
    })();
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);

    const { value } = e.target;

    const filteredPosts = posts.filter((post) => {
      for (let tag in post.tags) {
        if (tag.toLowerCase().includes(value.toLowerCase())) {
          return post;
        }
      }
    });

    setDisplayedPosts(filteredPosts);
  };

  return (
    <div>
      <Head>
        <title>RD in NYC | Movies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="hero">
          <img
            src="https://rdinnyc.files.wordpress.com/2020/09/6a00d8341c6e6853ef0240a4567ba1200c.jpg"
            alt="Pierre Le Fou"
          />
          <div>
            <h2>Movie Thoughts</h2>
            <p>This is where I write my thoughts on movies and I LOVE movies</p>
          </div>
        </div>
        <div className="search">
          <input placeholder="Search reviews" onChange={handleChange} />
        </div>
        <div className="posts">
          {displayedPosts.map(({ title, excerpt, ID, tags }) => (
            <Movie key={ID}>
              <div>
                <div>{ReactHTMLParser(title)}</div>
                <div>{ReactHTMLParser(excerpt)}</div>
                <div>
                  Tags:
                  {tags &&
                    Object.keys(tags).map((tag, i) => (
                      <div className="tag" key={`tag-${i}`}>
                        {ReactHTMLParser(tag)}
                      </div>
                    ))}
                </div>
              </div>
            </Movie>
          ))}
        </div>
      </Container>
    </div>
  );
}

const Container = styled.div`
  .hero {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    img {
      width: 60%;
    }
    div {
      padding: 20px;
      h2,
      p {
        margin: 0;
        padding: 0;
      }

      h2 {
        margin-bottom: 15px;
      }
    }
  }
  .search {
    width: 70%;
    margin: 50px auto;
    input {
      width: 100%;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-bottom: 1px solid grey;
      &:focus {
        outline: blue;
      }
    }
  }
  .posts {
    display: flex;
    width: 80%;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

const Movie = styled.div`
  border: 1px solid black;
  background: url(${(props) => props.thumbail});
  cursor: pointer;
  width: 30%;
  min-width: 400px;
  margin: 0 0 50px;
  > div {
    margin: 10px;
  }
`;
