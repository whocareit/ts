"use strict";
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
function error(message) {
    throw new Error(message);
}
// console.log(error('抛出异常'));
//推断的返回值类型为never
function fail() {
    return error("failed");
}
// fail();
//死循环
function infiniteLoop() {
    while (true) {
    }
}
console.log(infiniteLoop);
