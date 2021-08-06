import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { fetchProducts, logout, startCounter } from '../redux'

var token;

function ProductList(props) {
    const [article, setArticle] = useState("Diabetes");


    const allProducts = props.products;
    var asthamaArticles = allProducts.article ? allProducts.article.filter(i => i.categoryName == "Asthma"):[]
    var hypertensionArticles =allProducts.article ?  allProducts.article.filter(i => i.categoryName == "Hypertension"):[]
    var diabetesArticle =allProducts.article ?  allProducts.article.filter(i => i.categoryName == "Diabetes"):[]

    const displayList = article === "Diabetes" ? diabetesArticle : article === "Hypertension" ? hypertensionArticles : asthamaArticles;

    token = props.authHeaders.access_token;

    useEffect(() => {
        props.fetchProducts(token)
    }, [])

    return (
        <div>
            {!props.counterStart && <>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">Truemeds</span>
                        <div className="">

                            <button className="btn btn-primary" onClick={() => props.logout(false)}>Sign Out</button>
                            <button className="btn btn-primary" onClick={() => props.startCounter(true)}>Reset Counter</button>
                        </div>
                    </div>
                </nav>
                <h2>Product List</h2>
                <div className="btn-group" role="group" aria-label="Basic example">
                    {allProducts.category &&allProducts.category.map((item, index) =>
                        <button index={index} type="button" className={article == item.name ? "btn btn-primary" : "btn btn-secondary"} onClick={() => setArticle(item.name)}>{item.name}</button>
                    )}
                </div>
                <div className="main-container">
                    {displayList.length > 0 ? displayList.map((item, index) =>
                        <div className="card" key={index}>
                            <img src={item.image ? item.image : "https://dummyimage.com/600x400/000/000000"} className="card-img-top image" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text desc">{item.description}</p>
                            </div>

                            <div className="card-body">

                                <a href={item.url} className="btn btn-dark link" target="_blank">View more</a>
                            </div>
                        </div>) :
                        <h2>No products to display</h2>}
                </div>
            </>}


            <style jsx>
                {`
                h2{
                    margin-top:20px;
                }
                .desc{
                    display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                }
                .card-title{
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .main-container{
                   display:flex;
                   justify-content:space-between;
                   flex-flow:wrap;
                   flex-direction:row;
                    margin-top:40px;
                    padding:20px;
                }
                .image{
                    height:43%;
                }
                .card{
                    width:20%;
                    margin:20px;
                    position:relative;
                }
                .link{
                    // text-decoration:none;
                    // position:absolute;
                }
                
                @media screen and (max-width: 1000px){
                    .card{
                        width:40%;
                        margin-bottom:20px;
                    }
                    .navbar{
                        width:100%;
                    }
                }
                @media screen and (max-width: 620px){
                    .card{
                        width:80%;
                        margin:auto;
                        margin-bottom:20px;
                    }
                    .main-container{
                        width:100%;
                        padding:0px;
                    }
                    .navbar{
                        width:100%;
                    }
                }

                `}
            </style>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        userData: state.user,
        viewProducts: state.login.viewProducts,
        counterStart: state.login.counterStart,
        authHeaders: state.login.authHeaders,
        products: state.login.products,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: (token) => dispatch(fetchProducts(token)),
        logout: (value) => dispatch(logout(value)),
        startCounter: (value) => dispatch(startCounter(value)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
