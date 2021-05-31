import { Store } from "pullstate";
import { get, pick, set } from "lodash";

interface IStoreWithValues<S> {
  key: string;
  store: Store<S>;
  values?: Array<keyof S>;
  deepValues?: string[];
}

export class StoreLocalStorage {
  storesWithValues: Required<IStoreWithValues<any>>[] = [];
  namespace: string;

  constructor(namespace: string = "store-local-storage") {
    this.namespace = namespace;
  }

  addStore<S>({
    key,
    store,
    values = [],
    deepValues = [],
  }: IStoreWithValues<S>) {
    this.storesWithValues.push({
      key,
      store,
      values,
      deepValues,
    });
    console.log("this.storesWithValues: ", this.storesWithValues);
  }

  async initiateLocalStorageValues() {
    console.log("this.storesWithValues2: ", this.storesWithValues);
    for (const SV of this.storesWithValues) {
      const localStorageValue = localStorage.getItem(
        `${this.namespace}_${SV.key}`
      );
      const foundLocal = JSON.parse(
        localStorageValue != null ? localStorageValue : "{}"
      );

      let foundDeepValues: any = {};

      if (SV.deepValues.length > 0) {
        const localStorageDeepValue = localStorage.getItem(
          `${this.namespace}_${SV.key}_deep`
        );
        foundDeepValues = JSON.parse(
          localStorageDeepValue != null ? localStorageDeepValue : "{}"
        );
      }

      SV.store.update((s) => {
        for (const [key, value] of Object.entries(foundLocal)) {
          s[key] = value;
        }

        for (const deepValPath of SV.deepValues) {
          if (foundDeepValues.hasOwnProperty(deepValPath)) {
            set(s, deepValPath, foundDeepValues[deepValPath]);
          }
        }
      });

      SV.store.subscribe(
        (s) => pick(s, SV.values),
        (keepLocal) => {
          localStorage.setItem(
            `${this.namespace}_${SV.key}`,
            JSON.stringify(keepLocal)
          );
        }
      );

      if (SV.deepValues.length > 0) {
        SV.store.subscribe(
          (s) => {
            const resp: any = {};

            for (const deepValPath of SV.deepValues) {
              resp[deepValPath] = get(s, deepValPath);
            }

            return resp;
          },
          (keepLocal) => {
            localStorage.setItem(
              `${this.namespace}_${SV.key}_deep`,
              JSON.stringify(keepLocal)
            );
          }
        );
      }
    }
  }
}
