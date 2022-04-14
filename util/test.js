'use strict';

class Row extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        if(this.props.isheader){
            return <tr>{this.props.list.map(e => 
                <th onClick={(() => this.props.sortFunc(e))}>{e}</th>
            )}</tr>
        } else{
            return <tr>{this.props.list.map(elem => <td>{elem}</td>)}</tr>
        }

    }
}

class Table extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            list : [],
            headers : []
        }

        this.handleSortClick = this.handleSortClick.bind(this)
    }

    componentDidMount(){
        $.ajax({
            type : 'GET',
            url : '/private/getBooks',
            success : (data) => {
                if(data['length'] == 0){
                    this.setState({
                        list : [],
                        headers : []
                    })
                }else{
                    let headers = Object.keys(data[0])
                    headers.shift()
            
                    this.setState({
                        list : data,
                        headers : headers
                    })
                }
            }
        })
    }
    componentWillUnmount(){}

    // Here we KNOW the "this" that will be called will be the Table and not the Row when executed on the header
    // that is in the Row because we BINDED it with the "this.handleSortClick = this.handleSortClick.bind(this)" line
    // It is thus safe to pass the function below
    handleSortClick(byValue){ 
        this.setState({ list : this.state.list.sort((x,y) => x[byValue] > y[byValue] ? 1 : -1) }) 
    }

    render(){
        return (<table>
            <Row list={this.state.headers} isheader={true} sortFunc={this.handleSortClick} key = '0'/>
            {this.state.list.map(
                row => <Row list={this.state.headers.map(h => row[h])} isheader={false} key = {Row.id}/>
            )}
        </table>)
    }
}

class Clock extends React.Component {

    constructor(props){
        super(props)
        this.state = {date : new Date()}
    }

    componentDidMount(){
        this.timer = setInterval( () => this.tick(), 1000)
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }

    tick() {
        this.setState({
            date : new Date()
        })
    }

    render(){
        return (<div>It is {this.state.date.toLocaleTimeString()}</div>)
    }
}


const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);

let clock = <Clock/>

let table = <Table/>

let container = <div>
    {clock}
    {table}
</div>


root.render(container)