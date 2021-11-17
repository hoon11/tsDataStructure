import { RBNode } from "./RBNode";

/**
 * 各ノードのキーを比べる関数のためなインタフェース
 *
 * @param one - 比べるキー1
 * @param theOther - 比べるキー2
 *
 * @returns　比較演算を行い、下記のような整数(Integer)を返す。
 *          1. oneの方が、theOtherより大きい場合は、１
 *          2. oneとtheOtherが、等しい場合は、0
 *          3. oneの方が、theOtherより少ない場合は、-1
 */
export interface CompareKeyIF<K> {
  (one: K, theOther: K): 1 | 0 | -1;
}

/**
 * 各ノードの値を比べる関数のためなインタフェース
 *
 * @param one - 比べる値1
 * @param theOther - 比べる値2
 *
 * @returns　比較演算を行い、下記のような整数(Integer)を返す。
 *          1. oneの方が、theOtherより大きい場合は、１
 *          2. oneとtheOtherが、等しい場合は、0
 *          3. oneの方が、theOtherより少ない場合は、-1
 */
export interface CompareValueIF<V> {
  (one: V, theOther: V): 1 | 0 | -1;
}

/**
 * 赤黒木を実装したクラス
 *
 */
export class RBTree<K, V> {
  private _size: number;
  private _root: RBNode<K, V>;
  private _compareKeyFunc: CompareKeyIF<K>;
  private _compareValueFunc: CompareValueIF<V>;

  constructor(
    compareKeyFunc: CompareKeyIF<K>,
    compareValueFunc: CompareValueIF<V>
  ) {
    this._size = 0;
    this._root = null;
    this._compareKeyFunc = compareKeyFunc;
    this._compareValueFunc = compareValueFunc;
  }

  public searchNodeOrNull(data: V): RBNode<K, V> | null {
    return this.searchReclusive(this._root, data);
  }

  private searchReclusive(node: RBNode<K, V>, data: V): RBNode<K, V> | null {
    if (node === null) {
      return null;
    }

    if (this._compareValueFunc(node.value, data) === 0) {
      return node;
    }

    if (this._compareValueFunc(node.value, data) < 0) {
      return this.searchReclusive(node.leftChild, data);
    }

    return this.searchReclusive(node.rightChild, data);
  }
}
