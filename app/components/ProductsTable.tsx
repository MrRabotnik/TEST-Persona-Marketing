"use client";
import React from "react";
import { ColumnDef, useReactTable, flexRender, getCoreRowModel, getSortedRowModel } from "@tanstack/react-table";
import Image from "next/image";
import { Product } from "../types/product.type";

const ProductsTable: React.FC<{ data: Product[] }> = ({ data }) => {
    const columns = React.useMemo<ColumnDef<Product>[]>(
        () => [
            {
                accessorKey: "id",
                header: "ID",
                enableSorting: true,
                enableHiding: true,
                enableResizing: true,
                size: 30,
            },
            {
                accessorKey: "name",
                header: "Name",
                enableSorting: true,
                pinned: true,
                enableResizing: true,
                size: 150,
            },
            {
                accessorKey: "price",
                header: "Price",
                enableSorting: true,
                enableHiding: true,
                enableResizing: true,
                size: 30,
            },
            {
                accessorKey: "quality",
                header: "Quality",
                enableSorting: true,
                enableHiding: true,
                enableResizing: true,
                size: 30,
            },
            {
                accessorKey: "description",
                header: "Description",
                enableSorting: true,
                enableHiding: true,
                enableResizing: true,
                size: 200,
            },
            {
                accessorKey: "imageUrl",
                header: "Image",
                cell: ({ getValue }) => (
                    <Image
                        src={getValue<string>()}
                        alt="Product"
                        className="w-12 h-12 object-cover"
                        width={100}
                        height={100}
                    />
                ),
                size: 50,
            },
        ],
        []
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        columnResizeMode: "onChange",
        initialState: {
            sorting: [{ id: "name", desc: false }],
        },
    });

    return (
        <div className="overflow-x-auto w-full lg:w-full">
            <div className="mb-4 flex flex-wrap gap-4">
                {table.getAllColumns().map((column) => (
                    <div
                        key={column.id}
                        className="flex items-center"
                    >
                        <input
                            type="checkbox"
                            checked={column.getIsVisible()}
                            onChange={column.getToggleVisibilityHandler()}
                            className="mr-2 form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            disabled={column.id === "name"}
                        />
                        <label className="text-gray-700">{column.id}</label>
                    </div>
                ))}
            </div>
            <table className="min-w-[800px] w-full border border-gray-300">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr
                            key={headerGroup.id}
                            className="bg-gray-200 border-b border-gray-300"
                        >
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="p-2 text-left border border-gray-300 cursor-pointer relative"
                                    style={{ width: header.getSize() }}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    <div className="flex items-center">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() && (
                                            <span>{header.column.getIsSorted() === "asc" ? " 🔼" : " 🔽"}</span>
                                        )}
                                        <div
                                            onMouseDown={header.getResizeHandler()}
                                            onTouchStart={header.getResizeHandler()}
                                            className={`absolute right-0 top-0 h-full w-2 cursor-col-resize ${
                                                header.column.getIsResizing() ? "bg-gray-300" : "bg-gray-200"
                                            }`}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className="odd:bg-gray-100 even:bg-white border-b border-gray-300"
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="p-2 border border-gray-300"
                                    data-label={cell.column.columnDef.header}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    {/* <div className="block lg:hidden text-left font-bold">
                                        {cell.column.columnDef.header}:
                                    </div>
                                    <div className="hidden lg:block">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </div>
                                    <div className="block lg:hidden">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </div> */}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsTable;
