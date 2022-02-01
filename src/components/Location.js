import React from 'react'
import {Card, CardSubtitle, Row} from 'reactstrap'
import { withRouter } from "react-router-dom";
import StarRatingComponent from 'react-star-rating-component';
import Container from 'reactstrap/lib/Container';

class Location extends React.Component {

    handleClick = () => {
       this.props.handleClick(this.props.data)
       this.props.history.push(`/details/${this.props.data.restaurantid}`)
    }

    render(){
        let state = this.props
        let address = `${state.data.address} ${state.data.city} ${state.data.state} ${state.data.zip}`;
        return(
            <Container className="p-3 h-100">
            <Card className="shadow-lg p-3 bg-white rounded h-100" id={state.data.restaurantid} onClick={this.handleClick}>
            {/* <CardImg top width="100%" src="https://www.stou.ac.th/schools/sla/modules/module12/images/restaurant.png" alt="Card image cap" /> */}
            <h5 className="card-title text-center">{state.data.restaurant}</h5>
            <Row className="d-flex justify-content-center">
                <CardSubtitle>
                {state.data.rating>0?<StarRatingComponent emptyStarColor="gray" name="ResaurantRatingCard" value={parseFloat(state.data.rating)} editable={false} />:null}
            </CardSubtitle>
            </Row>

            {state.data.cuisine?<CardSubtitle>Cuisine: {state.data.cuisine}</CardSubtitle>:<CardSubtitle>Cuisine: Not Available</CardSubtitle>}
            {(state.data.phone)?<CardSubtitle>Phone: {state.data.phone}</CardSubtitle>:<CardSubtitle>Phone: Not Available</CardSubtitle>}
            {state.data.address?<CardSubtitle>Address: {address}</CardSubtitle>:<CardSubtitle>Address: Not Available</CardSubtitle>}
         </Card>
            </Container>

        )
    }
}

export default withRouter(Location)