import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch, faStar, faCodeFork, faEye } from '@fortawesome/free-solid-svg-icons'

function GitHubRepos({ username }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const repoImageMapping = {
    572730660: 'https://i.imgur.com/pa5eEnH.png', //aurora
    532611516: 'https://i.imgur.com/bcPQpNr.png', //mlp
    537990912: 'https://i.imgur.com/RPignrY.png', //gac
    644706455: ['https://i.imgur.com/nP35DmD.png', "RPC client for our Garry's Mod server. Connects to our API and displays the player's current activity via Discord's activity status service."], //gmod rpc client
    623280194: 'https://i.imgur.com/HwXjBxh.png', //mdmp
    482373146: 'https://i.imgur.com/qfKT5tv.png', //path
    770024579: 'https://i.imgur.com/rqqKd8a.png', //ips-block
  };

  useEffect(() => {
    const apiUrl = `https://api.github.com/users/${username}/repos`;
    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((data) => {
        const nonForkedRepos = data.filter((repo) => !repo.fork);
        console.log(data)
        setRepos(nonForkedRepos);
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
    <div className='ReposFrm'>
      <ul className='repos'>
        {repos.filter((a) => (a.description)).map((repo) => (
          <li key={repo.id}>
            <div className='Repo'>
              <div id='inner'>
                <a id="top" href={repo.html_url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}><img alt="repo id" src={repoImageMapping[repo.id]}></img></a>
                <div id='text'>
                  <div id='frm'>
                    <div id='one'>
                      <a href={repo.html_url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}><span id='name'>{repo.name}</span></a>
                      <span id='desc'>{(repoImageMapping[repo.id] && repoImageMapping[repo.id][1].length > 1 && repoImageMapping[repo.id][1]) || repo.description}</span>
                    </div>
                    <div id='two'>
                      <span id='language'><FontAwesomeIcon icon={faCodeBranch} />{repo.language}</span>
                      <span id='language'><FontAwesomeIcon icon={faStar} />{repo.stargazers_count}</span>
                      <span id='language'><FontAwesomeIcon icon={faCodeFork} />{repo.forks_count}</span>
                      <span id='language'><FontAwesomeIcon icon={faEye} />{repo.watchers_count}</span>
                    </div>
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

export default GitHubRepos;
