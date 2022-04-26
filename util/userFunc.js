'use strict';

class UserComponent extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            user : {
                username : 'username',
                email : 'email',
                friend_list : []
            },
            friend : ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        this.setState({[e.target.name] : e.target.value})
    }

    handleSubmit(e){
        e.preventDefault()
        // Verify friend not alread in the friend list
        $.ajax({
            type : 'POST',
            url : 'addFriend',
            data : {friend_credential : this.state.friend},
            sucess : (result) => {
                if(result=='success'){
                    alert('friend added successfully')
                    window.location.reload()
                }else{
                    alert(result)
                }
            }
        })
    }

    componentDidMount(){
        $.ajax({
            type : 'GET',
            url : 'getUser',
            success : (data) => {
                if(data){
                    delete data._id
                    console.log(data)
                    this.setState({user : data})
                }
            }
        })
    }

    render(){
        return (<div>
            <p>{this.state.user.username}</p>
            <p>{this.state.user.email}</p>
            {this.state.user.friend_list.map(element => <p>{element.username}</p>)}
            <form onSubmit={this.handleSubmit}>
                <Input withLabel={true} name='friend' inputNameDisplay = 'add friend:' value={this.state.value} handleChange={this.handleChange}/>
                <input type="submit" value="add" />
            </form>
        </div>)
    }

}