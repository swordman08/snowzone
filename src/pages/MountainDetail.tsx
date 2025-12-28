import { useParams, Link } from 'react-router-dom';
import { MapPin, Snowflake, Mountain as MountainIcon, TrendingUp, Calendar, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Snowfall } from '@/components/Snowfall';
import { RatingStars } from '@/components/RatingStars';
import { mountains, recentReports } from '@/data/mockData';

const MountainDetail = () => {
  const { id } = useParams();
  const mountain = mountains.find((m) => m.id === id);
  const mountainReports = recentReports.filter((r) => r.mountainId === id);

  if (!mountain) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 px-4 text-center">
          <h1 className="text-2xl font-bold">Mountain not found</h1>
          <Link to="/mountains">
            <Button variant="ghost" className="mt-4">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Mountains
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Snowfall />
      <Navbar />

      <main className="pt-28 md:pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link to="/mountains">
            <Button variant="ghost" size="sm" className="mb-6 -ml-2">
              <ChevronLeft className="h-4 w-4 mr-1" />
              All Mountains
            </Button>
          </Link>

          {/* Hero Card */}
          <div className="glass-card rounded-2xl overflow-hidden mb-8">
            <div className="relative h-48 md:h-64 bg-gradient-to-br from-alpine-blue/40 to-ice-cyan/20 flex items-center justify-center">
              <MountainIcon className="h-24 w-24 text-alpine-blue/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
              
              {mountain.trending && (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-gold-rating text-alpine-dark px-3 py-1.5 rounded-full text-sm font-semibold">
                  <TrendingUp className="h-4 w-4" />
                  Trending
                </div>
              )}
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {mountain.name}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    {mountain.location}
                  </div>
                  <RatingStars rating={mountain.rating} size="lg" />
                </div>

                <Link to="/report">
                  <Button variant="ice" size="lg">
                    Submit Report
                  </Button>
                </Link>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-muted/50 rounded-xl p-4 text-center">
                  <Snowflake className="h-6 w-6 text-ice-cyan mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{mountain.snowDepth}</p>
                  <p className="text-sm text-muted-foreground">Snow Depth</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4 text-center">
                  <MountainIcon className="h-6 w-6 text-alpine-blue mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{mountain.elevation}</p>
                  <p className="text-sm text-muted-foreground">Elevation</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4 text-center">
                  <TrendingUp className="h-6 w-6 text-gold-rating mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{mountain.recentReports}</p>
                  <p className="text-sm text-muted-foreground">Recent Reports</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4 text-center">
                  <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{mountain.lastUpdated}</p>
                  <p className="text-sm text-muted-foreground">Last Update</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reports Section */}
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Recent Reports
            </h2>

            {mountainReports.length > 0 ? (
              <div className="space-y-4">
                {mountainReports.map((report, index) => (
                  <div
                    key={report.id}
                    className="glass-card rounded-xl p-6 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold">
                          {report.user.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold text-foreground">{report.user}</p>
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
                          <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
                            Visibility: {report.visibility}/10
                          </span>
                          <span className="text-xs bg-mountain-slate/10 text-mountain-slate px-2 py-1 rounded-full">
                            Crowds: {report.crowdLevel}/10
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-xl p-8 text-center">
                <p className="text-muted-foreground mb-4">No reports yet for this mountain.</p>
                <Link to="/report">
                  <Button variant="ice">Be the first to report!</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MountainDetail;
