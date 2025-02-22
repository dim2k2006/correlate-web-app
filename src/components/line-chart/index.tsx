import { TrendingUp, TrendingDown } from 'lucide-react';
import { CartesianGrid, Line, LineChart as LineChartComponent, XAxis, YAxis } from 'recharts';
import dayjs from 'dayjs';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartConfig = {
  value: {
    label: 'Value',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function LineChart({ title, description, data }: LineChartProps) {
  const dailyData = aggregateDaily(data);

  const trend = calculateTrend(dailyData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>All available data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChartComponent accessibilityLayer data={dailyData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => dayjs(value).format('MMM D')}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={['dataMin - 1', 'dataMax + 1']} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line dataKey="value" type="linear" stroke="var(--color-value)" strokeWidth={2} dot={false} />
          </LineChartComponent>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {trend !== null && (
          <div className="flex gap-2 font-medium leading-none">
            {trend > 0 && (
              <>
                Trending up by {trend.toFixed(1)}% <TrendingUp className="h-4 w-4" />
              </>
            )}

            {trend < 0 && (
              <>
                Trending down by {trend.toFixed(1)}% <TrendingDown className="h-4 w-4" />
              </>
            )}

            {trend === 0 && <span>No significant change</span>}
          </div>
        )}

        {!!description && <div className="leading-none text-muted-foreground">{description}</div>}
      </CardFooter>
    </Card>
  );
}

type LineChartProps = {
  title: string;
  description?: string;
  data: DataItem[];
};

type DataItem = {
  id: string;
  value: number;
  timestamp: string; // "2025-02-15T19:53:42.855057912Z"
  notes?: string;
};

function calculateTrend(data: AggregatedData[]): number | null {
  if (data.length < 2) {
    return null; // Not enough data to calculate a trend
  }

  // 2. Extract the earliest and latest measurement values
  const earliestValue = data[0].value;
  const latestValue = data[data.length - 1].value;

  // 3. Avoid division by zero (if earliestValue is 0, trend cannot be computed)
  if (earliestValue === 0) return null;

  // 4. Calculate the percentage change
  const trendPercentage = ((latestValue - earliestValue) / earliestValue) * 100;
  return trendPercentage;
}

function aggregateDaily(data: DataItem[]): AggregatedData[] {
  // Group measurements by date
  const groupedByDate = data.reduce<Record<string, number[]>>((acc, item) => {
    // Extract just the date (e.g., "2025-02-15")
    const dateKey = dayjs(item.timestamp).format('YYYY-MM-DD');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(item.value);
    return acc;
  }, {});

  // For each date, compute the average of all values
  const dailyData: AggregatedData[] = Object.entries(groupedByDate).map(([dateKey, values]) => {
    const sum = values.reduce((acc, val) => acc + val, 0);
    const avg = sum / values.length;
    return {
      date: dateKey,
      value: avg,
    };
  });

  // Sort the resulting array by date
  dailyData.sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());

  return dailyData;
}

type AggregatedData = {
  date: string; // "YYYY-MM-DD"
  value: number;
};
