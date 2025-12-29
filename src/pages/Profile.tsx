import { useState, useEffect } from 'react';
import { User, MapPin, Calendar, TrendingUp, Award, Settings, LogOut, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Snowfall } from '@/components/Snowfall';
import { RatingStars } from '@/components/RatingStars';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { mountains } from '@/data/mockData';

interface UserProfile {
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
}

interface UserReport {
  id: string;
  mountain_id: string;
  overall_rating: number;
  snow_amount: number;
  snow_weight: number;
  grooming: number;
  comment: string;
  created_at: string;
}

const Profile = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [reports, setReports] = useState<UserReport[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        // Fetch profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileData) {
          setProfile(profileData);
        }

        // Fetch user's reports
        const { data: reportsData } = await supabase
          .from('snow_reports')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (reportsData) {
          setReports(reportsData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoadingData(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed out',
      description: 'You have been successfully signed out.'
    });
    navigate('/');
  };

  const getMountainName = (mountainId: string) => {
    const mountain = mountains.find(m => m.id === mountainId);
    return mountain?.name || mountainId;
  };

  const calculateAvgRating = () => {
    if (reports.length === 0) return 0;
    const total = reports.reduce((sum, r) => sum + r.overall_rating, 0);
    return (total / reports.length).toFixed(1);
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const displayName = profile?.display_name || user.email?.split('@')[0] || 'User';
  const joinedDate = profile?.created_at 
    ? format(new Date(profile.created_at), 'MMMM yyyy')
    : 'Recently';

  return (
    <div className="min-h-screen bg-background">
      <Snowfall />
      <Navbar />

      <main className="pt-28 md:pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Profile Header */}
          <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                {profile?.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt={displayName}
                    className="w-full h-full rounded-2xl object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-primary" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
                      {displayName}
                    </h1>
                    <p className="text-muted-foreground">{user.email}</p>
                    {profile?.bio && (
                      <p className="text-muted-foreground mt-2">{profile.bio}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Settings className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleSignOut}>
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {reports.length >= 5 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="inline-flex items-center gap-1 bg-gold-rating/10 text-gold-rating text-xs font-medium px-3 py-1 rounded-full">
                      <Award className="h-3 w-3" />
                      Active Reporter
                    </span>
                    {reports.length >= 10 && (
                      <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                        <Award className="h-3 w-3" />
                        Top Contributor
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <TrendingUp className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{reports.length}</p>
                <p className="text-sm text-muted-foreground">Reports</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <div className="flex justify-center mb-2">
                  <RatingStars rating={Number(calculateAvgRating())} size="sm" showValue={false} />
                </div>
                <p className="text-2xl font-bold text-foreground">{calculateAvgRating()}</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <Calendar className="h-5 w-5 text-gold-rating mx-auto mb-2" />
                <p className="text-lg font-bold text-foreground">{joinedDate}</p>
                <p className="text-sm text-muted-foreground">Member Since</p>
              </div>
            </div>
          </div>

          {/* Recent Reports */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-foreground">
                Your Recent Reports
              </h2>
              <Link to="/report">
                <Button variant="frost" size="sm">
                  New Report
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {reports.map((report, index) => (
                <div
                  key={report.id}
                  className="glass-card rounded-xl p-6 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Link
                        to={`/mountains/${report.mountain_id}`}
                        className="flex items-center gap-1 text-primary hover:underline font-semibold"
                      >
                        <MapPin className="h-4 w-4" />
                        {getMountainName(report.mountain_id)}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(report.created_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <RatingStars rating={report.overall_rating} size="sm" />
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {report.comment}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                      Amount: {report.snow_amount}/10
                    </span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Weight: {report.snow_weight}/10
                    </span>
                    <span className="text-xs bg-gold-rating/10 text-gold-rating px-2 py-1 rounded-full">
                      Grooming: {report.grooming}/10
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {reports.length === 0 && (
              <div className="glass-card rounded-xl p-8 text-center">
                <p className="text-muted-foreground mb-4">
                  You haven't submitted any reports yet.
                </p>
                <Link to="/report">
                  <Button variant="ice">Submit Your First Report</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
