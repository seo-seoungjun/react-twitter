import React, { useState } from 'react';
import { dbService } from '../myBase';

const Tweet = ({ tweetObj, isOwner }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm('Do you want delete?');
    if (ok) {
      await dbService.doc(`tweet/${tweetObj.id}`).delete();
    }
  };
  const [isEdit, setIsEidt] = useState(false);
  const [newTweet, setNewtweet] = useState(tweetObj.text);
  const onToggleEdit = () => {
    setIsEidt((prev) => !prev);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`tweet/${tweetObj.id}`).update({
      text: newTweet,
    });
    setIsEidt(false);
  };
  const onChange = (e) => {
    const { value } = e.target;
    setNewtweet(value);
  };
  return (
    <>
      {isEdit ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              type="text"
              placeholder="write new tweet"
              value={newTweet}
            ></input>
            <input type="submit" value="Edit"></input>
          </form>
          <button onClick={onToggleEdit}>Cancle</button>
        </>
      ) : (
        <>
          <div>
            <h4>{tweetObj.text}</h4>
            {isOwner && (
              <>
                <button onClick={onDeleteClick}>Delete tweet</button>
                <button onClick={onToggleEdit}>Edit tweet</button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Tweet;
