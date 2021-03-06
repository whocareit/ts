# ts基础学习
## ts安装基本使用以及其作用
* 基本使用步骤：
1. ts基本安装方式有两种：
    * 通过命令行的方式 npm install -g typescript
    * 通过安装Visual Studio的TypeScript插件
2. 在编辑器中写关于ts的代码
3. 最后在命令行上，运行TypeScript的代码，采用命令行tsc 文件名.ts
* 使用的作用： 将ts的代码转化为js代码运行在前端的代码当中
 
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
默认值可以让你在属性的undefined时使用缺省值：
如：function keepWholeObject(wholeObject: {a: string, b?: number}){
    let { a, b = 1001 } = wholeObject;
}

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

使用接口来描述上述内容
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

在这个例子中，定义了







