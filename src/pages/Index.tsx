import { Link } from 'react-router-dom';
import { Mountain, Snowflake, TrendingUp, ChevronRight, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Snowfall } from '@/components/Snowfall';
import { MountainCard } from '@/components/MountainCard';
import { LeaderboardTable } from '@/components/LeaderboardTable';
import { mountains, leaderboardData, recentReports } from '@/data/mockData';
import { RatingStars } from '@/components/RatingStars';
const Index = () => {
  const trendingMountains = mountains.filter(m => m.trending).slice(0, 3);
  return <div className="min-h-screen bg-background">
      <Snowfall />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="container relative z-10 mx-auto px-4 text-primary">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full mb-6 animate-fade-in bg-accent">
              <Snowflake className="h-4 w-4" />
              <span className="text-sm font-medium">Real-time snow conditions</span>
            </div>

            <h1 style={{
            animationDelay: '100ms'
          }} className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in text-accent">
              Track Snow Conditions
              <span className="block text-ice-cyan">Like Never Before</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in" style={{
            animationDelay: '200ms'
          }}>
              Join thousands of skiers and snowboarders sharing real-time snow reports from mountains worldwide. Find the perfect powder day.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{
            animationDelay: '300ms'
          }}>
              <Link to="/mountains">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  <Mountain className="h-5 w-5" />
                  Explore Mountains
                </Button>
              </Link>
              <Link to="/report">
                <Button variant="frost" size="xl" className="w-full sm:w-auto">
                  Submit Report
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 max-w-lg mx-auto animate-fade-in" style={{
            animationDelay: '400ms'
          }}>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-foreground">150+</div>
                <div className="text-sm text-primary-foreground/70">Mountains</div>
              </div>
              <div className="text-center border-x border-primary-foreground/20">
                <div className="text-2xl md:text-3xl font-bold text-primary-foreground">12K+</div>
                <div className="text-sm text-primary-foreground/70">Reports</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-foreground">5K+</div>
                <div className="text-sm text-primary-foreground/70">Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Mountains */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-gold-rating" />
                Trending Mountains
              </h2>
              <p className="text-muted-foreground mt-1">The hottest spots right now</p>
            </div>
            <Link to="/mountains">
              <Button variant="ghost" className="gap-1">
                View All
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingMountains.map((mountain, index) => <div key={mountain.id} className="animate-fade-in" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <MountainCard {...mountain} />
              </div>)}
          </div>
        </div>
      </section>

      {/* Today's Leaderboard */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Today's Top Conditions
              </h2>
              <p className="text-muted-foreground mt-1">Based on user reports</p>
            </div>
            <Link to="/leaderboard">
              <Button variant="ghost" className="gap-1">
                Full Leaderboard
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <LeaderboardTable entries={leaderboardData.day} />
        </div>
      </section>

      {/* Recent Reports */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Recent Reports
              </h2>
              <p className="text-muted-foreground mt-1">Fresh updates from the community</p>
            </div>
          </div>

          <div className="grid gap-6">
            {recentReports.map((report, index) => <div key={report.id} className="glass-card rounded-xl p-6 animate-fade-in" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        {report.user.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{report.user}</p>
                      <p className="text-sm text-muted-foreground">{report.createdAt}</p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Link to={`/mountains/${report.mountainId}`} className="flex items-center gap-1 text-primary hover:underline font-medium">
                        <MapPin className="h-4 w-4" />
                        {report.mountainName}
                      </Link>
                      <RatingStars rating={report.rating} size="sm" />
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{report.comment}</p>

                    <div className="flex flex-wrap gap-3 mt-4">
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
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center frost-effect">
            <Snowflake className="h-12 w-12 text-ice-cyan mx-auto mb-4 animate-float" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Share Your Experience?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Help fellow snow enthusiasts find the best conditions. Submit your report and become part of our growing community.
            </p>
            <Link to="/report">
              <Button variant="ice" size="lg" className="animate-pulse-glow">
                Submit a Snow Report
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Mountain className="h-5 w-5 text-primary" />
              <span className="font-display font-bold text-foreground">
                Snow<span className="text-primary">Zone</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 SnowPulse. Track conditions. Find powder.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;