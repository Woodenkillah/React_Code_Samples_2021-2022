import React from "react";
import { Card } from "antd";
import AccessRule from "../access-rule";
import { useStateAsync } from "helpers/custom-hooks";
import { cloneDeep } from "lodash";
import AccessService from "services/AppServices/AccessService";


const initState = [];

const AccessList = () => {

  const { state, setState } = useStateAsync(AccessService.get, initState);

  const handleRuleChange = (key, value, ruleSlug) => {

    const stateClone = cloneDeep(state);

    const rule = stateClone.find(({slug}) => slug === ruleSlug);
    rule[key] = value;

    AccessService.patch(ruleSlug, rule)
      .then(() => setState(stateClone));
  };

  const gamesRules = state.sort((a,b) => a.id - b.id).map((rule) => {
    return (
      <AccessRule 
        key={rule.slug}
        rule={rule}
        onChange={handleRuleChange}
      />
    );
  });

  return (
    <div className="AccessList">
      <Card className="AccessList-Card">

        <div className="AccessList-Header">Игры</div>

        <div className="AccessList-RulesList">
          {gamesRules}
        </div>

      </Card>
    </div>
  );
};

export default AccessList;