import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { urlApi } from '../helpers/urlApi';
import SingleItem from './common/SingleItem';


export default function NewPollForm() {

    const [errMessage, setErrMessage] = useState('');
    const [errItem, setErrItem] = useState('');
    const [renderErr, setRenderErr] = useState(false);
    const [pollTitle, setPollTitle] = useState('');
    const [pollItem, setPollItem] = useState('');
    const [checkPollItem, setCheckPollItem] = useState(false);
    const [itemsList, setItemsList] = useState([]);
    const [renderMessage, setRenderMessage] = useState(false);
    const [itemId, setItemId] = useState(0);



const pollQuestionHandler = ({ target }) => {
  setPollTitle(target.value);
};

const pollItemHandler = ({ target }) => {
  setPollItem(target.value);
};

const verifyForm = () => {
  setErrMessage('');
  if (pollTitle.length <= 1) {
    setErrMessage('Your Poll Question must be at least 2 characters long.');
    return false;
  };

  if (itemsList.length <= 1) {
    setErrMessage('Your Poll must have at least 2 vote options.');
    return false;
  };
  return true;
};

const doneVoteOption = () => {
  setErrItem('');
  if (pollItem.length <= 0) {
    return setErrItem('This field must be filled.');
  }
  setItemsList([...itemsList, { itemTitle: pollItem, itemId }]);
  setItemId(prev => prev + 1);
  setPollItem('');
  setCheckPollItem(false);
};

const createPollFunction = async(event) => {
  event.preventDefault();
  setRenderErr(false);
  const verify = verifyForm();
  if (!verify) {
    return setRenderErr(true);
  };
  const data = {
    pollTitle,
    items: itemsList
  };

  await axios.post(
    `${urlApi}poll/create/`,
    data,
    {headers: { Authorization: localStorage.getItem('token') } }
  );
  setRenderMessage(true);
  window.location.reload();
};


  return (
    <div className=''>
        <form 
        className='flex flex-col'
        >
            <label>Poll Question: </label>
            <input 
            type="text"
            onChange={pollQuestionHandler}
             />
         <h1>Vote options:</h1>
         {itemsList.length !== 0 && itemsList.map((singleItem) => (
          <div>
            {/* <h1>{ singleItem.itemTitle }</h1>
            <button type='button' onClick={editButtonFunction}>Edit</button>
            <button type='button' onClick={ () => deleteButtonFunction(singleItem.itemTitle)}>Delete</button> */}
            <SingleItem
            itemInfo={singleItem}
            itemsList={itemsList}
            setItemsList={setItemsList}
            />

          </div>
         ))}
         {checkPollItem && (
          <div>
            <h1>New vote option:</h1>
            <input
            type="text"
            onChange={pollItemHandler}
            />
            <button
            onClick={doneVoteOption}
            type='button'
            >Create
            {errItem !== '' && (
              <h1>{errItem}</h1>
            )}
            </button>
          </div>
         )}

         <button
         onClick={() => setCheckPollItem(true)}
         disabled={checkPollItem}
         >Create a new Vote Option</button>

          <button className='mt-10 bg-green-700' onClick={createPollFunction} type="button">Create Poll</button>
        </form>
        {renderErr && (
            <h1>{errMessage}</h1>
        )}
        {renderMessage && (
            <h1>Poll Created!</h1>
        )}
    </div>
  )
};
