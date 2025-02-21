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
  const chartData = data.map((m) => {
    const date = dayjs(m.timestamp);

    const formattedDate = date.format('YYYY-MM-DD');

    return {
      date: formattedDate,
      value: m.value,
    };
  });

  const trend = calculateTrend(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>All available data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChartComponent accessibilityLayer data={chartData}>
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

function calculateTrend(data: DataItem[]): number | null {
  if (data.length < 2) {
    return null; // Not enough data to calculate a trend
  }

  // 1. Sort measurements by timestamp (ascending order)
  const sortedMeasurements = [...data].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );

  // 2. Extract the earliest and latest measurement values
  const earliestValue = sortedMeasurements[0].value;
  const latestValue = sortedMeasurements[sortedMeasurements.length - 1].value;

  // 3. Avoid division by zero (if earliestValue is 0, trend cannot be computed)
  if (earliestValue === 0) return null;

  // 4. Calculate the percentage change
  const trendPercentage = ((latestValue - earliestValue) / earliestValue) * 100;
  return trendPercentage;
}
