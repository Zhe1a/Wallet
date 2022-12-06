import { useSelector } from 'react-redux';
import Select from 'react-select';
import { selectCategories } from 'redux/transactions/transactions-selectors';
import s from './ModalAddTransaction.module.css';

const SelectArrow = ({ selectProps }) => {
  return (
    <div className={selectProps.menuIsOpen ? s.chevronTurn : s.chevron}></div>
  );
};

const selectStyles = {
  control: () => ({
    display: 'flex',
    alignItems: 'center',
    border: 'none',
    borderRadius: '0',
    borderBottom: '1px solid #E0E0E0',
    padding: '8px',
    marginBottom: '40px',
    outline: 'none',
    fontSize: '18px',
    lineHeight: '1.5',
    paddingLeft: '20px',

    ':hover': {
      backgroundColor: '#ff659614',
    },
  }),
  placeholder: baseStyles => ({
    ...baseStyles,
    color: '#BDBDBD',
  }),
  option: (baseStyles, { isFocused }) => ({
    ...baseStyles,
    backgroundColor: isFocused && '#fff',
    fontWeight: isFocused && '700',
    color: isFocused && '#FF6596',
    padding: '14px 0 17px',
  }),
  menu: baseStyles => ({
    ...baseStyles,
    fontSize: '18px',
    width: '100%',
    lineHeight: 1.5,
    paddingLeft: '20px',
    backgroundColor: '#FFFFFFB2',
    backdropFilter: 'blur(25px)',
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
    borderRadius: '20px',
  }),
};

export function ModalSelect({ setCategoryId }) {
  const categories = useSelector(selectCategories);

  const selectOptions = categories
    .filter(category => category.type === 'EXPENSE')
    .map(({ id, name }) => ({
      value: id,
      label: name,
    }));

  return (
    <Select
      options={selectOptions}
      onChange={a => setCategoryId(a.value)}
      placeholder="Select a category"
      styles={selectStyles}
      unstyled
      components={{ DropdownIndicator: SelectArrow }}
      required
    />
  );
}
