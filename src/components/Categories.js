import React, { useState } from "react";
import { Col, FormGroup, Label, Input } from "reactstrap";

export default function Categories({
  setCategory,
  initialCategories,
  activeCategories
}) {
  const [categories, setCategories] = useState(initialCategories);
  
  return (
    <Col sm="2">
      Categories:{" "}
      <FormGroup check inline={window.innerWidth <= 760 ? true : false}>
        {categories.map((categoryName, index) => (
          <div key={index}>
            <Label check>
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
