import React, { Component } from 'react';
import './newsItem.css'

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            error: null
        };
        console.log("constructor of newsitem");


    }
    componentDidMount() {
        const apikey=process.env.REACT_APP_API_KEY;
        var url = 'https://newsapi.org/v2/top-headlines?' +
            'country=us&'+apikey;
        var req = new Request(url);
        fetch(req)
            .then(response => response.json())
            .then(data => {
                this.setState({ data: data, isLoading: false });
            })

    }
    render() {
        console.log(this.state.data)
        return (
            <div className='containerDiv'>{
                this.state.data && this.state.data.articles.map((article) =>
                <div className="card" style={{width:"18rem",height:"30rem",margin:"10px"} }>
                    <img style={{height:"10rem"}} src={article.urlToImage} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{article.title}</h5>
                        <p className="card-text">{article.description}</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                )
                
            }

            </div>
        );
    }
}

export default Item;
