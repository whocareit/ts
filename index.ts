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
interface SquareConfig  {
    color?: string;
    width?: number;
    [propName: string]: any;
}

