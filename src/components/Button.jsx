const Button = ({ type, text }) => {
  return (
    <button
      type={type}
      className="bg-indigo-700 hover:bg-indigo-900 px-2 py-1 rounded-lg mx-auto block my-8 text-white">
      {text}
    </button>
  )
}
export default Button
