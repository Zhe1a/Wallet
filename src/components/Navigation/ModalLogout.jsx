import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ResetApi } from '../../redux/AuthRedux/operations';
import s from './ModalLogout.module.css';

export function ModalLogOut({ setIsModalOpen }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const closeOnEsc = e => {
      if (e.code === 'Escape') {
        setIsModalOpen(false);
      }
    };
    document.addEventListener('keydown', closeOnEsc);
    return () => document.removeEventListener('keydown', closeOnEsc);
  }, [dispatch, setIsModalOpen]);

  function closeOnOverlay(e) {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  }

  const handleModalClose = () => {
    dispatch(ResetApi());
    setIsModalOpen(false);
  };

  return (
    <div className={s.backdrop} onClick={closeOnOverlay}>
      <div className={s.modalContainer}>
        <form className={s.modalForm}>
          <h2 className={s.text}>Are you sure?</h2>
          <div>
            <button
              className={s.button}
              type="button"
              onClick={handleModalClose}
            >
              EXIT
            </button>
            <button
              className={s.button}
              type="button"
              onClick={() => setIsModalOpen()}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
