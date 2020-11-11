# ts
## ts安装方式
1. npm install typescript -g
2. yarn global add typescript
3. cnpm install -g typescript -g
## ts查询版本方式
tsc --version即可查询当前的ts版本
## ts自动监控
1. 创建tsconfig.json文件，tsc --init 生成配置文件
2. 将outDir后面的属性值改为 "./js"
3. 点击运行任务，之后再点击自动监控，最后保存即可实现自动保存编译
## ts中的基本数据类型
1. 布尔型
命名方式： let str: string = '123'
2. 数字类型
3. 字符串类型
4. 数组类型
5. 元组类型
6. 枚举类型
7. 任意类型
8. null和undefined
9. void
10. nerve类型

## 函数定义
* ts中定义函数的方法
1. 函数声明的方法
* 需要指定函数的返回类型
* 对于传入的参数的内部需要指定参数的类型

2. ts中常见的几种函数的命名方式
* 一般函数的定义方式
```
 function run():string {
     return 'hello';
}
 console.log(run())

 function con():number {
     return 123;
 }
 console.log(con())
```
* 匿名函数的定义方式
```
const abc = function():number {
     return 123;
 }
 console.log(abc());
```
* 指定参数的定义方式
```
function run(name:string, age:number):string {
     return `${name} ---- ${age}`;
 }
 console.log(run('your age is', 10));
```
* 没有返回类型的定义方式
```
function fn():void {
    console.log('123')
}
```
* 可选参数的定义方式
```
 function run(name:string, age?:number):string {
     if(age){
         return `${name}--${age}`;
     }else{
         return `${name}`;
     }
 }
 console.log(run('your age is',10));
注意: 可选参数一定要写在必选参数的最后
```
* 默认参数的定义方式
```
 function defaultRun(str:string, num:number = 10):string{
     return `${str}--${num}`;
 }
 console.log(defaultRun('dhjhdj',20))
```
* 剩余参数的定义方式
```
 function conut(a:number, b:number, c:number, d:number):number{
    return a+b+c+d;
 }
可以通过数组来接受参数
 function su(a:number, ...result: number[]):number {
    let num = a;
     for(let i = 0; i < result.length; i++){
         num += result[i];
     }
     return num;
 }
 console.log(su(1,2,3,4,5,6,7,8,9,10));
```
* ts中方法的重载方式
```
 function getInfo(name:string):string;

 function getInfo(age:number):number;

function getInfo(str:any):any {
     return str;
 }
 console.log(getInfo(true)); error
```

## ts中定义类的方式
* 需要通过一个关键字class来实现类的定义，还需要在起constructor中去接该参数
```
    class Person {
    name: string; //在没有写修饰参数时，其默认值为public
    constructor(name: string) {
        this.name = name;
    }
    work(name: string):string{
        this.name = name;
        return `${this.name}`
    }
}
var person = new Person('张三');
console.log(person.name);
```
* ts中的get以及set方法
```
class Person {
    name: string;
    constructor(name: string){
        this.name = name;
    }
    getName():string {
        return `${this.name}`;
    }
    setName(name: string):void {
        this.name = name;
    }
}

var person = new Person('历史');
person.setName('张三')
console.log(person.getName());
```
* ts中类的继承的实现方式
1. 首先建立起父类
2. 在子类中使用extends和super两个关键字来实现子类的继承
```
class Person {
    name: string; //在没有写修饰参数时，其默认值为public
    constructor(name: string) {
        this.name = name;
    }
    work(name: string):string{
        this.name = name;
        return `${this.name}`
    }
}

class work extends Person {
    constructor(name: string){
        super(name);
    }
    work(name: string): string{
        return `${this.name}is working`;
    }
}
const person = new Person('王五');
console.log(person.work('张三'));
```
* 在创建属性的过程中三种值分别对应的含义
1. public：在自身，子类以及外部能够直接访问的属性，没有给属性定义修饰语时，其默认为public
2. protected： 在自身，子类中能够直接访问到属性，但是类的外部无法直接访问
3. private： 自身能够访问，在其子类以及外部无法直接访问的属性的修饰符

* ts中的静态属性以及静态方法
* 静态方法与实例方法的区分，不需要去创建对象实例而去直接调用的方法被称为静态方法
```
class Person {
    name: string;
    static age: number;
    constructor(name: string) {
        this.name = name;
    }
    eat(): string { //被叫做实例方法
        return this.name;
    }
    static run():string{ //在静态方法中不能直接调用实例的属性
        Person.age = 14;
        return `he is ${Person.age} years old`;
    }
}
const person = new Person('张三');
console.log(person.eat());
console.log(Person.run());
console.log(Person.age);
```
* 多态： 父类去定义一个方法不去实现，等他的子类去实现，子类分别有其不同的表现形式
```
class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    //父类定义的方法不去实现
    eat(){

    }
}

class Cat extends Person {
    //子类继承父类的方式
    constructor(name: string){
        super(name);
    }

    eat():string{
        return `${this.name} 吃老鼠`;
    }
}

class Dog extends Person {
    constructor(name:string){
        super(name);
    }

    eat():string{
        return `${this.name}吃骨头`;
    }
}

const dog = new Dog('小黑');
const cat = new Cat('猫');
console.log(dog.eat(), cat.eat());
```
* 抽象类与抽象方法的定义
1. 作用： 用作一种标准，所有继承了抽象类的子类，都必须去实现抽象类中所定义的抽象方法
2. 定义关键字：抽象方法和抽象类在定义的过程中都需要abstract关键字
3. 抽象方法必须定义在抽象类中，并且抽象方法不能够去实现，在抽象类中可以去定义普通的方法
```
abstract class Animal {
    abstract eat():any;
}

class Dog extends Animal {
    name: string;
    constructor(name:string){
        super();
        this.name = name;
    }
    eat():string {
        return `小狗的名字是${this.name}`;
    }
}
class Cat extends Animal {
    name: string;
    constructor(name: string) {
        super(); 
        this.name = name;
    }
    eat():string {
        return `${this.name}吃`;
    }
}
const dog = new Dog('小花');
const cat = new Cat('小红');
console.log(dog.eat(),cat.eat());
```

# 接口
* 定义： 一种标准去定义函数的参数，函数的返回类型等
* 接口的定义方式： 采用interface关键字，各个定义的属性之间使用分号的形式去定义
* 函数式接口
```
function printLabel(name: {firstName: string}):string{
    return name.firstName;
}
console.log(printLabel({firstName: '123'}));
```
* 接口的可选参数和必选参数
1. 必选参数的接口定义
```
interface nullName {
    firstName: string;
    secondName: string;
}
function printLabel(name: nullName):nullName{
    return name;
}
console.log(printLabel({
    firstName:'zhang',
    secondName: 'san'
}))
```
* 需要注意的是，在传入时，如果直接传入该对象，那么则只能传入接口中所定义的参数，返回时也只能返回接口中所定义的参数；如果在传入时，先用一个对象去接受该参数，在传入时不会报错，
但是不能够被使用
2. 可选参数的接口定义
```
interface nullName {
    firstName: string;
    secondName: string;
    age?: number
}
function printLabel(name: nullName):string{
    if(name.age){
        return `${name.firstName}${name.secondName}的年龄是${name.age}`;
    }else{
        return `${name.firstName}${name.secondName}的年龄不知`;
    }
    
}
console.log(printLabel({
    firstName:'zhang',
    secondName: 'san',
    age: 14
}))
console.log(printLabel({
    firstName:'li',
    secondName: 'si'
}))
```
3. 函数类型接口使用
* 首先使用interface去定义接口，然后再接口内部定义所要使用的函数，需要传入的参数和其返回值是什么
```
interface encript {
    (key: string,value: string):string;
}
const md5:encript = function(key: string,  value: string):string {
    return key + value;
}
console.log(md5('zhangsan1','dsdk'));
```
4. 可索引接口：对于数组和对象的约束
* 对于数组的约束
```
interface UseArr {
    [index: number]: string;
}

const arr:UseArr = ['123','456'];
console.log(arr)
```
```
//对于对象的约束
interface UseObj {
    [index: string]: string;
}
const obj:UseObj = {name: 'zhang',age: '21'};
console.log(obj);
```
5. 类类型接口
* 使用方式：1. 首先再接口中定义方法和属性  2. 接着在用implements去实现这个接口 3. 接口中所有的方法必须在类中去实现
```
interface Xin{
    name: string;
    eat(food:string): void;
}

class Dog implements Xin {
    name: string;
    constructor(name: string){
        this.name = name;
    }
    eat(){
        console.log(this.name+ '吃饭')
    }
}
const cat = new Dog('小黑');
console.log(cat.eat());
```
6. 扩展接口
* 接口之间可以使用interface关键字来实现他们之间的继承关系
* 注意当在实现接口时，必须把接口中所有的内容都给继承，包括父接口中的参数
```
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
```
## 泛型
* 作用： 一个组件可以支持多种类型的数据，这样用户就可以使用自己的数据类型来创建组件
* any类型与泛型之间的区别，any类型不能对数据类型做约束，泛型则可以对数据类型做约束
### 泛型函数
* 注意：泛型类中使用什么样的大写字母都可以，只是习惯上使用T，表示Type的意思
```
//any类型
function returnAny(value: any): any{
    return value;
}
console.log(returnAny('ddkf'));//此时不会对类型有任何的约束

//泛型
function returnLike<T>(value: T): T {
    return value;
}
console.log(returnLike<string>('123'));
console.log(returnLike<number>(123));
```
### 泛型类
* 泛型类的定义方式，首先需要在类型去定义泛型类中，然后获得其返回值即可
```
class Min<T> {
    public arr: T[] = [];
    add(value: T):void {
        this.arr.push(value);
    }
    min():T {
        let minValue = this.arr[0];
        for(let i = 0; i < this.arr.length; i++){
            if(minValue > this.arr[i]){
                minValue = this.arr[i];
            }
        }
        return minValue;
    }
}
const min = new Min<number>(); //泛型类的实例化
min.add(3);
min.add(20);
min.add(100);
console.log(min.min());
const mins = new Min<string>();
mins.add('v');
mins.add('a');
mins.add('z');
console.log(mins.min())
```
```
class User {
    username: string | undefined;
    password: string | undefined;
}

class MySqlDb <T>{
    add(info: T):boolean {
        console.log(info);
        return true;
    }
}

const user = new User();
user.username = '张三';
user.password = '123456';

const db = new MySqlDb<User>();
console.log(db.add('as')); //错误，因为指定了类型
console.log(db.add(user));
class Article {
    title: string;
    content: string;
    status: number;
    constructor(title: string, content: string,status: number){
        this.title = title;
        this.content = content;
        this.status = status;
    }
}

const ar = new Article('张三','内容',1);
const dB = new MySqlDb<Article>();
console.log(dB.add(ar));
```
### 泛型函数接口
* 泛型接口有两种定义方式：
1. 第一种定义方式
```
interface ConfigFn {
    <T>(value: T): T;
}

var config:ConfigFn = function<T>(value: T):T {
    return value;
}
console.log(config<string>('zhang'));
```
2. 第二种定义方式
```
interface Config<T> {
    (value: T): T
}
function getData<T>(value: T):T {
    return value;
}
const myConfig: Config<string> = getData;
console.log(myConfig('124'))
```
### 泛型 接口 以及类的操作实例
* 功能： 定义一个操作数据库的库，支持Mysql Mssql MongDb
* 要求： 所有的数据库功能一样，都有add update delete get方法
* 注意： 约束统一的规范、以及代码重构
* 解决方案：需要约束规范，所以要定义接口，需要代码重构所以需要泛型
    1. 接口：在面向对象的编程中，接口是一种规范的定义，它的行为和动作的规范
    2. 泛型：解决类 接口 方法的复用性
```
interface DBI<T> {
    add(info: T):boolean;
    update(info: T,id: number):boolean;
    delete(id:number):boolean;
    get(id: number): any[];
}

//定义可以操作mysql的类
class Mysql<T> implements DBI<T> {
    constructor(){
        console.log('数据库建立');
    }
    add(info: T):boolean {
        console.log(info)
        return true;
    }
    update(info: T, id: number): boolean {
        throw new Error("Method not implemented.");
    }
    delete(id: number): boolean {
        throw new Error("Method not implemented.");
    }
    get(id: number): any[] {
        throw new Error("Method not implemented.");
    }
}

class Mssql<T> implements DBI<T> {
    constructor(){
        console.log('数据库建立');
    }
    add(info: T):boolean {
        console.log(info)
        return true;
    }
    update(info: T, id: number): boolean {
        throw new Error("Method not implemented.");
    }
    delete(id: number): boolean {
        throw new Error("Method not implemented.");
    }
    get(id: number): any[] {
        throw new Error("Method not implemented.");
    }
}
class User {
    username: string | undefined;
    password: string | undefined;
}
const user = new User();
user.password='123';
user.username = '张三';
const mysql = new Mysql<User>();
console.log(mysql.add(user))
```
### 模块化
1. 模块：文件之间的引用方式就叫做模块，侧重于代码的复用
2. 命名空间：内部模块，主要用于组织代码，避免命名冲突
* 命名空间的实例
```
namespace A {
    interface Animal {
        name: string;
        eat():void;
    }

    export class Dog implements Animal {
        name: string;
        constructor(name: string){
            this.name = name;
        }
        eat(){
            console.log(this.name + '吃饭')
        }
    }

    export class Cat implements Animal {
        name: string;
        constructor(name: string){
            this.name = name;
        }
        eat(){
            console.log(this.name + '在唱歌')
        }
    }
}

const dog = new A.Dog('小狗');
console.log(dog.eat());
const cat = new A.Cat('小猫');
console.log(cat.eat())
```
### 装饰器
* 注意：在当前的版本中需要在ts.config中设置experimentalDecorators为true
* 含义： 装饰器是一种特殊类型的声明，能够被附加到类声明，方法，函数或参数上，可以修改类的行为
* 通俗理解： 装饰器是一个方法，可以注入到类、方法、属性参数上来扩展类、属性、参数的功能
* 常见的装饰器：类装饰器、属性装饰器、方法装饰器、参数装饰器
* 装饰器的写法：普通装饰器(无法传参)、装饰器工厂(可以传递参数)
1. 类装饰器：装饰器在类声明之前被声明（仅靠着类声明），装饰器应用于类构造函数，可以用来间是，修改或者替换类

```
//1. 普通装饰器
function logClass(params: any){
    console.log(params);
    //params表示的就是当前类
    params.prototype.appUrl = "动态扩展属性"
}

@logClass
class HttpClient {
    constructor(){};
    getData(){}
}
const http:any = new HttpClient();
console.log(http.appUrl)
```
```
//装饰器工厂：可以传递参数
function logClass(params: any){
    return function(target: any){
        console.log(target,params);
        //此时额target指的是类，params指的是装饰器中传入的参数
    }
}

@logClass('hello')
class HttpClient {
    constructor(){};
    getData(){}
}
const http:any = new HttpClient();
console.log(http.appUrl)
```
* 类装饰器重构构造函数的例子
* 描述： 类装饰器表达式会在运行时当作函数被调用，类的构造函数作为唯一的参数，如果类装饰器返回一个值，他会使用提供的构造函数来替换类的声明
```
function logClass(params: any){
    console.log(params);
    return class extends params {
        appUrl: any = '我是修改后的数据'
        getData(){
            this.apiUrl = this.appUrl+ '---';
            console.log(this.appUrl);
        }
    }
}

@logClass
class HttpClient {
    public apiUrl: string | undefined;
    constructor(){
        this.apiUrl = "我是构造函数里得apiUrl"
    };
    getData(){
        console.log(this.apiUrl);
    }
}
const http:any = new HttpClient();
http.getData()
```
* 属性装饰器：属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数
    * 对于静态成员来说是类的构造函数，对于实例陈成员是类的原型对象
    * 成员的名字
```
function logClass(params: any){
    return function(target: any) {

    }
}

function logProperty(params: any){
    return function(target: any, attr: any){
        console.log(target, attr);
        target[attr] = params;
    }
}
    
@logClass('xxx')
class HttpClient {
    @logProperty('abs')
    public apiUrl: string | undefined;
    constructor(){};
    getData(){
        console.log(this.apiUrl);
    }
}
const http:any = new HttpClient();
http.getData()
```
* 方法装饰器：会被应用到方法的属性描述符上，可以用来监视，修改或者是替换方法的定义，方法装饰会在运行时传入下列的3个参数
    * 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    * 成员的名字
    * 成员的属性描述符
```
//方法装饰器一
function get(params: any){
    return function(target: any, methodName: any, desc: any){
        console.log(target);
        console.log(methodName);
        console.log(desc);
        target.appUrl = "xxxx";
        target.run = function(){
            console.log('run')
        }
    }
}
class HttpClient {
    public url: any;
    constructor(){}
    @get('http://www.baidu.com')
    getData(){
        console.log(this.url);
    }
}
const http:any = new HttpClient();
console.log(http.appUrl);
http.run();
```
```
//方法装饰器二，覆盖掉原本对象上的方法
function get(params: any){
    return function(target: any, methodName: any, desc: any){
        console.log(target);
        console.log(methodName);
        console.log(desc);
        //修改方法装饰器中的方法，把装饰器方法传入的所有参数修改为string

        //1. 保存当前的方法
        const oMethod = desc.value;
        desc.value = function(...args: any[]){
            args = args.map(item => String(item));
            console.log(args);
        }
    }
}
class HttpClient {
    public url: any;
    constructor(){}
    @get('http://www.baidu.com')
    getData(){
        console.log("这是构造函数中的getData");
    }
}
const http:any = new HttpClient();
http.getData('string',123);
```
```
//方法装饰器三，在原本的方法上变更该方法
function get(params: any){
    return function(target: any, methodName: any, desc: any){
        console.log(target);
        console.log(methodName);
        console.log(desc);
        //修改方法装饰器中的方法，把装饰器方法传入的所有参数修改为string

        //1. 保存当前的方法
        const oMethod = desc.value;
        desc.value = function(...args: any[]){
            args = args.map(item => String(item));
            console.log(args);
            oMethod.apply(this,args);
        }
    }
}
class HttpClient {
    public url: any;
    constructor(){}
    @get('http://www.baidu.com')
    getData(){
        console.log("这是构造函数中的getData");
    }
}
const http:any = new HttpClient();
http.getData('string',123);
```
* 方法参数装饰器：会在运行时当作函数被调用，可以使用方法参数装饰器为类的原型，增加一些元素数据，传入下列3个参数
    * 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
    * 方法的名字
    * 参数在函数列表中的索引
```
function logParams(params: any){
    return function(target: any, methodName: any, desc: any){
        console.log(target);
        console.log(methodName);
        console.log(desc);
        target.apiUrl = params;
    }
}
class HttpClient {
    public url: any;
    constructor(){}
    getData(@logParams("xxxx") uuid: any){
        console.log(uuid);
    }
}
const http:any = new HttpClient();
http.getData('123456');
console.log(http.apiUrl)
```
* 装饰器之间的顺序： 属性 》 方法 》 方法参数 》 类 ,如果同时存在就是从后往前
```
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

//结果
属性装饰器
方法装饰器
方法参数装饰器二
方法参数装饰器一
类装饰器2
类装饰器1
```

