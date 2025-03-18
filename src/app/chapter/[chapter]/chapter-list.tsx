"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  onChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function CustomSelect({
  options,
  onChange,
  defaultValue,
  placeholder = "Select an option", 
  disabled = false,
  className,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue
  );
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange?.(value);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={cn("relative", className)}> 
      <div
        ref={selectRef}
        className={cn(
          "relative w-full",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={disabled}
          className={cn(
            "flex items-center justify-between w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          <span className={cn(!selectedValue && "text-muted-foreground")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>

        <div
          className={`absolute z-10 mt-1 w-full rounded-md border border-input bg-background shadow-md ${
            !isOpen && "hidden"
          }`}
        >
          <div
            className="py-1 max-h-60 overflow-auto"
            role="listbox"
            aria-labelledby="listbox-label"
          >
            {options.map((option, i) => (
              <Link
              href={`/chapter/${option.value}`}
                key={option.value + i}
                role="option"
                aria-selected={selectedValue === option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "block relative cursor-pointer select-none py-2 pl-10 pr-4 text-sm",
                  "hover:bg-accent hover:text-accent-foreground",
                  selectedValue === option.value && "bg-accent/50"
                )}
              >
                <span  className="block truncate">{option.label}</span>
                {selectedValue === option.value && (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                    <Check className="h-4 w-4" />
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
