import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    allContacts: any[],
    searchKey: string,
    propertyname: string
  ): any[] {
    const result: any = [];
    if (!allContacts || searchKey == '' || propertyname == '') {
      return allContacts;
    }
    allContacts.forEach((items: any) => {
      if (
        items[propertyname]
          .trim()
          .toLowerCase()
          .includes(searchKey.trim().toLowerCase())
      ) {
        result.push(items);
      }
    });
    if(!result.length)console.log('no');
    
    return result;
  }
}
