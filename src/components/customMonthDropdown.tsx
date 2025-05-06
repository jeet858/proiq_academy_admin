import React, { useEffect, useRef, useState } from "react";

interface CustomDropdownProps {
  setSelectedValues: (months: Date[]) => void;
  className?: string;
  placeHolder?: string;
}

interface MonthObject {
  month: string;
  date: Date;
}

const CustomMonthDropdown: React.FunctionComponent<CustomDropdownProps> = ({
  setSelectedValues,
  className,
  placeHolder = "Select Months",
}) => {
  const currentYear = new Date().getFullYear();

  const lastDaysOfMonths: Date[] = Array.from({ length: 12 }, (_, month) => {
    return new Date(currentYear, month + 1, 0);
  });

  const monthObjects: MonthObject[] = lastDaysOfMonths.map((date) => ({
    month: date.toLocaleString("default", { month: "long" }),
    date,
  }));

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Notify parent on change
  useEffect(() => {
    setSelectedValues(selectedDates);
  }, [selectedDates]);

  const handleSelect = (item: Date) => {
    setSelectedDates((prev) =>
      prev.some((d) => d.getTime() === item.getTime())
        ? prev.filter((d) => d.getTime() !== item.getTime())
        : [...prev, item]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`relative w-full justify-self-center ${className}`}
      ref={dropdownRef}
    >
      {/* Dropdown Button */}
      <div
        className={`flex min-h-12 cursor-pointer justify-between border-b border-b-[#919191] ${
          selectedDates.length > 3 ? "items-baseline" : "items-center"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`${
            selectedDates.length > 0 ? "text-black" : "text-gray-500"
          }`}
        >
          {selectedDates.length > 0
            ? selectedDates
                .sort((a, b) => a.getTime() - b.getTime())
                .map((date) =>
                  date.toLocaleString("default", { month: "short" })
                )
                .join(", ")
            : placeHolder}
        </span>
        <span>▼</span>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-14 z-10 w-full rounded-md border bg-white shadow-md">
          {monthObjects.map((month, index) => (
            <label
              key={index}
              className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={selectedDates.some(
                  (d) => d.getTime() === month.date.getTime()
                )}
                onChange={() => handleSelect(month.date)}
                className="h-4 w-4"
              />
              {month.month}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomMonthDropdown;
