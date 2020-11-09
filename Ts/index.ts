// console.log('5454');
// // let str:string = 'dhdjds';

// //一般函数
// function run():string {
//     return 'hello';
// }
// // console.log(run())

// function con():number {
//     return 123;
// }
// // console.log(con())

// //匿名函数
// const abc = function():number {
//     return 123;
// }
// console.log(abc());

//指定参数的传递
// function run(name:string, age:number):string {
//     return `${name} ---- ${age}`;
// }
// console.log(run('your age is', 10));

//可选参数的传递
// function run(name:string, age?:number):string {
//     if(age){
//         return `${name}--${age}`;
//     }else{
//         return `${name}`;
//     }
// }
// console.log(run('your age is',10));
//注意: 可选参数一定要写在必选参数的最后

//默认参数
// function defaultRun(str:string, num:number = 10):string{
//     return `${str}--${num}`;
// }
// console.log(defaultRun('dhjhdj',20))

//剩余参数的传递
// function conut(a:number, b:number, c:number, d:number):number{
//     return a+b+c+d;
// }
//可以通过数组来接受参数
// function su(a:number, ...result: number[]):number {
//     let num = a;
//     for(let i = 0; i < result.length; i++){
//         num += result[i];
//     }
//     return num;
// }
// console.log(su(1,2,3,4,5,6,7,8,9,10));

//ts中函数的重载
// function getInfo(name:string):string;

// function getInfo(age:number):number;

// function getInfo(str:any):any {
//     return str;
// }
// console.log(getInfo(true)); error

//ts中的类
//ts中定义类的方式
// class Person {
//     name: string; //在没有写修饰参数时，其默认值为public
//     constructor(name: string) {
//         this.name = name;
//     }
//     work(name: string):string{
//         this.name = name;
//         return `${this.name}`
//     }
// }
// var person = new Person('张三');
// console.log(person.name);

// class Person {
//     name: string;
//     constructor(name: string){
//         this.name = name;
//     }
//     getName():string {
//         return `${this.name}`;
//     }
//     setName(name: string):void {
//         this.name = name;
//     }
// }

// var person = new Person('历史');
// person.setName('张三')
// console.log(person.getName());


//ts中类的继承方式
// class Person {
//     name: string; //在没有写修饰参数时，其默认值为public
//     constructor(name: string) {
//         this.name = name;
//     }
//     work(name: string):string{
//         this.name = name;
//         return `${this.name}`
//     }
// }

// class work extends Person {
//     constructor(name: string){
//         super(name);
//     }
//     work(name: string): string{
//         return `${this.name}is working`;
//     }
// }
// const person = new Person('王五');
// console.log(person.work('张三'));

// class Person {
//     name: string;
//     static age: number;
//     constructor(name: string) {
//         this.name = name;
//     }
//     eat(): string { //被叫做实例方法
//         return this.name;
//     }
//     static run():string{ //在静态方法中不能直接调用实例的属性
//         Person.age = 14;
//         return `he is ${Person.age} years old`;
//     }
// }
// const person = new Person('张三');
// console.log(person.eat());
// console.log(Person.run());
// console.log(Person.age);

// class Person {
//     name: string;
//     constructor(name: string) {
//         this.name = name;
//     }

//     //父类定义的方法不去实现
//     eat(){

//     }
// }

// class Cat extends Person {
//     //子类继承父类的方式
//     constructor(name: string){
//         super(name);
//     }

//     eat():string{
//         return `${this.name} 吃老鼠`;
//     }
// }

// class Dog extends Person {
//     constructor(name:string){
//         super(name);
//     }

//     eat():string{
//         return `${this.name}吃骨头`;
//     }
// }

// const dog = new Dog('小黑');
// const cat = new Cat('猫');
// console.log(dog.eat(), cat.eat());

// abstract class Animal {
//     abstract eat():any;
// }

// class Dog extends Animal {
//     name: string;
//     constructor(name:string){
//         super();
//         this.name = name;
//     }
//     eat():string {
//         return `小狗的名字是${this.name}`;
//     }
// }
// class Cat extends Animal {
//     name: string;
//     constructor(name: string) {
//         super(); 
//         this.name = name;
//     }
//     eat():string {
//         return `${this.name}吃`;
//     }
// }
// const dog = new Dog('小花');
// const cat = new Cat('小红');
// console.log(dog.eat(),cat.eat());

// function printLabel(name: {firstName: string}):string{
//     return name.firstName;
// }
// console.log(printLabel({firstName: '123'}));
// interface nullName {
//     firstName: string;
//     secondName: string;
// }
// function printLabel(name: nullName):nullName{
//     return name;
// }
// console.log(printLabel({
//     firstName:'zhang',
//     secondName: 'san'
// }))
// interface nullName {
//     firstName: string;
//     secondName: string;
//     age?: number
// }
// function printLabel(name: nullName):string{
//     if(name.age){
//         return `${name.firstName}${name.secondName}的年龄是${name.age}`;
//     }else{
//         return `${name.firstName}${name.secondName}的年龄不知`;
//     }
    
// }
// console.log(printLabel({
//     firstName:'zhang',
//     secondName: 'san',
//     age: 14
// }))
// console.log(printLabel({
//     firstName:'li',
//     secondName: 'si'
// }))

//函数类型接口
// interface encript {
//     (key: string,value: string):string;
// }
// const md5:encript = function(key: string,  value: string):string {
//     return key + value;
// }
// console.log(md5('zhangsan1','dsdk'));

//可索引接口
//对数组的约束
// interface UseArr {
//     [index: number]: string;
// }

// const arr:UseArr = ['123','456'];
// console.log(arr)

// //对于对象的约束
// interface UseObj {
//     [index: string]: string;
// }
// const obj:UseObj = {name: 'zhang',age: '21'};
// console.log(obj);

//类类型接口
// interface Xin{
//     name: string;
//     eat(food:string): void;
// }

// class Dog implements Xin {
//     name: string;
//     constructor(name: string){
//         this.name = name;
//     }
//     eat(){
//         console.log(this.name+ '吃饭')
//     }
// }
// const cat = new Dog('小黑');
// console.log(cat.eat());

interface M {
    eat():void;
}
interface T extends M {
    work():void;
}

class Father {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    code():void{
        console.log(this.name + '写代码');
    }
}

class Son extends Father implements T {
    constructor(name: string){
        super(name);
    }
    eat(){
        console.log('eat');
    }
    work(){
        console.log('work');
    }
}
const son = new Son('小河');
son.code();