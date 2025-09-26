import { cn } from "../lib/utils";
import { Fingerprint, Hash, Key, Table2 } from "lucide-react";
import { Handle, type NodeProps } from "@xyflow/react";
import {
	Tooltip,
	TooltipTrigger,
	TooltipProvider,
	TooltipContent,
} from "./ui/tooltip-docs";

// ReactFlow is scaling everything by the factor of 2
const TABLE_NODE_WIDTH = 420; // before: 320
const TABLE_NODE_ROW_HEIGHT = 40; // before: 40

export type TableNodeData = {
	id?: number;
	name: string;
	isForeign: boolean;
	columns: {
		id: string;
		isPrimary: boolean;
		isNullable: boolean;
		isUnique: boolean;
		isIdentity: boolean;
		name: string;
		format: string;
		plugin: string;
	}[];
};

const TableNode = ({
	data: data_,
	targetPosition,
	sourcePosition,
}: NodeProps & { placeholder?: boolean }) => {
	const data = data_ as TableNodeData;
	// Important styles is a nasty hack to use Handles (required for edges calculations), but do not show them in the UI.
	// ref: https://github.com/wbkd/react-flow/discussions/2698
	const hiddenNodeConnector =
		"!h-px !w-px !min-w-0 !min-h-0 !cursor-grab !border-0 opacity-100";

	const itemHeight = "h-[22px]";

	return (
		<>
			{data.isForeign ? (
				<header
					className="text-[0.55rem] px-2 py-1 border-[0.5px] border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white flex gap-1 items-center"
					id={`${data.name}-foreign-key`}
				>
					<span className="text-gray-900 dark:text-white font-medium">{data.name}</span>
					{targetPosition && (
						<Handle
							type="target"
							id={data.name}
							position={targetPosition}
							className={cn(hiddenNodeConnector)}
						/>
					)}
				</header>
			) : (
				<div
					className={cn("border-[0.5px] border-gray-300 dark:border-gray-600 overflow-hidden shadow-sm bg-black")}
					style={{ width: TABLE_NODE_WIDTH / 2 }}
					id={`${data.name}-table-node`}
				>
					<header
						className={cn(
							"text-[0.55rem] pl-2 pr-1 bg-gray-800 text-white flex items-center justify-between border-b border-gray-600",
							itemHeight,
						)}
					>
						<div className="flex items-center gap-x-1">
							<Table2 strokeWidth={1} size={12} className="text-white" />
							<span className="text-white font-medium">{data.name}</span>
						</div>
					</header>

					{data.columns.map((column) => (
						<div
							className={cn(
								"text-[8px] leading-5 relative flex flex-row justify-items-start",
								"bg-black",
								"border-t",
								"border-t-gray-600",
								"hover:bg-gray-800 transition cursor-default",
								itemHeight,
							)}
							key={column.id}
						>
							<div
								className={cn(
									"gap-[0.24rem] flex ml-2 align-middle items-center justify-start",
								)}
							>
								{column.isPrimary && (
									<TooltipProvider delayDuration={10}>
										<Tooltip>
											<TooltipTrigger asChild>
											<Key
												size={8}
												strokeWidth={1}
												className={cn("flex-shrink-0", "text-yellow-400 mr-2")}
											/>
											</TooltipTrigger>
											<TooltipContent
												className="pointer-events-none"
												sideOffset={0}
											>
												primary key
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								)}

								{column.isUnique && (
									<TooltipProvider delayDuration={10}>
										<Tooltip>
											<TooltipTrigger asChild>
											<Fingerprint
												size={8}
												strokeWidth={1}
												className="flex-shrink-0 mr-2 text-green-400"
											/>
											</TooltipTrigger>
											<TooltipContent
												className="pointer-events-none "
												sideOffset={0}
											>
												unique
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								)}
								{column.isIdentity && (
									<Hash
										size={8}
										strokeWidth={1}
										className="flex-shrink-0 text-blue-400"
									/>
								)}
								{!column.isIdentity &&
									!column.isUnique &&
									!column.isPrimary && <div className=" size-4" />}
							</div>
							<div className="flex justify-between w-full">
								<div className="relative flex justify-center whitespace-nowrap">
									{column.isNullable ? (
										""
									) : (
										<TooltipProvider delayDuration={10}>
											<Tooltip>
												<TooltipTrigger asChild>
													<span className="text-muted-foreground absolute left-[-6px] top-[1px]">
														*
													</span>
												</TooltipTrigger>
												<TooltipContent
													className="pointer-events-none scale-70"
													sideOffset={-5}
												>
													required
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									)}{" "}
									<div className="max-w-[100px] w-fit text-ellipsis overflow-hidden text-white">
										{column.name}
									</div>
									<span className="font-mono text-gray-400 text-[0.35rem] pl-1 mt-[1px]">
										{column.format}
									</span>
								</div>
								<span className="px-2 inline-flex justify-end text-gray-500 text-[0.4rem] mt-[1px]">
									{column.plugin}
								</span>
							</div>
							{targetPosition && (
								<Handle
									type="target"
									id={column.id}
									position={targetPosition}
									className={cn(hiddenNodeConnector, "!left-0")}
								/>
							)}
							{sourcePosition && (
								<Handle
									type="source"
									id={column.id}
									position={sourcePosition}
									className={cn(hiddenNodeConnector, "!right-0")}
								/>
							)}
						</div>
					))}
				</div>
			)}
		</>
	);
};

export { TABLE_NODE_ROW_HEIGHT, TABLE_NODE_WIDTH, TableNode };
