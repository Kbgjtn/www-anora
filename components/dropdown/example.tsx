"use client";

import React, { useState } from "react";
import { DropdownMenu } from "./dropDownMenu";
import { DropdownMenuTrigger } from "./dropdownMenuTrigger";
import { DropdownMenuContent } from "./dropdownMenuContent";
import { DropdownMenuLabel } from "./dropdownMenuLabel";
import { DropdownMenuItem } from "./dropdownMenuItem";
import { DropdownMenuSeparator } from "./dropdownMenuSeparator";
import { DropdownMenuCheckboxItem } from "./dropdownMenuCheckboxItem";

export function ExampleDropdown() {
  const [checked, setChecked] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-4 py-1 bg-blue-500 text-white rounded-md">
        Options
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <DropdownMenuLabel className="px-3 py-1 text-sm text-gray-500">
          Settings
        </DropdownMenuLabel>
        <DropdownMenuItem className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
          Billing
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1 border-gray-200" />
        <DropdownMenuCheckboxItem
          checked={checked}
          onCheckedChange={setChecked}
          className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
        >
          <input type="checkbox" checked={checked} readOnly className="mr-2" />
          Enable Notifications
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator className="my-1 border-gray-200" />
        <DropdownMenuItem className="px-3 py-2 hover:bg-red-100 text-red-600 cursor-pointer">
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
