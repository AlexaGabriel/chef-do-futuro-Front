import {
  Home,
  ClipboardList,
  BookOpen,
  Settings,
  LogOut,
  ChefHat,
  CircleUser,
  Bell,
  GraduationCap,
  Briefcase,
  Users,
  Calendar,
  Clock,
  BarChart3,
  Search,
  Mail,
  CheckCircle,
  X,
  TrendingUp,
  Maximize,
} from 'lucide-react';

const iconMap = {
  home: Home,
  clipboard: ClipboardList,
  book: BookOpen,
  settings: Settings,
  'log-out': LogOut,
  'chef-hat': ChefHat,
  user: CircleUser,
  bell: Bell,
  'graduation-cap': GraduationCap,
  briefcase: Briefcase,
  users: Users,
  calendar: Calendar,
  clock: Clock,
  'bar-chart': BarChart3,
  search: Search,
  mail: Mail,
  'check-circle': CheckCircle,
  x: X,
  close: X,
  'trending-up': TrendingUp,
  maximize: Maximize,
};

export default function Icon({ name, size = 20, className = '', ...props }) {
  const Component = iconMap[name];
  if (!Component) return null;
  return <Component size={size} className={className} {...props} />;
}
