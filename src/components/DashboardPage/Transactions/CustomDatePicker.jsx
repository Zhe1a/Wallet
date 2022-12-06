import { forwardRef } from 'react';
import s from './ModalAddTransaction.module.css';
import sprite from '../../../images/transactions/transactionSprite.svg';

export const CustomDatePicker = forwardRef(({ value, onClick }, ref) => {
  return (
    <>
      <input
        value={value}
        className={s.customDateInput}
        onClick={onClick}
        onChange={onClick}
        ref={ref}
        required
      />
      <svg className={s.calendarIcon} width={18} height={20} onClick={onClick}>
        <use href={sprite + '#icon-calendar'}></use>
      </svg>
    </>
  );
});
