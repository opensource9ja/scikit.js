/**
*  @license
* Copyright 2021, JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/

import { Tensor1D, tensor1d, zerosLike } from '@tensorflow/tfjs-node'
import {
  ScikitVecOrMatrix,
  convertToNumericTensor1D_2D,
  convertTensorToInputType,
  minIgnoreNan,
  maxIgnoreNan,
} from '../../utils'
/**
 * Transform features by scaling each feature to a given range.
 * This estimator scales and translates each feature individually such
 * that it is in the given range on the training set, e.g. between the maximum and minimum value.
 */

export default class MinMaxScaler {
  $scale: Tensor1D
  $min: Tensor1D

  constructor() {
    this.$scale = tensor1d([])
    this.$min = tensor1d([])
  }

  /**
   * Fits a MinMaxScaler to the data
   * @param data Array, Tensor, DataFrame or Series object
   * @returns MinMaxScaler
   * @example
   * const scaler = new MinMaxScaler()
   * scaler.fit([1, 2, 3, 4, 5])
   * // MinMaxScaler {
   * //   $max: [5],
   * //   $min: [1]
   * // }
   *
   */
  fit(data: ScikitVecOrMatrix) {
    const tensorArray = convertToNumericTensor1D_2D(data)
    const max = maxIgnoreNan(tensorArray, 0) as Tensor1D
    this.$min = minIgnoreNan(tensorArray, 0) as Tensor1D
    let scale = max.sub(this.$min)

    // But what happens if max = min, ie.. we are dealing with a constant vector?
    // In the case above, scale = max - min = 0 and we'll divide by 0 which is no bueno.
    // The common practice in cases where the vector is constant is to change the 0 elements
    // in scale to 1, so that the division doesn't fail. We do that below
    let zeros = zerosLike(scale)
    let booleanAddition = scale.equal(zeros)
    this.$scale = scale.add(booleanAddition)

    return this
  }

  /**
   * Transform the data using the fitted scaler
   * @param data Array, Tensor, DataFrame or Series object
   * @returns Array, Tensor, DataFrame or Series object
   * @example
   * const scaler = new MinMaxScaler()
   * scaler.fit([1, 2, 3, 4, 5])
   * scaler.transform([1, 2, 3, 4, 5])
   * // [0, 0.25, 0.5, 0.75, 1]
   * */
  transform(data: ScikitVecOrMatrix) {
    const tensorArray = convertToNumericTensor1D_2D(data)
    const outputData = tensorArray.sub(this.$min).div(this.$scale)
    return convertTensorToInputType(outputData, data)
  }

  /**
   * Fit the data and transform it
   * @param data Array, Tensor, DataFrame or Series object
   * @returns Array, Tensor, DataFrame or Series object
   * @example
   * const scaler = new MinMaxScaler()
   * scaler.fitTransform([1, 2, 3, 4, 5])
   * // [0, 0.25, 0.5, 0.75, 1]
   * */
  fitTransform(data: ScikitVecOrMatrix) {
    // Should we just have a mixin that does this?
    this.fit(data)
    return this.transform(data)
  }

  /**
   * Inverse transform the data using the fitted scaler
   * @param data Array, Tensor, DataFrame or Series object
   * @returns Array, Tensor, DataFrame or Series object
   * @example
   * const scaler = new MinMaxScaler()
   * scaler.fit([1, 2, 3, 4, 5])
   * scaler.inverseTransform([0, 0.25, 0.5, 0.75, 1])
   * // [1, 2, 3, 4, 5]
   * */
  inverseTransform(data: ScikitVecOrMatrix) {
    const tensorArray = convertToNumericTensor1D_2D(data)
    const outputData = tensorArray.mul(this.$scale).add(this.$min)
    return convertTensorToInputType(outputData, data)
  }
}
