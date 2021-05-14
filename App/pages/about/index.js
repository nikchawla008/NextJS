import Head from "next/head"

const About = () => {
    return ( 
    <>
    <Head>
        <title>About</title>
    </Head>
    <h1>About page</h1>
    <p>This app fetches post from a local server from post 4007. The links are in the /components/links file.
        <br></br>
        The server is run using nodemon and uses MYSQL for CRUD operations.
    </p>
    </>
    );
}
 
export default About;