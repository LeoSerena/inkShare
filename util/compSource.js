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

class LoginForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username : '',
            password : '',
            passwordConfirm : '',
            email : ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()
        let data = this.state
        if (this.state.password != this.state.passwordConfirm){
            alert('The two given passwords are not the same')
        } else {
            $.ajax({
                type : 'POST',
                url : '/register',
                data : data,
                success : () => {
                    $.ajax({
                        type : 'POST',
                        url : '/login',
                        data : {
                            credentials : this.state.username,
                            password : this.state.password
                        },
                        success : () => window.location.href = '/homepage',
                        error : (err) => alert(err)
                    })
                },
                error : (err) => { alert(err.responseText) }
            })
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {Object.keys(this.state).map( key => (
                    <Input withLabel={true} name = {key} inputNameDisplay = {key} value = {this.state[key]} handleChange = {this.handleChange}/>
                ))}
                <input type="submit" value="Submit" />
            </form>
        )
    }
}


class AddBookForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            toggle : true,
            book : {
                title : 'title',
                author : 'author',
                release_year : '0'
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        let book = this.state.book
        book[event.target.name] = event.target.value
        this.setState({book : book})
    }

    handleSubmit(){
        $.ajax({
            type : 'POST',
            url : 'addBook',
            data : this.state.book,
            success : (data) => {
                if(data == 'success'){alert('book saved successfuly')}
                this.setState({toggle : true})
            }
        })
    }

    render(){
        if(this.state.toggle){
            return <button onClick={() => this.setState({toggle : false})}>+</button> 
        }else{
            return (
                <form onSubmit={this.handleSubmit}>
                    {Object.keys(this.state.book).map( key => (<Input name = {key} inputNameDisplay = {key} value = {this.state.book[key]} handleChange = {this.handleChange}/>))}
                    <input type="submit" value="Submit" />
                </form>
            )
        }
    }
}

class ModifBookForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            title : '',
            author : '',
            release_year : '',
            creation_date : '',
            last_modif : '',
            notes : ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        $.ajax({
            type : 'GET',
            url : 'getBook',
            data : {book_id : this.props.book_id},
            success : (data) => {
                let book = data[0]
                delete book._id
                book.last_modif = get_day_from_date(book.last_modif)
                book.creation_date = get_day_from_date(book.creation_date)
                this.setState(book)
            },
            error : (err) => console.log(err)
        })
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit(e){
        e.preventDefault()
        let book = this.state
        book._id = this.props.book_id
        console.log(this.state)
        $.ajax({
            type : 'POST',
            url : 'modifBook',
            data : this.state,
            success : (data) => {
                if(data=='success'){
                    alert('book information updated successfully')
                    window.location.reload()
                }
            }
        })
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                {Object.keys(this.state).map( key => (
                    (key=='title'||key=='author'||key=='release_year'||key=='notes')
                        ? <Input key={key} name={key} inputNameDisplay={key} value={this.state[key]} handleChange={this.handleChange}/>
                        : (<p>{key}:{this.state[key]}</p>)
                ))}
                <input type="submit" value="Save" />
            </form>
        )
    }
}

class Row extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        if(this.props.isheader){return <tr>
            {this.props.list.map(e =><th onClick={() => this.props.sortFunc(e)}>{e}</th>)}<th><AddBookForm/></th>
        </tr>} 
        else{return (<tr>
            {this.props.list.map(elem => <td onClick={() => this.props.toggle(this.props.ID)}>{elem}</td>)}
            <td onClick={() => this.props.delFunc(this.props.ID)}>DEL</td>
            </tr>
    )}}
}

class Table extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            list : [],
            headers : [],
            book_id : 0,
            toggle : true
        }

        this.loadData = this.loadData.bind(this)

        this.handleSortClick = this.handleSortClick.bind(this)
        this.handleDelClick = this.handleDelClick.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
    }

    loadData(){
        $.ajax({
            type : 'GET',
            url : this.props.get,
            success : (data) => {
                if(data['length'] == 0){
                    this.setState({
                        list : [],
                        headers : []
                    })
                }else{
                    let headers = Object.keys(data[0]).filter(e => e != '_id')
                    this.setState({list : data, headers : headers})
                }
            }
        })
    }

    componentDidMount(){this.loadData()}
    componentWillUnmount(){}

    // Here we KNOW the "this" that will be called will be the Table and not the Row when executed on the header
    // that is in the Row because we BINDED it with the "this.handleSortClick = this.handleSortClick.bind(this)" line
    // It is thus safe to pass the function below
    handleSortClick(byValue){ 
        this.setState({ list : this.state.list.sort((x,y) => x[byValue] > y[byValue] ? 1 : -1) }) 
    }

    handleDelClick(ID){
        $.ajax({
            type : 'POST',
            url : this.props.del,
            data : {bookId : ID},
            success : (data) => {
                if(data == 'success'){
                    this.setState({list : this.state.list.filter(e => e._id != ID)})
                    alert('The book has been deleted successfuly')
                }
            }
        })
    }

    handleToggle(ID){
        this.setState({
            toggle : false,
            book_id : ID
        })
    }

    render(){
        if(this.state.toggle){
            return (<table>
                <tbody>
                    <Row list={this.state.headers} isheader={true} sortFunc={this.handleSortClick} key='header'/>
                    {this.state.list.map(
                        elem => <Row 
                        toggle={this.handleToggle}
                        list={this.state.headers.map(h => elem[h])}
                        isheader={false} delFunc={this.handleDelClick}
                        key={elem._id}
                        ID={elem._id}/>
                    )}
                </tbody>
            </table>)
        }else{
            return <ModifBookForm book_id={this.state.book_id}/>
        }
    }
}

class TablesContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return (
        <div>
            BOOKS
            <Table get='getBooks' del='delBook' modif='modifBook' key='books'/>
            
            LISTS
            {/* <Table get='getListsInfo' add='addList' del='delList' modif='modifList' key = 'lists'/> */}
        </div>
        )
    }
}