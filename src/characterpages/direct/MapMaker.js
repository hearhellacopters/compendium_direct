/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  isNode,
  Background,
  MiniMap,
  Controls,
} from 'react-flow-renderer';
import dagre from 'dagre';

const MapMaker = ({
  initialElements,
}) => {

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // In order to keep this example simple the node width and height are hardcoded.
  // In a real world app you would use the correct width and height values of
  // const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height

  const nodeWidth = 250;
  const nodeHeight = 40;

  const getLayoutedElements = (elements, direction = 'LR') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    elements.forEach((el) => {
      if (isNode(el)) {
        const addspace = el.spacer == undefined ? 0 : el.spacer * 25
        dagreGraph.setNode(el.id, { width: nodeWidth, height: (nodeHeight + addspace) });
      } else {
        dagreGraph.setEdge(el.source, el.target);
      }
    });

    dagre.layout(dagreGraph);

    return elements.map((el) => {
      if (isNode(el)) {
        const nodeWithPosition = dagreGraph.node(el.id);
        el.targetPosition = isHorizontal ? 'left' : 'top';
        el.sourcePosition = isHorizontal ? 'right' : 'bottom';

        // unfortunately we need this little hack to pass a slightly different position
        // to notify react flow about the change. Moreover we are shifting the dagre node position
        // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
        el.position = {
          x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
          y: nodeWithPosition.y - nodeHeight / 2,
        };
      }

      return el;
    });
  };

  const layoutedElements = getLayoutedElements(initialElements);

  const initialNodes = layoutedElements && layoutedElements.filter(self => self.source == undefined)
  const initialEdges = layoutedElements && layoutedElements.filter(self => self.source != undefined)

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)));

  const onNodesChange = useCallback(
    (params) => setNodes((ns) => applyNodeChanges(params, ns)),
    []
  );
  const onEdgesChange = useCallback(
    (params) => setEdges((es) => applyEdgeChanges(params, es)),
    []
  );

  const startinglimit = window.innerWidth <= 700 ? 100 : 200;
  const startingzoom = window.innerWidth <= 700 ? .8 : 1;

  return (
    <div className="flowholder">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionLineType="smoothstep"
          snapToGrid={true}
          snapGrid={[5, 5]}
          key="edges"
          nodesConnectable={false}
          elementsSelectable={false}
          defaultPosition={[startinglimit, 10]}
          onlyRenderVisibleElements={true}
          defaultZoom={startingzoom}
        >

          <Background
            variant="dots"
            gap={12}
            size={3}
            color="#00000065"
          />
          <MiniMap
            className='minimap'
            nodeColor={(node) => {
              switch (node.type) {
                case 'input':
                  return '#00ff00';
                case 'default':
                  return 'red';
                case 'output':
                  return 'rgb(0,0,255)';
                default:
                  return '#eee';
              }
            }}
            maskColor="#00000065"
          />

          <Controls
            showInteractive={false} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default MapMaker;