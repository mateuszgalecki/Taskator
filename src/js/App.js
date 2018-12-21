import React from 'react';
import MainMob from './MainMob';
import CloudTry from './AddTaskMob';
import LoginMob from './LoginMob'
import firebase, {db} from './Firebase';



// miejsce na warunki związane z RWD
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workspace: 'tryWorkspace',
            user: 'tryUser'
        }
    }
    render() {
        return (
            <LoginMob/>
        );
    }
}


/*<CloudTry workspace={this.state.workspace} user={this.state.user}/>*/
export default App