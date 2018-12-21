import React from 'react';
import ReactDOM from 'react-dom';
import Fullpage from './MainMob';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom'
import firebase, {db} from './Firebase';
import LogoMobFirst from './LogoMobFirst';


class LoginMob extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            login: '',
            workspace: '',
            userData: {},
            userTasks: [],
            gottenRequests: [],
            sentRequests: [],
            userIndex: 0,
            allData: {}
        }
    }

    createNewUser = () => {
        let obj = {
            name: this.state.login,
            data: {gottenRequests: [], sentRequests: [], tasks: []}
        }
        return obj;
    }

    handleLogin = (e) => {
        let login = e.target.value;
        this.setState({
            login: login
        });
    }

    handlePassword = (e) => {
        let workspace = e.target.value;
        this.setState({
            workspace: workspace
        });
    }

    handleGo = () => {
        let login = this.state.login;
        let workspace = this.state.workspace;
        let docRef = db.collection('taskator').doc(workspace);
        docRef.get().then(doc => {
            this.setState({
                allData: doc.data()
            });
            if (doc.exists) {
                let userExists = false;
                doc.data().users.forEach((user, index) => {
                    if (user.name == login) {
                        userExists = true;
                        user.data.tasks.sort(this.sortTasks);
                        this.setState({
                            userIndex: index,
                            userData: user.data,
                            userTasks: user.data.tasks,
                            gottenRequests: user.data.gottenRequests,
                            sentRequests: user.data.sentRequests
                        }, () => {
                            console.log(this.state);
                            this.setState({
                                loggedIn: true
                            })
                        })
                    }
                })
                if (!userExists) { // DODANIE NOWEGO UŻYTKOWNIKA DO WORKSPACE'U
                    let obj = this.createNewUser();
                    let usersArr = doc.data()
                    usersArr.users.push(obj);
                    docRef.set(usersArr);
                    this.setState({
                        loggedIn: true,
                        userIndex: doc.data().users.length,
                        userData: obj.data,
                        userTasks: obj.data.tasks,
                        allData: usersArr
                    })
                }
            } else { // DANY WORKSPACE NIE ISTNIEJE TRZEBA ZROBIĆ NOWY I WŁOŻYĆ DO NIEGO UŻYTKOWNIKA
                let obj = this.createNewUser();
                let newUsersObj = {users: [obj]};
                docRef.set(newUsersObj);
                this.setState({
                    loggedIn: true,
                    userIndex: 0,
                    userData: obj.data,
                    userTasks: obj.data.tasks,
                    allData: newUsersObj
                })
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }

    sortTasks = (a, b) => {
        return Number(a.priority) - Number(b.priority);
    }

    updateTasks = (n, m, p) => { // funkcja wykonywana tutaj, odpalana w komponencie AddTaskMob
        const newUserData = {...this.state.userData};
        console.log(newUserData);
        const newTask = {
            name: n,
            mess: m,
            priority: p
        }
        newUserData.tasks.push(newTask);
        newUserData.tasks.sort(this.sortTasks);
        console.log(newUserData.tasks);
        this.setState({
            userData: newUserData,
            userTasks: newUserData.tasks
        }, () => {
            let docRef = db.collection('taskator').doc(this.state.workspace);
            let newAllData = {...this.state.allData};
            newAllData.users[this.state.userIndex].data = newUserData;
            this.setState({
                allData: newAllData
            });
            docRef.set(newAllData);
        });
    }

    deleteTask = (task) => {
        console.log(task);
        let newTasksArr = this.state.userTasks.filter(i => {
            return i.name != task
        });
        newTasksArr.sort(this.sortTasks);
        let newUserData = {...this.state.userData};
        newUserData.tasks = newTasksArr;
        console.log(newUserData);
        this.setState({
            userTasks: newUserData.tasks,
            userData: newUserData
        }, () => {
            console.log(this.state.userTasks);
            let docRef = db.collection('taskator').doc(this.state.workspace);
            let newAllData = {...this.state.allData};
            newAllData.users[this.state.userIndex].data = newUserData;
            this.setState({
                allData: newAllData
            });
            docRef.set(newAllData);
        })
    }

    sendRequest = (n, m, p, user) => {
        if (user == this.state.login) {
            let info = document.querySelector('.selfUser');
            this.timeout = setTimeout(() => {
                info.classList.add('displayIt');
            }, 500);
            this.timeout2 = setTimeout(() => {
                clearTimeout(this.timeout);
                info.classList.remove('displayIt');
            }, 1700);
        }
        else {
            let newAllData = {...this.state.allData};
            console.log(newAllData);
            let userExists = false;
            const newTask = {
                name: n,
                mess: m,
                priority: p,
                sendingUser: this.state.login,
                accepted: 0
            }
            newAllData.users.forEach((eachUser, i) => {
                if (eachUser.name == user) {
                    userExists = true;
                    newAllData.users[i].data.gottenRequests.push(newTask);
                    newTask.sentTo = i;
                    console.log(this.state.userIndex);
                    newAllData.users[this.state.userIndex].data.sentRequests.push(newTask);
                    this.setState({
                        allData: newAllData,
                        sentRequests: newAllData.users[this.state.userIndex].data.sentRequests
                    }, () => {
                        console.log(newAllData);
                        let info = document.querySelector('.sent');
                        this.timeout = setTimeout(() => {
                            info.classList.add('displayIt');
                        }, 300);
                        this.timeout2 = setTimeout(() => {
                            clearTimeout(this.timeout);
                            info.classList.remove('displayIt');
                        }, 1500);
                        let docRef = db.collection('taskator').doc(this.state.workspace);
                        docRef.set(newAllData)
                    })
                }
            })
            if (!userExists) {
                let info = document.querySelector('.noUser');
                this.timeout = setTimeout(() => {
                    info.classList.add('displayIt');
                }, 500);
                this.timeout2 = setTimeout(() => {
                    clearTimeout(this.timeout);
                    info.classList.remove('displayIt');
                }, 1700);
            }
        }

    }

    componentWillUnmount() {
        clearTimeout(this.timeout2);
    }

    deleteRequest = (reqMess, sendingUser) => {
        let newAllData = {...this.state.allData};
        newAllData.users.forEach(user => {
            console.log('wchodzi pierwszy forEach')
            console.log(user.name, sendingUser);
            if (user.name == sendingUser) {
                user.data.sentRequests.forEach(request => {
                    console.log('wchodzi drugi forEach')
                    console.log(reqMess, request.mess);
                    if (reqMess == request.mess) {
                        console.log('warunek łapie')
                        request.accepted = 2
                    }
                })
            }
        })
        let newGottenRequests = newAllData.users[this.state.userIndex].data.gottenRequests.filter(request => {
            return reqMess != request.mess
        })
        newAllData.users[this.state.userIndex].data.gottenRequests = newGottenRequests;
        this.setState({
            gottenRequests: newGottenRequests,
            allData: newAllData
        }, () => {
            let docRef = db.collection('taskator').doc(this.state.workspace);
            docRef.set(newAllData);
        })
    }

    acceptRequest = (reqMess, sendingUser) => {
        console.log(this.state.allData);
        let newAllData = {...this.state.allData};
        newAllData.users.forEach(user => {
            console.log('wchodzi pierwszy forEach')
            console.log(user.name, sendingUser);
            if (user.name == sendingUser) {
                user.data.sentRequests.forEach(request => {
                    console.log('wchodzi drugi forEach')
                    console.log(reqMess, request.mess);
                    if (reqMess == request.mess) {
                        console.log('warunek łapie')
                        request.accepted = 1
                    }
                })
            }
        })
        newAllData.users[this.state.userIndex].data.gottenRequests.forEach(request => {
            if (reqMess == request.mess) {
                newAllData.users[this.state.userIndex].data.tasks.push(request);
            }
        })
        let newGottenRequests = newAllData.users[this.state.userIndex].data.gottenRequests.filter(request => {
            return reqMess != request.mess
        })
        newAllData.users[this.state.userIndex].data.gottenRequests = newGottenRequests;
        newAllData.users[this.state.userIndex].data.tasks.sort(this.sortTasks);
        this.setState({
            gottenRequests: newGottenRequests,
            allData: newAllData,
            userTasks: newAllData.users[this.state.userIndex].data.tasks
        }, () => {
            let docRef = db.collection('taskator').doc(this.state.workspace);
            docRef.set(newAllData);
        })
    }

    checkRequest = (reqName, accepted) => {
        let newAllData = {...this.state.allData};

        let newSentRequests = newAllData.users[this.state.userIndex].data.sentRequests.filter(request => {
            return request.name != reqName
        })
        newAllData.users[this.state.userIndex].data.sentRequests = newSentRequests
        this.setState({
            sentRequests: newSentRequests,
            allData: newAllData
        }, () => {
            console.log(this.state.allData, this.state.sentRequests)
        })
        let docRef = db.collection('taskator').doc(this.state.workspace);
        docRef.set(newAllData);
        
        let info;
        if (accepted == 0) {
            console.log('no response')
            info = document.querySelector('.reqNoResponse');
        } else if (accepted == 1) {
            console.log('accepted')
            info = document.querySelector('.reqAccepted');
        } else if (accepted == 2) {
            console.log('not accepted')
            info = document.querySelector('.reqDeclined');
        }
        console.log(info);
        this.timeout = setTimeout(() => {
            console.log('pierwszy timeout')
            info.classList.add('displayIt')
        }, 100);
        this.timeout2 = setTimeout(() => {
            console.log('drugi timeout')
            info.classList.remove('displayIt')
        }, 1300)
    }

    render() {
        if (!this.state.loggedIn) {
            return (
                <div className='loginDiv'>
                    <LogoMobFirst/>
                    <input className='loginInput' type='text' placeholder='Login' onChange={this.handleLogin}/>
                    <input className='loginInput' type='text' placeholder='Workspace' onChange={this.handlePassword}/>
                    <button className='loginButton' onClick={this.handleGo}>LOG IN</button>
                </div>
            );
        }
        else {
            return <Fullpage checkRequest={this.checkRequest} acceptRequest={this.acceptRequest}
                             deleteRequest={this.deleteRequest} sendRequest={this.sendRequest}
                             deleteTask={this.deleteTask} updateTasks={this.updateTasks}
                             sentRequests={this.state.sentRequests} gottenRequests={this.state.gottenRequests}
                             tasks={this.state.userTasks} workspace={this.state.workspace}
                             login={this.state.login}/>
        }
    }
}


export default LoginMob;