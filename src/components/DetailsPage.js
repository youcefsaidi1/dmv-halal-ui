import React from 'react';
import axios from 'axios'
import { withRouter } from "react-router-dom";
import {Container, Row, Col, Button, Toast, ToastBody} from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';
import { FaPhone, FaAddressBook } from "react-icons/fa";
import ReviewSection from './ReviewSection';


const restaurantData = require('../restdata.json');

var BASEURL = "13v4yjfvyi.execute-api.us-east-1.amazonaws.com";

class DetailsPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {showButton: true, successMessage: false, detailsLoaded: false, displayRatingMessage: false, displayCommentMessage: false  ,reviewRating: 0, comment: "", details: {name: "", Reviews: [{comment: "No Reviews"}]}}
        
    }
    componentDidMount(){
        
        if (this.props.details.restaurant !== undefined){
            this.setState({details: this.props.details, detailsLoaded: true})
        }
        else{

            if (window.location.hostname === 'localhost'){
                this.setState({details: restaurantData[0], detailsLoaded: true})
            }else{  
                axios.get(`https://${BASEURL}/restaurant/${this.props.match.params.id}`).then(data=>{
                    if(data.data.Item === undefined || data.data.name === "SequelizeError"){
                        this.props.history.push('/restaurants')
                        return data.data.Item[0]
                    }else{

                        this.setState({details: data.data.Item, detailsLoaded: true})  
                    }
                    return data.data.Item
                }).catch(err=>{
                    console.log(err)
                    this.props.history.push('/restaurants')
                })
            }      
    }

    }

    render(){   
        if(this.state.detailsLoaded){
            return(
                <Container>
                    <Row>
                        <Col lg={{size: 6}}>
                            <Row className="d-flex justify-content-center">
                                <h1 className="restaurantName">{this.state.details.restaurant}</h1>
                            </Row>
                            <Row className="d-flex justify-content-center">
                                <Col sm={{size: 6}} className="d-flex justify-content-center">
                                <StarRatingComponent className="RestaurantRating" size={70} name="ResaurantRating" emptyStarColor="gray" value={parseFloat(this.state.details.rating)} editable={false} />
                                </Col>
                               <Col sm={{size: 6}} className="d-flex justify-content-center">
                               {this.state.details.url?<Button target="_blank" href={this.state.details.url}>Visit Website</Button>:null}
                               </Col>
                            </Row>
                            <Row className="d-flex justify-content-center">
                                <Col lg={{size: 12}} className="d-flex justify-content-center">
                                    {this.state.details.cuisine?<h5>Cuisine: {this.state.details.cuisine}</h5>:<h5>Cuisine: Not Available</h5>}
                                    
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-center">
                                <Col className="d-flex justify-content-center">
                                    {this.state.details.type?<h5>Category: {this.state.details.type}</h5>:<h5>Category: Not Available</h5>}
                                </Col>
                            </Row>
                            
                        </Col>

                        <Col lg={{size: 6}}>
                            <div className="toastAddressPhone">
                            <Toast >
                                <ToastBody>
                                    {this.state.details.phone?<div><FaPhone />&#9;{this.state.details.phone}</div>:<h5><FaPhone />&#9;Not Available</h5>}
                                    <hr />
                                    <FaAddressBook />&#9;<a href={`https://maps.google.com/?q=${this.state.details.address}`}>{this.state.details.address}</a>
                                </ToastBody>
                            </Toast>
                            </div>

                        </Col>

                    </Row>

                    <div id="details_page_review_section">
                        <ReviewSection data={this.state}/>
                    </div>
                    <footer>
                        <p id='googleFooter'>This page uses Google's Maps API: <a href="https://www.google.com/policies/privacy">Privacy Policy</a>, <a href="https://www.google.com/intl/en/policies/terms">Terms and Services</a></p>
                    </footer>
                </Container>
            )
        }
        else{
            return(
                <p>Loading...</p>
            )
            
        }
    }
}


export default withRouter(DetailsPage)
