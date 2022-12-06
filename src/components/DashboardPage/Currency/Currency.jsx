import s from './Currency.module.css';
import { useState, useEffect } from 'react';
import Loader from 'components/Loader';
import axios from "axios";

export const Currency = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [USD, setUSD] = useState({ buy: 0.00, sale: 0.00 });
  const [EUR, setEUR] = useState({ buy: 0.00, sale: 0.00 });
  const [PLN, setPLN] = useState({ buy: 0.00, sale: 0.00 });
  const [dateFetching, setDateFetching] = useState(0);

  
  const fetchCurrencyAPI = async () => {
    
    try {
      const response = await axios.get('https://api.monobank.ua/bank/currency');
      const data = response.data;
      return data;
    } catch (e) {
      return e.message;
    }
  };

  function getCurrencies() {
    fetchCurrencyAPI().then((data) => {
      const usdBuy = Number(data[0].rateBuy.toFixed(2));
      const usdSale = Number(data[0].rateSell.toFixed(2));
      const eurBuy = Number(data[1].rateBuy.toFixed(2));
      const eurSale = Number(data[1].rateSell.toFixed(2));
      const plnBuy = Number(data[82].rateCross.toFixed(2));
      const plnSale = Number(data[82].rateCross.toFixed(2));

      setEUR({ buy: eurBuy, sale: eurSale });
      setUSD({ buy: usdBuy, sale: usdSale });
      setPLN({ buy: plnBuy, sale: plnSale });
      setDateFetching(Date.now());
      
    })
    .catch(err => err.message)
        .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    
    setIsLoading(true);
    
    if (!localStorage.getItem('currencies')) {
      getCurrencies();
    } else {
      const storage = JSON.parse(localStorage.getItem('currencies'));
      const TIMERdiff = Date.now() - storage.dateFetching;
        if (TIMERdiff <= 360000) {
          setUSD(storage.USD);
          setEUR(storage.EUR);
          setPLN(storage.PLN);
          setDateFetching(storage.dateFetching);
          setIsLoading(false);
          return
      }
        getCurrencies();
      }
      
    // eslint-disable-next-line
}, [])

  useEffect(() => {
    localStorage.setItem('currencies', JSON.stringify({ EUR, USD, PLN, dateFetching }));
    // eslint-disable-next-line
  }, [getCurrencies])
      

    return (
      <div className={s.container}>
        {isLoading ? <div className={s.loader}><Loader heigth="60" width="60"/></div> : 
            <ul className={s.list}>
                <li className={s.item}>
                    <span className={s.title}>Currency</span>
                    <span className={s.currency}>USD</span>
                    <span className={s.currency}>EUR</span>
                    <span className={s.currency}>PLN</span>

                </li>
                <li className={s.item}>
                    <span className={s.title}>Purchase</span>
                    <span className={s.currency}>{Number(USD.buy).toFixed(2)}</span>
                    <span className={s.currency}>{Number(EUR.buy).toFixed(2)}</span>
                    <span className={s.currency}>{Number(PLN.buy).toFixed(2)}</span>
                </li>
                <li className={s.item}>
                    <span className={s.title}>Sale</span>
                    <span className={s.currency}>{Number(USD.sale).toFixed(2)}</span>
                    <span className={s.currency}>{Number(EUR.sale).toFixed(2)}</span>
                    <span className={s.currency}>{Number(PLN.sale).toFixed(2)}</span>
                </li>
          </ul>
        }
        
        </div>
)
}