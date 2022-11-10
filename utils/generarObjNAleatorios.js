function numeroAleatorio(min, max){
    return Math.floor(Math.random() * (max - min) + min)
}

function generarJson(n, min, max){
    const miArray = []
    const count = {}
    for(let i=0; i<n; i++){
        const num = numeroAleatorio(min, max)
        miArray.push(num)
        count[num] = 0
    } 
    for(let i=0; i<miArray.length; i++){
        count[miArray[i]]+=1
    }
    return {count}
}

module.exports = generarJson