import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

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

    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=f3ae35dedebf4e3f9341ae2ab46c878b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(80);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
        this.props.setProgress(100);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
        }
        document.title = `News Monkey - ${this.props.category}`;
    }

    async componentDidMount() {
        // Called immediately after a component is mounted/rendered.
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=f3ae35dedebf4e3f9341ae2ab46c878b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false,
        });
    }
    render() {
        return (<>
            {/* News sec */}
            <InfiniteScroll InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={< Spinner />}
            >
                <div className='container'>
                <div className="row my-4">
                    <h1 className='text-center my-3'>{this.props.title}</h1>
                        {this.state.articles.map((element, key) => {
                            // console.log(element);
                            return <div className="col-md-3" key={key}>
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} publishDate={element.publishedAt} author={element.author} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll >
        </>
        )
    }
}

export default News

