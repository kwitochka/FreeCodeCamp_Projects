const convertToRoman = (num) => {
  let romanNum = [
    // 1, 5
    ["I", "V"], // 1 and 5
    ["X", "L"], // 10 and 50
    ["C", "D"], // 100 and 500
    ["M"]       // 1000
  ];

  //REVERSE ARRAY OF NUM
  let reversedArr = num.toString()
                        .split('')
                        .reverse()
                        .map(x => parseInt(x));


  let result = reversedArr.map((x, i) => {
    let result1 = '';
    result1 += romanNum[i][0].repeat(x);
    
    if(romanNum[i][1]){
      result1 = result1

                      // IIIII => V
                      .replace(romanNum[i][0].repeat(5), romanNum[i][1])
                      // VIIII => IX
                      .replace(romanNum[i][1]+romanNum[i][0].repeat(4), romanNum[i][0]+romanNum[i+1][0])
                      // IIII => IV
                      .replace(romanNum[i][0].repeat(4), romanNum[i][0]+romanNum[i][1]);
    }

    return result1;
  });

  return result.reverse().join('');
}

console.log(convertToRoman(36));