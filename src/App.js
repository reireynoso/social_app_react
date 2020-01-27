import React, {useEffect, useState} from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';

const App = () => {
  // console.log(process.env["REACT_APP_URL"])
  const [user, setUser] = useState({})
  const [messages, setMessages] = useState([])
  const [newMessages, setNewMessages] = useState([])
  console.log(messages)
  console.log(newMessages)
  const createMessage = () => {
    fetch(`${process.env["REACT_APP_URL"]}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
          "sender_id": 3,
          "receiver_id": 2,
          "content": "testing"   
      })
    })
    .then(resp => resp.json())
    // .then(newMessage => setNewMessages([...newMessages, newMessage]))
  }

  const addMessage = (message) => {
    setNewMessages([...newMessages, message])
  }
  useEffect(() => {
    fetch(`${process.env["REACT_APP_URL"]}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
          "username": "example",
          "password": "hello" 
      })
    })
    .then(resp => resp.json())
    .then(userData => {
      setUser(userData)
      // console.log(userData)
      setMessages(userData.user.data.attributes.received_messages)
    })

  }, [])
  return (
    <div className="App">
      <button onClick={createMessage}>Create Message</button>
      <ActionCableConsumer
          channel={{ channel: 'FeedChannel' }}
          onReceived={message => {
            console.log(message);
            // this.addTweet(tweet)
            addMessage(message)
          }}
        />
    </div>
  );
}

export default App;
