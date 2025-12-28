import { Link, useLocation } from 'react-router-dom';
import { Mountain, User, Trophy, Home, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/mountains', label: 'Mountains', icon: Mountain },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/report', label: 'Submit Report', icon: PenLine },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Mountain className="h-6 w-6 text-primary" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Snow<span className="text-primary">Pulse</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}>
                <Button
                  variant={isActive(path) ? 'default' : 'ghost'}
                  size="sm"
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              </Link>
            ))}
          </div>

          <Link to="/profile">
            <Button variant="frost" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border/50">
        <div className="flex items-center justify-around py-2">
          {navLinks.map(({ path, label, icon: Icon }) => (
            <Link key={path} to={path}>
              <Button
                variant={isActive(path) ? 'default' : 'ghost'}
                size="sm"
                className="flex-col gap-1 h-auto py-2 px-3"
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs">{label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
