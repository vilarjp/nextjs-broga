"use client";

import Link from "next/link";

import { classNameMerger } from "@/utils";
import { usePagination } from "./usePagination";

export const Pagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const pages = usePagination(currentPage, totalPages);

  return (
    <ul className="inline-flex h-10 overflow-hidden rounded-md text-base border border-indigo-400/40 my-5">
      {pages.map(({ pageNumber, url, isCurrentPage, isEllipsis }) => {
        return (
          <li
            key={pageNumber}
            className="border-x border-indigo-400/40 first:rounded-1 last:rounder-r first:border-0 last:border-0"
          >
            {isEllipsis ? (
              <span className="flex-center h-10 bg-slate-700 hover:bg-indigo-400/40 px-4 hover:text-slate-300 transition duration-300">
                ...
              </span>
            ) : (
              <Link
                href={url}
                className={classNameMerger(
                  "flex-center h-10 bg-slate-700 hover:bg-indigo-400/40 px-4 hover:text-slate-300 transition duration-300",
                  { "bg-indigo-400/50 text-slate-300": isCurrentPage }
                )}
              >
                {pageNumber}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};
