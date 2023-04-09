import style from './Card.module.css'

const Card = ({name, types, image})=>{
    return(
        <div className={style.card}>

            <img className={style.img} src={image} alt={`imagen de: ${name}`} height= '400px' width='350px'/>
            
            <div className={style.cardInfo}>
                <h2> {name} </h2>
                <h3> Types: {types}</h3>
            </div>
            
        </div>
       
    )
}
export default Card;