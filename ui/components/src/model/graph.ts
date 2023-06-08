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
import { LegendItem } from './legend';

// adjust display when there are many time series to help with performance
export const OPTIMIZED_MODE_SERIES_LIMIT = 1000;

export type UnixTimeMs = number;

export interface GraphSeries {
  name: string;
  values: TimeSeriesValueTuple[];
}

export type EChartsValues = number | null | '-';

export type EChartsTimeSeries = ComposeOption<LineSeriesOption | ScatterSeriesOption>;

export type EChartsDataFormat = {
  timeSeries: EChartsTimeSeries[];
  xAxis: number[];
  xAxisAlt?: number[];
  legendItems?: LegendItem[];
  xAxisMax?: number | string;
  rangeMs?: number;
};

export type AnnotationSeries = ComposeOption<ScatterSeriesOption>;
