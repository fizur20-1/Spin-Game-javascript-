const prompt= require("prompt-sync")();


const Rows=3;
const Columns =3;

const SYMBOLS_COUNT={

    A:2,
    B:4,
    C:6,
    D:8
}

const SYMBOLS_VALUES={

    A:5,
    B:4,
    C:6,
    D:8
}


const deposit=()=>{
    while (true){
       
    const depositAmount=prompt("enter a deposit amount: ");

    const numberDepositAmount= parseFloat(depositAmount);

    if(isNaN(numberDepositAmount)|| numberDepositAmount<=0){

        console.log("invalid amount, try again !");
    }
    else {
        return numberDepositAmount;
    }

    }
};

const getNumberOfLines=()=>{

    while (true){
       
        const lines=prompt("enter number of line to bet 1 to 3t: ");
    
        const numberOfLines= parseFloat(lines);
    
        if(isNaN(numberOfLines)|| numberOfLines<=0 || numberOfLines >3){
    
            console.log("invalid number, try again !");
        }
        else {
            return numberOfLines;
        }
    
        }
};


const getBet=(balance, lines)=>{

    while (true){
       
        const bet=prompt("enter bet amount per line: ");
    
        const numberBet= parseFloat(bet);
    
        if(isNaN(numberBet)|| numberBet<=0 || numberBet> (balance/ lines) ){
    
            console.log("invalid bet, try again !");
        }
        else {
            return numberBet;
        }
    
        }

};

const spin=() =>{

    const symbols =[];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){

        for(let i=0;i<count;i++)
        {
            symbols.push(symbol);
        }
    }

    const reels =[];
    for(let i =0 ; i<Columns; i++)
    {
        reels.push([]);
        const reelSymbols=[...symbols];
        for(let j=0;j<Rows;j++)
        {
            const randomIndex=Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol= reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
            
        }
    }
    return reels;
};

const transpose=(reels)=>{

    const rows=[];

    for(let i=0;i<Rows;i++)
    {
        rows.push([]);
        for(let j=0; j<Columns; j++)
        {
            rows[i].push(reels[j][i]);
        }
    }
return rows;
};

const printRows=(rows)=>{

    for (const row of rows ){
        let rowString="";
        for(const [i,symbol] of row.entries()){
            rowString+=symbol
            if(i!=row.length-1){
                rowString+=" | "
            }
        }

        console.log(rowString);
    }
};

const getWinnings=(rows,bet, lines)=>{

    let winnings=0;
    for(let row=0;row<lines;row++)
    {
        const symbols=rows[row];
        let allSame=true;

        for(const symbol of symbols){
            if(symbol != symbols[0])
            {
                allSame=false;
                break;
            }
        }
        if(allSame)
        {
            winnings+=bet*SYMBOLS_VALUES[symbols[0]]
        }
    }
    return winnings;

};

const game =()=>{

let balance =deposit();

    while(true){
       console.log("your balance is : $"+balance );
    const numberOfLines=getNumberOfLines();
    const bet= getBet(balance,numberOfLines);

    balance-=bet*numberOfLines;

    const reels=spin();
    const rows=transpose(reels);
    printRows(rows);
    const winnings=getWinnings(rows,bet,numberOfLines);
    balance+=winnings;
    console.log("you won , $ "+winnings.toString());   
    
    if(balance<=0)
    {
        console.log(" oh no ! u became broke ! ");
        break;
    }
    const playAgain = prompt("you wwanna play again ?? (y/n) ");
    if(playAgain!="y") break;
  
    }
};

game();



