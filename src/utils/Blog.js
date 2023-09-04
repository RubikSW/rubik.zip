import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'
import "@fontsource/ibm-plex-mono";

function BlogPosts({ username }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [expandedPosts, setExpandedPosts] = useState([]);

  const toggleExpansion = (postNumber) => {
    if (expandedPosts.includes(postNumber)) {
      setExpandedPosts(expandedPosts.filter((number) => number !== postNumber));
    } else {
      setExpandedPosts([...expandedPosts, postNumber]);
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
                  }}
                  onClick={() => toggleExpansion(post.number)}
                >
                  <div id='post_title'>{post.title}</div>
                  <div id='GreenCode'>{`${new Date(post.created_at).toLocaleDateString()}, ${new Date(
                    post.created_at
                  ).toLocaleTimeString()}`}</div>
                </div>
                <div style={{ margin: '0 10px' }} className={`content ${expandedPosts.includes(post.number) ? 'expanded' : ''}`}>
                  {expandedPosts.includes(post.number) && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p id='body' dangerouslySetInnerHTML={{ __html: post.body.replace(/!\[image\]\((.*?)\)/g, '<img src="$1" alt="Image"></img>') }}></p>
                      <FontAwesomeIcon id='close' icon={faArrowCircleUp} onClick={() => toggleExpansion(post.number)} />
                    </div>
                  )}
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
