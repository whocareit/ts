# ts基础学习
## ts安装基本使用以及其作用
* 基本使用步骤：
1. ts基本安装方式有两种：
    * 通过命令行的方式 npm install -g typescript
    * 通过安装Visual Studio的TypeScript插件
2. 在编辑器中写关于ts的代码
3. 最后在命令行上，运行TypeScript的代码，采用命令行tsc 文件名.ts
* 使用的作用： 将ts的代码转化为js代码运行在前端的代码当中
 
## ts中自动监控代码的方式
1. tsc --init
2. 将自动的配置文件tsconfig.js中的outiDir的默认值改为：‘./js’
## 基础数据类型
1. 布尔值（boolean）
    * let isDone: boolean = false;
2. 数字 （number）
    * let decLite: number = 6;
3. 字符串 (string) 可以使用模板字符串也可以使用单双引号
    * let name: string = `Gene`;
4. 数组
    * 第一种定义方式:
        let list: number[] = [1, 2, 3]
    * 第二种定义方式：采用范型
        let list: Array<number> = [1, 2, 3]
5. 元祖（Tuple）元祖类型允许表示在一个已知元素数量和类型的数组，各元素的类型不必相同
    * 如let x: [number, string]
      x = [1, 'string']
当访问一个越界的元素时，会采用联合类型替代，即采用number和string这两种数据类型中的一种，如果采用
其他的数据类型，则会报错。
6. 枚举 （enum）对js标砖数据类型的一个补充
enum Color { Red, Green, Blue}
let c: Color = Color.Green
默认情况下，从0元素开始为元素编号，也可以手动的为每一个枚举的元素进行赋值
7. any 任意类型，在编程阶段不清楚类型的变量指定一个类型。这些值是不确定的，因此就可以采用any变量
    * let notSure: any = 4;
    notSure = `maybe a string instead`;
    notSure = false;
8. void （无类型）与any类型相反，表示没有任何一个数据类型
* 声明一个void类型的变量没有什么作用，因为其只能赋undefined
9. Null 和 Undefined
* 这两种赋值都只能给定对应的值类型
10. nerver 数据类型
* 其表示永远不存在的值类型。
* never类型任何类型类型的子类型，可以赋值给任何类型；然而没有类型是never的子类型或可以赋值给
11. never类型(除了never本身之外)
```
//返回never；类型的函数
// 返回never的函数必须存在无法达到的点，即报错表示的含义就为无法达到的点
function error(message: string): never {
    throw new Error(message);
}
// console.log(error('抛出异常'));

//推断的返回值类型为never
function fail(){
    return error("failed");
}
// fail();

//死循环
function infiniteLoop(): never {
    while(true){

    }
}
console.log(infiniteLoop);
```

## 变量声明
1. var
2. let 
3. const
4. 作用于函数参数的变量赋值
function f([first, second]: [nunber, number]){
    console.log(first);
    console.log(second);
}
5. 对象解构中的默认值
* 默认值可以让你在属性的undefined时使用缺省值：
如：function keepWholeObject(wholeObject: {a: string, b?: number}){
    let { a, b = 1001 } = wholeObject;
}
此时的b?所代表的含义为缺省值的意思

## 接口
1. 接口的简单使用
如function printLabel(labelledObj: {obj: string}){
    console.log(labelledObj.obj);
}

let myObj = { size: 10, label: "Size 10 Object"};
printLabel(myObj);
整个原理如下：
类型检查器会查看printLabel的调用，printLabel有一个参数，并要求这个参数
有一个名为label类型的string。对于传入的对象参数，实际上会包含很多属性，但是编译器
只会检查必须的属性是否存在，并且其类型是否匹配。

2. 使用接口来描述上述内容,使用关键字interface
interface LabelledValue {
    label: string;
}
function printLabel(labelledObj: labelledValue){
    console.log(labelledObj.label);
}
let myObj = {Size: 10, label: "Size is ten"};
printLabel(myObj);

2. 可选属性
在接口中有的属性是必须的有的属性不是必须的，或者是根本不存在。可选属性在应用
“options bags”模式时很常用，即给函数传入的参数对象中只有部分属性赋值。

options bags
interface SquareConfig {
    color?: string;
    width?: number;
}
function createSquare(config: SquareConfig):{color: string; areaL: number}{
    let newSquare = { color: "white", area: 100};
    if(config.color){
        newsquare.color = config.color;
    }
    if(config.width) {
        newSquare.area = config.width * config.width;
    }
    return newsSquare;
}
let mySquare = createSquare({color: "black"});
在这个模型中?所要表示的含义就是可选的

### 可选属性的好处：
* 对可能存在的属性进行预定义
* 可以捕获引用了不存在的属性时的错误
### 只读属性：一些对象属性只能在对象刚刚创建的时候修改其值，
需要在属性名前用readonly来制定只读属性：
如：interface Point{
    readonly x: number;
    readonly y: number;
}
可以通过赋值一个对象字面量来构造一个Point,然后赋值后，x和y再也不能改变
let p1: Point = { x: 10, y: 20 };
p1.x = 5;
* Ts具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法
去掉，因此可以确保数组创建后再也不能被修改
如：let a: number[] = [1, 2, 3, 4, 5, 6];
let ro: ReadonlyArray<number> = a;
ro[0] = 12 // error;

interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
* 属性检查


### 函数类型
接口能够描述js对象拥有的各种个样的外形。除了描述带有属性的普通对象外没，
借口也可以描述函数类型。

interface SearchFunc {
    (source: string, subString: string): boolean;
}
这样子的命名方式是为了给定函数具体的返回类型

这样定义后，就可以像使用其他接口一样使用这个函数类型的接口。
如：
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string){
    let result = source.search(subString);
    return result > -1;
}

对于函数类型的类型检查来说，函数的参数名不需要与借口里定义好的名字相匹配。
如：
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
}

可索引的类型
与使用接口描述函数类型差不多，可以描述那些能够通过索引得到的类型。可索引类型
具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。
如：
interface StringArray {
    [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "fred"];

let myStr: string = myArray[0];

在这个例子中，定义了StringArray接口，它具有索引签名，这个签名表示了当前
number去索引StirngArray时会等到string类型的返回值。

* ts所支持的两种索引签名：字符串和数字。可以使用两种类型的索引，但是
数字索引的返回值必须是字符串索引返回值类型的子类型。原因是因为当前使用
number来索引时，js会将他转化成string然后再去索引对象。也就是说用
100（一个number）去索引等同于使用‘100’这个字符串去索引，因此两者需要保持一致。
如：
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

字符串索引签名能够很好的秒速dictionary模式，并且它们会与其返回值类型
相匹配。因为字符串索引声明了obj.property和obj["property"]两种形式都可以。
下面的例子中，name的类型与字符串索引类型不匹配。所以类型检查器给出一个
错误提示：
interface NumberDictionary {
    [index: string]: number;
    length: number;
}

最后可以给索引签名设置制度，这样就防止了给索引赋值；
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];

## 类类型
1. 实现接口，实现接口方式，ts能够用来明确的强制一个类去符合某种契约
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number){ }
}

## 泛型类型
1. 泛型类型的声明方式：
```
    function identity<T>(arg: T):T {
        return arg;
    }
    let myIdentity: <T>(arg: T) => T = identity;

    interface Gene {
    <T>(arg: T): T;
}
    function identity<T>(arg: T): T {
        return arg;
    }

    let myIdentity: Gene = identity;
```
此时的myIdentity就是泛型类型
2. 泛型接口：使用interface关键字
命名方式如下：
```
    interface Gen {
        <T>(arg: T): T
    }
```
3. 泛型类：使用class关键字
* 命名方式：在类名称之后使用<>，整个就表示泛型
```
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
    constructor(zeroValue: T,add: (x: T, y: T) => T) {
        this.zeroValue = zeroValue;
        this.add = add;
    }
}
let my = new GenericNumber<number>(0, (x, y) => (x + y));
console.log(my.add(3,5))
```
4. 泛型约束
```
interface LengthWise {
    length: number;
}
function loggingIdentity<T extends LengthWise>(args: T): T {
    console.log(args.length);
    return args;
}
console.log(loggingIdentity('123'))
```
* 在上面的这个案例中由于在接口中定义了约束，因此它就对一些类型不适用了，例如number类型等
* 在约束中去使用类型参数

## 文字类型
* 在ts中文字类型包括下面的三种类型：string number boolean
* 但是在使用时，要么全部是字符串或者全部是数字类型或者全部是布尔值
```
class UIElement {
    animate(dx: number, dy: number, easing: Easing){
        if(easing === "ease-in"){
            console.log(dx+dy,easing);
        }else if(easing == "ease-out"){
            console.log(dx-dy,easing)
        }else{
            console.log(dx,dy,easing)
        }
    }
}
const element = new UIElement();
element.animate(0, 0, 'ease-in');
//element.animate(10,10, 'uneasy'); //此时会出现报错，原因是因为此时所传入的字符串在Easing中并没有定义
```
## 枚举
1. 定义方式： 使用enmu关键字，中间的分隔符按照逗号来进行划分
2. 数字枚举： 其本身具有字增属性
```
//案例1
enum Direction {
    Up = 1,
    Down,
    Left,
    right
}
console.log(Direction.Up)
//案例2
enum Res {
    No = 0 ,
    Yes = 1,
}
function respond (recipient: string, message: Res):void {
    console.log(recipient, message)
}
respond("Princess Caroline", Res.Yes)
```
3. 字符串枚举
* 定义： 🇺每个成员都必须使用字符串字面量，或另外一个字符串枚举成员进行初始化
* 优势： 字符串枚举没有自增长的行为，字符串枚举可以很好的序列化。
```
enum Direction {
    Up = "up",
    Down = "down",
    Left = "left",
    Right = "right"
}
console.log(Direction.Up)
```
4. 异构枚举
从技术的角度来说，美剧可以混合字符串和数字成员，通常不建议这样来做
```
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
console.log(BooleanLikeHeterogeneousEnum)
```
5. 计算的和常量成员
每一个枚举都一个值，可以是常量或计算出来的。
* 满足下面的这些情况时，枚举成员被当作常量：
    * 是枚举的第一个成员并且美欲呕初始化器时，这种情况下，初始值为0
    * 当前枚举成员是一个数字常量，当前枚举成员的值为它上一个枚举成员的值加1
    * 枚举成员使用常量枚举表达式初始化
```
enum FileAccess {
    None,
    Read   = 1 << 1,
    Write  = 1 << 2,
    ReadWrite = Read | Write,
    G = '123'.length
}
console.log(FileAccess.ReadWrite,FileAccess.Read,FileAccess.Write)
```
* 在上面的例子中，<<表示右移，右边的数，表示右移的位数。 ｜表示求异或(相同为0不同为1)
6. 联合枚举与枚举成员的类型
* 存在的一种特殊的非计算的常量枚举成员的子集：字面量枚举成员。字面量枚举成员指不带有初始值的常量枚举成员，或者是值被初始化为：
    * 任何字符串字面量 (例如： “foo”, "bar", "baz")
    * 任何数字字面量 (例如：1,100)
    * 应用了一元 - 符号的数字字面量（例如： -1, -100）
```
enum ShapeKind {
    Circle,
    Square
}

interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}

interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
}

let c: Circle = {
    kind: ShapeKind.Circle,
    radius: 10
}
console.log(c)
```
7. 反向映射
对于数字枚举成员来说，七还具有反向映射，从枚举值到枚举成员
8. const枚举
* 出现的意义：为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，需要用常量枚举。常量枚举通过在枚举上使用const修饰符来定义。
```
const enum Enum {
    A = 1,
    B = A * 2
}
console.log(Enum.A)
```
* 常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，他们在编译阶段会被删除。
9. 外部枚举
* 外部枚举用来描述已经存在的枚举类型的形状
* 使用declare 关键字
```
declare enum Enum {
    A = 1,
    B,
    C = 2
}
```
外部枚举和非外部枚举之间有个重要的区别，在正常的枚举中，没有初始化方法的成员被当作成常数成员。
对于非常数的外部枚举而言，没有初始化方法时被当作需要经过计算的
## keyof
* 在ts中允许我们遍历某种属性，并通过keyof操作符提取其属性的名称.该操作符可以用于获取某种类型
的所有键，其返回类型是联合类型
```
interface Person {
    name: string;
    age: number;
    location: string;
}
```
type k1 = keyof Person; // "name" | "age" | "location" 
type k2 = keyof Person[]; // number | "length"等
type k3 = keyof { [x: string]: person }; // string | number
* keyof操作符除了支持接口和类外，也支持基本数据类型
## ?.运算符
1. 含义：可选链操作符，可以理解为防止undefined情况
2. 与之对应的!.运算符，知道所要调用的值为切确的
## ts中泛型里面使用T R K N T S V等
1. 含义：本身上是随便使用的，不具有任何的意义，但大多数都是按照一定的约定来说。
* E-Element
* K-Key
* T-type
* N-Number
* V-Value
* R-Return // 表示返回值
## 类型推论
1. 介绍: 在没有明确指明出类型的地方，类型推论会帮助提供类型
### 最佳通用类型
* 当需要从几个表达式中推断类型时，会使用一些表达式来推断出一个最合适的通用类型。
```
let x = [0, 1, null]
//从当前这个表达式中，会考虑到所有元素的类型，上面有两种类型，这里有两种选择：number || null。计算通用类型算法会考虑所有的候选类型，并给出一个兼容所有候选类型的类型
```
```
let zoo = [new Rhino(), new Elephant(), new Snake()];
//在这个例子中，想要zoo被推断为Animal类型，但是这个数组中没有对象是Animal类型的，因此不能推断出结果。因此为了更正，当候选类型不能使用时，需要明确的指出类型
```
### 上下文类型
* ts类型推论可能按照相反的方向进行，这种被称之为“按照上下文归类”。上下文归类会发生在表达式的类型与所处的位置相关时，如：
```
window.onmousedown = function(mouseEvent){
    console.log(mouseEvent.button);
}
//会发生错误：原因是因为ts类型检查器使用window.onmousedown函数的类型来推断右边函数表达式的类型。因此，就能推断出mouseEvent参数的类型。如果函数表达式不在上下文类型的位置，mouseEvent参数的类型需要制指定any
```
## 类型兼容性
1. 介绍：ts里的类型兼容性，是基于结构子类型。结构类型是一种只使用其成员来描述类型的方式
```
interface Named {
    name: string;
}
class Person {
    name: string;
}
let p: Named;
p = new Person();
//这段代码不会报错，原因是因为ts的结构性子类型是根据js代码的典型写法来设计的
```
2. 类型兼容性基本规则：如果x想要兼容y，那么y至少具有与x相同的属性。
```
interface Named {
    name: string;
}
let x: Named;
let y = { name: "Alice", location: "Seattle"};
x = y;
//在这种赋值的规则中，编译器检查x中的每个属性，看了在y中能找到对应的属性，因此这个赋值过程是正确的
```
3. 比较两个函数
在赋值的过程中需要去对比各自的参数，如果参数多就是正确的，参数少就是错误的
```
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;
y = x; //正确
x = y; //error
```
4. 尽量减少一些不必要的参数的使用
```
let items = [1, 2, 3];

// Don't force these extra arguments
items.forEach((item, index, array) => console.log(item));

// Should be OK!
items.forEach((item) => console.log(item));

//对于上面的这种情况，在定义参数的时候，尽量去避免定义但没有使用的对象
```
5. 泛型
* ts是结构性的类型系统，类型参数只影响使用其作为类型一部分是的结果类型。
```
interface Empty<T> {

}
let x: Empty<number>;
let y: Empty<string>;
x = y;
//这个例子不会报错，原因是因为x和y是兼容的，他们的结构使用类型参数并没有什么不同
```
```
interface NotEmpty<T> {
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;
x = y;
//在这里会报错，原因是因为x和y不是兼容的
```
## 高级类型
### 交叉类型
1. 交叉类型：是将多个类型合并一个类型，这样可以把多种类型叠加在一起成为一种类型，其包含了所需的所有类型的特性。
2. 使用场景：大多数在混入或其他不适合典型面向对象模型的地方看到交叉类型的使用。
```
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first){
        (<any>result[id]) = (<any>first)[id];
    }
    for (let id in second){
        if(!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>result)[id];
        }
    }
    return result;
}

class Person {
    constructor(public name: string);
}

interface Loggable {
    log(): void;
}

class ConsoleLogger implements Loggale {
    log(){

    }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
```

### 联合类型(Union Types)
1. 使用场景：如遇到number或string类型的参数
```
function padLeft(value: string,padding: any) {
    if (typeof padding == 'number') {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got ${padding} `);
}
console.log(padLeft("hello word", 4));
```
* 在上面的这种情况时，需要我们传入string或者是number类型，但是由于padding类型被指定为了any，那么在传入padding值时，就算传入一个不是string或者是number类型的参数，ts也不会报错，在编译阶段是能够通过的，但是在运行时会报错。因而代替上面的类型，将any换成以|符号来进行类型兼容。如下所示
```
function padLeft(value: string,padding: number | string) {
    if (typeof padding == 'number') {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got ${padding} `);
}
console.log(padLeft("hello word", 123));
```
* 联合类型表示一个值可以是几种类型，并且使用｜线来分割每个类型，所以number ｜ string ｜ boolean表示的为一个值可以是number string或boolean
* 注意，如果一个值是联合类型，如果需要去访问，访问的只能是联合类型的所有类型的共有成员
```
interface Bird {
    fly():void;
    layEggs():void;
}

interface Fish {
    swim(): void;
    layEggs(): void;
}
function getSmakllPet(): Fish | Bird {
    //
}
let pet = getSmakllPet();
pet.layEggs(); // okay
pet.swim();    // errors
```
* 在上面的例子中，因为layEggs()所以能够访问，另外的不能被访问，原因是因为它们不是公有的，只存在单独的属性当中
### 类型保护与区分类型
* 对于上述所说的联合类型，如果要区分2个可能值是否是所在的成员中的检测方法，就需要去使用类型断言。
```
interface Bird {
    fly():void;
    layEggs():void;
}

interface Fish {
    swim(): void;
    layEggs(): void;
}
function getSmakllPet(): Fish | Bird {
    //
}
let pet = getSmakllPet();

if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
}else {
    (<Bird>pet).fly();
}
```
* 在当前的这个类型中<Fish>pet.swim所表示的含义为判断该方法中是否有该接口中所定义的方法
1. 用户自定义的类型保护
* 描述：类型保护就是一些表达式，会在运行时检查以确保在某个作用域里的类型。
* 形式： 类型保护，只需要简单的定义一个函数，它的返回值是一个类型谓词
```
interface Bird {
    fly():void;
    layEggs():void;
}

interface Fish {
    swim(): void;
    layEggs(): void;
}

function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}
```
* 类型谓词：其形式为paramentName is Type形式， paramentName必须是来自于当前函数签名里的一个参数名
2. typeof类型保护
```
function isNumber(x: any): x is number {
    return typeof x === 'number';
}

function isString(y: any): y is string {
    return typeof y === 'string';
}

function padLeft(value: string, padding: string | number) {
    if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
        return padding + value;
    }
    throw new Error(`Expected string or number, got ${padding} `)
}
```
* 在这个例子中存在一个弊端，需要定义函数或者直接通过typeof来对类型进行判断。typeof类型保护只有良种化形式能够被识别 typeof v === "typename" 或者是 typeof v !== "typename".其中typename必须是number string boolean symbol。只有这几种类型才能受到保护
3. instanceof类型保护
```
interface Padder {
    getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) {}
    getPaddingString(){
        return Array(this.numSpaces + 1).join(" ");
    }
}

class StringPadder implements Padder {
    constructor(private value: string) {}
    getPaddingString() {
        return this.value;
    }
}

function getRandomPadder() {
    return Math.random() < 0.5 ?
    new SpaceRepeatingPadder(4) : 
    new StringPadder(" ");
}

//此时为SpaceRepeatingPadder或者是stringPadder
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
    padder;
}

if (padder instanceof StringPadder ) {
    padder;
}
```
* instanceof的右侧要求是一个构造函数，ts将细化为：
   * 如果它的类型不为any的话，此构造函数的prototype属性的类型
   * 构造签名所返回的类型的联合
4. 可以为null的类型
* ts具有两种特殊类型，null和undefined，默认情况下认为，null与undefined可以赋值给任何类型。但是需要去注意的一点就是，当声明一个变量时，不会自动地包含null或undefined。这时，可以使用联合类型来明确的包含它们。
```
let s = 'foo';
s = null; // 报错，null不能赋值给string
let sn: string | null = "bar";
sn = null;

sn = undefined; //报错，undefined不能赋值给string | null
```
5. 可选参数和可选属性
* 在可选参数中，可选参数会被自动地加上undefined类型
```
function f (x: number, y?: number) {
    return x + (y || 0);
}
console.log(f(1,2));
console.log(f(1));
console.log(f(1, undefined));
console.log(f(1, null));
```
* 在下面的可选属性中也同样如此
```
class C {
    public a: number;
    b?: number;
    constructor(a:number){
        this.a = a;
    }
}
let c = new C(1);
c.a = 12;
c.a = undefined;
c.b = 12;
c.b = undefined;
c.b = null;
```
6. 类型别名
* 类型别名会给一个类型起新的名字，但是别名有时和接口很像，可以作用于原始值，联合类型，元祖以及其他任何需要手写的类型
```
type Name = string;
type NameResolve = () => string;
type NameOrResolver = Name | NameResolve;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string'){
        return n;
    }else {
        return n();
    }
```
* 类型别名也可以是泛型
当其于交叉类型结合时，会创建出一些古怪的类型
```
type LiskedList<T> = T & { next: LiskedList<T> }

interface Person {
    name: string;
}

type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
    name: string;
}

var people: LinkedList<Person> ;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;
```
7. 可辨识联合
* 可以合并单例类型，联合类型，类型保护和类型别名来创建和一个叫做可辨识联合的高级模式，被称为标签联合或代数数据类型。
* 具有的三个特征：
    * 具有普通的单例类型属性-可辨识的特征
    * 一个类型别名包含了那些类型的联合
    * 此属性上的类型保护
```
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: 'rectangle';
    width: number;
    height: number;
}
interface Circle {
    kind: 'circle';
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
    switch(s.kind) {
        case  "square" : return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
console.log(area({kind: 'circle',radius: 12}));
//**即两个乘号就是乘方的意思，如2**4，结果就是16
```
8. 多态的this类型
* 多态的this类型表示的是某个包含类或者是某个包含类或接口的子类型。能很容易的表示连贯接口间的继承
```
class BasicCalculator {
    public constructor(protected value: number = 0){};
    public currentValue():number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
}
```
* 由于这个类使用了this类型，因此可以继承它，新的类可以直接使用之前的方法，不需要做任何的改变
```
class ScientificCaculator extends BasicCalculator {
    public constructor(value = 0){
        super(value);
    }

    public sin(){
        this.value = Math.sin(this.value);
        return this;
    }
}
let v = new ScientificCaculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();
console.log(v)
```
9. 索引类型
* 使用索引类型，编译器就能够检查使用了动态属性名的代码
* 索引类型查询和索引访问操作符
```
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][]{
    return names.map(n => o[n]);
}

interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
}
let strings: string[] = pluck(person, ['name']);
```
* 索引类型查询操作符：keyof T,含义是对于任何类型T，keyof T的结果为T，如下所示：
```
let personProps: keyof Person; // 'name' | 'age'
```
* 索引访问操作符：T[K],在这里需要确保类型变量K extends keyof T
```
interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
}
// let strings: string[] = pluck(person, ['name']);

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name];
}
let names: string = getProperty(person, 'name');
let age: number = getProperty(person, 'age');
```
* 索引类型和字符串索引签名
keyof和T[K]与字符串索引签名进行交互。如果有一个带有字符串索引签名的类型，那么keyof T会是string。并且T[string]为索引签名的类型。
```
interface Map<T> {
    [key: string]: T;
}
let keys: keyof Map<number> = 'sdd';
let value: Map<number>['foo'] = 123;
```

### 映射类型
* 在映射类型里，新类型以相同的形式去转化旧类型里的每个属性。如：可以令每一个属性都成为readonly类型或者可选的。
```
interface Person {
    name: string;
    age: number;
}
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
type Partial<T> = {
    [P in keyof T]?: T[P];
}

type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
```
* 在上面的这个例子中就将person中的属性转化为了可选和只读这两种方式
```
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]:boolean };
进而表现出含义则为
type Flags = {
    option1: boolean;
    option2: boolean;
}
```
* 映射类型的真正应用，常常是基于一些已经存在的类型，且按照一定的方式转化字段。
```
//通用方式
interface Person {
    name: string;
    age: number;
}
type NullablePerson = { [P in keyof Person]: Person[P] | null};
type PartialPerson = { [P in keyof Person]?: Person[P]}

//更通用方式
type Nullable<T> = { [P in keyof T]: T[P] | null};
type Partials<T> = { [P in keyof T]?: T[P]}
```
* 装包的过程
```
type Proxy<T> = {
    get(): T;
    set(value: T): void;
}
type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
}
function proxify<T>(o: T): Proxify<T> {

}
let proxyProps = proxify(props);
```
* 解包的过程
```
type Proxy<T> = {
    get(): T;
    set(value: T): void;
}
type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
}
function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T;
    for (const k in t) {
        result[k] = t[k].get();
    }
    return result;
}
```
### 预定义的有条件类型
* Exclude<T, U>    从T中剔除可以赋值给U的类型
```
type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
```
* Extract<T, U>   提取T中可以赋值给U的类型
```
type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"
```
* NonNUllable<T>   从T中剔除null和undefined
```
type T04 = NonNullable<string | number | undefined>;  // string | number
```
* ReturnType<T>   获取函数返回值类型
```
type T10 = ReturnType<() => string>;  // string
type T11 = ReturnType<(s: string) => void>;  // void
```
* InstanceType<T> 获取构造函数类型的实例类型
```
type T22 = InstanceType<never>;  // any
type T23 = InstanceType<string>;  // Error
```
## 迭代器和生成器
### 可迭代器
当一个对象实现了Symbol.iterator属性时，可以认为其是迭代的。如Array, Map, Set等
1. for...of语句
* for...of会遍历可迭代的对象，调用对象上的Symbol.iterator方法。
```
let someArray = [1, "string", "false"];
for(let entry of someArray) {
    console.log(entry);
}
```
2. for..of和for...in
* 两者之间的区别
    * in迭代的是对象的键列表，of则迭代对象的值列表
    * in可操作任何对象，提供的是查找对象属性的一种方法。of关注于迭代对象的值
## 命名空间
* 如，当很多的验证器加入时，需要一种手段来组织代码，以便于在记录类型的同时会你不用担心与其它对象产生命名冲突，因此需要把验证器包裹到一个命名空间内，而不用将其放在全局命名空间下
```
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s:string) {
            return lettersRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}

let strings = ["hello", "98052", "101"];

let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

for(let s of strings) {
    for(let name in validators ){
        console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`)
    }
}
```
* 分解到多文件：当应用变得越来越大时，需要将代码分离到不同的文件中以便于维护
* 多文件中的命名空间： 可以将命名空间分割成多个文件，尽管是不同的文件，但是任然是同一个命名空间，并且在使用时就如同定义在一个文件中一样。各文件之间存在一定的依赖关系，在这里可以引用标签来告述编辑器文件之间的联系。
* 当涉及到多文件时，必须确保所有编译后的代码都被加载了。
    * 第一种方式，把所有输入文件编译为一个输出文件，需要使用--outfile标记， tsc --outFile sample.js Test.ts
    * 第二种方式，可以编译每一个文件，每一个源文件都会对应生成一个js文件，在页面上通过script标签把所有生成的js按照正确的顺序给引进来
* 别名：给常用的对象取一个短的名字
    * 在引用时，使用import关键字
```
namespace Shapes {
    export namespace Polygons {
        export class Triangle { }
        export class Square { }
    }
}
import polygons = Shapes.Polygons;
let sq = new polygons.Square(); //给Shapes.Polygons取了一个别名
```
* 命名空间和模块的陷进
1. 对模块使用///reference,应该使用import。在编译器中使用根据import来找到对应的路径，是通过import from或者是import require()，来定位到模板的类型信息
* 不必要的命名空间
1. 不应该对模板使用命名空间，使用命名空间是为了提供逻辑分组和避免命名冲突。模块文件本身书一个逻辑分组，并且它的名字是由导入这个模板的代码指定，所以没有必要为导出的对象增加额外的模板层
```
export class Triangle {}
export class Square {}

import * as shapes form "./shapes";
let t = new shapes.Triangle();
```