const FormRow = ({ name, type, placeholder, value, onChange, error }) => {
  return (
    <div className="my-8">
      <input
        className="text-black px-1 py-2 border-b-2 w-full focus:outline-0 "
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <p className="text-left text-red-500">{error}</p>
    </div>
  )
}
export default FormRow
