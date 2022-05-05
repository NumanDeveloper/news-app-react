import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 4,
        category: 'general',
        title: 'News Monkey - Top Stories',
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        title: PropTypes.string,
    }

    async updateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=f3ae35dedebf4e3f9341ae2ab46c878b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
    }
    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }
    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        document.title = `News Monkey - ${this.props.category}`;
    }

    async componentDidMount() {
        // Called immediately after a component is mounted/rendered.
        this.updateNews();   
    }

    render() {
        return (
            <div className='container'>
                {/* Previous and Next button section */}
                <div className="container my-3 d-flex justify-content-between">
                    <button type="button" className="btn btn-primary" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>&laquo; Previous</button>
                    <button type="button" className="btn btn-primary" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick}>Next &raquo;</button>
                </div>

                {/* News sec */}
                <div className="row my-4">
                    <h1 className='text-center my-3'>{this.props.title}</h1>
                    {this.state.loading && <Spinner />}
                    {!this.state.loading && this.state.articles.map((element, key) => {
                        // console.log(element);
                        return <div className="col-md-3" key={key}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} publishDate={element.publishedAt} author={element.author} source={element.source.name} />
                        </div>
                    })}
                </div>

                {/* Previous and Next button section */}
                <div className="container my-3 d-flex justify-content-between">
                    <button type="button" className="btn btn-primary" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>&laquo; Previous</button>
                    <button type="button" className="btn btn-primary" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick}>Next &raquo;</button>
                </div>
            </div>
        )
    }
}

export default News

