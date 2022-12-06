import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compareDesc, format, parseISO } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Media from 'react-media';
import {
  deleteTransaction,
  getCategories,
  getTransactions,
} from 'redux/transactions/transactions-operations';
import {
  selectCategories,
  selectTransactions,
  selectModalStatus,
  selectError,
} from 'redux/transactions/transactions-selectors';
import { ModalAddTransaction } from './ModalAddTransaction';
import s from './Transactions.module.css';
import { mediaQueries } from 'common/mediaQueries';
import sprite from '../../../images/transactions/transactionSprite.svg';
import { toggleModal } from 'redux/transactions/transactions-slice';

let transactionID = '';

//// Toggle body scroll lock:

function bodyScrollLock(isOpen) {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
    // document.body.style.position = 'fixed';
  } else {
    document.body.style.overflow = 'visible';
    // document.body.style.position = 'static';
  }
}

const Transactions = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const isModalOpen = useSelector(selectModalStatus);
  const categories = useSelector(selectCategories);
  const fetchtransactionsData = useSelector(selectTransactions);
  const isError = useSelector(selectError);
  const dispatch = useDispatch();

  // ckecking user's device:
  const [isMobile, setIsMobile] = useState(false);
  window.matchMedia('(max-width: 767px)').addEventListener('change', e => {
    e.matches ? setIsMobile(true) : setIsMobile(false);
  });

  useEffect(() => {
    dispatch(getCategories());
    setTransactionsData(
      [...fetchtransactionsData]
        .reverse()
        .sort((a, b) =>
          compareDesc(parseISO(a.transactionDate), parseISO(b.transactionDate))
        )
    );
  }, [dispatch, fetchtransactionsData]);

  function transactionsSorter(e) {
    const needToDecrement = e.currentTarget.dataset.flag === 'incr';

    if (e?.target.textContent === 'Sum') {
      if (needToDecrement) {
        setTransactionsData(state =>
          [...state].sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))
        );
        e.currentTarget.dataset.flag = 'decr';
        return;
      }

      setTransactionsData(state =>
        [...state].sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount))
      );
      e.currentTarget.dataset.flag = 'incr';
    }

    if (e?.target.textContent === 'Date') {
      if (needToDecrement) {
        setTransactionsData(state =>
          [...state].sort((a, b) =>
            compareDesc(
              parseISO(b.transactionDate),
              parseISO(a.transactionDate)
            )
          )
        );
        e.currentTarget.dataset.flag = 'decr';
        return;
      }

      setTransactionsData(state =>
        [...state].sort((a, b) =>
          compareDesc(parseISO(a.transactionDate), parseISO(b.transactionDate))
        )
      );
      e.currentTarget.dataset.flag = 'incr';
    }

    if (e?.target.textContent === 'Type') {
      if (needToDecrement) {
        setTransactionsData(state =>
          [...state].sort((a, b) => b.type.localeCompare(a.type))
        );
        e.currentTarget.dataset.flag = 'decr';
        return;
      }

      setTransactionsData(state =>
        [...state].sort((a, b) => a.type.localeCompare(b.type))
      );
      e.currentTarget.dataset.flag = 'incr';
    }

    if (e?.target.textContent === 'Category') {
      if (needToDecrement) {
        setTransactionsData(state =>
          [...state].sort((a, b) =>
            categories
              .find(category => category.id === b.categoryId)
              ?.name.localeCompare(
                categories.find(category => category.id === a.categoryId)?.name
              )
          )
        );
        e.currentTarget.dataset.flag = 'decr';
        return;
      }

      setTransactionsData(state =>
        [...state].sort((a, b) =>
          categories
            .find(category => category.id === a.categoryId)
            ?.name.localeCompare(
              categories.find(category => category.id === b.categoryId)?.name
            )
        )
      );
      e.currentTarget.dataset.flag = 'incr';
    }

    if (e?.target.textContent === 'Balance') {
      if (needToDecrement) {
        setTransactionsData(state =>
          [...state].sort((a, b) => b.balanceAfter - a.balanceAfter)
        );
        e.currentTarget.dataset.flag = 'decr';
        return;
      }

      setTransactionsData(state =>
        [...state].sort((a, b) => a.balanceAfter - b.balanceAfter)
      );
      e.currentTarget.dataset.flag = 'incr';
    }
  }

  function onDeleteTransaction(id) {
    dispatch(deleteTransaction(id));
    dispatch(getTransactions());
  }

  !!isError && toast.error(isError);

  isMobile && bodyScrollLock(isModalOpen);

  return (
    <section className={s.transactions}>
      <Media queries={mediaQueries}>
        {matches =>
          matches.mobile || matches.response ? (
            <ul>
              {transactionsData.map(
                ({
                  id,
                  transactionDate,
                  type,
                  categoryId,
                  comment,
                  amount,
                  balanceAfter,
                }) => (
                  <li className={s.mobTransaction} key={id}>
                    <div
                      className={
                        type === 'INCOME'
                          ? s.transactionRowIncome
                          : s.transactionRowExpense
                      }
                    >
                      <p className={s.transactionHeader}>Date</p>
                      <p className={s.transactionData}>
                        {format(parseISO(transactionDate), 'dd.MM.yyyy')}
                      </p>
                    </div>
                    <div
                      className={
                        type === 'INCOME'
                          ? s.transactionRowIncome
                          : s.transactionRowExpense
                      }
                    >
                      <p className={s.transactionHeader}>Type</p>
                      <p className={s.transactionData}>
                        {type === 'INCOME' ? '+' : '-'}
                      </p>
                    </div>
                    <div
                      className={
                        type === 'INCOME'
                          ? s.transactionRowIncome
                          : s.transactionRowExpense
                      }
                    >
                      <p className={s.transactionHeader}>Category</p>
                      <p className={s.transactionData}>
                        {
                          categories.find(
                            category => category.id === categoryId
                          )?.name
                        }
                      </p>
                    </div>
                    <div
                      className={
                        type === 'INCOME'
                          ? s.transactionRowIncome
                          : s.transactionRowExpense
                      }
                    >
                      <p className={s.transactionHeader}>Comment</p>
                      <p className={s.transactionData}>{comment}</p>
                    </div>
                    <div
                      className={
                        type === 'INCOME'
                          ? s.transactionRowIncome
                          : s.transactionRowExpense
                      }
                    >
                      <p className={s.transactionHeader}>Sum</p>
                      <p
                        className={
                          type === 'INCOME'
                            ? s.transactionDataIncome
                            : s.transactionDataExpense
                        }
                      >
                        {Math.abs(amount)}
                      </p>
                    </div>
                    <div
                      className={
                        type === 'INCOME'
                          ? s.transactionRowIncome
                          : s.transactionRowExpense
                      }
                    >
                      <p className={s.transactionHeader}>Balance</p>
                      <p className={s.transactionData}>{balanceAfter}</p>
                    </div>
                  </li>
                )
              )}
            </ul>
          ) : (
            <table className={s.transactionsTable}>
              <thead>
                <tr className={s.tableHeaderRow}>
                  <th
                    className={s.tableHeaderData}
                    onClick={transactionsSorter}
                    data-flag="incr"
                  >
                    Date
                  </th>
                  <th
                    className={s.tableHeaderData}
                    onClick={transactionsSorter}
                    data-flag="incr"
                  >
                    Type
                  </th>
                  <th
                    className={s.tableHeaderData}
                    onClick={e => transactionsSorter(e)}
                    data-flag="incr"
                  >
                    Category
                  </th>
                  <th className={s.tableHeaderData}>Comment</th>
                  <th
                    className={s.tableHeaderDataRight}
                    data-flag="incr"
                    onClick={transactionsSorter}
                  >
                    Sum
                  </th>
                  <th
                    className={s.tableHeaderDataRight}
                    data-flag="incr"
                    onClick={transactionsSorter}
                  >
                    Balance
                  </th>

                  <th className={s.tableHeaderDataRight}>Edit</th>
                </tr>
              </thead>
              <tbody className={s.tableBody}>
                {transactionsData.map(
                  (
                    {
                      id,
                      transactionDate,
                      type,
                      categoryId,
                      comment,
                      amount,
                      balanceAfter,
                    },
                    idx,
                    arr
                  ) => (
                    <tr key={id}>
                      <td
                        className={`${s.tableData} ${
                          idx === 0 ? s.firstTableData : ''
                        } ${idx === arr.length - 1 ? s.lastTableData : ''}`}
                      >
                        {format(parseISO(transactionDate), 'dd.MM.yyyy')}
                      </td>
                      <td
                        className={`${s.tableData} ${
                          idx === 0 ? s.firstTableData : ''
                        } ${idx === arr.length - 1 ? s.lastTableData : ''}`}
                      >
                        {type === 'INCOME' ? '+' : '-'}
                      </td>
                      <td
                        className={`${s.tableData} ${
                          idx === 0 ? s.firstTableData : ''
                        } ${idx === arr.length - 1 ? s.lastTableData : ''}`}
                      >
                        {
                          categories.find(
                            category => category.id === categoryId
                          )?.name
                        }
                      </td>
                      <td
                        className={`${s.tableData} ${
                          idx === 0 ? s.firstTableData : ''
                        } ${idx === arr.length - 1 ? s.lastTableData : ''}`}
                      >
                        {comment}
                      </td>
                      <td
                        className={`${
                          type === 'INCOME'
                            ? s.tableDataIncome
                            : s.tableDataExpense
                        } ${idx === 0 ? s.firstTableData : ''} ${
                          idx === arr.length - 1 ? s.lastTableData : ''
                        }`}
                      >
                        {Math.abs(amount)}
                      </td>
                      <td
                        className={`${s.tableDataRight} ${
                          idx === 0 ? s.firstTableData : ''
                        } ${idx === arr.length - 1 ? s.lastTableData : ''}`}
                      >
                        {balanceAfter}
                      </td>
                      <td
                        className={`${s.tableDataRight} ${
                          idx === 0 ? s.firstTableData : ''
                        } ${idx === arr.length - 1 ? s.lastTableData : ''}`}
                      >
                        <button
                          className={s.editBtn}
                          onClick={() => {
                            transactionID = id;
                            dispatch(toggleModal());
                            setEditModalOpen(true);
                          }}
                          type="button"
                        >
                          <svg className={s.editBtnIcon} width={15} height={15}>
                            <use href={`${sprite}#icon-pencil`}></use>
                          </svg>
                        </button>
                        <button
                          className={s.editBtn}
                          onClick={() => onDeleteTransaction(id)}
                          type="button"
                        >
                          <svg className={s.editBtnIcon} width={15} height={15}>
                            <use href={`${sprite}#icon-bin`}></use>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )
        }
      </Media>

      {isModalOpen && (
        <ModalAddTransaction
          editModalOpen={editModalOpen}
          setEditModalOpen={setEditModalOpen}
          transactionID={transactionID}
        />
      )}

      <ToastContainer />
    </section>
  );
};

export default Transactions;

//// Media query using js:

// function AlterTable() {
//   const [isMobile, setIsMobile] = useState(false);
//   window.matchMedia('(max-width: 767px)').addEventListener('change', e => {
//     e.matches ? setIsMobile(true) : setIsMobile(false);
//   });

//   return isMobile && <h1>ITS WORKING</h1>;
// }
