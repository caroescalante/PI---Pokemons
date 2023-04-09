//el form refleja el estado actual
import React, { useEffect } from "react";

import { getClean, postPokemon } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import style from './Form.module.css'
import { getAllTypes } from '../../redux/actions';
import { useHistory } from 'react-router-dom';

const { useState } = require("react")


const Form = ()=>{
    const dispatch= useDispatch()
    const types = useSelector((state) => state.type);
    const pokemons = useSelector(state => state.allPokemons.map( pok => pok.name))
    const history = useHistory();
    useEffect(() => {
        dispatch(getAllTypes());
    }, [dispatch]);

    const [form, setForm] = useState({
        name: "",
        image: "",
        life:"",
        attack: "",
        defense: "",
        speed:"",
        height: "",
        weight:"",
        types:[],
    })

     const [errors, setErrors] = useState({
        name: "",
        image: "",
        life:"",
        attack: "",
        defense: "",
        speed:"",
        height: "",
        weight:"",
        types:[],
    })
  
    let noEmpty = /\S+/;
    let validateName = /^[a-z]+$/i;
    let validateNum = /^\d+$/;
    let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;
    
    const validate = (form) => {
            let errors = {};
            if (!noEmpty.test(form.name) || !validateName.test(form.name) || form.name.length < 3) {
            errors.name = "Name required. Only string of more than two characters and without numbers";
            }
            if (!validateNum.test(form.life) || parseInt(form.life) < 1 ) {
                errors.life = "Number required. Higher than one";
            }
            if (!validateNum.test(form.attack) || parseInt(form.attack) < 1) {
                errors.attack = "Number required. Higher than one";
            }
            if (!validateNum.test(form.defense) || parseInt(form.defense) < 1) {
                errors.defense = "Number required. Higher than one";
            }
            if (!validateNum.test(form.speed) || parseInt(form.speed) < 1) {
                errors.speed = "Number required. Higher than one";
            }
            if (!validateNum.test(form.height) || parseInt(form.height) < 1) {
                errors.height = "Number required. Higher than one";
            }
            if (!validateNum.test(form.weight) || parseInt(form.weight) < 1) {
                errors.weight = "Number required. Higher than one";
            }
            if (!validateUrl.test(form.image)) {
            errors.img = "URL required";
            }

            return errors;
        };
    
    function handleChecked(e){
        if (e.target.checked) {
            setForm({
            ...form,
            type: [...form.types , e.target.value]
            })

            setErrors(validate({
                ...form,
                type: [...form.types , e.target.value]
            }, pokemons))
            
        } else if (!e.target.checked) {
            setForm({
                ...form,
                type: form.types.filter(el => el !== e.target.value)
                })

            setErrors(validate({
                ...form,
                type: form.types.filter(el => el !== e.target.value)
            }, pokemons))    
        }
    };

    const submitHandler= (e)=>{
        e.preventDefault();

        if (
            !errors.name &&
            !errors.life &&
            !errors.attack &&
            !errors.defense &&
            !errors.speed &&
            !errors.height &&
            !errors.weight &&
            !errors.image 
        ) {

            dispatch(postPokemon(form));
            setForm({
                name: '', 
                life: '', 
                attack: '', 
                defense: '', 
                speed: '',
                height: '', 
                weight: '', 
                types: [],
                image: ''
            });
            dispatch(getClean(dispatch));
            history.push('/home')
        } else {
            alert('Error. Check the form');
        }
    }



    const changeHandler = (event)=>{
        //el evento es el cambio en el estado, es decir, escribir en la caja de texto
        //event.target es quien disparó el evento y el name es el nombre de cada input
        const property = event.target.name //para saber quien hizo un cambio en el estado
        const value = event.target.value //en value se va a guardar el valor de la caja de texto (lo q quiero ingresar)

        validate({...form, [property]:value}) 
        setForm({...form, [property]:value})
    }

    


    return(
        <form onSubmit={submitHandler}>
            <div className={style.container}>
                 <div>
                <label>Name: </label>
                <input type="text" value={form.name} onChange={changeHandler} name="name" required></input>
                {errors.name && <span>{errors.name}</span>}
            </div>
            <div>
                <label>Image: </label>
                <input type="link" value={form.image} onChange={changeHandler} name="image" required></input>
                {errors.image && <span>{errors.image}</span>}
           </div>
            <div>
                 <label>Life: </label>
                 <input type="string" value={form.life} onChange={changeHandler} name="life" required></input>
                 {errors.life && <span>{errors.life}</span>}

            </div>
           <div>
                <label>Attack: </label>
                <input type="string" value={form.attack} onChange={changeHandler} name="attack" required></input>
                {errors.attack && <span>{errors.attack}</span>}

           </div>
            <div>
                <label>Defense: </label>
                <input type="string" value={form.defense} onChange={changeHandler} name="defense" required></input>
                {errors.defense && <span>{errors.defense}</span>}
            </div>
           <div>
                <label>Speed: </label>
                <input type="string" value={form.speed} onChange={changeHandler} name="speed"></input>
                {errors.speed && <span>{errors.speed}</span>}
           </div>
           <div>
                <label>Height: </label>
                <input type="string" value={form.height} onChange={changeHandler} name="height"></input>
                {errors.height && <span>{errors.height}</span>}
           </div>
           <div>
                <label>Weight: </label>
                <input type="string" value={form.weight} onChange={changeHandler} name="weight"></input>
                {errors.weight && <span>{errors.weight}</span>}
           </div>
           <div>
                <label>Types: </label>
                <input type="string" value={form.types} onChange={changeHandler} name="types" required></input>
                {errors.types && <span>{errors.types}</span>}
            </div>
          
           <br />
         <button className={style.boton} type="submit">SEND </button>
            </div>
           

        </form>
    )
}


export default Form;
