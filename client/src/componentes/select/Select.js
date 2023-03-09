export default function Select({ name, data, handleFilter }) {


  return (
    <label
      className="form-label d-flex flex-column margin-b-0"
      style={{ gap: 4 }}
    >
      {name}
      <select
      defaultValue={"default"}
      onChange={handleFilter}
      name={name}
        style={{
          padding: 12,
          borderStyle: "solid",
          borderRadius: 10,
          background: "#ffffff",
          fontFamily: '"outfit", sans-serif',
          fontSize: 16,
        }}
      >
        <option value={"default"}>Todos</option>
        {data.map((obj) => (
          <option key={obj} value={obj}>
            {obj.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
