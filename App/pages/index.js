import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
  <div>
    <Head>
      <title>Home</title>
    </Head>
      <h1>This is the Home page of the Posts app</h1>
      <p>Welcome to the app. To go to all the posts, follow the Link below.</p>
      <Link href='/posts'>
        <a>LINK TO ALL POSTS</a>
      </Link>
    </div>
  )
}
