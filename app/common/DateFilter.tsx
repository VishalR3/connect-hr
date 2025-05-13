"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function DateFilter({ date, setDate }: any) {
  const handleDateChange: any = (data: any) => {
    if (!data?.from && !data?.to) {
      setDate({ from: date?.from || new Date(), to: null });
      return;
    }
    if (dayjs(data.from).isSame(dayjs(data?.to))) return;

    if (!date.from && !date.to) {
      setDate({ from: data.from, to: data?.to });
    } else if (date.from && !date.to) {
      setDate({ from: data.from, to: data?.to });
    } else if (date.from && date.to) {
      if (data.from < date.from) {
        setDate({ from: data.from, to: null });
      } else {
        setDate({ from: data?.to ?? data.from, to: null });
      }
    }
  };
  return (
    <div className={"grid gap-2"}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal w-[250px] lg:w-auto",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {dayjs(date.from).format("DD/MM/YYYY")} -{" "}
                  {dayjs(date.to).format("DD/MM/YYYY")}
                </>
              ) : (
                <>
                  {dayjs(date.from).format("DD/MM/YYYY")} -{" "}
                  {dayjs(date.from).format("DD/MM/YYYY")}
                </>
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 mr-4" align="start">
          <div className="flex">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={2}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
