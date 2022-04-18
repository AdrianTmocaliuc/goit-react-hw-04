import { Item } from "components/Utilits";
import PropTypes from "prop-types";

const Statistics = ({ props }) => {
  return (
    <>
      <ul>
        {props.map((item) => {
          return <Item key={item[0]} statistic={item} />;
        })}
      </ul>
    </>
  );
};

Statistics.propTypes = {
  props: PropTypes.array.isRequired,
};

export default Statistics;
