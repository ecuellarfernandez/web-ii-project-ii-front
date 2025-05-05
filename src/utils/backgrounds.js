export const getPageBackgroundClass = (pathname) => {
    if (pathname === '/' || pathname.startsWith('/genres')) {
      return 'bg-gradient-to-b from-purple-900/60 via-black/10 to-transparent';
    }
    if (pathname.startsWith('/artists')) {
      return 'bg-gradient-to-b from-[#2a2a61]/50 via-[#1f1f3c]/10 to-transparent';
    }
    if (pathname.startsWith('/albums')) {
      return 'bg-gradient-to-b from-green-700/50 via-green-900/10 to-transparent';
    }
    if (pathname.startsWith('/songs')) {
      return 'bg-gradient-to-b from-blue-800/50 via-indigo-900/10 to-transparent';
    }
    if (pathname.startsWith('/admin')) {
      return 'bg-gradient-to-b from-gray-800/60 via-black/10 to-transparent';
    }
    return 'bg-black';
  };
  