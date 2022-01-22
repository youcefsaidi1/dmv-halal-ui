import React from 'react'
import {Container} from 'reactstrap'


const Header = () => {
    return(
            <Container className="header" fluid>             
                    <h1 className="display-3">DMV Halal</h1>
                    <p className="lead">One stop location for halal food in your area!</p>                   
            </Container>
    )
}

export default Header