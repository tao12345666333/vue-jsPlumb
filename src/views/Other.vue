<template>
  <div class="panel-body points demo flow_chart" id="points">
  </div>
</template>

<script>
import $ from 'jquery';
import { jsPlumb } from 'jsplumb';

require('../assets/css/demo.css');
require('../assets/css/jsplumb.css');

export default {
  name: 'Index',
  data() {
    return {
      data: {
        point: [
          {
            _id: '58c21d713819d56d68763918',
            name: 'MoeLove-Other',
            status: '0',
          },
          {
            _id: '58c21d803819d56d68763919',
            name: 'Moe',
            status: '1',
          },
          {
            _id: '58c21da83819d56d6876391a',
            name: 'Love',
            status: '0',
          },
          {
            _id: '58c63ecf3819d5a22f2c7f24',
            name: 'TaoBeier',
            status: '1',
          },
        ],
        location: [
          ['Moe', 4, 14],
          ['Love', 4, 24],
          ['TaoBeier', 4, 34],
          ['TaoBeier', 20, 24],
          ['MoeLove', 4, 4],
        ],
        line: [
          ['58c21d713819d56d68763918', '58c21d803819d56d68763919'],
          ['58c21d803819d56d68763919', '58c21da83819d56d6876391a'],
          ['58c21d803819d56d68763919', '58c63ecf3819d5a22f2c7f24'],
          ['58c21da83819d56d6876391a', '58c63ecf3819d5a22f2c7f24'],
        ],
      },
    };
  },
  methods: {
    createFlow(flowData) {
      console.log('Other created');
      const color = '#acd';
      const instance = jsPlumb.getInstance({
        // notice the 'curviness' argument to this Bezier curve.
        // the curves on this page are far smoother
        // than the curves on the first demo, which use the default curviness value.
        Connector: ['Bezier', { curviness: 50 }],
        Endpoint: ['Dot', { radius: 5 }],
        DragOptions: { cursor: 'pointer', zIndex: 5000 },
        PaintStyle: { lineWidth: 5, stroke: '#445566' },
        EndpointStyle: { radius: 9, fill: color, stroke: 'red' },
        HoverPaintStyle: { stroke: '#ec9f2e', lineWidth: 4 },
        EndpointHoverStyle: { fill: '#ec9f2e', stroke: '#acd' },
        ConnectionOverlays: [
          ['Arrow', {
            location: 1,
            id: 'arrow',
            length: 4,
            foldback: 0.8,
            paintStyle: {
              lineWidth: 5,
              stroke: 'lightgray',
              fill: 'lightgray',
            },
          }],
        ],
        Container: 'points',
      });

      // suspend drawing and initialise.
      instance.batch(() => {
        // declare some common values:
        const arrowCommon = { foldback: 0.7, width: 12 };
        // use three-arg spec to create two different arrows with the common values:
        const overlays = [
          ['Arrow', { location: 0.7 }, arrowCommon],
          ['Label', { label: 'custom label', id: 'label' }],
        ];
        // init point
        for (const point of flowData.point) {
          $('.points').append(
            `<div id="${point._id}" class="point chart_act_${point.status} ${point.name}">${point.name}</div>`,
          );

          instance.addEndpoint(point._id, {
            uuid: `${point._id}-bottom`,
            anchor: 'Bottom',
            maxConnections: -1,
            // connectorStyle: { stroke: 'green' },
          }, {
            isSource: true,
            isTarget: true,
            dragAllowedWhenFull: true,
          });
          instance.addEndpoint(point._id, {
            uuid: `${point._id}-top`,
            anchor: 'Top',
            maxConnections: -1,
            // connectorStyle: { stroke: 'gray' },
          }, {
            isSource: true,
            isTarget: true,
            dragAllowedWhenFull: true,
          });
        }

        // init transition
        for (const i of flowData.line) {
          const uuid = [`${i[0]}-bottom`, `${i[1]}-top`];
          instance.connect({
            uuids: uuid,
            overlays,
          });
        }

        // init location
        for (const i of flowData.location) {
          $(`.${i[0]}`).css('left', i[1] * 20);
          $(`.${i[0]}`).css('top', i[2] * 20);
        }

        for (const point of flowData.point) {
          instance.draggable(`${point._id}`);
        }
      });

      jsPlumb.fire('jsPlumbDemoLoaded', instance);
    },
  },
  mounted() {
    jsPlumb.ready(() => {
      this.createFlow(this.data);
    });
  },
};
</script>

<style>
.point.chart_act_0 {
  color: #9cc;
}
.point.chart_act_1 {
  color: #fac;
}
</style>
