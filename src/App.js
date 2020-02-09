import React, { Component } from "react";
import { getArticles } from "./services/API";
import Article from "./components/Article";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, FormGroup, Label, Input } from "reactstrap";
import "./assets/customStyles.css";

import { GoTriangleUp, GoTriangleDown } from "react-icons/go";

export default class App extends Component {
  state = {
    categories: ["fashion", "sports"], //can be extended by more categories
    activeCategories: [0, 1], //both categories selected as default
    articles: [],
    sortDesc: true,
    error: null
  };

  componentDidMount() {
    this.getArticlesOfSelectedCategories();
  }

  getArticlesOfSelectedCategories = () => {
    this.clearErrors();
    this.clearArticles();

    this.state.activeCategories.map(activeCat => {
      let activeCategoryName = this.state.categories[activeCat];

      getArticles(activeCategoryName).then(articles => {
        if (articles.message) {
          this.setState({ error: articles.message });
        } else {
          let articlesArr = [...this.state.articles, ...articles.articles];
          articlesArr = articlesArr.map(article => {
            const dateSplitted = article.date.split(" ");
            const monthNum = [
              "januar",
              "februar",
              "mars",
              "april",
              "mai",
              "juni",
              "juli",
              "august",
              "september",
              "oktober",
              "november",
              "desember"
            ].indexOf(dateSplitted[1]); //Moment and internal parsing date library don't recognize oktober

            const date = new Date(
              dateSplitted[2],
              monthNum,
              dateSplitted[0].substring(0, dateSplitted[0].length - 1)
            );

            return {
              ...article,
              timeStamp: date
            };
          });
          this.setState({
            articles: articlesArr
          });
        }
      });
    });
  };

  sortArticlesAsc() {
    this.setState(prevState => {
      this.state.articles.sort((a, b) => b.timeStamp - a.timeStamp);
    });
  }

  sortArticlesDesc() {
    this.setState(prevState => {
      this.state.articles.sort((a, b) => a.timeStamp - b.timeStamp);
    });
  }

  toggleSorting = () => {
    this.setState({ sortDesc: !this.state.sortDesc }, () => {
      this.state.sortDesc === true
        ? this.sortArticlesDesc()
        : this.sortArticlesAsc();
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
          <Col sm="12" xl="12" className="text-right">
            <span onClick={this.toggleSorting}>
              Sort by date:{" "}
              {this.state.sortDesc === true ? (
                <GoTriangleDown />
              ) : (
                <GoTriangleUp />
              )}
            </span>
          </Col>
        </Row>
        <Row>
          <Col sm="2">
            Categories:{" "}
            <FormGroup check inline={window.innerWidth <= 760 ? true : false}>
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
            {/* Error due to HTTP code 500, page reloaded. Can be resolved differently */}
            {this.state.error ? window.location.reload() : ""}

            {this.state.activeCategories.length === 0
              ? "Select at least one category!"
              : ""}
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
