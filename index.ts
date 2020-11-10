console.log('监控ts');
// //ts中自动监控代码方式


// //ts中的数据类型
// //1. 布尔类型
// let isDone: boolean = false;
// isDone = true;
// console.log(isDone);
// //2. 数字类型
// let isnumber: number = 123;
// console.log(isnumber);
// //3. 字符串类型
// let isstring: string = 'desc';
// console.log(isstring);

//使用模板字符串来表示文本输出
// let curname: string = `Gene`;
// let age: number = 37;
// let sentence: string = `Hello ,my name is ${curname}`;
// console.log(`is is si sis sis ${sentence}`);

//数组
//number类型
// let list: number[] = [1,2,3];
// let newList: Array<number> = [2, 3, 5];
// console.log(list,newList);
// //string类型
// let strList: string[] =['dhudhfiu','gdhsghdh'];
// console.log(strList);
// let str: Array<string> = ['dgsfgyh','hdjsh'];
// console.log(str);

//元祖
// let x: [string, number] = ['sjdhs', 2372];
// console.log(x);

// //枚举
// enum Color { Red = 3, Green, Blue }
// let c: Color = Color.Green;
// console.log(c);

//Any
// let abs: any = 'sjds';
// console.log(abs);
// abs = 189;
// console.log(abs);

//void
// function warnUser(): void {
//     console.log("this is warning");
// }
// warnUser();

// let unuseable: void = undefined;
// console.log(unuseable);

//null 和 undefined
// let n: null = null;
// let u: undefined = undefined;
// console.log(n, u);

//返回never；类型的函数
// 返回never的函数必须存在无法达到的点，即报错表示的含义就为无法达到的点
// function error(message: string): never {
//     throw new Error(message);
// }
// // console.log(error('抛出异常'));

// //推断的返回值类型为never
// function fail(){
//     return error("failed");
// }
// // fail();

// //死循环
// function infiniteLoop(): never {
//     while(true){

//     }
// }
// console.log(infiniteLoop);

//数组解构
// let [, second, ,fourth] = [1, 2, 3, 4];
// console.log(second, fourth);

//对象解构
// let o = {
//     a: "foo",
//     b: 12,
//     c: "bar"
// };
// let { a: newName1, b: newName2 } = o;
// console.log(newName1, newName2);

//默认值，当属性值为undefined时，使用缺省值
// function keepWholeObject(wholeObject: { a: string, b?: number}){
//     let { a, b = 1001} = wholeObject;
//     return {a, b};
// }
// console.log(keepWholeObject({a: '123'}));

//接口相关
// function printLabel(labeledObject: {label: string}){
//     return labeledObject.label;
// }
// let myObj = { size: 10, label: "Size ten Object"};
// console.log(printLabel(myObj));

//使用接口来描述上述问题： 必须包含一个label属性且类型为string;
// interface LabelledValue {
//     label: string;
// }
// function printLabel(labeledObj: LabelledValue){
//     return labeledObj.label;
// }
// let myObj = {size: 10, label: 'Size ten objects'}
// console.log(printLabel(myObj));

//可选属性
// interface SquareConfig {
//     color?: string;
//     width?: number
// }
// function createSquare(config: SquareConfig): {color: string; area: number} {
//     let newSquare = {color : "white", area: 10};
//     if(config.color){
//         newSquare.color = config.color;
//     }
//     if(config.width){
//         newSquare.area = config.width * config.width;
//     }
//     return newSquare;
// }
// console.log(createSquare({color: "black",width: 200}));

//只读属性
// interface Point {
//     readonly x: number,
//     readonly y: number
// }
// let p1: Point = { x: 10, y: 20};
// console.log(p1);
// p1.x = 12; error 加了readonly属性之后，属性值为只读

// let a: number[] = [1, 2, 3, 4];
// let ro: ReadonlyArray<number> = a;
// console.log(ro);
// ro[1] = 100; error 报错的原因是因为该数组为readonly

//表示一个接口可以具有任意数量的属性
// interface SquareConfig  {
//     color?: string;
//     width?: number;
//     [propName: string]: any;
// }

//fanxing接口
// interface Gene {
//     <T>(arg: T): T;
// }
// function identity<T>(arg: T): T {
//     return arg;
// }

// let myIdentity: Gene = identity;
// console.log(myIdentity)
// class GenericNumber<T> {
//     public zeroValue: T;
//     public add: (x: T, y: T) => T;
//     constructor(){

//     }
// }
// let my = new GenericNumber<number>();
// my.zeroValue = 0;
// my.add = (x, y) => (x + y);
// console.log(my)
// interface LengthWise {
//     length: number;
// }
// function loggingIdentity<T extends LengthWise>(args: T): T {
//     console.log(args.length);
//     return args;
// }
// console.log(loggingIdentity('123'))
// function getProperty(obj: T, key: K) {
//     return obj[key];
// }

// let x = { a: 1, b: 2, c: 3, d: 4 };

// getProperty(x, "a");
// type Easing = "ease-in" | "ease-out" | "ease-in-out";
// class UIElement {
//     animate(dx: number, dy: number, easing: Easing){
//         if(easing === "ease-in"){
//             console.log(dx+dy,easing);
//         }else if(easing == "ease-out"){
//             console.log(dx-dy,easing)
//         }else{
//             console.log(dx,dy,easing)
//         }
//     }
// }
// const element = new UIElement();
// element.animate(0, 0, 'ease-in');
//element.animate(10,10, 'uneasy'); //此时会出现报错，原因是因为此时所传入的字符串在Easing中并没有定义

// function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
//     return (Math.floor(Math.random() * 6) + 1) as 1 | 2;
// }
// const result = rollDice();
// console.log(result);

// function padLeft(value: string, padding: any){
//     if(typeof padding === "number") {
//         return Array(padding + 1).join(" ") + value;
//     }
//     if(typeof padding == "string") {
//         return padding + value;
//     }
//     throw new Error(`Expected string or number, got ${padding} .`);
// }
// console.log(padLeft("hello world", []))
// enum Direction {
//     Up = 1,
//     Down,
//     Left,
//     right
// }
// console.log(Direction.Up)
// enum Res {
//     No = 0 ,
//     Yes = 1,
// }
// function respond (recipient: string, message: Res):void {
//     console.log(recipient, message)
// }
// respond("Princess Caroline", Res.Yes)

// enum Direction {
//     Up = "up",
//     Down = "down",
//     Left = "left",
//     Right = "right"
// }
// console.log(Direction.Up)

// enum BooleanLikeHeterogeneousEnum {
//     No = 0,
//     Yes = "YES",
// }
// console.log(BooleanLikeHeterogeneousEnum)

// enum FileAccess {
//     None,
//     Read   = 1 << 1,
//     Write  = 1 << 2,
//     ReadWrite = Read | Write,
//     G = '123'.length
// }
// console.log(FileAccess.ReadWrite,FileAccess.Read,FileAccess.Write)

// enum ShapeKind {
//     Circle,
//     Square
// }

// interface Circle {
//     kind: ShapeKind.Circle;
//     radius: number;
// }

// interface Square {
//     kind: ShapeKind.Square;
//     sideLength: number;
// }

// let c: Circle = {
//     kind: ShapeKind.Circle,
//     radius: 10
// }
// console.log(c)

// enum Enum {
//     A
// }
// let a = Enum.A;
// let nameOfA = Enum[a];
// console.log(a, nameOfA)

// const enum Enum {
//     A = 1,
//     B = A * 2
// }
// console.log(Enum.A)

// declare enum Enum {
//     A = 1,
//     B,
//     C = 2
// }
// console.log(Enum.B)

// function padLeft(value: string,padding: number | string) {
//     if (typeof padding == 'number') {
//         return Array(padding + 1).join(" ") + value;
//     }
//     if (typeof padding === "string") {
//         return padding + value;
//     }
//     throw new Error(`Expected string or number, got ${padding} `);
// }
// console.log(padLeft("hello word", 123));

// interface Bird {
//     fly():void;
//     layEggs():void;
// }

// interface Fish {
//     swim(): void;
//     layEggs(): void;
// }
// function getSmakllPet(): Fish | Bird {
//     //
// }
// let pet = getSmakllPet();
// pet.layEggs(); // okay
// pet.swim();    // errors

// interface Bird {
//     fly():void;
//     layEggs():void;
// }

// interface Fish {
//     swim(): void;
//     layEggs(): void;
// }
// function getSmakllPet(): Fish | Bird {
//     //
// }
// let pet = getSmakllPet();

// if ((<Fish>pet).swim) {
//     (<Fish>pet).swim();
// }else {
//     (<Bird>pet).fly();
// }

// interface Bird {
//     fly():void;
//     layEggs():void;
// }

// interface Fish {
//     swim(): void;
//     layEggs(): void;
// }

// function isFish(pet: Fish | Bird): pet is Fish {
//     return (<Fish>pet).swim !== undefined;
// }

// function isNumber(x: any): x is number {
//     return typeof x === 'number';
// }

// function isString(y: any): y is string {
//     return typeof y === 'string';
// }

// function padLeft(value: string, padding: string | number) {
//     if (isNumber(padding)) {
//         return Array(padding + 1).join(" ") + value;
//     }
//     if (isString(padding)) {
//         return padding + value;
//     }
//     throw new Error(`Expected string or number, got ${padding} `)
// }

// interface Padder {
//     getPaddingString(): string;
// }

// class SpaceRepeatingPadder implements Padder {
//     constructor(private numSpaces: number) {}
//     getPaddingString(){
//         return Array(this.numSpaces + 1).join(" ");
//     }
// }

// class StringPadder implements Padder {
//     constructor(private value: string) {}
//     getPaddingString() {
//         return this.value;
//     }
// }

// function getRandomPadder() {
//     return Math.random() < 0.5 ?
//     new SpaceRepeatingPadder(4) : 
//     new StringPadder(" ");
// }

// //此时为SpaceRepeatingPadder或者是stringPadder
// let padder: Padder = getRandomPadder();

// if (padder instanceof SpaceRepeatingPadder) {
//     padder;
// }

// if (padder instanceof StringPadder ) {
//     padder;
// }
// let s = 'foo';
// s = null; // 报错，null不能赋值给string
// let sn: string | null = "bar";
// sn = null;

// sn = undefined; //报错，undefined不能赋值给string | null

// function f (x: number, y?: number) {
//     return x + (y || 0);
// }
// console.log(f(1,2));
// console.log(f(1));
// console.log(f(1, undefined));
// console.log(f(1, null));

// class C {
//     public a: number;
//     b?: number;
//     constructor(a:number){
//         this.a = a;
//     }
// }
// let c = new C(1);
// c.a = 12;
// c.a = undefined;
// c.b = 12;
// c.b = undefined;
// c.b = null;

//类型别名
// type Name = string;
// type NameResolve = () => string;
// type NameOrResolver = Name | NameResolve;
// function getName(n: NameOrResolver): Name {
//     if (typeof n === 'string'){
//         return n;
//     }else {
//         return n();
//     }
// }

// type LiskedList<T> = T & { next: LiskedList<T> }

// interface Person {
//     name: string;
// }

// type LinkedList<T> = T & { next: LinkedList<T> };

// interface Person {
//     name: string;
// }

// var people: LinkedList<Person> ;
// var s = people.name;
// var s = people.next.name;
// var s = people.next.next.name;
// var s = people.next.next.next.name;

// interface Square {
//     kind: "square";
//     size: number;
// }

// interface Rectangle {
//     kind: 'rectangle';
//     width: number;
//     height: number;
// }
// interface Circle {
//     kind: 'circle';
//     radius: number;
// }

// type Shape = Square | Rectangle | Circle;

// function area(s: Shape) {
//     switch(s.kind) {
//         case  "square" : return s.size * s.size;
//         case "rectangle": return s.height * s.width;
//         case "circle": return Math.PI * s.radius ** 2;
//     }
// }
// console.log(area({kind: 'circle',radius: 12}));

// class BasicCalculator {
//     public constructor(protected value: number = 0){};
//     public currentValue():number {
//         return this.value;
//     }
//     public add(operand: number): this {
//         this.value += operand;
//         return this;
//     }
//     public multiply(operand: number): this {
//         this.value *= operand;
//         return this;
//     }
// }

// class ScientificCaculator extends BasicCalculator {
//     public constructor(value = 0){
//         super(value);
//     }

//     public sin(){
//         this.value = Math.sin(this.value);
//         return this;
//     }
// }
// let v = new ScientificCaculator(2)
//         .multiply(5)
//         .sin()
//         .add(1)
//         .currentValue();
// console.log(v)

// function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][]{
//     return names.map(n => o[n]);
// }

// interface Person {
//     name: string;
//     age: number;
// }
// let person: Person = {
//     name: 'Jarid',
//     age: 35
// }
// // let strings: string[] = pluck(person, ['name']);

// function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
//     return o[name];
// }
// let names: string = getProperty(person, 'name');
// let age: number = getProperty(person, 'age');

//索引类型和字符串类型签名
// interface Map<T> {
//     [key: string]: T;
// }
// let keys: keyof Map<number> = 'sdd';
// let value: Map<number>['foo'] = 123;
// console.log(typeof keys,typeof value)

//映射类型
// interface Person {
//     name: string;
//     age: number;
// }
// type Readonly<T> = {
//     readonly [P in keyof T]: T[P];
// }
// type Partial<T> = {
//     [P in keyof T]?: T[P];
// }

// type PersonPartial = Partial<Person>;
// type ReadonlyPerson = Readonly<Person>;

//最简单的映射类型和它的组成部分
// type Keys = 'option1' | 'option2';
// type Flags = { [K in Keys]:boolean };

//通用方式
// interface Person {
//     name: string;
//     age: number;
// }
// type NullablePerson = { [P in keyof Person]: Person[P] | null};
// type PartialPerson = { [P in keyof Person]?: Person[P]}

//更通用方式
// type Nullable<T> = { [P in keyof T]: T[P] | null};
// type Partials<T> = { [P in keyof T]?: T[P]}


//装包：
// type Proxy<T> = {
//     get(): T;
//     set(value: T): void;
// }
// type Proxify<T> = {
//     [P in keyof T]: Proxy<T[P]>;
// }
// function proxify<T>(o: T): Proxify<T> {

// }
// let proxyProps = proxify(props);

//解包
// type Proxy<T> = {
//     get(): T;
//     set(value: T): void;
// }
// type Proxify<T> = {
//     [P in keyof T]: Proxy<T[P]>;
// }
// function unproxify<T>(t: Proxify<T>): T {
//     let result = {} as T;
//     for (const k in t) {
//         result[k] = t[k].get();
//     }
//     return result;
// }

//for...of语句
// let someArray = [1, "string", "false"];
// for(let entry of someArray) {
//     console.log(entry);
// }

//使用命名空间的验证器
// namespace Validation {
//     export interface StringValidator {
//         isAcceptable(s: string): boolean;
//     }

//     const lettersRegexp = /^[A-Za-z]+$/;
//     const numberRegexp = /^[0-9]+$/;

//     export class LettersOnlyValidator implements StringValidator {
//         isAcceptable(s:string) {
//             return lettersRegexp.test(s);
//         }
//     }

//     export class ZipCodeValidator implements StringValidator {
//         isAcceptable(s: string) {
//             return s.length === 5 && numberRegexp.test(s);
//         }
//     }
// }

// let strings = ["hello", "98052", "101"];

// let validators: { [s: string]: Validation.StringValidator; } = {};
// validators["ZIP code"] = new Validation.ZipCodeValidator();
// validators["Letters only"] = new Validation.LettersOnlyValidator();

// for(let s of strings) {
//     for(let name in validators ){
//         console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`)
//     }
// }

// namespace Shapes {
//     export namespace Polygons {
//         export class Triangle { }
//         export class Square { }
//     }
// }
// import polygons = Shapes.Polygons;
// let sq = new polygons.Square(); //给Shapes.Polygons取了一个别名