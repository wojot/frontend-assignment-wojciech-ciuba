import React, { Component } from "react";
import { getArticles } from "./services/API";
import Article from "./components/Article";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, FormGroup, Label, Input } from "reactstrap";
import "./assets/customStyles.css";

export default class App extends Component {
  state = {
    categories: ["fashion", "sports"], //can be extended by more categories
    activeCategories: [0, 1], //both categories selected as default
    articles: [],
    error: null
  };

  componentDidMount() {
    this.getArticlesOfSelectedCategories();
  }

  getArticlesOfSelectedCategories = () => {
    this.clearErrors();
    this.clearArticles();

    this.state.activeCategories.map((activeCat, index) => {
      let activeCategoryName = this.state.categories[activeCat];

      getArticles(activeCategoryName).then(articles => {
        articles.message
          ? this.setState({ error: articles.message })
          : this.setState({
              articles: [...this.state.articles, ...articles.articles]
            });
      });
    });
  };

  getCategoryNameCapitalized = categoryName => {
    return categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  };

  clearErrors = () => {
    this.setState({ error: null });
  };

  clearArticles = () => {
    this.setState({ articles: [] });
  };

  setCategory = e => {
    const categoryToggled = parseInt(e.target.value);
    const { activeCategories } = this.state;
    let newActiveCategories = [];

    if (activeCategories.includes(categoryToggled)) {
      newActiveCategories = this.state.activeCategories.filter(
        category => category != categoryToggled
      );
    } else {
      newActiveCategories = [categoryToggled, ...activeCategories];
    }
    this.setState({ activeCategories: newActiveCategories }, () => {
      this.getArticlesOfSelectedCategories();
    });
  };

  render() {
    // console.log(this.state);
    return (
      <Container className="container" fluid>
        <Row>
          <Col sm="12" xl="12">
            {/* sort bar */}
          </Col>
        </Row>
        <Row>
          <Col sm="2">
            <FormGroup check>
              {this.state.categories.map((categoryName, index) => (
                <div key={index}>
                  <Label check>
                    <Input
                      type="checkbox"
                      onChange={this.setCategory}
                      value={index}
                      checked={this.state.activeCategories.includes(index)}
                    />
                    {"  " + this.getCategoryNameCapitalized(categoryName)}
                  </Label>
                </div>
              ))}
            </FormGroup>
          </Col>
          <Col sm="10">
            {/* Error due to HTTP code 500, page reloaded*/}
            {this.state.error ? window.location.reload() : ""}

            {this.state.activeCategories.length === 0 ? "Select at least one category!" : ""}
            {this.state.articles.map((article, index) => (
              <div key={index}>
                <Article article={article} />
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}
