import Link from "next/link";
import {useEffect} from 'react';
import { useRouter } from "next/router";
import Head from 'next/head';

const NotFound = () => {
    const router = useRouter();

    useEffect(() => {
            console.log("Running Use Effect");
            setTimeout(()=>{
                //router.go(-1);  -1 = back, +1=forward
                router.push('/'); // .push(address) will take us back to the address
            }, 3000) //3000ms after which callback function is called ie router.push()
    }, [])

    return (
        <div>
            <Head>
                <title>Error</title>
            </Head>
        <div className='notFound'>
            
            <h1>OOPS!</h1>
            <br/> 
            <h2>PAGE NOT FOUND</h2>
            <Link href='/'>
                <a>Go back to home?</a>
            </Link>
        </div>
        </div> 
      );
}
 
export default NotFound;