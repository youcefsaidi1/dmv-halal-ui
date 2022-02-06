import React from 'react';
import './App.css';
import Locations from './components/Locations'
import {Container} from 'reactstrap'
import DetailsPage from './components/DetailsPage'
import AddRestaurant from './components/AddRestaurant'
import axios from 'axios'
import Navbar from './components/NavBar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const restaurantData = require('./restdata.json');
var BASEURL = '13v4yjfvyi.execute-api.us-east-1.amazonaws.com';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {list: [], details: {}, homePageLoaded: false, error: false}
    this.renderDetails = this.renderDetails.bind(this);
  }
async componentDidMount(){
  if (window.location.hostname == 'localhosta'){
      this.setState({homePageLoaded: true, list: restaurantData})
  }else{
      axios.get(`https://${BASEURL}/restaurant`).then(data=>{
        let approvedRestaurants = data.data.filter(restaurant=>{
          this.setState({homePageLoaded: true})
          return restaurant
        })
    
        this.setState({list: approvedRestaurants})
      }
      ).catch(err=>{
        this.setState({homePageLoaded: true, error: true})
        console.log(err)
      })
  }
}

filterName = (query)=>{
  let filteredRestaurants = this.state.list;
  filteredRestaurants = filteredRestaurants.filter(restaurant =>{
    return restaurant.restaurant.toLowerCase().includes(query.toLowerCase())
  })
  this.setState({filteredRestaurants: filteredRestaurants})
}

filterCuisine = (query)=>{
  let filteredRestaurants = this.state.list;
  if (query === "All Cuisines"){
    this.setState({filteredRestaurants: this.state.list})
  }else{
      filteredRestaurants = filteredRestaurants.filter(restaurant =>{
        return restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
      })
      this.setState({filteredRestaurants: filteredRestaurants})
  }
}

handleClick = (data) =>{
  this.setState({details: data, filteredRestaurants: this.state.list})
}

renderLocations = ()=>{
  return <Locations state={this.state} handleClick={this.handleClick} filterName={this.filterName} filterCuisine={this.filterCuisine}/>
}

renderDetails = (match)=>{
  return <DetailsPage details={this.state.details} match={match.match.params.id}/>
}
search(value, nameKey, myArray){
  for (var i=0; i < myArray.length; i++) {
      if (myArray[i][nameKey] === value) {
        return myArray[i];
      }
  }
}

renderAddRestaurant = ()=>{
  return <AddRestaurant/>
}
  render() 
    {    
      return(
       <div className="App">
         <Router > 
           <Navbar props={this.search}/>
           {/* <Link to="/restaurants" style={{textDecoration: 'none'}}><Header/></Link> */}
            <Container>
             <div>
                <Switch>
                  <Route exact path="/details/:id" component={this.renderDetails}/>
                  <Route path='/addRestaurant' component={this.renderAddRestaurant}/>
                  <Route path="/restaurants" component={this.renderLocations}/>
                  <Route path="/" component={this.renderLocations}/>
                </Switch>
              </div>
            </Container>
         </Router> 
       </div>)
    }
}

export default App;
