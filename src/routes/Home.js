import React, { useEffect } from 'react';
import { useState } from 'react';
import { dbService } from '../myBase';
import Tweet from '../components/tweet';

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState('');
  const [AllTweets, setAllTweets] = useState([]);

  useEffect(() => {
    dbService.collection('tweet').onSnapshot((shapshot) => {
      const AlltweetObj = shapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllTweets(AlltweetObj);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('tweet').add({
      text: tweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          minLength={3}
          maxLength={120}
        />
        <input type="submit" value="tweet" />
      </form>
      <div>
        {AllTweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
