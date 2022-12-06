import Media from 'react-media';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { mediaQueries } from 'common/mediaQueries';
import s from './Navigation.module.css';
import sprite from '../../images/sprite.svg';

export default function Navigation() {
  const { pathname } = useLocation();

  return (
    <ul className={s.nav}>
      <li className={s.navItem}>
        <NavLink
          to="home"
          className={
            pathname === '/wallet/home' ? s.navLinkActive : s.navLink
          }
        >
          <div className={s.iconWrapper}>
            <svg className={s.svg}>
              <use href={`${sprite}#icon-home`}></use>
            </svg>
          </div>
          <span className={s.navText}>Home</span>
        </NavLink>
      </li>
      <li className={s.navItem}>
        <NavLink
          to="diagram"
          className={
            pathname === '/wallet/diagram'
              ? s.navLinkActive
              : s.navLink
          }
        >
          <div className={s.iconWrapper}>
            <svg className={s.svg}>
              <use href={`${sprite}#icon-statistic`}></use>
            </svg>
          </div>
          <span className={s.navText}>Statistics</span>
        </NavLink>
      </li>
      <Media queries={mediaQueries}>
        {matches =>
          (matches.mobile || matches.response) && (
            <li className={s.navItem}>
              <NavLink
                to="currency"
                className={
                  pathname === '/wallet/currency'
                    ? s.navLinkActive
                    : s.navLink
                }
              >
                <div className={s.iconWrapper}>
                  <svg className={s.svg}>
                    <use href={`${sprite}#icon-currency`}></use>
                  </svg>
                </div>
              </NavLink>
            </li>
          )
        }
      </Media>
    </ul>
  );
}
