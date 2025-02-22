// Copyright 2023 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { VariableDefinition } from '@perses-dev/core';
import { VariableStateMap } from '@perses-dev/plugin-system';

/*
 * Check whether saved variable definitions are out of date with current default list values in Zustand store
 */
export function checkSavedDefaultVariableStatus(definitions: VariableDefinition[], varState: VariableStateMap) {
  let isSavedVariableModified = false;
  const modifiedVariableNames: string[] = [];
  for (const savedVariable of definitions) {
    if (savedVariable.kind === 'ListVariable') {
      const currentVariable = varState[savedVariable.spec.name];
      if (currentVariable?.value !== null && currentVariable?.value !== savedVariable.spec.default_value) {
        modifiedVariableNames.push(savedVariable.spec.name);
        isSavedVariableModified = true;
      }
    } else if (savedVariable.kind === 'TextVariable') {
      const currentVariable = varState[savedVariable.spec.name];
      const currentVariableValue = typeof currentVariable?.value === 'string' ? currentVariable.value : '';
      if (savedVariable.spec.value !== currentVariableValue) {
        modifiedVariableNames.push(savedVariable.spec.name);
        isSavedVariableModified = true;
      }
    }
  }
  return { isSavedVariableModified, modifiedVariableNames };
}
