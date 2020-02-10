import React, { useState } from "react";
import { Col, FormGroup, Label, Input } from "reactstrap";

export default function Categories({
  setCategory,
  initialCategories,
  activeCategories
}) {
  const [categories, setCategories] = useState(initialCategories);
  const mobile = window.innerWidth <= 760;
  const inline = mobile ? true : false;
  const labelStyle = mobile ? { "margin-left": "10px" } : {};

  return (
    <Col sm="2">
      Categories:{" "}
      <FormGroup check inline={inline}>
        {categories.map((categoryName, index) => (
          <div key={index}>
            <Label check style={labelStyle}>
              <Input
                type="checkbox"
                onChange={setCategory}
                value={index}
                checked={activeCategories.includes(index)}
              />
              {"  " +
                categoryName.charAt(0).toUpperCase() +
                categoryName.slice(1)}
            </Label>
          </div>
        ))}
      </FormGroup>
    </Col>
  );
}
