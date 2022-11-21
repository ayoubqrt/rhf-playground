import { FC } from "react";
import { Controller } from "react-hook-form";
import { Dropdown, IDropdown, IDropdownProps } from "@fluentui/react";
import * as React from "react";
import { HookFormProps } from "./HookFormProps";

export const ControlledDropdown: FC<HookFormProps & IDropdownProps> = (props) => {
  const dropdownRef = React.useRef<IDropdown>(null);
  

  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      defaultValue={props.defaultValue || ""}
      render={({ fieldState, field }) => {
        if (dropdownRef.current && fieldState.error) dropdownRef.current.focus(false);

        return (
          <Dropdown
            componentRef={dropdownRef}
            {...props}
            selectedKey={field.value}
            onChange={(_e, option) => {
              field.onChange(option?.key);
            }}
            onBlur={field.onBlur}
            errorMessage={fieldState.error?.message}
          />
        );
      }}
    />
  );
};
