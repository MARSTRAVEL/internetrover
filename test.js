const a_list = [1, 2,3];
const b_list = [10, 20,30];

const test = (array1, array2) =>{
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      console.log('j is : ' + array2[j]);
      console.log('i is : ' + array1[i]);
    }
    console.log('***************************************');
  }
};

test(a_list, b_list);
