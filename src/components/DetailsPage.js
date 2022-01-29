import React from 'react';
import axios from 'axios'
import { withRouter } from "react-router-dom";
import {Container, Row, Col, Card, CardTitle, CardFooter, Form, FormGroup, Button, Input, CardSubtitle} from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';


var BASEURL = "13v4yjfvyi.execute-api.us-east-1.amazonaws.com";

class DetailsPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {showButton: true, successMessage: false, detailsLoaded: false, displayRatingMessage: false, displayCommentMessage: false  ,reviewRating: 0, comment: "", details: {name: "", Reviews: [{comment: "No Reviews"}]}}
    }
    componentDidMount(){
        axios.get(`https://${BASEURL}/restaurant/${this.props.match.params.id}`).then(data=>{
            if(data.data.Item === undefined || data.data.name === "SequelizeError"){
                this.props.history.push('/restaurants')
                return data.data.Item[0]
            }else{
                this.setState({details: data.data.Item, detailsLoaded: true})  
            }
            return data.data.Item
        }).catch(err=>{
            this.props.history.push('/restaurants')
        })
    }

    handleChange = (e) =>{
        this.setState({comment: e.target.value})
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({reviewRating: nextValue});
      }

    handleSubmit = (e)=>{
        if(this.state.comment.length<4){
            e.preventDefault();
            this.setState({displayCommentMessage: true, displayRatingMessage: false})
        }else{
            if(this.state.reviewRating<1){
                e.preventDefault()
                this.setState({displayCommentMessage: false, displayRatingMessage: true})
            }else{
                e.preventDefault()
                this.setState({showButton: false})
                axios.post(`https://${BASEURL}/addCommentToRestaurant`,{data: this.state.details, comment: this.state.comment, rating: this.state.reviewRating}).then(data=>{ 
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
            review = this.state.details.reviews.map((review, idx) =>{
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
                                            Rating: <StarRatingComponent emptyStarColor="gray" value={review.rating} editable={false} name={`reviewRating${idx}`}/>
                                        </Row>        
                                    </CardSubtitle>
                                    <CardFooter>
                                        <h5>{review.comment}</h5>
                                    </CardFooter>                                    
                                        <p>{dateCreated}</p> 
                                </Container>
                            </Card>
                        </Col>
                    </Row>
                </div>)
            }else {
                return (<div></div>)
            }
            })
        }

        return(
            <Container>
                <Row>
                    <Col lg={{size: 12}}>
                    <h1>{this.state.details.restaurant}</h1>
                    </Col>
                    <Col lg={{size: 12}}>
                        <StarRatingComponent className="RestaurantRating" name="ResaurantRating" emptyStarColor="gray" value={this.state.details.rating} editable={false} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={{size: 12}}>
                    <h3>Cuisine: {this.state.details.cuisine}</h3>
                    </Col>
                    <Col lg={{size: 12}}>
                    <h3>Address: <a href={`https://maps.google.com/?q=${this.state.details.address}`}>{this.state.details.address}</a></h3>
                    </Col>
                    <Col lg={{size: 12}}>
                    <h3>Phone: {this.state.details.phone}</h3>
                    </Col>
                    <Col lg={{size: 12}}>
                    <h3>Category: {this.state.details.type}</h3>
                    </Col>
                </Row>

                <div id="details_page_review_section">
                    <Container>
                        <Row>
                            <Col lg={{size:12}}>
                                <h3>Reviews:</h3>
                            </Col>
                        </Row>
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
                                            <Input type="textarea" placeholder={`How was your experience at ${this.state.details.restaurant}`}>
                                            </Input>
                                            {this.state.displayCommentMessage?<h6>Comment must be at least 4 characters!</h6>:null}
                                            {this.state.displayRatingMessage?<h6>Rating must have at least 1 star!</h6>:null}
                                            {this.state.successMessage?<h6>Thank you for your feedback! Pending approval...</h6>:null}
                                            {this.state.showButton?<Button className="my-2" name="reviewButton">Submit</Button>:null}

                                        </FormGroup>
                                    </Form>                                        
                                    </Container>
                                </Card>
                            </Col>
                        </Row>
                         {review}
                    </Container>         
                </div>
            </Container>
        )
    }
}


export default withRouter(DetailsPage)
