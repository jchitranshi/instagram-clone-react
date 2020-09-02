import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function App() {
  const [posts, setPosts] = useState([
    // hardcoded earlier.. now picking up from db{
    //   username: "Chitranshi",
    //   caption: "Working!",
    //   imageUrl: "https://i.olsh.me/icon?size=80..120..200&url=instagram.com"
    // },
    // {      
    //   username: "Chixy",
    //   caption: "YEP STILL wORKING!",
    //   imageUrl: "https://i.olsh.me/icon?size=80..120..200&url=instagram.com"
    // }
  ]);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);



  //useEffect: run piece of code on specific condition.
  useEffect(() => {
    //code runs when page refreshes for first time or variable posts change
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        username1: doc.data().username,
        caption1: doc.data().caption,
        imageUrl1: doc.data().imageUrl,
        // post: {...doc.data()}
      })));
    })
  }, []);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        //User logged in
        console.log(authUser);
        setUser(authUser);
        
        //done this down. in auth
        // if(authUser.displayName){
        //   //already logged in
        // }
        // else{
        //   //new user
        //   return authUser.updateProfile({
        //     displayName: username,
        //   });
        // }
      }
      else{
        //User Logged out
        console.log("In else part of auth user.");
        setUser(null);
      }
    })
    return () =>{
      //perform some cleanup
      unsubscribe();
    }
  }, [user, username]);

  const signUp = (event) =>{
    event.preventDefault();
    console.log("Signup");
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser) =>{
      console.log("Inside createUserWithEmail");
      return authUser.user.updateProfile({ //return as its a promise        
        displayName: username
      })
    })
    .catch((error)=> alert(error.message));
  }

  const signIn = (event) =>{
    event.preventDefault();
    console.log("SignIn ,email "+email+password);
    console.log(auth.signInWithEmailAndPassword(email,password));
    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error)=> alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div className="app">  
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
         <div style={modalStyle} className={classes.paper}>
           {/* <h2> I am modal </h2> */}
            {/* <div className="app__header"> */}
              <form className="app__signup">
                <center>
                  <img
                    className="app__header_image"
                    src="https://i.olsh.me/icon?size=80..120..200&url=instagram.com"
                    alt=""
                  />
                  </center>
                  <Input
                    placeholder= "username"
                    type= "text"
                    value= {username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Input
                    placeholder= "email"
                    type= "text"
                    value= {email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder= "password"
                    type= "password"
                    value= {password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
        
                <Button type="submit" onClick={signUp}> Sign Up </Button>
              </form> 
           {/* </div> */}

        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
         <div style={modalStyle} className={classes.paper}>
           {/* <h2> I am modal </h2> */}
            <div className="app__header">
              <form className="app__signup">
                <center>
                  <img
                    className="app__header_image"
                    src="https://i.olsh.me/icon?size=80..120..200&url=instagram.com"
                    alt=""
                  />
                  </center>
                  
                  <Input
                    placeholder= "email"
                    type= "text"
                    value= {email}
                    onChange={(e) => setEmail(e.target.value)}                    
                  />
                  <Input
                    placeholder= "password"
                    type= "password"
                    value= {password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
        
                <Button type="submit" onClick={signIn}> Sign In </Button>
              </form>
           </div>

        </div>
      </Modal>
      {/*Header*/}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://i.olsh.me/icon?size=80..120..200&url=instagram.com"
          alt=""
        />
        {/* Material UI Button */}
        {user? (        
          <Button onClick={() => auth.signOut()}>Sign out</Button>
          ): (
            <div className="app__loginContainer">
              <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
              <Button onClick={() => setOpen(true)}>Sign Up</Button>
            </div>
          )}
      </div>

     
      <h1>Hello World123!!</h1>
      
      <div className="app__posts">
        {/*Posts*/}
        <div className="app_postsLeft">
        {
          posts.map(({id, username1, caption1, imageUrl1, post}) => (
            <Post key={id} postId={id} user={user} username={username1} caption={caption1} imageUrl={imageUrl1}/>
          ))
        }
        </div>
        <div className="app__postsRight">            
          <InstagramEmbed
          url='https://instagr.am/p/Zw9o4/'
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
          />
        </div>
      </div>

      <ImageUpload />
      {/* {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ): 
        (<h2> Sorry!! please login </h2>)
      } */}
      
    </div>

    
  );
}

export default App;
