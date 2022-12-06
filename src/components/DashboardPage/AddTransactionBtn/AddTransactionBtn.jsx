import { useDispatch } from 'react-redux';
import { toggleModal } from 'redux/transactions/transactions-slice';
import s from './AddTransactionBtn.module.css';
import sprite from '../../../images/transactions/transactionSprite.svg';

export function AddTransactionBtn() {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className={s.addButton}
      aria-label="add transaction button"
      onClick={() => dispatch(toggleModal())}
    >
      <svg width={20} height={20}>
        <use href={sprite + '#icon-plus'}></use>
      </svg>
    </button>
  );
}
