// Copyright 2023 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { TimeSeriesValueTuple } from '@perses-dev/core';
import { ComposeOption } from 'echarts';
import { LineSeriesOption, ScatterSeriesOption } from 'echarts/charts';
import { LegendItem } from '../Legend';

// adjust display when there are many time series to help with performance
export const OPTIMIZED_MODE_SERIES_LIMIT = 1000;

export type UnixTimeMs = number;

export interface GraphSeries {
  name: string;
  values: TimeSeriesValueTuple[];
}

export type EChartsValues = number | null | '-';
// data?: (LineDataValue | LineDataItemOption)[];
export type LineSeriesData = LineSeriesOption['data'];

// export type LineChartSupportedSeriesTypes = ComposeOption<LineSeriesOption | ScatterSeriesOption>;
// export interface EChartsTimeSeries extends LineChartSupportedSeriesTypes {
//   data?: EChartsValues[] | AnnotationSeries;
//   annotations?: unknown[];
// }

export interface EChartsTimeSeries extends Omit<LineSeriesOption, 'data' | 'type'> {
  data: EChartsValues[] | AnnotationSeriesData;
  type?: 'line' | 'scatter' | 'bar';
  annotations?: unknown[];
}

export type EChartsDataFormat = {
  timeSeries: EChartsTimeSeries[];
  xAxis: number[];
  xAxisAlt?: number[];
  legendItems?: LegendItem[];
  xAxisMax?: number | string;
  rangeMs?: number;
};

// export type AnnotationSeries = ComposeOption<ScatterSeriesOption>;

// export interface AnnotationSeries extends EChartsTimeSeries {
export interface AnnotationSeriesDatum extends ScatterSeriesOption {
  // symbol?: string;
  // symbolOffset?: number[];
  // labelLine?: {
  //   show?: boolean;
  // };
  // itemStyle?: {
  //   color?: string;
  // };
  value: TimeSeriesValueTuple;
  categoryColor?: string;
}

export type AnnotationSeriesData = AnnotationSeriesDatum[];

// export type CustomSeriesData = CustomSeriesDatum[];
