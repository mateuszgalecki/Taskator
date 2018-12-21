import React from 'react';
import ReactDOM from 'react-dom';
import AddButton from './AddButton';
import LogoMob from './LogoMob';
import MainNavInfoMob from './MainNavInfoMob';
import ReactFullpage from '@fullpage/react-fullpage';
import Swipe from 'react-easy-swipe';
import AddTaskMob from './AddTaskMob';
import Task from './Task';
import Welcome from './Welcome';
import TasksHeader from './TasksHeader'
import ScrollArea from 'react-scrollbar';
import AddTaskFooter from './AddTaskFooter';
import Requests from './Requests';


class Fullpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: this.props.login,
            workspace: this.props.workspace,
            tasks: this.props.tasks
        }
    }

    // swipedLeft = () => {
    //     console.log("KURWA DZIAŁA!");
    // }
    //
    // swipedRight = () => {
    //     console.log("KURWA DZIAŁA W PRAWO!!!!!!!");
    // }

    goToAdd = () => {
        fullpage_api.moveSectionDown();
    }

    goUp = () => {
        fullpage_api.moveSectionUp();
    }

    handleMouseEnter = () => {
        let stupidFucker = document.getElementById('stupidFucker').parentElement;
        stupidFucker.classList.remove('fp-section');
    }

    handleMouseLeave = () => {
        let stupidFucker = document.getElementById('stupidFucker').parentElement;
        stupidFucker.classList.add('fp-section');
    }

    handleSlideLeft = () => {
        fullpage_api.moveSlideLeft();
    }

    handleSlideRight = () => {
        fullpage_api.moveSlideRight();
    }

    static getDerivedStateFromProps(p, s) {
        if (p.tasks !== s.tasks) {
            return {
                tasks: p.tasks
            }
        }
        else {
            return null
        }
    }

    render() {
        const ButtonLeftStyle = {
            width: '100px',
            marginTop: '9vh',
            marginBottom: '1vh',
            backgroundColor: '#349D57',
            color: '#0E2A16',
            outline: 'none'
        }
        return (
            <ReactFullpage
                render={({state, fullpageApi}) => {
                    return (
                        <ReactFullpage.Wrapper>
                            <div className='section fp-auto-height-responsive'>
                                <div id='stupidFucker' className='slide-wrap'>
                                    <div className='slide'>
                                        <Requests checkRequest={this.props.checkRequest} acceptRequest={this.props.acceptRequest} deleteRequest={this.props.deleteRequest} sentRequests={this.props.sentRequests} gottenRequests={this.props.gottenRequests}/>
                                    </div>
                                    <div className='slide active'>
                                        <Swipe onSwipeLeft={this.swipedLeft} onSwipeRight={this.swipedRight}>
                                            <div className='mainContainerMob'>
                                                <p className='message sent'>request sent</p>
                                                <p className='message noUser'>no such user</p>
                                                <p className='message selfUser'>don't talk to yourself</p>
                                                <LogoMob/>
                                                <AddButton fn={this.goToAdd} workspace={this.state.workspace}
                                                           login={this.state.login}/>
                                                <Welcome login={this.state.login}/>
                                                <MainNavInfoMob right={this.handleSlideRight}
                                                                left={this.handleSlideLeft}/>
                                            </div>
                                        </Swipe>
                                    </div>
                                    <div className='slide' onTouchStart={this.handleMouseEnter}
                                         onTouchEnd={this.handleMouseLeave}>
                                        <TasksHeader/>
                                        <button style={ButtonLeftStyle} onClick={this.handleSlideLeft}>back</button>
                                        <div id='scr' className='tasksDiv'>
                                            <ScrollArea
                                                speed={0.8}
                                                className="area"
                                                contentClassName="content"
                                                horizontal={false}
                                            >
                                                {this.state.tasks.map((task, index) => {
                                                    return <Task deleteTask={this.props.deleteTask} key={index}
                                                                 priority={task.priority} name={task.name}
                                                                 mess={task.mess}/>
                                                })}
                                            </ScrollArea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='section'>
                                <AddTaskMob sendRequest={this.props.sendRequest} updateTasks={this.props.updateTasks} login={this.state.login}
                                            workspace={this.state.workspace} goUp={this.goUp}/>
                                <AddTaskFooter/>
                            </div>
                        </ReactFullpage.Wrapper>
                    );
                }}
            />
        );
    }
}

export default Fullpage