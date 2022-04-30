'use strict';

class RecentDiscussions extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            discussions : []
        }
    }

    componentDidMount(){
        $.ajax({
            type : 'GET',
            url : 'getRecentDiscussions',
            success : (data) => this.setState({discussions : data}),
            error : (err) => console.log(err)
        })
    }

    render(){
        return (<ul> RECENT DISCUSSIONS
            {this.state.discussions.map(d => <li key={d._id}>{d.title}</li>)}
            </ul>)
    }
}
