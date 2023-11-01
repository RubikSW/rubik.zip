import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp, faPencil } from '@fortawesome/free-solid-svg-icons';
import "@fontsource/ibm-plex-mono";

function BlogPosts({ username }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [expandedPost, setExpandedPost] = useState(null);

  const toggleExpansion = (postNumber) => {
    if (expandedPost === postNumber) {
      setExpandedPost(null);
    } else {
      setExpandedPost(postNumber);
    }
  };

  useEffect(() => {
    const apiUrl = `https://api.github.com/repos/rubikSW/rubik.zip/issues`;
    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='BlogPosts'>
      <ul className='recent'>
        {repos.map((post) => (
          <li key={post.number}>
            <div className='post'>
              <div style={{ width: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    alignItems: 'center'
                  }}
                  onClick={() => toggleExpansion(post.number)}
                >
                  <div id='post_title'><FontAwesomeIcon style={{ marginRight: '10px', boxShadow:'none' }} icon={faPencil} />{post.title}</div>
                  <div id='GreenCode'>{`${new Date(post.created_at).toLocaleDateString()}, ${new Date(
                    post.created_at
                  ).toLocaleTimeString()}`}</div>
                </div>
                <div className={`content ${expandedPost === post.number ? 'expanded' : ''}`}>
                  <div className={`content-inner ${expandedPost === post.number ? 'expanded-inner' : ''}`} >
                    <p id='body' dangerouslySetInnerHTML={{ __html: post.body.replace(/!\[image\]\((.*?)\)/g, '<img src="$1" alt="Image"></img>') }} ></p>
                    <FontAwesomeIcon id='close' icon={faArrowCircleUp} onClick={() => toggleExpansion(post.number)} />
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogPosts;
