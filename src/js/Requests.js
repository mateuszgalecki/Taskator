import React from 'react';
import ReactDOM from 'react-dom';
import GottenRequest from './GottenRequest';
import SentRequest from './SentRequest';

class Requests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hello: 'hello'
        }
    }

    render() {
        return (
            <div className='requests'>
                <p className='answer reqAccepted'>request accepted</p>
                <p className='answer reqDeclined'>request declined</p>
                <p className='answer reqNoResponse'>user didn't respond yet</p>
                <div className='sentRequests'>
                    {this.props.sentRequests.map((sentReq, i) => {
                        return <SentRequest checkRequest={this.props.checkRequest} accepted={sentReq.accepted} name={sentReq.name} to={sentReq.sentTo} key={i} accepted={sentReq.accepted}/>
                    })}
                </div>
                <div className='gottenRequests'>
                    {this.props.gottenRequests.map((request, i) => {
                        return <GottenRequest acceptRequest={this.props.acceptRequest} deleteRequest={this.props.deleteRequest} name={request.name} sentTo={request.sentTo} mess={request.mess} from={request.sendingUser} index={i} key={i}/>
                    })}
                </div>
            </div>
        );
    }
}


export default Requests;