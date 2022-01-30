import React from 'react'
import Location from './Location'
import {Container, Row, Col, Image} from 'reactstrap'

 export default class Locations extends React.Component {
     constructor(props){
         super(props)
         this.state = {}
     }

     handleSearchChange = e =>{
         this.props.filterName(e.target.value)
     }

    render(){
        var restaurants = []; 

        if(this.props.state.filteredRestaurants === undefined){
            restaurants = this.props.state.list.map((rest, idx) => {
            return (<Col lg={{size:4}} key={idx}><Location key={idx} data={rest} handleClick={this.props.handleClick} /></Col>)
        })
        }
        else{
            restaurants = this.props.state.filteredRestaurants.map((rest, idx) => {
            return (<Col lg={{size:4}} key={idx}><Location key={idx} data={rest} handleClick={this.props.handleClick} /></Col>)})
        }
        return(
            <Container className="Locations">
                <Row >
                    <Col lg={{size: 12}}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Search: </span>
                            </div>
                            <input className="form-control" onChange={this.handleSearchChange}/>
                        </div> 
                    </Col>
                </Row>
                <Row className="mt-2 mb-5 d-flex justify-content-center">
                    {this.props.state.homePageLoaded?restaurants:
                           
                                <img src={require("../loading.gif")}></img>
                           
                    }
                </Row>                
            </Container>
        )
    }
}

