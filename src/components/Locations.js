import React from 'react'
import Location from './Location'
import {Container, Row, Col, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap'

 export default class Locations extends React.Component {
     constructor(props){
         super(props)
         this.state = {dropdownOpen: false, dropdownLocationOpen: false, dropDownValue: "All Cuisines", dropDownLocationValue: "All Locations"}
     }

     handleSearchChange = e =>{
         this.setState({
             dropDownValue: "All Cuisines", dropDownLocationValue: "All Locations"
         })
         this.props.filterName(e.target.value)
     }

     toggle = e => {
        if (e.target.name === "Cuisines"){
            this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen,  dropdownLocationOpen: false
            }));
        }else if (e.target.name === "Locations"){
            this.setState(prevState => ({
                dropdownLocationOpen: !prevState.dropdownLocationOpen, dropdownOpen: false
                }));
        }else{
            this.setState({
                dropdownLocationOpen: false, dropdownOpen: false
                });
        }
      }

      toggleFilterName = e => {
        if (e.target.id){
            this.setState({dropDownValue: e.target.id})
            this.props.filterDropDowns([e.target.id, this.state.dropDownLocationValue])
        }
      }

      toggleFilterLocation = e => {
        if (e.target.id){
            this.setState({dropDownLocationValue: e.target.id})
            this.props.filterDropDowns([this.state.dropDownValue, e.target.id])
        }
      }

    render(){
        var restaurants = []; 

        if(this.props.state.filteredRestaurants === undefined){
            restaurants = this.props.state.list.map((rest, idx) => {
            return (<Col lg={{size:4}} key={idx}>
                        <Location key={idx} data={rest} handleClick={this.props.handleClick} />
                    </Col>
                    )
        })
        }
        else{
            restaurants = this.props.state.filteredRestaurants.map((rest, idx) => {
            return (<Col lg={{size:4}} key={idx}>
                    <Location key={idx} data={rest} handleClick={this.props.handleClick} />
                    </Col>
                    )
                }
            )
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
                <Row className="mt-1 mr-1">

                <Col>
                    <Row className="mt-1 ml-1 d-flex justify-content-start">               
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret name="Cuisines" >{this.state.dropDownValue}</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem ><div onClick={this.toggleFilterName} id="All Cuisines">All Cuisines</div></DropdownItem>
                            <DropdownItem ><div onClick={this.toggleFilterName} id="Afghan">Afghan</div></DropdownItem>
                            <DropdownItem ><div onClick={this.toggleFilterName} id="American">American</div></DropdownItem>
                            <DropdownItem ><div onClick={this.toggleFilterName} id="Bakery">Bakery</div></DropdownItem>
                            <DropdownItem ><div onClick={this.toggleFilterName} id="Chinese">Chinese</div></DropdownItem>
                            <DropdownItem ><div onClick={this.toggleFilterName} id="Fast Food">Fast Food</div></DropdownItem>
                            <DropdownItem ><div onClick={this.toggleFilterName} id="indian">Indian</div></DropdownItem>
                            <DropdownItem ><div onClick={this.toggleFilterName} id="Mediterranean">Mediterranean</div></DropdownItem>
                            <DropdownItem ><div onClick={this.toggleFilterName} id="Middle Eastern">Middle Eastern</div></DropdownItem>
                            <DropdownItem ><div onClick={this.toggleFilterName} id="Nepalese">Nepalese</div></DropdownItem>
                            <DropdownItem ><div onClick={this.toggleFilterName} id="Pakistani">Pakistani</div></DropdownItem>
                            <DropdownItem ><div onClick={this.toggleFilterName} id="Persian">Persian</div></DropdownItem>
                            <DropdownItem ><div onClick={this.toggleFilterName} id="Peruvian">Peruvian</div></DropdownItem>
                            <DropdownItem ><div onClick={this.toggleFilterName} id="Portuguese">Portuguese</div></DropdownItem>
                            <DropdownItem ><div onClick={this.toggleFilterName} id="Thai">Thai</div></DropdownItem>
                            <DropdownItem ><div onClick={this.toggleFilterName} id="Turkish">Turkish</div></DropdownItem>                  
                        </DropdownMenu>
                    </ButtonDropdown>
                    </Row>
                </Col>
                <Col>
                    <Row className="mt-1 d-flex justify-content-end">
                        <ButtonDropdown isOpen={this.state.dropdownLocationOpen} toggle={this.toggle}>
                            <DropdownToggle caret name="Locations" >{this.state.dropDownLocationValue}</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem ><div onClick={this.toggleFilterLocation} id="All">All</div></DropdownItem>
                                <DropdownItem ><div onClick={this.toggleFilterLocation} id="Northern Virginia">VA</div></DropdownItem>
                                <DropdownItem ><div onClick={this.toggleFilterLocation} id="Maryland">MD</div></DropdownItem>   
                                <DropdownItem ><div onClick={this.toggleFilterLocation} id="DC">DC</div></DropdownItem>             
                            </DropdownMenu>
                        </ButtonDropdown>
                    </Row>
                </Col>
                </Row>
                <Row className="mt-2 mb-5 d-flex justify-content-center">
                    {this.props.state.homePageLoaded?
                        restaurants:   
                        <img src={require("../loading.gif")} alt="loading gif"></img>      
                    }
                </Row>                
            </Container>
        )
    }
}

