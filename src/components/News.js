import React,{useEffect,useState} from 'react';
import Loading from './Loading';
import NewsItem from './NewsItem';
import propTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=> {

    const [articles, setArticles] = useState([]);    
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    
    
    const captilise=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
        }
        const updateNews=async()=>{
            props.setProgress(10);
            let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=5222548351e14aa48936d9a72f843833&page=${page}&pageSize=${props.pageSize}`;
            props.setProgress(30);
            setLoading();
            let data= await fetch(url);
            props.setProgress(70);
            let parsedData= await data.json();
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
            setLoading(false);
            props.setProgress(100);
        }
        useEffect(() => {
            document.title=`${captilise(props.category)} - News`;
            updateNews();
        }, []);
        
        // handlePreviousClick= async()=>{

        //     // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=5222548351e14aa48936d9a72f843833&page=${this.state.page-1}&pageSize=${props.pageSize}`;
        //     // this.setState({loading:true})
        //     // let data= await fetch(url);
        //     // let parsedData= await data.json()
        //     // // console.log(parsedData);

        //     // this.setState({
        //     //     page:this.state.page-1,
        //     //     articles: parsedData.articles,
        //     //     loading:false
        //     // })
        //     this.setState({page:this.state.page-1})
        //     this.updateNews();
        // }

        // handleNextClick= async()=>{
        //     // if(!(this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize))){
        //     //     let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=5222548351e14aa48936d9a72f843833&page=${this.state.page+1}&pageSize=${props.pageSize}`;
        //     //     this.setState({loading:true})
        //     //     let data= await fetch(url);
        //     //     let parsedData= await data.json()
        //     //     // console.log(parsedData);
        //     //     // this.setState({loading:false})
        //     //     this.setState({
        //     //         page:this.state.page+1,
        //     //         articles: parsedData.articles,
        //     //         loading:false
        //     //     })
        //     // }
        //     // this.setState({articles:parsedData.articles})
        //     // this.setState({ totalResults: parsedData.totalResults})
        //     this.setState({page:this.state.page+1});
        //     this.updateNews();
        // }
        const fetchMoreData = async () => {
            let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=5222548351e14aa48936d9a72f843833&page=${page+1}&pageSize=${props.pageSize}`;
            setPage(page+1);
            let data= await fetch(url);
            let parsedData= await data.json()
            setArticles(articles.concat(parsedData.articles))
            setTotalResults(parsedData.totalResults);
        };
        return (
            <>
                    <h1 className='text-center' style={{margin:'35px 6px',marginTop:'90px'}}>News Feed on {captilise(props.category)}</h1>
                    {loading && <Loading/>}
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length!==totalResults}
                        loader={<Loading/>}>
                        <div className="container">
                            <div className="row">
                                {articles.map((element)=>{
                                    return <div className="col-md-4" key={element.url}>
                                        <NewsItem  title={element.title} description={element.description} imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                                    </div>
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>

                    {/* <div className="container my-3 d-flex justify-content-between">
                        <button type="button" className="btn btn-dark" onClick={this.handlePreviousClick} disabled={this.state.page<=1}>&larr; Previous</button>
                        <button disabled={(this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div> */}
            </>
        )
    
}
News.defaultProps={
    country:'us',
    pageSize:8,
    category:'general'
}
News.propTypes={
    country: propTypes.string,
    pageSize:propTypes.number,
    category:propTypes.string
}
export default News
