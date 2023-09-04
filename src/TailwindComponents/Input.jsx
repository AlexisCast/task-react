import classNames from 'classnames';

const Input = ({ label, type, id, value, onChange, className, ...rest }) => {
  return (
    <div className="mb-4">
      <label>{label}</label>
      <input
        className={classNames('w-full p-2 border rounded-md focus:ring-1', className)}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        {...rest} // Spread the additional properties here
      />
    </div>
  );
};

export default Input;
