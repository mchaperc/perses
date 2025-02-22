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

package persesCMD

import (
	"io"

	"github.com/spf13/cobra"
)

type Option interface {
	// Complete is the method where the option is extracting the data from the args and is setting its different attributes.
	Complete(args []string) error
	// Validate is ensuring that the different value of its attribute are coherent (when it makes sense).
	Validate() error
	// Execute is the method used by the command to actually run the business logic.
	Execute() error
	SetWriter(writer io.Writer)
}

func Run(o Option, cmd *cobra.Command, args []string) error {
	o.SetWriter(cmd.OutOrStdout())
	if err := o.Complete(args); err != nil {
		return err
	}
	if err := o.Validate(); err != nil {
		return err
	}
	return o.Execute()
}
