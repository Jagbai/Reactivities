let data: any;

data = '42';

export interface ICar{
    color: string;
    model: string;
    topspeed?: number;
}

const car1: ICar = {
    color: "blue",
    model: "BMW"
}

const car2: ICar = {
    color: 'red',
    model: 'Mercedes',
    topspeed: 100
}

const multiply = (x: any, y:any): string=>{
    return (x*y). toString();
}

export const cars = [car1, car2]