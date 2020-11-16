import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const Context = React.createContext([{}, () => { }]);

const ContextProvider = (props) => {
    const [lists, setLists] = useState([]);
    const [list, setList] = useState({});
    const [listUsers, setListUsers] = useState([]);
    const location = useLocation();
    const [user, setUser] = useState({});
    const history = useHistory();


    useEffect(() => {
        if (location.state === undefined) {
            alert("invalid user");
            history.push('/');
        } else {
            alert("User is: " + location.state.user.email);
            setUser(location.state.user);
        }
        fetchLists();
    }, [location]);


    const fetchLists = () => {
        fetch('http://localhost:8080/user/getUserLists?email=' + user.email)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setLists(data)
                setFilterResults(data)
                setList(data[0])
                fetchListUsers(data[0])}
            ).catch((exception) => {
                console.log(exception);
            });
    };

    const fetchList = (id) => {
        fetch('http://localhost:8080/list/getListById/' + id)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setList(data);
        }).catch((exception) => {
            console.log(exception);
        })
    }

    const fetchListUsers = (list) => {
        fetch('http://localhost:8080/list/getListUsers/' + list.id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setListUsers(data)})
        .catch((exception) => {
            console.log(exception);
        }); 
    }

    const [filterResults, setFilterResults] = useState([]);

    const filterLists = (filter) => {
        console.log(filter.search.toLowerCase());
        let results = [];
        results = lists.filter(value =>
            value.list_name.toLowerCase().includes(filter.search.toLowerCase())
        );
        setFilterResults(results);
    };


    return (
        <Context.Provider value={[user, lists, list, listUsers, setList, setListUsers, filterResults, filterLists, fetchLists, fetchListUsers, fetchList]}>
            {props.children}
        </Context.Provider>
    )
};

export { Context, ContextProvider };