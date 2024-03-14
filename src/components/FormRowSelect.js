const FormRowSelect = ({list, name, value, handleChange, labelText}) => {
  return (
    <div className='form-row'>
      <label className='form-label' htmlFor={name}>
        {labelText || name}
      </label>
      <select
        className='form-select'
        name={name}
        value={value}
        id={name}
        onChange={handleChange}
      >
        {list.map((itemValue, index) => {{
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        }})}
      </select>
    </div>
  )
}

export default FormRowSelect