import React, { Component } from "react";
import { getArticles } from "./services/API";
import Article from "./components/Article";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, FormGroup, Label, Input } from "reactstrap";
import "./css/customStyles.css";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";

export default class App extends Component {
  state = {
    categories: ["fashion", "sports"], //can be extended by more categories
    activeCategories: [0, 1], //both categories selected as default
    articles: [],
    sortDesc: true,
    error: null
  };

  componentWillMount() {
    this.getArticlesOfSelectedCategories();
  }

  getArticlesOfSelectedCategories = () => {
    this.setState({ error: null, articles: [] });

    //iterate selected categories
    this.state.activeCategories.map(activeCat => {
      let activeCategoryName = this.state.categories[activeCat];

      //get posts from iterated category
      getArticles(activeCategoryName).then(articles => {
        if (articles.message) {
          this.setState({ error: articles.message });
        } else {
          let articlesArr = [...this.state.articles, ...articles.articles];

          //add timestamp field to each post object, could have been done while fetching from API
          //it's because Moment and internal parsing date library don't recognize oktober
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
            ].indexOf(dateSplitted[1]);

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

          this.setState(
            {
              articles: articlesArr
            },
            () => {
              this.sortArticles();
            }
          );
        }
      });
    });
  };

  sortArticles() {
    if (this.state.sortDesc === true) {
      this.setState(prevState => {
        this.state.articles.sort((a, b) => b.timeStamp - a.timeStamp);
      });
    } else {
      this.setState(prevState => {
        this.state.articles.sort((a, b) => a.timeStamp - b.timeStamp);
      });
    }

    this.forceUpdate();
  }

  toggleSorting = () => {
    this.setState({ sortDesc: !this.state.sortDesc }, () => {
      this.sortArticles();
    });
  };

  getCategoryNameCapitalized = categoryName => {
    return categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
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
                    {"  " + categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
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
