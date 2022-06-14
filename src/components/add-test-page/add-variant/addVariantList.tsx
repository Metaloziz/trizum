import React from 'react';
import AddVariantItem from '@pages/add-test/add-variant/addVariantItem';

type ArrayItem = {
  id: number;
  completed: boolean;
  value: string;
};

type VariantListType = {
  items: Array<ArrayItem>;
  handlerVariant: (id: number, value: string) => void;
  handleChecked: (id: number, isChecked: boolean) => void;
};

const AddVariantList = ({
  items,
  handlerVariant,
  handleChecked,
}: VariantListType) => {
  return (
    <div>
      {items.map(({ id, completed, value }) => (
        <AddVariantItem
          key={id}
          id={id}
          completed={completed}
          value={value}
          handlerVariant={handlerVariant}
          handleChecked={handleChecked}
        />
      ))}
    </div>
  );
};

export default AddVariantList;
