import React, { Component } from "react";
import { getArticles } from "../services/API";

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
      <div>
        {this.state.categories.map((categoryName, index) => (
          <div key={index}>{this.getCategoryNameCapitalized(categoryName)}</div>
        ))}
        {this.state.articles.map((article, index) => (
          <div key={index}>{article.id}</div>
        ))}
      </div>
    );
  }
}
