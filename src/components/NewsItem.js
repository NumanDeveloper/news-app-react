import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl } = this.props; // JavaScript Destructuring
        return (
            <div className='my-3'>
                <div className="card" style={{ width: '18rem' }}>
                    <img src={imageUrl?imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsq1NacYKHKS-RudSBgbLZa_ndkD-lmmQfA&usqp=CAU"} alt="news img" style={{ height: '13pc' }} />
                    <div className="card-body">
                        <h5 className="card-title">{(title.length < 40 ? title : title + "...")}</h5>
                        <p className="card-text">{(description.length < 55 ? description : description + "...")}...</p>
                        <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
