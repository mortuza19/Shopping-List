import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name : 'shortenUnits'
})

export class CustomPipe implements PipeTransform{
    transform(value:any){
       let unit : string;
        switch(value){
            case 'packet':
                unit = 'pckt';
                break;
            case 'pieces':
                unit = 'pcs';
                break;
            case 'kilogram':
                unit = 'kg';
                break;
            case 'gram':
                unit = 'gm';
                break;
            case 'litre':
                unit = 'lit';
                break;
            case 'mililitre':
                unit = 'ml';
                break;
            default:
                unit = value; 
        }
        return unit;
    }
}