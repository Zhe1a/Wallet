import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from 'redux/transactions/transactions-slice';
import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import s from './ModalAddTransaction.module.css';
import {
  addTransaction,
  editTransaction,
  getCategories,
  getTransactions,
} from 'redux/transactions/transactions-operations';
import { CustomDatePicker } from './CustomDatePicker';
import { ModalSelect } from './ModalSelect';
import { createPortal } from 'react-dom';
import { selectTransactions } from 'redux/transactions/transactions-selectors';

export function ModalAddTransaction({
  editModalOpen,
  setEditModalOpen,
  transactionID,
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [categoryId, setCategoryId] = useState('');
  const transactionsData = useSelector(selectTransactions);
  const dispatch = useDispatch();

  const currentTransaction = transactionsData.find(
    el => el.id === transactionID
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const closeModal = useCallback(() => {
    dispatch(toggleModal());
    setEditModalOpen(false);
    dispatch(getTransactions());
  }, [dispatch, setEditModalOpen]);

  // Close modal on ESC logic:

  useEffect(() => {
    const closeOnEsc = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', closeOnEsc);
    return () => document.removeEventListener('keydown', closeOnEsc);
  }, [dispatch, closeModal]);

  // Close modal on overlay click logic:

  function closeOnOverlay(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  // formik setup:

  const formik = useFormik({
    initialValues: {
      type: editModalOpen
        ? currentTransaction.type === 'EXPENSE'
          ? true
          : false
        : true,
      amount: editModalOpen ? Math.abs(currentTransaction.amount) : '',
      comment: editModalOpen ? currentTransaction.comment : '',
    },
    validationSchema: yup.object({
      type: yup.bool(),
      amount: yup.number().required('*Required'),
      comment: yup.string().max(40, '40 characters max'),
    }),

    onSubmit: ({ type, amount, comment }) => {
      const newTransaction = {
        transactionDate: startDate,
        comment,
        categoryId: type ? categoryId : '063f1132-ba5d-42b4-951d-44011ca46262',
        amount: type ? Number(amount) * -1 : Number(amount),

        type: type ? 'EXPENSE' : 'INCOME',
      };
      editModalOpen
        ? dispatch(editTransaction({ transactionID, newTransaction }))
        : dispatch(addTransaction(newTransaction));
      closeModal();
    },
  });

  const { handleChange, handleSubmit, values, errors, touched } = formik;

  return createPortal(
    <div className={s.backdrop} onClick={closeOnOverlay}>
      <div className={s.modal}>
        <button
          className={s.closeBtn}
          onClick={closeModal}
          type="button"
          aria-label="close button"
        ></button>

        <form className={s.modalForm} onSubmit={handleSubmit}>
          <h2 className={s.modalTitle}>
            {editModalOpen ? 'Edit Transaction' : 'Add transaction'}
          </h2>

          <div className={s.typeWrapper}>
            <div className={values.type ? s.inactive : s.income}>Income</div>
            <label className={s.typeLabel}>
              <input
                className={s.typeCheckbox}
                name="type"
                type="checkbox"
                checked={values.type}
                onChange={handleChange}
              />
              <div className={s.customCheckbox}></div>
            </label>
            <div className={values.type ? s.expense : s.inactive}>Expense</div>
          </div>

          {values.type && <ModalSelect setCategoryId={setCategoryId} />}
          {touched.categoryId && errors.categoryId ? (
            <div className={s.validatoinError}>{errors.categoryId}</div>
          ) : null}

          <div className={s.amountAndDate}>
            <input
              className={s.amountInput}
              name="amount"
              type="number"
              placeholder="0.00"
              value={values.amount}
              onChange={handleChange}
              required
            />
            {touched.amount && errors.amount ? (
              <div className={s.validatoinError}>{errors.amount}</div>
            ) : null}

            <DatePicker
              selected={startDate}
              dateFormat="dd.MM.yyyy"
              calendarStartDay={1}
              onChange={setStartDate}
              customInput={<CustomDatePicker />}
            />
          </div>

          <textarea
            className={s.commentInput}
            name="comment"
            type="text"
            placeholder="Comment"
            value={values.comment}
            onChange={handleChange}
          />
          {touched.comment && errors.comment ? (
            <div className={s.validatoinError}>{errors.comment}</div>
          ) : null}

          <div className={s.btnWrapper}>
            <button className={s.addBtn} type="submit">
              {editModalOpen ? 'Edit' : 'Add'}
            </button>
            <button className={s.cancelBtn} type="button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.querySelector('#modal-root')
  );
}
