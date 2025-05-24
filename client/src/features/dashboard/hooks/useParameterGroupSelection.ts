import { useState } from 'react';

const parameterGroups = [
  {
    label: 'Basic Water Quality Parameter',
    value: 'basic',
  },
  {
    label: 'Organic Pollution Indicator',
    value: 'organic',
  },
  {
    label: 'Nutrients Pollution Indicator',
    value: 'nutrients',
  },
] as const;

const useParameterGroupSelection = () => {
  const [selectedLabel, setSelectedLabel] = useState<string>(parameterGroups[2].label);
  const [selectedValue, setSelectedValue] = useState<string>(parameterGroups[2].value);
  const paramGroupOptions = parameterGroups.map(group => group.label);

  const selectParameterGroup = (label: string) => {
    const findGroup = parameterGroups.find(group => group.label === label);
    if (findGroup) {
      setSelectedLabel(findGroup.label);
      setSelectedValue(findGroup.value);
    }
  };

  return {
    selectedLabel,
    selectedValue,
    paramGroupOptions,
    selectParameterGroup,
  };
};

export default useParameterGroupSelection;
