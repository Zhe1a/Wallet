import s from './Auth.module.css';
import PropTypes from 'prop-types';
const Photo = ({ img }) => {
  return (
    <div className={s.aside}>
      {/* eslint-disable-next-line */}
      <img src={img} alt="Photo" className={s.image} />
      <h2 className={s.title}>Finance App</h2>
    </div>
  );
};
Photo.propTypes = {
  img: PropTypes.string.isRequired,
};
export default Photo;