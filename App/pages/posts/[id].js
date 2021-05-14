import axios from 'axios';
import Link from 'next/link';
import {getPostById, showPosts} from '../../components/links';


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


const Details = ({data}) => {
    return (<div>
        <h1>{data[0].title}</h1>
        <p>{data[0].body}</p>
        <Link href='/posts'>
        <a>BACK TO ALL POSTS</a>
        </Link>
    </div>  );
}
 


export default Details;