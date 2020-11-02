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