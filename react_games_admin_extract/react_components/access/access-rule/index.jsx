import React from "react";
import { Input, Select } from "antd";
import DataBox from "./DataBox";
import { NAMES_SET } from "configs/components/AccessConfig";

const { Option } = Select;

const AccessRule = ({ rule, onChange }) => {

  const { id, slug, versions, ...rest } = rule;

  const ruleFields = Object.entries(rest).map(([key, value]) => {
    if (key === "name") {
      return (
        <DataBox
          key={key}
          heading="Название игры"
        >
          <Input
            value={NAMES_SET[value]}
            disabled
          />
        </DataBox>
      );
    }

    if (key === "version") {
      return (
        <DataBox
          key={key}
          heading="Версия"
        >
          {/* <Input
            value={value}
            onChange={(evt) => onChange(key, evt.target.value, slug)}
          /> */}
          <Select
            className="AccessRule-Select"
            dropdownClassName="AccessRule-SelectDropdown"
            onChange={(value) => onChange(key, value, slug)}
            defaultValue={value}
          >
            {
              (versions || [value]).map((version) => (
                <Option
                  key={version}
                  className="AccessRule-SelectOption"
                  value={version}
                >
                  {version}
                </Option>
              ))
            }
          </Select>
        </DataBox>
      );
    }

    if (key === "advertising") {
      return (
        <DataBox
          key={key}
          heading="Реклама"
        >
          <Select
            className="AccessRule-Select"
            dropdownClassName="AccessRule-SelectDropdown"
            onChange={(value) => onChange(key, value, slug)}
            defaultValue={value}
          >
            <Option className="AccessRule-SelectOption" value={true}>Да</Option>
            <Option className="AccessRule-SelectOption" value={false}>Нет</Option>
          </Select>
        </DataBox>
      );
    }

    return null;
  });

  return (
    <div className="AccessRule">
      {ruleFields}
    </div>
  );
};

export default AccessRule;