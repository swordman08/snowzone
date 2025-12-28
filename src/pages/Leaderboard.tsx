import { useState } from 'react';
import { Trophy } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Snowfall } from '@/components/Snowfall';
import { LeaderboardTable } from '@/components/LeaderboardTable';
import { leaderboardData } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type TimeFrame = 'day' | 'week' | 'month' | 'year';

const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('day');

  return (
    <div className="min-h-screen bg-background">
      <Snowfall />
      <Navbar />

      <main className="pt-28 md:pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold-rating/10 mb-4">
              <Trophy className="h-8 w-8 text-gold-rating" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Snow Conditions Leaderboard
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              See which mountains are delivering the best snow conditions based on community reports
            </p>
          </div>

          {/* Time Frame Tabs */}
          <Tabs value={timeFrame} onValueChange={(v) => setTimeFrame(v as TimeFrame)} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="day" className="font-medium">Today</TabsTrigger>
              <TabsTrigger value="week" className="font-medium">This Week</TabsTrigger>
              <TabsTrigger value="month" className="font-medium">This Month</TabsTrigger>
              <TabsTrigger value="year" className="font-medium">This Year</TabsTrigger>
            </TabsList>

            <TabsContent value="day" className="mt-0">
              <LeaderboardTable entries={leaderboardData.day} title="Today's Top Mountains" />
            </TabsContent>

            <TabsContent value="week" className="mt-0">
              <LeaderboardTable entries={leaderboardData.week} title="This Week's Top Mountains" />
            </TabsContent>

            <TabsContent value="month" className="mt-0">
              <LeaderboardTable entries={leaderboardData.month} title="This Month's Top Mountains" />
            </TabsContent>

            <TabsContent value="year" className="mt-0">
              <LeaderboardTable entries={leaderboardData.year} title="This Year's Top Mountains" />
            </TabsContent>
          </Tabs>

          {/* Info Card */}
          <div className="mt-8 glass-card rounded-xl p-6 frost-effect">
            <h3 className="font-display font-semibold text-foreground mb-2">
              How Rankings Work
            </h3>
            <p className="text-sm text-muted-foreground">
              Mountains are ranked based on the average rating from all user reports within the selected time period. 
              The trend indicator shows how a mountain's position has changed compared to the previous period. 
              More reports lead to more accurate rankings!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
