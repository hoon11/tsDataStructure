/**
 * 赤黒木のためなノードを定義したクラス
 */
export class RBNode<T> {
  /**
   * ノードの色
   * true  : 黒
   * false : 赤
   * @internal
   */
  private _hasBlack: boolean;

  /**
   * 左側の子
   * @internal
   */
  private _leftChild: RBNode<T> | null;

  /**
   * 右側の子
   * @internal
   */
  private _rightChild: RBNode<T> | null;

  /**
   * 親
   * @internal
   */
  private _parent: RBNode<T> | null;

  /**
   * 値
   * @internal
   */
  private _value: T;

  /**
   * 赤色のノードを生成します。
   *
   * @param value - ノードの値
   */
  constructor(value: T) {
    this._value = value;
    this._hasBlack = false;
  }

  public setBlack() {
    this._hasBlack = true;
  }

  public setRed() {
    this._hasBlack = false;
  }

  /**
   * ノードを黒色にします。
   *
   * @returns void
   */
  get hasBlack(): boolean {
    return this._hasBlack;
  }

  get value(): T {
    return this._value;
  }

  set value(value: T) {
    this._value = value;
  }

  get leftChild(): RBNode<T> | null {
    return this._leftChild;
  }
  set leftChild(rbnode: RBNode<T>) {
    this._leftChild = rbnode;
  }

  get rightChild(): RBNode<T> | null {
    return this._rightChild;
  }

  set rightChild(rbnode: RBNode<T>) {
    this._rightChild = rbnode;
  }

  get parent(): RBNode<T> | null {
    return this._parent;
  }

  set parent(rbnode: RBNode<T>) {
    this._parent = rbnode;
  }
}
