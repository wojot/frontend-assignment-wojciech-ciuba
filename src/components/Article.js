import React from "react";
import { Media } from "reactstrap";

export default function Article(props) {
  const { id, date, image, category, title, preamble } = props.article;

  return (
    <Media>
      <Media left>
          {image ? <img src={image} className="thumbnail"></img> : <div className="thumbnail"><br />Thumbnail unavailable</div>}
      </Media>
      <Media body className="articleBody">
        <Media heading>
          <span className="title">{title}</span> <span className="date">{date}</span>
        </Media>
        <span className="content"><small>{preamble}</small></span>
      </Media>
    </Media>
  );
}
