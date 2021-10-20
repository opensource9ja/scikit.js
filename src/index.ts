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

import { LinearRegression } from './estimators/linear.model'
import { LassoRegression } from './estimators/lasso.regression'
import { RidgeRegression } from './estimators/ridge.regression'
import { ElasticNet } from './estimators/elastic.net'
import MinMaxScaler from './preprocessing/scalers/min.max.scaler'
import StandardScaler from './preprocessing/scalers/standard.scaler'
import MaxAbsScaler from './preprocessing/scalers/max.abs.scaler'
import SimpleImputer from './impute/simple.imputer'
import getDummies from './preprocessing/encoders/dummy.encoder'
import OneHotEncoder from './preprocessing/encoders/one.hot.encoder'
import LabelEncoder from './preprocessing/encoders/label.encoder'

export {
  MinMaxScaler,
  StandardScaler,
  MaxAbsScaler,
  OneHotEncoder,
  LabelEncoder,
  SimpleImputer,
  getDummies,
  LinearRegression,
  LassoRegression,
  RidgeRegression,
  ElasticNet,
}
