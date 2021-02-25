import { Point } from '@influxdata/influxdb-client';
import * as promClient from 'prom-client';

export interface IPromMetricValue {
  value: number;
  labels: {
    space: string;
    [key: string]: string | number;
  };
}

export class PromInfluxParser {
  static parseToInfluxPoint({
    metrics,
  }: {
    metrics: promClient.metric[];
  }): Array<Point> {
    const influxPoints = metrics.map((metric) => {
      const point = new Point(metric.name)
        .tag('aggregator', metric.aggregator)
        .tag('description', metric.help)
        .tag('type', metric.type.toString());

      if ((metric as any).values.length) {
        ((metric as any).values as Array<IPromMetricValue>).forEach((met) => {
          const label =
            (met.labels[
              Object.keys(met.labels).find((key) => key === 'space')
            ] as string) || metric.name;
          const { value } = met;

          if (label === 'nodejs_version_info') {
            point.stringField(label, met.labels.version.toString());
          } else {
            point.floatField(label, value);
          }
        });
      } else {
        point.floatField('value', 0);
      }

      return point;
    });
    return influxPoints;
  }
}
