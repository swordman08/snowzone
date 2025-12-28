import { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Snowfall } from '@/components/Snowfall';
import { MountainCard } from '@/components/MountainCard';
import { mountains } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Mountains = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const filteredMountains = mountains
    .filter(
      (m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reports':
          return b.recentReports - a.recentReports;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Snowfall />
      <Navbar />

      <main className="pt-28 md:pt-24 pb-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Explore Mountains
            </h1>
            <p className="text-muted-foreground">
              Browse snow conditions at mountains worldwide
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search mountains or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rating</SelectItem>
                <SelectItem value="reports">Most Reports</SelectItem>
                <SelectItem value="name">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredMountains.length} mountains
          </p>

          {/* Mountain Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMountains.map((mountain, index) => (
              <div
                key={mountain.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MountainCard {...mountain} />
              </div>
            ))}
          </div>

          {filteredMountains.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No mountains found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Mountains;
