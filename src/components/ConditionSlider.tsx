import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface ConditionSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  leftLabel?: string;
  rightLabel?: string;
  description?: string;
}

export const ConditionSlider = ({
  label,
  value,
  onChange,
  min = 0,
  max = 10,
  step = 1,
  leftLabel,
  rightLabel,
  description,
}: ConditionSliderProps) => {
  const getValueColor = (val: number) => {
    const ratio = val / max;
    if (ratio >= 0.7) return 'text-green-500';
    if (ratio >= 0.4) return 'text-gold-rating';
    return 'text-destructive';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className={cn('text-lg font-bold', getValueColor(value))}>
          {value}/{max}
        </span>
      </div>
      
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      <Slider
        value={[value]}
        onValueChange={([val]) => onChange(val)}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />

      {(leftLabel || rightLabel) && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      )}
    </div>
  );
};
