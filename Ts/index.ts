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

// interface M {
//     eat():void;
// }
// interface T extends M {
//     work():void;
// }

// class Father {
//     name: string;
//     constructor(name: string) {
//         this.name = name;
//     }
//     code():void{
//         console.log(this.name + '写代码');
//     }
// }

// class Son extends Father implements T {
//     constructor(name: string){
//         super(name);
//     }
//     eat(){
//         console.log('eat');
//     }
//     work(){
//         console.log('work');
//     }
// }
// const son = new Son('小河');
// son.code();

// //any类型
// function returnAny(value: any): any{
//     return value;
// }
// console.log(returnAny('ddkf'));//此时不会对类型有任何的约束

// //泛型
// function returnLike<T>(value: T): T {
//     return value;
// }
// console.log(returnLike<string>('123'));
// console.log(returnLike<number>(123));

//泛型类
// class Min<T> {
//     public arr: T[] = [];
//     add(value: T):void {
//         this.arr.push(value);
//     }
//     min():T {
//         let minValue = this.arr[0];
//         for(let i = 0; i < this.arr.length; i++){
//             if(minValue > this.arr[i]){
//                 minValue = this.arr[i];
//             }
//         }
//         return minValue;
//     }
// }
// const min = new Min<number>(); //泛型类的实例化
// min.add(3);
// min.add(20);
// min.add(100);
// console.log(min.min());
// const mins = new Min<string>();
// mins.add('v');
// mins.add('a');
// mins.add('z');
// console.log(mins.min())
// interface ConfigFn {
//     <T>(value: T): T;
// }

// var config:ConfigFn = function<T>(value: T):T {
//     return value;
// }
// console.log(config<string>('zhang'));

//第二种定义泛型函数接口的方式
// interface Config<T> {
//     (value: T): T
// }
// function getData<T>(value: T):T {
//     return value;
// }
// const myConfig: Config<string> = getData;
// console.log(myConfig('124'))
// class User {
//     username: string | undefined;
//     password: string | undefined;
// }

// class MySqlDb <T>{
//     add(info: T):boolean {
//         console.log(info);
//         return true;
//     }
// }

// const user = new User();
// user.username = '张三';
// user.password = '123456';

// const db = new MySqlDb<User>();
// console.log(db.add('as')); //错误，因为指定了类型
// console.log(db.add(user));
// class Article {
//     title: string;
//     content: string;
//     status: number;
//     constructor(title: string, content: string,status: number){
//         this.title = title;
//         this.content = content;
//         this.status = status;
//     }
// }

// const ar = new Article('张三','内容',1);
// const dB = new MySqlDb<Article>();
// console.log(dB.add(ar));

// interface DBI<T> {
//     add(info: T):boolean;
//     update(info: T,id: number):boolean;
//     delete(id:number):boolean;
//     get(id: number): any[];
// }

// //定义可以操作mysql的类
// class Mysql<T> implements DBI<T> {
//     constructor(){
//         console.log('数据库建立');
//     }
//     add(info: T):boolean {
//         console.log(info)
//         return true;
//     }
//     update(info: T, id: number): boolean {
//         throw new Error("Method not implemented.");
//     }
//     delete(id: number): boolean {
//         throw new Error("Method not implemented.");
//     }
//     get(id: number): any[] {
//         throw new Error("Method not implemented.");
//     }
// }

// class Mssql<T> implements DBI<T> {
//     constructor(){
//         console.log('数据库建立');
//     }
//     add(info: T):boolean {
//         console.log(info)
//         return true;
//     }
//     update(info: T, id: number): boolean {
//         throw new Error("Method not implemented.");
//     }
//     delete(id: number): boolean {
//         throw new Error("Method not implemented.");
//     }
//     get(id: number): any[] {
//         throw new Error("Method not implemented.");
//     }
// }
// class User {
//     username: string | undefined;
//     password: string | undefined;
// }
// const user = new User();
// user.password='123';
// user.username = '张三';
// const mysql = new Mysql<User>();
// console.log(mysql.add(user))
// namespace A {
//     interface Animal {
//         name: string;
//         eat():void;
//     }

//     export class Dog implements Animal {
//         name: string;
//         constructor(name: string){
//             this.name = name;
//         }
//         eat(){
//             console.log(this.name + '吃饭')
//         }
//     }

//     export class Cat implements Animal {
//         name: string;
//         constructor(name: string){
//             this.name = name;
//         }
//         eat(){
//             console.log(this.name + '在唱歌')
//         }
//     }
// }

// const dog = new A.Dog('小狗');
// console.log(dog.eat());
// const cat = new A.Cat('小猫');
// console.log(cat.eat())
// function logClass(params: any){
//     console.log(params);
//     params.prototype.appUrl = "动态扩展属性"
// }

// @logClass
// class HttpClient {
//     constructor(){};
//     getData(){}
// }
// const http:any = new HttpClient();
// console.log(http.appUrl)


// function logClass(params: any){
//     return function(target: any){
//         console.log(target,params);
//         //此时额target指的是类，params指的是装饰器中传入的参数
//     }
// }

// @logClass('hello')
// class HttpClient {
//     constructor(){};
//     getData(){}
// }
// const http:any = new HttpClient();
// console.log(http.appUrl)

//类构造函数的重载
// function logClass(params: any){
//     console.log(params);
//     return class extends params {
//         appUrl: any = '我是修改后的数据'
//         getData(){
//             this.apiUrl = this.appUrl+ '---';
//             console.log(this.appUrl);
//         }
//     }
// }

// @logClass
// class HttpClient {
//     public apiUrl: string | undefined;
//     constructor(){
//         this.apiUrl = "我是构造函数里得apiUrl"
//     };
//     getData(){
//         console.log(this.apiUrl);
//     }
// }
// const http:any = new HttpClient();
// http.getData()

// function logClass(params: any){
//     return function(target: any) {

//     }
// }

// function logProperty(params: any){
//     return function(target: any, attr: any){
//         console.log(target, attr);
//         target[attr] = params;
//     }
// }
    
// @logClass('xxx')
// class HttpClient {
//     @logProperty('abs')
//     public apiUrl: string | undefined;
//     constructor(){};
//     getData(){
//         console.log(this.apiUrl);
//     }
// }
// const http:any = new HttpClient();
// http.getData()

// function logParams(params: any){
//     return function(target: any, methodName: any, desc: any){
//         console.log(target);
//         console.log(methodName);
//         console.log(desc);
//         target.apiUrl = params;
//     }
// }
// class HttpClient {
//     public url: any;
//     constructor(){}
//     getData(@logParams("xxxx") uuid: any){
//         console.log(uuid);
//     }
// }
// const http:any = new HttpClient();
// http.getData('123456');
// console.log(http.apiUrl)
function logClass1(params: string){
    return function(target: any){
        console.log("类装饰器1");
    }
}
function logClass2(params: string){
    return function(target: any){
        console.log("类装饰器2");
    }
}

function logMethod(params?: string){
    return function(target: any, attrName: any, desc: any){
        console.log('方法装饰器');
    }
}

function logAttribute(params?: string){
    return function(target: any, attrName: any){
        console.log('属性装饰器');
    }
}

function logParams1(params?: string){
    return function(target: any, attrName: any, desc: any){
        console.log('方法参数装饰器一');
    }
}

function logParams2(params?: string){
    return function(target: any, attrName: any, desc: any){
        console.log('方法参数装饰器二');
    }
}
@logClass1('xxxx1')
@logClass2('xxxx2')
class HttpClient {
    @logAttribute()
    public apiUrl: any;
    constructor(){}
    @logMethod()
    getData(){}

    setData(@logParams1() attr1: any, @logParams2() attr2: any){

    }
}

const http:any = new HttpClient();