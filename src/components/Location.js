import React from 'react'
import {Card, CardImg, CardSubtitle} from 'reactstrap'
import { withRouter } from "react-router-dom";
import StarRatingComponent from 'react-star-rating-component';

class Location extends React.Component {

    handleClick = () => {
       this.props.handleClick(this.props.data)
       this.props.history.push(`/details/${this.props.data.restaurantid}`)
    }

    render(){
        let state = this.props
        let address = `${state.data.address} ${state.data.city} ${state.data.state} ${state.data.zip}`;
        return(
            <Card className="shadow-lg p-3 mb-5 bg-white rounded my-2" id={state.data.restaurantid} onClick={this.handleClick}>
            <CardImg top width="100%" src="https://www.stou.ac.th/schools/sla/modules/module12/images/restaurant.png" alt="Card image cap" />
            <h5 className="card-title text-center">{state.data.restaurant}</h5>
            <CardSubtitle>
                {state.data.rating>0?<StarRatingComponent emptyStarColor="gray" name="ResaurantRatingCard" value={state.data.rating} editable={false} />:null}
            </CardSubtitle>
            <CardSubtitle>Cuisine: {state.data.cuisine}</CardSubtitle>
            <CardSubtitle>Phone: {state.data.phone}</CardSubtitle>
            <CardSubtitle>Address: {address}</CardSubtitle>
        
         </Card>
        )
    }
}


//  var Location = (state)=> {
//      let address = state.data.address + state.data.city + state.data.state + state.data.zip;
//      let handleClick = ()=>{
//          state.handleClick(4)
//      }
//  return (
//  <Card className="shadow-lg p-3 mb-5 bg-white rounded my-2" id={state.data.id} onClick={state.handleClick}>
//     <CardImg top width="100%" src="http://clipart-library.com/img/1510223.png" alt="Card image cap" />
//     <h5 className="card-title text-center">{state.data.name}</h5>
//     <CardSubtitle>Cuisine: {state.data.cuisine}</CardSubtitle>
//     <CardSubtitle>Phone: {state.data.phone}</CardSubtitle>
//     <CardSubtitle>Address: {address}</CardSubtitle>

//  </Card>
//  )
//  }
export default withRouter(Location)