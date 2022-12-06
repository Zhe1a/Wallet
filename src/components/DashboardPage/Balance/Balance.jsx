import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTransactions } from 'redux/transactions/transactions-selectors';
import { getAuthBalance } from '../../../redux/AuthRedux/selectors';
import s from './Balance.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { refreshBalance } from 'redux/AuthRedux/operations';

const Balance = () => {
  const apiBalance = useSelector(getAuthBalance);
  const transactions = useSelector(selectTransactions);
  const [balance, setBalance] = useState(apiBalance);
  const dispatch = useDispatch();
  
  useEffect(() => {
  dispatch(refreshBalance());
// eslint-disable-next-line
  }, [transactions]);

  useEffect(() => {
  setBalance(apiBalance);
  }, [apiBalance]);

  return (
    <div className={s.card}>
      <p className={s.title}>Your balance</p>
      <p className={s.result}>&#8372; {balance}</p>
    </div>
  );
};

export default Balance;
