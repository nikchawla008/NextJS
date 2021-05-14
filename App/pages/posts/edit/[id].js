import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import {editPost, getPostById, showPosts} from '../../../components/links';
import styles from '../../../styles/Edit.module.css'
import Head from 'next/head';


export const getStaticPaths = async () => {
    /**
     * Runs at build times.
     * we need to return the paths from this function.
     * We return an object with params which has object id which is equal to post.id
     */
    const response = await axios.get(showPosts);
    const data = response.data;

    let paths = data.map(post => {
        return {params: {id:post.id.toString()}}     
    })

    return {
        paths, 
        fallback:false
    }
}



export const getStaticProps = async (context) => {
/** 
 * Runs as many times as the number of posts. 
 * We get context object as argument to fetch data.
 * User context.params to get the required data 
*/ 

const id = context.params.id;
const response = await axios.get(getPostById + id);
const post = await response.data;

return {
    props: {data:post}
}

}

class Details extends React.Component{
    constructor(props){
        super(props);
        this.state = {id:-1,post:[], newtitle:'', newbody:''}
    }

    componentDidMount(){
        this.setState({post:this.props.data[0], id:this.props.data[0].id});
    }



    render (){
    return (<div>
        <Head>
            <title>EDIT POST</title>
        </Head>
        <form className={styles.form} onSubmit={this.submitAction}>
            <div className={styles.formHeader}><h1>Edit Post</h1></div>
            <div className={styles.formBody}>
                <label className={styles.label_fields} htmlFor='title_input'>Title   </label>
                <input className={styles.input_fields} onChange={this.handleTitleChange} type='text' id='title_input' placeholder='Title' defaultValue={this.state.post.title}/>
                <br/>
                <label className={styles.label_fields} htmlFor='body_input'>Body     </label>
                <input className={styles.input_fields} onChange={this.handleBodyChange} type='text' id='body_input' placeholder='Body' defaultValue={this.state.post.body}/>
                <br/>
                <button type='submit' className={styles.button}>Submit</button>
            </div>
        </form>
        <br></br>
        <div className={styles.anchor}>
            <Link href='/posts'>
                <a>BACK TO ALL POSTS</a>
            </Link>
        </div>
    </div>  );
    }

    handleTitleChange = (e) => this.setState({newtitle:e.target.value});
    handleBodyChange = (e) => this.setState({newbody:e.target.value});

    submitAction = (e) =>
    {
        e.preventDefault();
        const post = this.state.post

        if (this.state.newbody !== post.body || this.state.newtitle !== post.title ){

            axios.put(editPost,
                {   title:this.state.newtitle,
                    body: this.state.newbody,
                    userId : post.userId,
                    id: post.id
                })
            .then(response => console.log(response));

            axios.get(getPostById + this.state.id)
            .then(response => {this.setState({  id:this.state.id, 
                                                post:response.data, 
                                                newtitle:response.data[0].title, 
                                                newbody:response.data[0].body
                                            });
                
            })
            .catch((err) => console.log(err));
            

        }


    }

}


export default Details;