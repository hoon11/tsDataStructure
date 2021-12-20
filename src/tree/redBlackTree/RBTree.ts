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
export interface CompareIF<T> {
  (one: T, theOther: T): number;
}

export function defaultCompare<T>(one: T, theOther: T): number {
  if (one === theOther) {
    return 0;
  }

  return one > theOther ? 1 : -1;
}

/**
 * 赤黒木を実装したクラス
 *
 */
export class RBTree<T> {
  private _size: number;
  private _root: RBNode<T>;
  private _compare: CompareIF<T>;

  constructor(compare?: CompareIF<T>) {
    this._size = 0;
    this._root = null;
    this._compare = compare || defaultCompare;
  }

  public searchNodeOrNull(data: T): RBNode<T> | null {
    return this._searchReclusive(this._root, data);
  }

  private _searchReclusive(node: RBNode<T>, data: T): RBNode<T> | null {
    if (!node) {
      return null;
    }

    if (this._compare(node.value, data) === 0) {
      return node;
    }

    if (this._compare(node.value, data) < 0) {
      return this._searchReclusive(node.leftChild, data);
    }

    return this._searchReclusive(node.rightChild, data);
  }

  public insertNode(value: T): RBNode<T> {
    const node = new RBNode<T>(value);
    this._root = this._insertReclusive(null, this._root, node);
    this._size++;

    const uncle = this._getUncleNode(node);
    const parent = node.parent ? node.parent : null;
    const grandParent = node.parent ? node.parent.parent : null;

    if (uncle.hasRedColor()) {
      this._onUncleHasRed(uncle, node);
    } else {
      if (this._isLeftChild(node) && this._isLeftChild(parent)) {
        if (grandParent) {
          this._rotateRight(grandParent);
          grandParent.swapColor();
        }
        if (parent) {
          parent.swapColor();
        }
      } else if (!this._isLeftChild(node) && this._isLeftChild(node)) {
        if (parent) {
          this._rotateLeft(parent);
        }
      } else if (this._isLeftChild(node) && !this._isLeftChild(node)) {
      } else {
      }
    }

    return this._root;
  }

  private _insertReclusive(
    parent: RBNode<T>,
    node: RBNode<T>,
    newNode: RBNode<T>
  ): RBNode<T> {
    if (!node) {
      newNode.parent = parent;
      return newNode;
    }

    if (this._compare(node.value, newNode.value) > 0) {
      node.leftChild = this._insertReclusive(node, node.leftChild, newNode);
    } else {
      node.rightChild = this._insertReclusive(node, node.rightChild, newNode);
    }

    return node;
  }

  private _getUncleNode(node: RBNode<T>): RBNode<T> | null {
    const parent = node.parent;

    return Object.is(parent.leftChild, node)
      ? parent.rightChild
      : parent.leftChild;
  }

  private _onUncleHasRed(uncle: RBNode<T>, node: RBNode<T>): void {
    const parent = node.parent;
    const grandParent = node.parent.parent;

    parent.toBlackColor();
    parent.toRedColor();
  }

  private _reblanceOnLLCase(grandParent: RBNode<T> | null, parent: RBNode<T> | null, node: RBNode<T>): void {
    if (grandParent) {
      this._rotateRight(grandParent);
      this._swapColor(grandParent);
    }
    if (parent) {
      parent.swapColor();
    }
  }

  private _reblanceOnLRCase(node: RBNode<T>): void {

  }

  private _reblanceOnRRCase(node: RBNode<T>): void {

  }

  private _reblanceOnRLCase(node: RBNode<T>): void {

  }

  private _swapColor(node: RBNode<T> | null): void {
    if (node) {
      node.hasBlack = !node.hasBlack;
    }
  }

  private _isLeftChild(node: RBNode<T>): boolean {
    if (!node || !node.parent) {
      return false;
    }

    return Object.is(node.parent.leftChild, node) ? true : false;
  }

  private _isRightChild(node: RBNode<T>): boolean {
    if (!node || !node.parent) {
      return false;
    }

    return Object.is(node.parent.rightChild, node) ? true : false;
  }

  private _onUncleHasBlack(uncle: RBNode<T>, node: RBNode<T>): void {
    const parent = node.parent;
    const grandParent = node.parent.parent;

    parent.toBlackColor();
    parent.toRedColor();
  }

  private _rotateLeft(node: RBNode<T> | null): RBNode<T> | null {
    if (!node) {
      return null;
    }

    const newParent = node.rightChild ? node.rightChild : null;
    const oldLeftChild = node.rightChild && node.rightChild.leftChild ? node.rightChild.leftChild : null;

    newParent.parent = node.parent;
    newParent.leftChild = node;
    node.parent = newParent;
    node.rightChild = oldLeftChild;
    
    return newParent;
  }

  private _rotateRight(node: RBNode<T> | null): RBNode<T> | null {
    if (!node) {
      return null;
    } 

    const newParent = node.leftChild ? node.leftChild : null;
    const oldRightChild = node.leftChild && node.leftChild.rightChild ? node.leftChild.rightChild : null;

    newParent.parent = node.parent;
    newParent.rightChild = node;
    node.leftChild = oldRightChild;

    return newParent;
  }
}
