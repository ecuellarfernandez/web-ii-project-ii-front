import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaMusic, FaUser, FaCompactDisc, FaHome, FaCog } from 'react-icons/fa';

const nav = [
  { label: 'Inicio', path: 'top', icon: <FaHome size={20} /> },
  { label: 'Artistas', path: 'artists', icon: <FaUser size={20} /> },
  { label: 'Álbumes', path: 'albums', icon: <FaCompactDisc size={20} /> },
  { label: 'Canciones', path: 'songs', icon: <FaMusic size={20} /> },
  { label: 'Admin', path: '/admin', icon: <FaCog size={20} /> },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    
    setTimeout(() => {
      const section = document.getElementById(path);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); 
  };

  return (
    <aside className="w-52 bg-black/50 p-4 space-y-4 border-r border-white/10">
      {nav.map((item) => (
        item.path === '/admin' ? (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 text-sm font-medium px-3 py-2 rounded-lg transition hover:bg-white/10 text-white/80 cursor-pointer"
          >
            {item.icon}
            {item.label}
          </Link>
        ) : (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className="flex items-center gap-3 text-sm font-medium px-3 py-2 rounded-lg transition hover:bg-white/10 text-white/80 cursor-pointer"
          >
            {item.icon}
            {item.label}
          </button>
        )
      ))}
    </aside>
  );
};

export default Sidebar;