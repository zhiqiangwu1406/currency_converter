function SelectBox({ rates, name, changeHandler, value }) {
  return (
    <div className="flex flex-col">
      <label htmlFor="select" className="text-gray-400 mt-2">
        {name}
      </label>

      <select
        className="border rounded-2xl px-4 py-2"
        value={value}
        onChange={(e) => changeHandler(e.target.value)}
      >
        {rates.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectBox;
