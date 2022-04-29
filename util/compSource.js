'use strict';

class Input extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <label>
                {this.props.inputNameDisplay}:
                <input type = 'text' name = {this.props.name} value = {this.props.value} onChange = {this.props.handleChange}/>
            </label>
        )
    }
}



class Header extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return <h1 onClick={redirectHomepage}>Soil</h1>
    }
}


