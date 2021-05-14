import Link from 'next/link'

const Navbar = () => {
    return (<nav>
        <Link href='/'>
        <a>Home</a>
        </Link>
        &emsp;
        <Link href='/about/'>
            <a>About</a>
        </Link>
        &emsp;
        <Link href='/posts/'>
            <a>Posts</a>
        </Link>

    </nav>  );
}
 
export default Navbar;