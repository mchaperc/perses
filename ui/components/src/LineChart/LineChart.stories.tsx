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

import { StoryObj, Meta } from '@storybook/react';
import { LineChart, NearbySeriesArray, AnnotationTooltip } from '@perses-dev/components';
import { waitForStableCanvas } from '@perses-dev/storybook';
import { Stack, Typography } from '@mui/material';
import { string } from 'mathjs';

const meta: Meta<typeof LineChart> = {
  component: LineChart,
  args: {
    height: 200,
    data: {
      timeSeries: [
        {
          type: 'line' as const,
          name: 'up{instance="demo.do.prometheus.io:3000",job="grafana"}',
          data: [1, 1, 1],
          color: 'hsla(158782136,50%,50%,0.8)',
          sampling: 'lttb' as const,
          progressiveThreshold: 1000,
          symbolSize: 4,
          lineStyle: { width: 1.5 },
          emphasis: { lineStyle: { width: 2.5 } },
        },
      ],
      xAxis: [1673784000000, 1673784060000, 1673784120000],
      legendItems: [],
      rangeMs: 21600000,
    },
    yAxis: {
      show: true,
    },
    unit: {
      kind: 'Decimal' as const,
      decimal_places: 2,
      abbreviate: true,
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 0,
    },
  },
  parameters: {
    happo: {
      beforeScreenshot: async () => {
        await waitForStableCanvas('canvas');
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof LineChart>;

export const Primary: Story = {};

export const NoData: Story = {
  args: {
    data: {
      timeSeries: [],
      xAxis: [1673784000000, 1673784060000, 1673784120000],
      legendItems: [],
      rangeMs: 21600000,
    },
  },
  argTypes: {
    // Remove from table because these values are managed in render.
    data: {
      table: {
        disable: true,
      },
    },
    noDataVariant: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => {
    return (
      <Stack>
        <div>
          <Typography variant="h3" gutterBottom align="center">
            message
          </Typography>
          <LineChart {...args} noDataVariant="message" />
        </div>
        <div>
          <Typography variant="h3" gutterBottom align="center">
            chart
          </Typography>
          <LineChart {...args} noDataVariant="chart" />
        </div>
      </Stack>
    );
  },
};

const WITH_ANNOTATIONS_GRID = {
  left: 20,
  right: 20,
  bottom: 10,
  top: 30,
};

const WITH_ANNOTATIONS_CHART_HEIGHT = 300;

const WITH_ANNOTATIONS_LABEL_DISTANCE =
  WITH_ANNOTATIONS_CHART_HEIGHT - 41 - WITH_ANNOTATIONS_GRID.top - WITH_ANNOTATIONS_GRID.bottom;

// function ScatterTooltip(props: { focusedSeries?: NearbySeriesArray }) {
//   if (!props.focusedSeries) return null;
//   return <div>Scatter Tooltip</div>;
// }

export const WithAnnotations: Story = {
  args: {
    tooltipConfig: {
      wrapLabels: true,
      scatterTooltip: <AnnotationTooltip />,
      // scatterTooltip: <ScatterTooltip />,
    },
    data: {
      timeSeries: [
        {
          type: 'line',
          name: '{k8s_cluster="env-1",namespace="all"}',
          data: [
            0.28949189540751474, 0.5019984463241205, 0.7739405691359105, 0.6202865654654102, 0.5987002559407306,
            0.4222043061652485, 0.0026253415226735743, 0.5031983761149712, 0.8117953909896065, 0.5648590175459793,
            0.34203982761488794, 0.8511252547437922, 0.28609595043490277, 0.6877505932041681, 0.6814476658453248,
            0.7514320454772607, 0.5918196410344319, 0.11654523482393886, 0.027821606628104067, 0.11441433779139398,
          ],
          color: 'hsla(-1976922768,50%,50%,0.8)',
          showSymbol: false,
          symbol: 'circle',
          sampling: 'lttb',
          progressiveThreshold: 500,
          lineStyle: {
            width: 1,
          },
          emphasis: {
            lineStyle: {
              width: 1.5,
            },
          },
          markLine: {},
        },
        {
          type: 'line',
          name: '{k8s_cluster="env-2",namespace="all"}',
          data: [
            0.9014342693843926, 0.22775161517956022, 0.4541740011433886, 0.7116005384050772, 0.7188331458798933,
            0.9497526870345308, 0.7273670365449565, 0.4829054114121678, 0.12749956596353607, 0.7053118868261941,
            0.9262248842019773, 0.9168548226090303, 0.5810886115829657, 0.29456606000229035, 0.1294679634997311,
            0.7503053743136541, 0.6549585194368357, 0.9509236313476137, 0.6073295845367168, 0.7913482945945265,
          ],
          color: 'hsla(98221604,50%,50%,0.8)',
          showSymbol: false,
          symbol: 'circle',
          sampling: 'lttb',
          progressiveThreshold: 500,
          lineStyle: {
            width: 1,
          },
          emphasis: {
            lineStyle: {
              width: 1.5,
            },
          },
          markLine: {},
        },
        {
          type: 'line',
          name: '{k8s_cluster="rc",namespace="all"}',
          data: [
            0.6987164895084157, 0.3116948595743496, 0.48906856782520736, 0.35565035508509824, 0.13780892151247892,
            0.12155489964527688, 0.33095018979010304, 0.9510962631833355, 0.8377420239635043, 0.7364401340201714,
            0.8968941641141697, 0.18212765059850566, 0.7050022480513185, 0.9890639073417695, 0.46197619989921757,
            0.47171091460966563, 0.285305175726281, 0.441295892558778, 0.5902891973604176, 0.7107904339570343,
          ],
          color: 'hsla(-1862128748,50%,50%,0.8)',
          showSymbol: false,
          symbol: 'circle',
          sampling: 'lttb',
          progressiveThreshold: 500,
          lineStyle: {
            width: 1,
          },
          emphasis: {
            lineStyle: {
              width: 1.5,
            },
          },
          markLine: {},
        },
        {
          type: 'line',
          name: '{k8s_cluster="test",namespace="all"}',
          data: [
            0.8170643554506698, 0.5024982525643582, 0.42056861246750543, 0.04990326231901743, 0.18556026039872076,
            0.04789318843585488, 0.7175167298071727, 0.8237741482718552, 0.19874111920479542, 0.2555316678197139,
            0.5993957262152785, 0.5551625890733825, 0.23825575949833655, 0.6866752045041105, 0.3153873400494145,
            0.9802148368251558, 0.4616434408752861, 0.06465489990001272, 0.28780414865242343, 0.016818328496195134,
          ],
          color: 'hsla(580807108,50%,50%,0.8)',
          showSymbol: false,
          symbol: 'circle',
          sampling: 'lttb',
          progressiveThreshold: 500,
          lineStyle: {
            width: 1,
          },
          emphasis: {
            lineStyle: {
              width: 1.5,
            },
          },
          markLine: {},
        },
        {
          type: 'line',
          name: '{k8s_cluster="test",namespace="all"}',
          data: [
            0.8956366370765299, 0.41086465500183245, 0.9024543070143289, 0.07045681594241993, 0.02159511322941321,
            0.7980805466672696, 0.695452390124149, 0.40876878373642267, 0.9435821972489276, 0.7661616043350137,
            0.2458674960590066, 0.6291964481379144, 0.8178768523540034, 0.7830449007578673, 0.2644056503883965,
            0.29176113077330745, 0.891518226464999, 0.8375580873693154, 0.4877261289133987, 0.03954775663113996,
          ],
          color: 'hsla(65272092,50%,50%,0.8)',
          showSymbol: false,
          symbol: 'circle',
          sampling: 'lttb',
          progressiveThreshold: 500,
          lineStyle: {
            width: 1,
          },
          emphasis: {
            lineStyle: {
              width: 1.5,
            },
          },
          markLine: {},
        },
        {
          type: 'scatter',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: [
            {
              cursor: 'crosshair',
              itemStyle: {
                color: '#FFB249',
                opacity: 1,
              },
              value: [
                0,
                5,
                [
                  {
                    category: 'event3',
                    happened_at: '2023-06-05T12:06:15Z',
                  },
                  {
                    category: 'event3',
                    happened_at: '2023-06-05T12:07:11Z',
                  },
                  {
                    category: 'event2',
                    happened_at: '2023-06-05T12:07:11Z',
                  },
                  {
                    category: 'event2',
                    happened_at: '2023-06-05T12:07:11Z',
                  },
                ],
              ],
              labelLine: {
                show: false,
              },
            },
            {
              cursor: 'crosshair',
              itemStyle: {
                color: '#438FEB',
                opacity: 1,
              },
              value: [
                0,
                5,
                [
                  {
                    category: 'event3',
                    happened_at: '2023-06-05T12:06:15Z',
                  },
                  {
                    category: 'event2',
                    happened_at: '2023-06-05T12:07:11Z',
                  },
                ],
              ],
              labelLine: {
                show: true,
              },
            },
          ],
          symbolSize: 30,
          name: 38,
          color: '#FFB249',
          labelLine: {
            lineStyle: {
              type: 'solid',
            },
          },
          label: {
            show: true,
            formatter: '',
            position: 'bottom',
            distance: WITH_ANNOTATIONS_LABEL_DISTANCE,
          },
        },
        {
          type: 'scatter',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: [
            {
              cursor: 'crosshair',
              itemStyle: {
                color: '#FFB249',
                opacity: 1,
              },
              symbolOffset: [15, 0],
              value: [
                1,
                5,
                [
                  {
                    category: 'event3',
                    happened_at: '2023-06-05T12:07:12Z',
                  },
                  {
                    category: 'event2',
                    happened_at: '2023-06-05T12:08:23Z',
                  },
                  {
                    category: 'event2',
                    happened_at: '2023-06-05T12:08:23Z',
                  },
                  {
                    category: 'event2',
                    happened_at: '2023-06-05T12:08:23Z',
                  },
                ],
              ],
              labelLine: {
                show: false,
              },
            },
            {
              cursor: 'crosshair',
              itemStyle: {
                color: '#438FEB',
                opacity: 1,
              },
              value: [
                1,
                5,
                [
                  {
                    category: 'event3',
                    happened_at: '2023-06-05T12:07:12Z',
                  },
                  {
                    category: 'event2',
                    happened_at: '2023-06-05T12:08:23Z',
                  },
                ],
              ],
              labelLine: {
                show: true,
              },
            },
          ],
          symbolSize: 30,
          name: 43,
          color: '#FFB249',
          labelLine: {
            lineStyle: {
              type: 'solid',
            },
          },
          label: {
            show: true,
            formatter: '',
            position: 'bottom',
            distance: WITH_ANNOTATIONS_LABEL_DISTANCE,
          },
        },
        {
          type: 'scatter',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: [
            {
              cursor: 'crosshair',
              itemStyle: {
                color: '#00D989',
                opacity: 1,
              },
              symbolOffset: [30, 0],
              value: [
                2,
                5,
                [
                  {
                    category: 'event3',
                    happened_at: '2023-06-05T12:08:24Z',
                  },
                  {
                    category: 'event2',
                    happened_at: '2023-06-05T12:09:35Z',
                  },
                ],
              ],
              labelLine: {
                show: false,
              },
            },
            {
              cursor: 'crosshair',
              itemStyle: {
                color: '#FFB249',
                opacity: 1,
              },
              symbolOffset: [15, 0],
              value: [
                2,
                5,
                [
                  {
                    category: 'event3',
                    happened_at: '2023-06-05T12:08:24Z',
                  },
                  {
                    category: 'event1',
                    happened_at: '2023-06-05T12:08:24Z',
                  },
                  {
                    category: 'event1',
                    happened_at: '2023-06-05T12:09:35Z',
                  },
                  {
                    category: 'event2',
                    happened_at: '2023-06-05T12:09:35Z',
                  },
                ],
              ],
              labelLine: {
                show: false,
              },
            },
            {
              cursor: 'crosshair',
              itemStyle: {
                color: '#438FEB',
                opacity: 1,
              },

              value: [
                2,
                5,
                [
                  {
                    category: 'event3',
                    happened_at: '2023-06-05T12:08:24Z',
                  },
                  {
                    category: 'event3',
                    happened_at: '2023-06-05T12:09:35Z',
                  },
                  {
                    category: 'event1',
                    happened_at: '2023-06-05T12:08:24Z',
                  },
                  {
                    category: 'event1',
                    happened_at: '2023-06-05T12:09:35Z',
                  },
                  {
                    category: 'event2',
                    happened_at: '2023-06-05T12:09:35Z',
                  },
                  {
                    category: 'event2',
                    happened_at: '2023-06-05T12:09:35Z',
                  },
                  {
                    category: 'event2',
                    happened_at: '2023-06-05T12:09:35Z',
                  },
                  {
                    category: 'event2',
                    happened_at: '2023-06-05T12:09:35Z',
                  },
                ],
              ],
              labelLine: {
                show: true,
              },
            },
          ],
          symbolSize: 30,
          name: 78,
          color: '#00D989',
          labelLine: {
            lineStyle: {
              type: 'solid',
            },
          },
          label: {
            show: true,
            formatter: '',
            position: 'bottom',
            distance: WITH_ANNOTATIONS_LABEL_DISTANCE,
          },
        },
        {
          type: 'scatter',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: [
            {
              cursor: 'crosshair',
              itemStyle: {
                color: '#FFB249',
                opacity: 1,
              },
              value: [
                3,
                5,
                [
                  {
                    category: 'event3',
                    happened_at: '2023-06-05T12:09:36Z',
                  },
                  {
                    category: 'event3',
                    happened_at: '2023-06-05T12:10:47Z',
                  },
                  {
                    category: 'event3',
                    happened_at: '2023-06-05T12:10:47Z',
                  },
                ],
              ],
              labelLine: {
                show: true,
              },
            },
          ],
          symbolSize: 30,
          name: 28,
          color: '#FFB249',
          labelLine: {
            lineStyle: {
              type: 'solid',
            },
          },
          label: {
            show: true,
            formatter: '',
            position: 'bottom',
            distance: WITH_ANNOTATIONS_LABEL_DISTANCE,
          },
        },
        {
          type: 'scatter',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: [
            {
              cursor: 'crosshair',
              itemStyle: {
                color: '#FFB249',
                opacity: 1,
              },
              symbolOffset: [15, 0],
              value: [
                4,
                5,
                [
                  {
                    category: 'event3',
                    happened_at: '2023-06-05T12:10:48Z',
                  },
                  {
                    category: 'event3',
                    happened_at: '2023-06-05T12:11:59Z',
                  },
                  {
                    category: 'event3',
                    happened_at: '2023-06-05T12:11:59Z',
                  },
                  {
                    category: 'event2',
                    happened_at: '2023-06-05T12:10:48Z',
                  },
                ],
              ],
              labelLine: {
                show: false,
              },
            },
            {
              cursor: 'crosshair',
              itemStyle: {
                color: '#438FEB',
                opacity: 1,
              },
              value: [
                4,
                5,
                [
                  {
                    category: 'event3',
                    happened_at: '2023-06-05T12:10:48Z',
                  },
                  {
                    category: 'event2',
                    happened_at: '2023-06-05T12:10:48Z',
                  },
                ],
              ],
              labelLine: {
                show: true,
              },
            },
          ],
          symbolSize: 30,
          name: 26,
          color: '#FFB249',
          labelLine: {
            lineStyle: {
              type: 'solid',
            },
          },
          label: {
            show: true,
            formatter: '',
            position: 'bottom',
            distance: WITH_ANNOTATIONS_LABEL_DISTANCE,
          },
        },
        {
          type: 'scatter',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: [
            {
              cursor: 'crosshair',
              itemStyle: {
                color: '#FFB249',
                opacity: 1,
              },
              value: [
                5,
                5,
                [
                  {
                    category: 'event3',
                    happened_at: '2023-06-05T12:12:00Z',
                  },
                  {
                    category: 'event3',
                    happened_at: '2023-06-05T12:12:15Z',
                  },
                ],
              ],
              labelLine: {
                show: true,
              },
            },
          ],
          symbolSize: 30,
          name: 68,
          color: '#FFB249',
          labelLine: {
            lineStyle: {
              type: 'solid',
            },
          },
          label: {
            show: true,
            formatter: '',
            position: 'bottom',
            distance: WITH_ANNOTATIONS_LABEL_DISTANCE,
          },
        },
      ],
      xAxis: [
        1685966775000, 1685966790000, 1685966805000, 1685966820000, 1685966835000, 1685966850000, 1685966865000,
        1685966880000, 1685966895000, 1685966910000, 1685966925000, 1685966940000, 1685966955000, 1685966970000,
        1685966985000, 1685967000000, 1685967015000, 1685967030000, 1685967045000, 1685967060000, 1685967075000,
        1685967090000, 1685967105000, 1685967120000, 1685967135000,
      ],
      xAxisAlt: [1685966775000, 1685966832000, 1685966904000, 1685966976000, 1685967048000, 1685967120000],
    },
    grid: {
      top: 30,
      right: 20,
      bottom: 10,
      left: 20,
    },
    height: WITH_ANNOTATIONS_CHART_HEIGHT,
    xAxis: [
      {
        show: true,
        type: 'category',
        data: [
          1685966835000, 1685966850000, 1685966865000, 1685966880000, 1685966895000, 1685966910000, 1685966925000,
          1685966940000,
        ],
        splitLine: {
          show: false,
        },
      },
      {
        show: true,
        type: 'category',
        position: 'top',
        data: [1685966835000, 1685966856000, 1685966877000, 1685966898000, 1685966919000],
        axisLine: {
          show: false,
          lineStyle: {
            opacity: 0,
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        axisPointer: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
  },
  render: (args) => {
    return (
      <Stack>
        <div>
          <Typography variant="h3" gutterBottom>
            With Annotations
          </Typography>
          <LineChart {...args} noDataVariant="message" />
        </div>
      </Stack>
    );
  },
};
