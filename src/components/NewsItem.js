import React, { Component } from 'react';
import './newsItem.css';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            error: null,
            page: 1
        };
        console.log("constructor of newsitem");
        //binding this permission to async functions
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);

    }
    //inaitalizor
    initializeComponentData = () => {
        this.setState({ isLoading: true });
        const apikey = process.env.REACT_APP_API_KEY;
        var url = `https://newsapi.org/v2/top-headlines?` +
            `country=us&'+'&page=${this.state.page}&` + 'pageSize=8&' + apikey;
        var req = new Request(url);
        console.log(this.state.isLoading);
        fetch(req)
            .then(response => response.json())
            .then(data => {
                this.setState({ data: data, isLoading: false });
            })

    }

    //this will run after rendering of component at first render
    componentDidMount() {
        this.initializeComponentData();
    }
    next = async function (req, res) {
        console.log("next");
        this.setState({ page: this.state.page + 1 }, () => {
            this.initializeComponentData(); // Call after state is updated
        });
    }

    prev = async function (req, res) {
        console.log("previous");
        this.setState({ page: this.state.page - 1 }, () => {
            this.initializeComponentData(); // Call after state is updated
        });
    }
    render() {
        // console.log(this.state.data)
        return (
            <>
                {this.state.isLoading && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}



                <div className='containerDiv'>{
                    this.state.data && this.state.data.articles.map((article) =>
                        <div className="card" style={{ width: "18rem", height: "30rem", margin: "10px" }}>
                            <img style={{ height: "10rem" }} src={article.urlToImage} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{article.title}</h5>
                                <p className="card-text">{article.description}</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    )

                }

                </div>
                <div style={{ padding: "30px" }}>
                    <div className="d-flex justify-content-between">
                        <button disabled={this.state.page<=1} onClick={this.prev} className="btn btn-primary me-2">Prev</button>
                        <div className="flex-grow-1"></div>
                        <button onClick={this.next} className="btn btn-primary ms-2">Next</button>
                    </div>
                </div>

                {console.log("at end" + this.state.isLoading)}
            </>

        );
    }
}

export default Item;
