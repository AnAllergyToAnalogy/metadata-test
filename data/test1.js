import fs from "fs";
const data = [];
const data2 = [];

const key = "FwNLuU3KfM3C4JESxa3UZWxBrU5y5ExneEs3kd39wk1n";

// const radix = 36;
for(let i = 0n; i < 10_000n; i++){
    data.push(key);
    // const encoded = Number(i).toString(radix);
    // data.push(encoded);
    // const decoded = parseInt(encoded,radix);
    // data2.push(decoded);
}

const toWrite = data.join(",");
// const toWrite2 = data2.join(",");

fs.writeFileSync("keys.json",toWrite,{
    encoding: 'utf-8'
})
// fs.writeFileSync("test-big.json",toWrite2,{
//     encoding: 'utf-8'
// })

