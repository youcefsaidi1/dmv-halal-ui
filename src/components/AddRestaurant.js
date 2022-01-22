import React from 'react'
import {Container, Row, Col, Form, FormGroup,  Label, Input,  Button} from 'reactstrap'
import Axios from 'axios'
var BASEURL='192.168.1.162'
export default class AddRestaurant extends React.Component{
    constructor(props){
        super(props)
        this.state = {showMessage:false, showErrorMessage: false}
    }
    handleformSubmit = (e)=>{
        this.setState({showMessage: true})
        e.preventDefault()
        var payload ={
            name: e.target.Name.value,
            cuisine: e.target.Cuisine.value,
            region: e.target.State.value,
            address: e.target.Address.value,
            city: e.target.City.value,
            state: e.target.State.value,
            zip: e.target.Zip.value,
            phone: e.target.Phone.value,
            url: e.target.url.value,
            type: e.target.Type.value,
            rating: 0
        }

        var authOptions = {
            url: `http://${BASEURL}:8080/restaurants/new`,
            method: 'post',
            data: payload
        }
        Axios(authOptions).then(response=>{
            console.log("Thank you for your submission!");
            this.setState({showErrorMessage:false})
        }).catch(err=>{
            console.log("Oh no, we ran into an issue with your submission");
            this.setState({showErrorMessage:true})
        })

    }

    render(){
        return(
            <Container className="addRestaurant">
                    <Row > 
                            {this.state.showErrorMessage?<Col><h4 className="d-flex justify-content-center">Sorry, we couldn't process your request :(</h4></Col>:<div></div>}   
                            {this.state.showMessage?<Col><h4 className="d-flex justify-content-center">Thank you, we'll add you submission shortly!</h4></Col>:<div></div>}   
                    </Row>
                    <Form onSubmit={this.handleformSubmit.bind(this)}>
                        <FormGroup>
                            <Row>
                                <Col sm={{size: 3}}>
                                    <Label for="Name">Name: </Label>
                                </Col>
                                <Col sm={{size: 9}}>
                                    <Input required type="text" name="Name" id="restaurantName" placeholder="required" />
                                </Col>                                
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col sm={{size: 3}}>
                                    <Label for="Address">Street Address: </Label>
                                </Col>
                                <Col sm={{size: 9}}>
                                    <Input required type="text" name="Address" id="restaurantAddress" placeholder="required" />
                                </Col>                                
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col sm={{size: 3}}>
                                    <Label for="City">City: </Label>
                                </Col>
                                <Col sm={{size: 9}}>
                                    <Input required type="text" name="City" id="restaurantCity" placeholder="required" />
                                </Col>                                
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col sm={{size: 3}}>
                                    <Label for="Zip">Zip: </Label>
                                </Col>
                                <Col sm={{size: 9}}>
                                    <Input required type="number" name="Zip" id="restaurantPhone" placeholder="required" />
                                </Col>                                
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col sm={{size: 3}}>
                                    <Label for="State">State: </Label>
                                </Col>
                                <Col sm={{size: 9}}>
                                    <select required name="State" className="form-control">
                                        <option defaultValue>State</option>
                                        <option value="MD">Maryland</option>
                                        <option value="VA">Virgina</option>
                                        <option value="DC">Washington D.C.</option>
                                    </select>
                                </Col>                                
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col sm={{size: 3}}>
                                    <Label for="Phone">Phone: </Label>
                                </Col>
                                <Col sm={{size: 9}}>
                                    <Input type="text" name="Phone" id="restaurantPhone" placeholder="optional" />
                                </Col>                                
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col sm={{size: 3}}>
                                    <Label for="Type">Type: </Label>
                                </Col>
                                <Col sm={{size: 9}}>
                                    <select name="Type" className="form-control">
                                        <option value="Quick Bite">Quick Bite</option>
                                        <option value="Family/Casual">Family/Casual</option>
                                        <option value="Semi-Formal">Semi-Formal</option>
                                        <option value="Formal">Formal</option>
                                    </select>
                                </Col>                                
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col sm={{size: 3}}>
                                    <Label for="Cuisine">Cuisine: </Label>
                                </Col>
                                <Col sm={{size: 9}}>
                                    <select name="Cuisine" className="form-control">
                                        <option value="Afghan">Afghan</option>
                                        <option value="American">American</option>
                                        <option value="American/Indian">American/Indian</option>
                                        <option value="American/Pizza">American/Pizza</option>
                                        <option value="Bakery">Bakery</option>
                                        <option value="Chinese">Chinese</option>
                                        <option value="Danish">Danish</option>
                                        <option value="Greek">Greek</option>
                                        <option value="Indian">Indian</option>
                                        <option value="Lebanese">Lebanese</option>
                                        <option value="Mediterranean">Mediterranean</option>
                                        <option value="Mexican">Mexican</option>
                                        <option value="Tex Mex">Tex Mex</option>
                                        <option value="Middle Eastern">Middle Eastern</option>
                                        <option value="Moroccan">Moroccan</option>
                                        <option value="Nepalese">Nepalese</option>
                                        <option value="Pakistani">Pakistani</option>
                                        <option value="Afghan">Afghan</option>
                                        <option value="Persian">Persian</option>
                                        <option value="Peruvian">Peruvian</option>
                                        <option value="Portuguese">Portuguese</option>
                                        <option value="Thai">Thai</option>
                                        <option value="Turkish">Turkish</option>
                                        <option value="Uighur">Uighur</option>
                                    </select>
                                </Col>                                
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col sm={{size: 3}}>
                                    <Label for="url">Website Link: </Label>
                                </Col>
                                <Col sm={{size: 9}}>
                                    <Input name="url" type="text" placeholder="optional"/>
                                </Col>                                
                            </Row>
                        </FormGroup>   
                        <Col className='d-flex justify-content-center'> 
                            <Button className="btn">submit</Button>
                        </Col>                       
                    </Form>
            </Container>
        )
    }
}