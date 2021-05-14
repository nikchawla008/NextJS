import axios from 'axios';
import styles from '../../styles/Posts.module.css';
import {showPosts, searchPost, deletePost, fetchPosts, addNewPost} from '../../components/links';
import Link from 'next/link';
import Head from 'next/head';
import React, {Component} from 'react';


export const getStaticProps = async () => {
    /**
     * runs only at build time and not in the browser. 
     * Do not write code you expect to run in the browser.
     * Write code that is run at server end and must necessarily be fetched 
    */

    const response = await axios.get(showPosts);
    const data = await response.data;


    return {
        props:{postlist:data}
    };
        /** 
         *  Return object is always props.
         *  Props can take objects as properties.
         *  Set data to a variable called postlist that we can later destructure from the props
         */  
}
 

//getStaticProps runs before the component is rendered. This data is then entered into component before it is rendered.

class Posts extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            filtered_posts: [],
            newtitle:'',
            newbody:'',
            newuserId:''
        };
        
        this.delPost = this.delPost.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchAgain = this.fetchAgain.bind(this);
        this.addPost = this.addPost.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleUserIdChange = this.handleUserIdChange.bind(this);
    }

    componentDidMount(){
        this.setState({filtered_posts:this.props.postlist});
    }
    
    
    
    render(){
    return (
    <div>  
        <Head>
        <title>Posts</title>
        </Head>
        <h1>Posts</h1>
        <div>
            <input className={styles.searchbar} onChange={this.handleChange} placeholder='Enter Search Text'></input>
            <button className={styles.button} onClick={()=>this.fetchAgain()}>Refetch Posts from REST API</button>
        </div>  
        <div>
            <h3>To enter a new post, fill the details below</h3>  
            <input type='text' onChange={this.handleTitleChange} className={styles.inputBox} id='newposttitle'  placeholder='New Post Title'></input>
            <input type='text' onChange={this.handleBodyChange} className={styles.inputBox} id='newpostbody' placeholder='New Post Body' ></input>
            <input type='text' onChange={this.handleUserIdChange} className={styles.inputBox} id='newpostuser' placeholder='New Post UserId'></input>
            <button className={styles.button} onClick={()=> this.addPost()}> Add new post </button>
        </div>
        <div>
            {this.state.filtered_posts.map( post =>  (<div className={styles.postContentCards} key={post.id}>
            <Link href ={'/posts/' + post.id} >
            <a>    
                <h3>{post.title}</h3>
            </a>
            </Link>
                <p>{post.body}</p>
                <button className = {styles.button} onClick={()=>this.delPost(post)}>Delete Post</button>
                <Link href={'/posts/edit/' + post.id}><a className={styles.button}>Edit Post</a></Link>      
            
            </div>
            ))}
        </div>
    </div>
        );}



    //SearchBar Functionality
    handleChange(e){
        //fetch the searchbar value
        let searchfield = e.target.value;

        // if searchfield is not empty, set state filtered_posts = searchPost/e.target.value
        if (searchfield!==''){
            axios.get(searchPost + searchfield)
                .then(response => this.setState({filtered_posts:response.data}));

        }
        //if searchfield is empty, set state filtered_posts = showPosts output
        else {
            axios.get(showPosts)
            .then(response => this.setState({filtered_posts:response.data}));
        }

}



// Delete post from database
delPost(item){
    const id_deleted = item.id;
    axios.delete(deletePost + id_deleted)
        .then(res=>{
            console.log(res);
            // don't hit api, delete from state filtered_posts
            axios.get(showPosts)
            .then(response => this.setState({filtered_posts:response.data}));
        });

}


//Fetch posts from source 
fetchAgain(){

    axios.get(fetchPosts)
        .then((response)=> {
            console.log(response);
            this.setState({filtered_posts:response.data})
        });
}




// ADD POST
handleTitleChange(e){
    this.setState({newtitle:e.target.value});
}

handleBodyChange(e){
    this.setState({newbody:e.target.value});
}

handleUserIdChange(e){
    this.setState({newuserId:e.target.value});
}



addPost()
    {
        let obj = {title:this.state.newtitle,
            body:this.state.newbody,
            userId:this.state.newuserId
        };

        axios.post(addNewPost, obj )
            .then(response => console.log(response));

        //resetting the input boxes
        document.getElementById('newposttitle').value = '';
        document.getElementById('newpostbody').value = '';
        document.getElementById('newpostuser').value = '';

        this.setState({newtitle:'', newbody:'', newuserId:''});

        axios.get(showPosts)
                .then(response => this.setState({filtered_posts:response.data}));


    }





}
 
export default Posts;