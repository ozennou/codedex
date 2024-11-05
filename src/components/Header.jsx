import { Link } from 'react-router-dom';

export default function Header() {
    const navStyles = `
    flex gap-6 p-4 bg-gray-800 text-white mb-6 justify-center
  `;
  
  const linkStyles = `
    hover:text-blue-400 transition-colors duration-200 font-medium
  `;
    return (
        <div>
            <h1>Which ELement Are You?</h1>
            <p>(based on completely random things)</p>
            <nav className={navStyles}>
                <Link to="/" className={linkStyles}>Home</Link>
                <Link to="/quiz" className={linkStyles}>Quiz</Link>
            </nav>
        </div>
    );
}