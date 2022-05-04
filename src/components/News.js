import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    handleNextClick = async () => {
        console.log("next click")
        // check if next page exits or not 
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 16)) {
            //pass
        }
        else {
            // News API's URL
            let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=f3ae35dedebf4e3f9341ae2ab46c878b&page=${this.state.page + 1}&pageSize=16`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
    }
    handlePrevClick = async () => {
        console.log("prev click")
        // News API's URL
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=f3ae35dedebf4e3f9341ae2ab46c878b&page=${this.state.page - 1}&pageSize=16`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
        });
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
    }

    async componentDidMount() {
        // Called immediately after a component is mounted/rendered.
        console.log("cdm")
        // News API's URL
        let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=f3ae35dedebf4e3f9341ae2ab46c878b&page=1&pageSize=16";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
        });
    }

    render() {
        return (
            <div className='container'>
                {/* Previous and Next button section */}
                <div className="container my-3 d-flex justify-content-between">
                    <button type="button" className="btn btn-primary" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>&laquo; Previous</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &raquo;</button>
                </div>
                <div className="row my-4 d-flex justify-content-start">
                    <h1>News Monkey - Latest News</h1>
                    {this.state.articles.map((element, key) => {
                        // console.log(element);
                        return <div className="col-md-3" key={key}>
                            <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 55) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                {/* Previous and Next button section */}
                <div className="container my-3 d-flex justify-content-between">
                    <button type="button" className="btn btn-primary" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>&laquo; Previous</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &raquo;</button>
                </div>
            </div>
        )
    }
}

export default News

