import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Navbar } from '@/components/Navbar';
import { Snowfall } from '@/components/Snowfall';
import { ConditionSlider } from '@/components/ConditionSlider';
import { RatingStars } from '@/components/RatingStars';
import { mountains } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SubmitReport = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedMountain, setSelectedMountain] = useState('');
  const [overallRating, setOverallRating] = useState(7);
  const [snowAmount, setSnowAmount] = useState(5);
  const [snowWeight, setSnowWeight] = useState(5);
  const [grooming, setGrooming] = useState(5);
  const [visibility, setVisibility] = useState(5);
  const [crowdLevel, setCrowdLevel] = useState(5);
  const [windConditions, setWindConditions] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMountain) {
      toast({
        title: 'Mountain Required',
        description: 'Please select a mountain to submit a report.',
        variant: 'destructive',
      });
      return;
    }

    if (comment.length < 20) {
      toast({
        title: 'More Details Needed',
        description: 'Please add at least 20 characters describing the conditions.',
        variant: 'destructive',
      });
      return;
    }

    // In a real app, this would submit to a backend
    toast({
      title: 'Report Submitted!',
      description: 'Thank you for sharing the snow conditions.',
    });

    navigate(`/mountains/${selectedMountain}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Snowfall />
      <Navbar />

      <main className="pt-28 md:pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Submit Snow Report
            </h1>
            <p className="text-muted-foreground">
              Share current conditions with the community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Mountain Selection */}
            <div className="glass-card rounded-xl p-6">
              <label className="text-sm font-medium text-foreground mb-3 block">
                Select Mountain
              </label>
              <Select value={selectedMountain} onValueChange={setSelectedMountain}>
                <SelectTrigger className="w-full">
                  <Mountain className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Choose a mountain..." />
                </SelectTrigger>
                <SelectContent>
                  {mountains.map((mountain) => (
                    <SelectItem key={mountain.id} value={mountain.id}>
                      {mountain.name} - {mountain.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Overall Rating */}
            <div className="glass-card rounded-xl p-6">
              <label className="text-sm font-medium text-foreground mb-4 block">
                Overall Rating
              </label>
              <div className="flex flex-col items-center gap-4">
                <RatingStars
                  rating={overallRating}
                  size="lg"
                  showValue
                  interactive
                  onChange={setOverallRating}
                />
                <p className="text-sm text-muted-foreground text-center">
                  Click the stars to rate the overall snow conditions
                </p>
              </div>
            </div>

            {/* Condition Sliders */}
            <div className="glass-card rounded-xl p-6 space-y-6">
              <h3 className="font-display font-semibold text-foreground">
                Detailed Conditions
              </h3>

              <ConditionSlider
                label="Snow Amount"
                value={snowAmount}
                onChange={setSnowAmount}
                leftLabel="Bare spots"
                rightLabel="Deep powder"
                description="How much fresh snow is on the ground?"
              />

              <ConditionSlider
                label="Snow Weight"
                value={snowWeight}
                onChange={setSnowWeight}
                leftLabel="Heavy/Wet"
                rightLabel="Light/Dry"
                description="Is the snow light and fluffy or heavy and dense?"
              />

              <ConditionSlider
                label="Grooming Quality"
                value={grooming}
                onChange={setGrooming}
                leftLabel="Poor"
                rightLabel="Excellent"
                description="How well are the groomed runs maintained?"
              />

              <ConditionSlider
                label="Visibility"
                value={visibility}
                onChange={setVisibility}
                leftLabel="Whiteout"
                rightLabel="Crystal clear"
                description="How clear is the visibility on the mountain?"
              />

              <ConditionSlider
                label="Crowd Level"
                value={crowdLevel}
                onChange={setCrowdLevel}
                leftLabel="Very crowded"
                rightLabel="Empty slopes"
                description="How busy is the mountain? (Higher = less crowded)"
              />

              <ConditionSlider
                label="Wind Conditions"
                value={windConditions}
                onChange={setWindConditions}
                leftLabel="Very windy"
                rightLabel="Calm"
                description="How are the wind conditions affecting skiing?"
              />
            </div>

            {/* Comment */}
            <div className="glass-card rounded-xl p-6">
              <label className="text-sm font-medium text-foreground mb-3 block">
                Your Report
              </label>
              <Textarea
                placeholder="Describe the snow conditions in detail. What areas had the best snow? Any tips for other skiers?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={6}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Minimum 20 characters ({comment.length}/20)
              </p>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="ice" size="xl" className="w-full">
              <Send className="h-5 w-5" />
              Submit Report
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SubmitReport;
