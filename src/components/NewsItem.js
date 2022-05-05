import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, publishDate, author, source } = this.props; // JavaScript Destructuring
        return (
            <div className='my-3'>
                <div className="card">
                    <span className="d-flex justify-content-center position-absolute badge rounded-pill bg-primary">{source}</span>
                    <img src={imageUrl ? imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsq1NacYKHKS-RudSBgbLZa_ndkD-lmmQfA&usqp=CAU"} alt="news img" style={{ height: '13pc' }} />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <b><p className="card-text">Author: {author && author.length < 50 ? author : "Unknown"}</p></b>
                        <p className="card-text"><small className="text-muted">Published at {new Date(publishDate).toUTCString()}</small></p>
                        <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
