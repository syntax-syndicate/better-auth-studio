import {
  addEdge,
  Background,
  BackgroundVariant,
  type Connection,
  Controls,
  type Edge,
  MiniMap,
  type Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { useCallback, useEffect, useState } from 'react';
import '@xyflow/react/dist/style.css';
import { Settings } from 'lucide-react';
import { DatabaseSchemaNode, type DatabaseSchemaNodeData } from '../components/DatabaseSchemaNode';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const nodeTypes = {
  databaseSchemaNode: DatabaseSchemaNode,
};

interface Field {
  name: string;
  type: string;
  required: boolean;
  primaryKey?: boolean;
  unique?: boolean;
  defaultValue?: unknown;
  description: string;
}

interface Relationship {
  type: 'one-to-many' | 'many-to-one' | 'one-to-one';
  target: string;
  field: string;
}

interface Table {
  name: string;
  displayName: string;
  origin?: string;
  fields: Field[];
  relationships: Relationship[];
}

interface Schema {
  tables: Table[];
}

interface Plugin {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface PluginContribution {
  pluginId: string;
  pluginName: string;
  tableCount: number;
  fieldCount: number;
  relationshipCount: number;
}

export default function DatabaseVisualizer() {
  const [schema, setSchema] = useState<Schema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enabledPlugins, setEnabledPlugins] = useState<Plugin[]>([]);
  const [pluginContributions, setPluginContributions] = useState<PluginContribution[]>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const fetchEnabledPlugins = useCallback(async () => {
    try {
      const response = await fetch('/api/plugins');
      const data = await response.json();
      if (data.plugins && Array.isArray(data.plugins)) {
        setEnabledPlugins(data.plugins.filter((p: Plugin) => p.enabled));
      }
    } catch (_err) {
      // Ignore plugin fetch errors
    }
  }, []);

  const fetchSchema = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/database/schema`);
      const data = await response.json();

      if (data.success) {
        setSchema(data.schema);
      } else {
        setError(data.error || 'Failed to fetch schema');
      }
    } catch (_err) {
      setError('Failed to fetch database schema');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnabledPlugins();
    fetchSchema();
  }, [fetchEnabledPlugins, fetchSchema]);

  useEffect(() => {
    if (!schema || enabledPlugins.length === 0) {
      setPluginContributions([]);
      return;
    }

    const contributions: PluginContribution[] = enabledPlugins.map((plugin) => {
      const pluginTables = schema.tables.filter(
        (table) => (table.origin || 'core') === plugin.id
      );

      const tableCount = pluginTables.length;
      const fieldCount = pluginTables.reduce((sum, table) => sum + table.fields.length, 0);
      const relationshipCount = pluginTables.reduce(
        (sum, table) => sum + table.relationships.length,
        0
      );

      return {
        pluginId: plugin.id,
        pluginName: plugin.name || plugin.id,
        tableCount,
        fieldCount,
        relationshipCount,
      };
    });

    // Only show plugins that actually contribute to the schema
    setPluginContributions(contributions.filter((c) => c.tableCount > 0));
  }, [schema, enabledPlugins]);

  useEffect(() => {
    if (!schema) return;

    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    schema.tables.forEach((table, index) => {
      const tableOrigin = table.origin || 'core';
      const columns = table.fields.map((field) => ({
        id: `${table.name}-${field.name}`,
        isPrimary: field.primaryKey || false,
        isNullable: !field.required,
        isUnique: field.unique || false,
        isIdentity: false,
        name: field.name,
        format: field.type,
        plugin: tableOrigin,
        description: field.description,
      }));

      newNodes.push({
        id: table.name,
        type: 'databaseSchemaNode',
        position: {
          x: (index % 3) * 380,
          y: Math.floor(index / 3) * 320,
        },
        data: {
          name: table.name,
          displayName: table.displayName,
          isForeign: false,
          plugin: tableOrigin,
          columns,
          relationships: table.relationships,
        } as DatabaseSchemaNodeData,
      });
    });

    schema.tables.forEach((table) => {
      table.relationships.forEach((rel) => {
        const sourceTable = table.name;
        const targetTable = rel.target;

        const sourceNode = newNodes.find((n) => n.id === sourceTable);
        const targetNode = newNodes.find((n) => n.id === targetTable);

        if (sourceNode && targetNode) {
          const relationshipLabel =
            rel.type === 'one-to-one' ? '1:1' : rel.type === 'many-to-one' ? 'N:1' : '1:N';

          newEdges.push({
            id: `${sourceTable}-${targetTable}-${rel.field}`,
            source: sourceTable,
            target: targetTable,
            type: 'smoothstep',
            animated: false,
            style: {
              stroke: '#6b7280',
              strokeWidth: 2,
              strokeDasharray: '0',
            },
            label: relationshipLabel,
            labelStyle: {
              fontSize: '11px',
              fill: '#9ca3af',
              fontWeight: '500',
            },
            labelBgStyle: {
              fill: 'rgba(0, 0, 0, 0.9)',
              fillOpacity: 1,
              borderRadius: 4,
            },
            markerEnd: {
              type: 'arrowclosed',
              color: '#6b7280',
              width: 12,
              height: 12,
            },
          });
        }
      });
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [schema, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // const handlePluginToggle = (pluginName: string, checked: boolean) => {
  //   if (checked) {
  //     setSelectedPlugins((prev) => [...prev, pluginName]);
  //   } else {
  //     setSelectedPlugins((prev) => prev.filter((p) => p !== pluginName));
  //   }
  // };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="h-96 bg-gray-700 rounded"></div>
        </div>
        <div className="text-center text-gray-500 dark:text-gray-400 mt-4">Loading schema...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-900/20 border border-red-500/20 rounded-none p-6">
          <h2 className="text-xl font-semibold text-red-400 mb-2">Error Loading Schema</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  const mainContent = (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between p-5 pt-7">
          <div>
            <h1 className="text-3xl font-normal text-white tracking-tight">Schema Visualizer</h1>
            <p className="text-gray-300 mt-2 uppercase font-mono font-light text-xs">
              Visualize your Better Auth database schema with interactive tables and relationships.
            </p>
          </div>
        </div>
        <div className='flex flex-col items-center space-y-8 mb-4'>
          <hr className="w-full border-white/15 h-px" />
          <hr className="w-full border-white/15 h-px" />
        </div>
      </div>
      <div className="flex-1 grid grid-cols-4 gap-6 mt-6">
        <div className="col-span-1 space-y-4">
          <Card className="rounded-none bg-black h-fit shadow-sm">
            <CardHeader>
              <CardTitle className="font-light text-xl text-white flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Detected Tables</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {schema && schema.tables.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1 custom-scroll">
                  {schema.tables.map((table) => (
                    <div key={table.name} className="border border-white/10 p-3 rounded-none">
                      <div className="flex items-center justify-between text-sm text-white">
                        <span>{table.displayName}</span>
                        <span className="text-xs uppercase text-gray-400">
                          {table.origin === 'core' ? 'Core' : 'Extended'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {table.fields.length} fields · {table.relationships.length} relationships
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-white/70">No tables detected in Better Auth context</div>
              )}
            </CardContent>
          </Card>

          {schema && (
            <Card className="rounded-none bg-black shadow-sm">
              <CardHeader>
                <CardTitle className="text-white text-sm">Schema Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between text-white/80">
                  <span>Tables</span>
                  <span className="text-white">{schema.tables.length}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Total Fields</span>
                  <span className="text-white">
                    {schema.tables.reduce((sum, table) => sum + table.fields.length, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Relationships</span>
                  <span className="text-white">
                    {schema.tables.reduce((sum, table) => sum + table.relationships.length, 0)}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {pluginContributions.length > 0 && (
            <Card className="rounded-none bg-black shadow-sm border border-white/15">
              <CardHeader>
                <CardTitle className="text-white text-sm">Enabled Plugins</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {pluginContributions.map((contribution) => (
                  <div
                    key={contribution.pluginId}
                    className="p-3 border border-white/15 bg-black/40 rounded-none"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium capitalize">
                        {contribution.pluginName}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-400">
                      <div className="flex justify-between">
                        <span>Tables:</span>
                        <span className="text-white/80">{contribution.tableCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fields:</span>
                        <span className="text-white/80">{contribution.fieldCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Relationships:</span>
                        <span className="text-white/80">{contribution.relationshipCount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="col-span-3">
          <div className="h-full bg-black border border-gray-700 rounded-lg overflow-hidden shadow-xl">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{
                padding: 0.1,
                includeHiddenNodes: false,
              }}
              className="bg-black"
              // @ts-expect-error
              connectionLineType="smoothstep"
              defaultEdgeOptions={{
                style: {
                  stroke: '#6b7280',
                  strokeWidth: 2,
                },
                animated: false,
                type: 'smoothstep',
              }}
              nodesDraggable={true}
              nodesConnectable={false}
              elementsSelectable={true}
            >
              <Controls className="bg-gray-900 border-gray-700 [&>button]:bg-gray-800 [&>button]:border-gray-600 [&>button]:text-white [&>button:hover]:bg-gray-700" />
              <MiniMap
                className="bg-gray-900 border-gray-700"
                nodeColor={(node) => {
                  if (node.data?.isForeign) return '#374151';
                  return '#1f2937';
                }}
                maskColor="rgba(0, 0, 0, 0.9)"
              />
              <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#374151" />
            </ReactFlow>
          </div>
        </div>
      </div>
    </>
  );

  return <div className="h-screen flex flex-col bg-black">{mainContent}</div>;
}
