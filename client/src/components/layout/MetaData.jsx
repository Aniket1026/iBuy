import React from "react";
import Helmet from "react-helmet";

const MetaData = ({title}) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </React.Fragment>
  );
};

export default MetaData;
