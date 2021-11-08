/**
 * 赤黒木のためなノードを定義したクラス
 */
export class RBNode<K, V> {
  /**
   * ノードの色
   * false : 赤
   * true : 黒
   * @internal
   */
  private _isBlack: boolean;

  /**
   * キー
   * @internal
   */
  private _key: K;

  /**
   * 値
   * @internal
   */
  private _value: V;

  /**
   * 左側の子
   * @internal
   */
  private _leftChild: RBNode<K, V>;

  /**
   * 右側の子
   * @internal
   */
  private _rightChild: RBNode<K, V>;

  /**
   * 親
   * @internal
   */
  private _parentChild: RBNode<K, V>;

  /**
   * 赤色のノードを生成します。
   *
   * @param key - ノードのキー
   * @param value - ノードの値
   */
  constructor(key: K, value: V) {
    this._key = key;
    this._value = value;
    this._isBlack = false;
  }

  /**
   * ノードの色を判定します。
   * 赤色ならfalse, 黒色ならtrueを返します。
   *
   * @returns boolean
   */
  public isBlackColor(): boolean {
    return this._isBlack;
  }

  /**
   * ノードを赤色にします。
   *
   * @returns void
   */
  public toRedColor(): void {
    this._isBlack = false;
  }

  /**
   * ノードを黒色にします。
   *
   * @returns void
   */
  public toBlackColor(): void {
    this._isBlack = true;
  }

  get key(): K {
    return this._key;
  }

  set key(key: K) {
    this._key = key;
  }

  get value(): V {
    return this._value;
  }
  set value(value: V) {
    this._value = value;
  }

  get leftChild(): RBNode<K, V> {
    return this._leftChild;
  }
  set leftChild(rbnode: RBNode<K, V>) {
    this._leftChild = rbnode;
  }

  get rightChild(): RBNode<K, V> {
    return this._rightChild;
  }

  set rightChild(rbnode: RBNode<K, V>) {
    this._rightChild = rbnode;
  }

  get parentChild(): RBNode<K, V> {
    return this._parentChild;
  }

  set parentChild(rbnode: RBNode<K, V>) {
    this._parentChild = rbnode;
  }
}
