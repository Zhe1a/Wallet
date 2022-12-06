import Media from 'react-media';
import { useSelector } from 'react-redux';
import {
  getAuthUser,
  getAuthIsLoggedIn,
} from '../../redux/AuthRedux/selectors';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import sprite from '../../images/sprite.svg';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { useState } from 'react';
import { ModalLogOut } from 'components/Navigation/ModalLogout';
import { mediaQueries } from 'common/mediaQueries';

export default function AppBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = useSelector(getAuthUser);
  const isLoggedIn = useSelector(getAuthIsLoggedIn);

  return (
    <>
      {isLoggedIn && (
        <>
          <header className={s.header}>
            <NavLink to="/" className={s.logoContainer}>
              <svg className={s.logoSvg}>
                <use href={`${sprite}#icon-wallet`}></use>
              </svg>
              <p className={s.logoText}>Wallet</p>
            </NavLink>
            <div className={s.authContainer}>
              <p className={s.name}>{username}</p>
              <button
                className={s.button}
                onClick={() => setIsModalOpen(true)}
                type="button"
              >
                <svg className={s.exitSvg} width="18px" height="18px">
                  <use href={`${sprite}#icon-exit`}></use>
                </svg>
                <Media queries={mediaQueries}>
                  {matches =>
                    (matches.tablet || matches.desktop) && (
                      <p className={s.exit}>Exit</p>
                    )
                  }
                </Media>
              </button>
              {isModalOpen && <ModalLogOut setIsModalOpen={setIsModalOpen} />}
            </div>
          </header>
        </>
      )}
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
}
