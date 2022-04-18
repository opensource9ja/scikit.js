import fetch from 'node-fetch'

export const dataUrls = {
  loadBoston: 'http://scikitjs.org/data/boston.csv'
}

/**
 * Loads the Boston housing dataset (regression). Samples 506, features 13.
 * @example
 * ```typescript
    import { loadBoston } from 'scikitjs'

    let Array2D = await loadBoston()
    console.log(Array2D[0]) // Headers ['CRIM', 'ZN', ..., 'LSTAT', 'target']
    console.log(Array2D.slice(1)) // All the actual data
    ```
 */

export async function loadBoston(): Promise<Array<Array<number>>> {
  let text = (await fetch(dataUrls.loadBoston)
    .then((el) => el.text())
    .catch((el) => {
      console.error(`Fetch failed to get url ${dataUrls.loadBoston}`)
      console.error(el)
    })) as string
  let Array2D = text
    .split('\n')
    .map((el) => el.split(',').map((singleNumb) => Number(singleNumb)))
  Array2D.pop() // There is a newline that ends the file and no data after
  return Array2D
}

/**
 * Loads the Iris dataset (classification).
 * This is a very easy multi-class classification dataset. Samples 150, Classes 3, Features 4.
 * @example
 * ```typescript
    import { loadIris } from 'scikitjs'

    let df = await loadIris()
    df.print()
    ```
 */
export function loadIris(): string {
  return 'http://scikitjs.org/data/iris.csv'
}

/**
 * Loads the Wine dataset (classification).
 * This is a very easy multi-class classification dataset. Samples 178, Classes 3, Features 13.
 * @example
 * ```typescript
    import { loadWine } from 'scikitjs'

    let df = await loadWine()
    df.print()
    ```
 */

export function loadWine(): string {
  return 'http://scikitjs.org/data/wine.csv'
}

/**
 * Loads the Diabetes dataset (regression).
 * Samples 442, Features 10.
 * @example
 * ```typescript
    import { loadDiabetes } from 'scikitjs'

    let df = await loadDiabetes()
    df.print()
    ```
 */

export function loadDiabetes(): string {
  return 'http://scikitjs.org/data/diabetes.csv'
}

/**
 * Loads the Breast Cancer Wisconsin dataset (classification).
 * Samples 569, Features 30.
 * @example
 * ```typescript
    import { loadBreastCancer } from 'scikitjs'

    let df = await loadBreastCancer()
    df.print()
    ```
 */

export function loadBreastCancer(): string {
  return 'http://scikitjs.org/data/breast_cancer.csv'
}

/**
 * Loads the Digit dataset (classification).
 * Samples 1797, Features 64. Each sample is an 8x8 image
 * @example
 * ```typescript
    import { loadDigits } from 'scikitjs'

    let df = await loadDigits()
    df.print()
    ```
 */
export function loadDigits(): string {
  return 'http://scikitjs.org/data/digits.csv'
}

/**
 * Loads the California housing dataset (regression).
 *
 * Samples 20640, Features 8.
 */

export function fetchCaliforniaHousing(): string {
  return 'http://scikitjs.org/data/california_housing.csv'
}
