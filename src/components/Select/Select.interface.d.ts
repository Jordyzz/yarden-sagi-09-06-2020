export interface SelectProps {
  onChange: (value: SelectOption, action: any) => void;
  onInputChanged: (input: string) => void;
  options: Array<SelectOption>;
  value: SelectOption;
  placeholder?: string;
}

export type SelectOption = { label: string; value: string };
