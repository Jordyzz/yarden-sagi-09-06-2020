import React from 'react';
import { default as ReactSelect, components } from 'react-select';
import styles from './Select.scss';

const customStyles = props => {
  return {
    control: () => ({
      border: 'none',
      backgroundColor: 'none',
      borderRadius: 'none',
      borderBottom: '1px solid var(--fontColor)'
    }),
    indicatorsContainer: provided => ({
      display: 'none'
    }),
    placeholder: provided => ({
      ...provided,
      display: 'flex',
      marginLeft: 10,
      color: 'var(--fontColor)',
      fill: 'var(--fontColor)'
    }),
    option: provided => ({
      ...provided,
      color: '#000'
    }),
    singleValue: provided => ({
      ...provided,
      color: 'var(--fontColor)'
    }),
    input: provided => ({
      ...provided,
      color: 'var(--fontColor)'
    })
  };
};

function Select(props) {
  const {
    onChange,
    onInputChanged,
    getOptionLabel,
    getOptionValue,
    options,
    value,
    defaultValue,
    filterOption,
    placeholder
  } = props;

  const handleChange = newVal => {
    onChange(newVal);
  };

  const onChangedInput = value => {
    onInputChanged(value);
  };

  const Placeholder = props => {
    return <components.Placeholder {...props}>{props.children}</components.Placeholder>;
  };

  return (
    <ReactSelect
      placeholder={placeholder || ''}
      className={styles.Select}
      onChange={handleChange}
      value={value}
      components={{
        Placeholder
      }}
      filterOption={filterOption}
      defaultValue={defaultValue}
      options={options}
      styles={customStyles(props)}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      onInputChange={onChangedInput}
      isClearable={true}
    />
  );
}

export default Select;
