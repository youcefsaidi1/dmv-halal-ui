import React from 'react';
import axios from 'axios'
import { withRouter } from "react-router-dom";
import {NavLink, TabContent, TabPane, Nav, NavItem, Container, Row, Col, Card, CardTitle, CardFooter, Form, FormGroup, Button, Input, Toast, ToastBody, CardSubtitle} from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';
// import { FaPhone, FaAddressBook } from "react-icons/fa";
import { Loader } from '@googlemaps/js-api-loader';
import classnames from 'classnames';


var BASEURL = "13v4yjfvyi.execute-api.us-east-1.amazonaws.com";

class ReviewSection extends React.Component {
    constructor(props){
        super(props)
        this.state = {...this.props.data, activeTab: '1', googlerequested: false, googlereviews: [], localreviews: this.props.data.details.reviews}
        this.toggle = this.toggle.bind(this);
    }

    initializeGoogleReviews = (e) => {
        if (this.props.data.details.place_id && !this.state.googlerequested){
            console.log("request sent to google")
            const loader = new Loader({
                apiKey: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg",
                version: "weekly",
                libraries: ["places"]
            });
            
            const mapOptions = {
                center: {
                lat: 0,
                lng: 0
                },
                zoom: 4
            };

            loader
            .load()
            .then((google) => {
                const map = new google.maps.Map(document.getElementById("map"), mapOptions);
                const request = {
                    placeId: this.state.details.place_id,
                    fields: ["reviews"],
                };
                const service = new google.maps.places.PlacesService(map);
                service.getDetails(request, (place, status) => {
                    let reviewList = []
                    place.reviews.forEach((review)=>{
                        let time = new Date(1549312452 * 1000).toISOString().slice(0, 19).replace('T', ' ')
                        reviewList.push( {rating: review.rating, createdAt: time, comment: review.text, approved: true, restaurantid: this.state.details.restaurantid})
                    })
                    // let details = {...this.state.details}
                    // details.reviews = [...reviewList]
                    this.setState({googlereviews: reviewList})
                })

            })
            .catch(e => {
                console.log(e)
            });            
        }
    
    }
  

    toggle(tab) {
        if (tab === '2' && !this.state.googleRequested){
            this.initializeGoogleReviews()
            this.setState({googleRequested: true})
        }
        if (this.state.activeTab !== tab) {
            this.setState({
              activeTab: tab
            });
          }
    }

    handleChange = (e) =>{
        this.setState({comment: e.target.value, displayCommentMessage: false, displayRatingMessage: false})
     
    }

    onStarClick(nextValue) {
        this.setState({reviewRating: nextValue});
      }

    handleSubmit = (e)=>{
        if( this.state.comment.length > 500){
            e.preventDefault();
            this.setState({displayCommentMessage: true, displayRatingMessage: false})
        }
        else{
            if(this.state.reviewRating<1){
                e.preventDefault()
                this.setState({displayCommentMessage: false, displayRatingMessage: true})
            }
            else{
                e.preventDefault()
                this.setState({showButton: false})
                axios.post(`https://${BASEURL}/addCommentToRestaurant`,{data: this.state.details, comment: this.state.comment, rating: this.state.reviewRating, createdAt: new Date().toLocaleString()}).then(data=>{ 
                        this.setState({successMessage: true, displayCommentMessage: false, displayRatingMessage: false})  
                }).catch(err=>{
                    this.props.history.push('/restaurants')
                    console.log(err)
                })                
            }
        }
    }

    render(){
        const reviewRating  = this.state.reviewRating;
        var review = (<div></div>);
        if(this.state.detailsLoaded){
            let reviewType = (this.state.activeTab === '2'?this.state.googlereviews:this.state.details.reviews);
  
            review = reviewType.map((review, idx) =>{
                let dateCreated = review.createdAt;
                if(review.approved){
                return(
                    <div key={idx} className="my-2 mx-2">
                        <Row className="d-flex justify-content-center">
                            <Col lg={{size: 9}}>
                                <Card>
                                    <Container className="mx-2 my-2">
                                        <CardTitle>
                                            <h4 >Review {idx+1}</h4>
                                        </CardTitle>
                                        <CardSubtitle>
                                            <Row >
                                                Rating: <StarRatingComponent emptyStarColor="gray" value={parseFloat(review.rating)} editable={false} name={`reviewRating${idx}`}/>
                                            </Row>        
                                        </CardSubtitle>
                                        {review.comment?
                                        <CardFooter>
                                            <h5>{review.comment}</h5>
                                        </CardFooter>
                                        : 
                                        null}                                  
                                            <p>{dateCreated}</p> 
                                    </Container>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    )
                }
                else {
                return (<div></div>)
                }
            }
            )
        }

        return (
            <Container>
                 <div id="map" hidden></div> 
                <Nav tab="true" >
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => {this.toggle('1')}}
                        >Reviews</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => {this.toggle('2')}}
                        >Google Reviews</NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row className="d-flex justify-content-center" >
                            <Col lg={{size: 9}}>
                                <Card >
                                    <Container className="mx-2 my-2">
                                    <CardTitle>
                                        <h6>Leave a Review: </h6>
                                    </CardTitle>
                                    <Col>
                                    <Row>
                                        Rating: <StarRatingComponent 
                                            name="reviewRating" 
                                            starCount={5}
                                            value={reviewRating}
                                            onStarClick={this.onStarClick.bind(this)}
                                        />                                          
                                    </Row>
                                    
                                    </Col>

                                    <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                                        <FormGroup>
                                            <Input id="comment" type="textarea" placeholder={`Details on your experience at ${this.state.details.restaurant} (Optional)`}>
                                            </Input>
                                            {this.state.displayCommentMessage?<h6>Comment must be less than 500 characters!</h6>:null}
                                            {this.state.displayRatingMessage?<h6>Rating must have at least 1 star!</h6>:null}
                                            {this.state.successMessage?<h6>Thank you for your feedback!</h6>:null}
                                            {(!this.state.successMessage &&  !this.state.showButton)?<h6>Submitting...</h6>:null}
                                            {this.state.showButton?<Button className="my-2" name="reviewButton">Submit</Button>:null}
                                        </FormGroup>
                                    </Form>                                        
                                    </Container>
                                </Card>
                            </Col>
                        </Row>
                        {review}
                    </TabPane>
                    <TabPane tabId="2">
                        {review}
                    </TabPane>
                </TabContent>
            </Container>
        )
    }
}

export default withRouter(ReviewSection)