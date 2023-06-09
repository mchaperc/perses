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

import { Box, Portal, Typography, Stack, Switch } from '@mui/material';
import { ECharts as EChartsInstance } from 'echarts/core';
import React, { useMemo, useState, cloneElement } from 'react';
import useResizeObserver from 'use-resize-observer';
import { EChartsDataFormat, UnitOptions } from '../model';
import { TooltipContent } from './TooltipContent';
import { TooltipPluginContent, TooltipPluginProps } from './TooltipPlugin';
import { getNearbySeriesData, NearbySeriesArray } from './nearby-series';
import {
  CursorCoordinates,
  FALLBACK_CHART_WIDTH,
  TOOLTIP_MAX_HEIGHT,
  TOOLTIP_MIN_WIDTH,
  TOOLTIP_MAX_WIDTH,
  useMousePosition,
} from './tooltip-model';
import { assembleTransform, getTooltipStyles } from './utils';

interface TimeSeriesTooltipProps {
  chartRef: React.MutableRefObject<EChartsInstance | undefined>;
  chartData: EChartsDataFormat;
  isTooltipPinned: boolean;
  wrapLabels?: boolean;
  unit?: UnitOptions;
  tooltipPlugin?: TooltipPluginProps;
  // scatterTooltip?: React.ReactElement;
  onUnpinClick?: () => void;
}

export const TimeSeriesTooltip = React.memo(function TimeSeriesTooltip({
  chartRef,
  chartData,
  wrapLabels,
  isTooltipPinned,
  unit,
  tooltipPlugin,
  onUnpinClick,
}: TimeSeriesTooltipProps) {
  const [showAllSeries, setShowAllSeries] = useState(false);
  const [pinnedPos, setPinnedPos] = useState<CursorCoordinates | null>(null);
  const mousePos = useMousePosition();
  const { height, width, ref: tooltipRef } = useResizeObserver();

  if (mousePos === null || mousePos.target === null) return null;

  // Ensure user is hovering over a chart before checking for nearby series.
  if (pinnedPos === null && (mousePos.target as HTMLElement).tagName !== 'CANVAS') return null;

  const chart = chartRef.current;
  const chartWidth = chart?.getWidth() ?? FALLBACK_CHART_WIDTH; // Fallback width not likely to every be needed.
  const cursorTransform = assembleTransform(mousePos, chartWidth, pinnedPos, height ?? 0, width ?? 0);

  // Get series nearby the cursor and pass into tooltip content children.
  const nearbySeries = getNearbySeriesData({
    mousePos,
    chartData,
    pinnedPos,
    chart,
    unit,
    showAllSeries,
  });

  if (nearbySeries.length === 0) {
    return null;
  }

  // If the user has provided a custom tooltipPlugin check whether to render it instead of default TooltipContent
  if (tooltipPlugin && nearbySeries !== null) {
    // Use the tooltip plugin if nearby series are all match desired series type
    // Example: Show annotation tooltip content for nearby 'scatter' series
    const isActive = nearbySeries?.every((series) => series.seriesType === tooltipPlugin.seriesTypeTrigger);
    if (isActive) {
      return (
        <TooltipPluginContent
          tooltipOverride={tooltipPlugin.tooltipOverride}
          series={nearbySeries}
          cursorTransform={cursorTransform}
        />
      );
    }
  }

  if (isTooltipPinned === true && pinnedPos === null) {
    setPinnedPos(mousePos);
  }

  // Option for user to see all series instead of only the nearby focused series.
  // Only relevant when there are more total series than are visible.
  const showAllSeriesToggle =
    isTooltipPinned === true &&
    showAllSeries === false &&
    chartData.timeSeries.length > 1 &&
    nearbySeries.length !== chartData.timeSeries.length;

  return (
    <Portal>
      <Box
        ref={tooltipRef}
        sx={(theme) => getTooltipStyles(theme)}
        style={{
          transform: cursorTransform,
        }}
      >
        <TooltipContent
          series={nearbySeries}
          wrapLabels={wrapLabels}
          isTooltipPinned={isTooltipPinned}
          onUnpinClick={() => {
            setPinnedPos(null);
            if (onUnpinClick !== undefined) {
              onUnpinClick();
            }
          }}
        />
        {showAllSeriesToggle && (
          <Stack direction="row" gap={1} alignItems="center" sx={{ textAlign: 'right' }}>
            <Typography>Show All?</Typography>
            <Switch
              checked={showAllSeries}
              onChange={(_, checked) => setShowAllSeries(checked)}
              sx={(theme) => ({
                '& .MuiSwitch-switchBase': {
                  color: theme.palette.common.white,
                },
              })}
            />
          </Stack>
        )}
      </Box>
    </Portal>
  );
});
