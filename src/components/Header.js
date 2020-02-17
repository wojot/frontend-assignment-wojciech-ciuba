import React, { useState } from "react";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { Row, Col } from "reactstrap";

export default function Header({ toggleSorting, sortDesc }) {
  return (
    <Row className="header">
      <Col sm="10" xl="10" className="text-center">
        Yearly News Articles
      </Col>

      <Col sm="2" xl="2" className="text-right">
        <span onClick={toggleSorting}>
          Sort by date:{" "}
          {sortDesc === true ? <GoTriangleDown /> : <GoTriangleUp />}
        </span>
      </Col>
    </Row>
  );
}
