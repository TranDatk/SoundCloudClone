import Link from 'next/link';
import Image from 'next/image';

export default function Custom404() {
    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            <Image src={'/404-page-not-found.svg'} alt="404 Not Found" width={400} height={300} priority={true} />
            <h1 style={{ fontSize: '2rem', marginTop: '20px' }}>Oops! Page Not Found</h1>
            <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <Link href="/" passHref>
                <button style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#0070f3', color: '#ffffff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.2rem' }}>Return to Home</button>
            </Link>
        </div>
    );
}
