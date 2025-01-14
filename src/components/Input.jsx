const Input = ({ value, type, placeholder, id, onChange, name }) => {
    return (
      <input
        className="h-12 w-full border rounded-md p-2 outline-none mt-6"
        value={value}
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        onChange={onChange}
      />
    );
  };
  
  export default Input;