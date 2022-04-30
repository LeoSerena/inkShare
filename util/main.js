const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);


class Page extends React.Component {
    constructor(props){
        super(props)

        this.state = {page : this.props.page}

        this.userpage = this.userpage.bind(this)
        this.homepage = this.homepage.bind(this)
        this.registerpage = this.registerpage.bind(this)
    }

    userpage(){this.setState({page : 'userpage'})}
    homepage(){this.setState({page : 'homepage'})}
    registerpage(){this.setState({page : 'registerpage'})}

    render(){
        if(this.state.page=='registerpage'){
            return <RegisterForm homepage={this.homepage}/>
        }else{
            return (
                <div>
                    <Header homepage={this.homepage}/>
                    <RightHeader 
                        logged={domContainer.getAttribute('logged')} 
                        userPage={this.userpage}
                        homepage={this.homepage}
                        registerpage={this.registerpage}
                    />
                    {this.state.page=='homepage' && <RecentDiscussions/>}
                    {this.state.page=='userpage' && <TablesContainer/>}
                    
                </div>
                )
        }
    }
}

root.render(<Page page='homepage'/>)