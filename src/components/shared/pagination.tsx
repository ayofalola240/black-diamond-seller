"use client";
import { DOTS, usePagination } from "@/hooks";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface IProps {
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  setValue?: Dispatch<SetStateAction<number>>;
  isServerSide?: boolean;
}

type PaginationRangeProps = (string | number)[];

export const Pagination: React.FC<IProps> = ({ totalCount, setValue, isServerSide = false, siblingCount = 1, pageSize, currentPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  }) as PaginationRangeProps;

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const updateSearchParams = (newValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newValue);
    params.set("limit", pageSize.toString());
    const newQueryString = params.toString();
    router.push(`?${newQueryString}`);
  };

  const onNext = () => {
    if (isServerSide) {
      updateSearchParams((page + 1).toString());
    } else {
      setValue?.((prev) => prev + 1);
    }
  };

  const onPrevious = () => {
    if (isServerSide) {
      updateSearchParams((page - 1).toString());
    } else {
      setValue?.((prev) => prev - 1);
    }
  };

  const changePage = (arg: number | string) => {
    if (typeof arg === "number") {
      if (isServerSide) {
        updateSearchParams(arg.toString());
      } else {
        setValue?.(arg);
      }
    }
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="flex w-full h-full p-4 mt-4 rounded-[20px] justify-end  gap-4 items-center">
      {/* Left navigation arrow */}
      <li className="h-full">
        <button
          onClick={onPrevious}
          aria-label="previous"
          className={cn(
            "w-10 border border-white h-10 flex items-center justify-center rounded font-bold bg-transparent text-white disabled:border-gray-600 disabled:text-gray-600"
          )}
          disabled={currentPage === 1}
        >
          <MdKeyboardArrowLeft size={20} />
        </button>
      </li>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={Math.random()} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li key={pageNumber}>
            <button
              onClick={() => changePage(pageNumber)}
              className={cn(" w-10 h-10 font-Roboto rounded-sm font-medium text-white", currentPage === pageNumber && "border border-white")}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li>
        <button
          onClick={onNext}
          aria-label="previous"
          className={cn(
            "w-10 border border-white h-10 flex items-center justify-center rounded font-bold bg-transparent text-white disabled:border-gray-600 disabled:text-gray-600"
          )}
          disabled={currentPage === lastPage}
        >
          <MdKeyboardArrowRight size={20} />
        </button>
      </li>
    </ul>
  );
};
