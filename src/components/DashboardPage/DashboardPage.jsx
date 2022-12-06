import { Suspense, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Currency } from './Currency/Currency';
import Balance from './Balance/Balance';
import Media from 'react-media';
import { mediaQueries } from 'common/mediaQueries';
import css from '../DashboardPage/DashboardPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getTransactions } from 'redux/transactions/transactions-operations';
import { AddTransactionBtn } from './AddTransactionBtn/AddTransactionBtn';
import { selectModalStatus } from 'redux/transactions/transactions-selectors';
import Loader from '../Loader';
import Navigation from 'components/Navigation/Navigation';

const DashboardPage = () => {
  const isTransactionModalOpen = useSelector(selectModalStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);
  const location = useLocation();
  const { pathname } = location;
  const isHomePage = pathname === '/wallet/home';
  console.log(location);
  return (
    <>
      <section className={css.container}>
        <div className={css.bar}>
          <div className={css.navigation}>
            <Navigation/>
            <div className={css.balance}>
              {pathname !== '/wallet/currency' && <Balance />}
            </div>
          </div>
          <div className={css.currency}>
            <Media queries={mediaQueries}>
              {matches => (matches.tablet || matches.desktop) && <Currency />}
            </Media>
            <Media queries={mediaQueries}>
              {matches =>
                (matches.tablet || matches.desktop) &&
                pathname === '/wallet/currency' && (
                  <Navigate to="/wallet/home" />
                )
              }
            </Media>
          </div>
        </div>
        <div className={css.content}>
          <Suspense fallback= {<Loader/>}>
            <Outlet />
          </Suspense>
        </div>
      </section>
      <Media queries={mediaQueries}>
        {matches =>
          (matches.tablet || matches.desktop) &&
          isHomePage && <AddTransactionBtn />
        }
      </Media>
      <Media queries={mediaQueries}>
        {matches =>
          (matches.mobile || matches.response) &&
          isHomePage &&
          !isTransactionModalOpen && <AddTransactionBtn />
        }
      </Media>
    </>
  );
};

export default DashboardPage;
