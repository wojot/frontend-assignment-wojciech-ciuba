import React from "react";
import { Media } from "reactstrap";

export default function Article(props) {
  const { id, date, image, category, title, preamble } = props.article;

  return (
    <Media className="article">
      <Media left href="#">
        <img src={image} className="thumbnail"></img>
      </Media>
      <Media body>
        <Media heading>
          {title} <span className="date">{date}</span>
        </Media>
        <small>{preamble}</small>
      </Media>
    </Media>
  );
}
