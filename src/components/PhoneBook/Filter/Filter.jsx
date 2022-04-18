import PropTypes from "prop-types";

const Filter = ({ filter, onFilterInput }) => {
  return (
    <>
      <label style={{ display: "grid" }}>
        Find contacts by name
        <input
          type="text"
          name="filter"
          value={filter}
          style={{ width: "200px" }}
          onChange={onFilterInput}
        />
      </label>
    </>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterInput: PropTypes.func.isRequired,
};
