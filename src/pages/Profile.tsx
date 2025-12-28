import { User, MapPin, Calendar, TrendingUp, Award, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Snowfall } from '@/components/Snowfall';
import { RatingStars } from '@/components/RatingStars';
import { recentReports } from '@/data/mockData';

const Profile = () => {
  // Mock user data
  const user = {
    name: 'PowderHunter',
    email: 'powder@example.com',
    joinedDate: 'December 2023',
    totalReports: 42,
    avgRating: 8.4,
    favoriteResort: 'Jackson Hole',
    badges: ['Early Adopter', 'Top Reporter', 'Powder Finder'],
  };

  const userReports = recentReports.slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Snowfall />
      <Navbar />

      <main className="pt-28 md:pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Profile Header */}
          <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-ice-cyan/20 flex items-center justify-center flex-shrink-0">
                <User className="h-12 w-12 text-primary" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
                      {user.name}
                    </h1>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {user.badges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1 bg-gold-rating/10 text-gold-rating text-xs font-medium px-3 py-1 rounded-full"
                    >
                      <Award className="h-3 w-3" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <TrendingUp className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{user.totalReports}</p>
                <p className="text-sm text-muted-foreground">Reports</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <div className="flex justify-center mb-2">
                  <RatingStars rating={user.avgRating} size="sm" showValue={false} />
                </div>
                <p className="text-2xl font-bold text-foreground">{user.avgRating}</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <MapPin className="h-5 w-5 text-ice-cyan mx-auto mb-2" />
                <p className="text-lg font-bold text-foreground truncate">{user.favoriteResort}</p>
                <p className="text-sm text-muted-foreground">Top Resort</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <Calendar className="h-5 w-5 text-gold-rating mx-auto mb-2" />
                <p className="text-lg font-bold text-foreground">{user.joinedDate}</p>
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
              {userReports.map((report, index) => (
                <div
                  key={report.id}
                  className="glass-card rounded-xl p-6 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Link
                        to={`/mountains/${report.mountainId}`}
                        className="flex items-center gap-1 text-primary hover:underline font-semibold"
                      >
                        <MapPin className="h-4 w-4" />
                        {report.mountainName}
                      </Link>
                      <p className="text-sm text-muted-foreground">{report.createdAt}</p>
                    </div>
                    <RatingStars rating={report.rating} size="sm" />
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {report.comment}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-ice-cyan/10 text-ice-cyan px-2 py-1 rounded-full">
                      Amount: {report.snowAmount}/10
                    </span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Weight: {report.snowWeight}/10
                    </span>
                    <span className="text-xs bg-gold-rating/10 text-gold-rating px-2 py-1 rounded-full">
                      Grooming: {report.grooming}/10
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {userReports.length === 0 && (
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
