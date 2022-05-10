import React from 'react'
const NewsItem =(props)=> {
        let {title,description,imageURL,newsURL,author,date,source}=props;
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{display:'flex',justifyContent:'flexEnd',position:'absolute',right:'0'}}>
                <span className="badge rounded-pill bg-danger">{source}</span>
                    </div>
                    <img src={!imageURL?"https://img.lemde.fr/2022/01/04/0/0/8192/4096/1440/720/60/0/4ad69c2_5275321-01-06.jpg":imageURL}  className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author} on {date}</small></p>
                        <a href={newsURL} rel='noreferrer' target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem
