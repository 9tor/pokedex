export default (hp) =>{
    let numberHp = Number(hp)

    if (numberHp > 100) {
        return 100
    } else if(numberHp < 100) {
        return numberHp
    }else {
        return 0
    }
}
