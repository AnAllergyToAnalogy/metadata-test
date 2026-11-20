const fs = require("fs");
const nodeHtmlToImage = require('node-html-to-image')

const MAX = 60000;

function json(cityId, alive){

    const dir = alive?"token":"dead";
    const output = `./${dir}/${cityId}.json`;
    const image = `https://anallergytoanalogy.github.io/metadata-test/images/${dir}/${cityId}.png`;
    const external = `https://anallergytoanalogy.github.io/metadata-test/external/${cityId}.html`;


    const data = {
        name: "Dude #"+cityId,
        "description": `Description of dude #${cityId}. It is ${alive?"alive":"dead"}.`,
        "image": image,

        "category": "image",
        // "animation_url": "https://sdfsdgdsg.html",

        "external_url": external,

        "attributes": [
            {
                "trait_type": "Alive",
                "value":alive,
            }
        ]
    }

    const str = JSON.stringify(data);

    fs.writeFileSync(output,str,{
        encoding: "utf-8"
    })


}

function external(cityId){
    const output = `./external/${cityId}.html`;
    const data = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>External data #${cityId}</title>
        </head>
        <body>
            <div>This is the token data page for token #${cityId}</div>
        </body>
    </html>`;

    fs.writeFileSync(output,data,{
        encoding: "utf-8"
    })

}

async function image(cityId,alive){

    const dir = alive?"token":"dead";

    const output = `./images/${dir}/${cityId}.png`;
    const html = `
    <html>
        <head>
        <style>
            body {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-size: 40px;
                height:100vh;            
            }
            </style>
        </head>
        <body> 
        <div> 
            cityId: ${cityId}<br/> alive: ${alive}
        </div>
        </body>
    </html>`;

    await nodeHtmlToImage({
        output,
        html
    });


}

async function main(){
    for(let i = 1; i <= MAX; i++){

        if( (i - 1) % 100 === 0 ){
            console.log(i,"...")
        }

        await image(i,true);
        await image(i,false);

        json(i,true);
        json(i,false)
        
        external(i);
    }
}
main()
