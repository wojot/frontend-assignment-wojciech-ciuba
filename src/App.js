import React, { Component } from "react";
import { getArticles } from "./services/API";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "reactstrap";
import "./assets/customStyles.css";

export default class App extends Component {
  state = {
    categories: ["fashion", "sports"],
    activeCategory: 0,
    articles: []
  };

  componentDidMount() {
    const activeCategoryName = this.state.categories[this.state.activeCategory];
    getArticles(activeCategoryName).then(articles => this.setState(articles));
  }

  getCategoryNameCapitalized = categoryName => {
    return categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  };

  render() {
    console.log(this.state);
    return (
      <Container className="container" fluid>
        <Row>
          <Col sm="12" xl="12">
            sort bar
          </Col>
        </Row>
        <Row>
          <Col sm="3">
            {this.state.categories.map((categoryName, index) => (
              <div key={index}>
                {this.getCategoryNameCapitalized(categoryName)}
              </div>
            ))}
          </Col>
          <Col sm="9">
            {this.state.articles.map((article, index) => (
              <div key={index}>{article.id}</div>
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}
