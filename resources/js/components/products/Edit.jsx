import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [avatar, setAvatar] = useState(true);

    useEffect(()=>{
        getProduct();
    }, []);

    const getProduct = async () => {
        await axios.get(`/api/getEditProduct/${id}`)
        .then(({data})=>{
            const { id, name, description, photo, type, quantity, price } = data.product[0];
            setName(name);
            setDescription(description);
            setPhoto(photo);
            setType(type);
            setQuantity(quantity);
            setPrice(price);
        })
    }
    
    const ourImage = (img) => {
        return `/upload/${img}`;
    }
    
    const changeHandler = (e) =>{
        let file = e.target.files[0];
        let limit = 1024 * 1024 * 2;
        if(file['size'] > limit){
            Swal.fire({
                type:'error',
                title: 'Oops...',
                text: 'Something went wrong',
                footer: 'Why do I have this issue?'
            })
        }else{
            let reader = new FileReader();
            reader.onload = e => {
                setAvatar(false);
                setPhoto(e.target.result);
            }
            reader.readAsDataURL(file);
        }
    }

    const updateProduct = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('name', name);
        formData.append('description', description);
        formData.append('photo', photo);
        formData.append('type', type);
        formData.append('quantity', quantity);
        formData.append('price', price);

        await axios.post(`/api/updateProduct/${id}`, formData)
        .then( ({data}) => {
            toast.fire({
                icon: "success",
                title: "Produto atualizado com sucesso"
            })
            navigate("/");
        } )
        .catch( ({response})=>{

        } )
    }

    return(
        <div className="container">

            <div className="product_edit">

                <div className="titlebar">
                    <div className="titlebar_item">
                        <h1>Editar produto</h1>
                    </div>
                    <div className="titlebar_item">
                        <button className="btn" onClick={(event)=>updateProduct(event)}>
                            Salvar
                        </button>
                    </div>
                </div>

                <div className="card_wrapper">
                    <div className="wrapper_left">
                        
                        <div className="card">
                            <p>Nome</p>
                            <input type="text" value={name} onChange={(event)=>{setName(event.target.value)}} />

                            <p>Descrição do produto (Opcional)</p>
                            <textarea cols="10" rows="5" value={description} onChange={(event)=>{setDescription(event.target.value)}} ></textarea>

                            <div className="media">
                                <ul className="images_list">
                                    <li className="image_item">
                                        <div className="image_item-img">
                                            {avatar === true
                                                ? <img src={ourImage(photo)} width="117px" height="100px" />
                                                : <img src={photo} width="117px" height="100px" />
                                            }
                                        </div>
                                    </li>

                                    <li className="image_item">
                                        <form className="image_item-form">
                                            <label className="image_item-form--label">Adicionar imagem</label>
                                            <input type="file" className="image_item-form--input" onChange={changeHandler} />
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        
                        </div>

                    </div>

                    <div className="wrapper_right">
                        <div className="card">
                            <p>Tipo do produto</p>
                            <input type="text" value={type} onChange={(event)=>{setType(event.target.value)}} />

                            <hr className="hr" />

                            <p>Inventário</p>
                            <input type="text" value={quantity} onChange={(event)=>{setQuantity(event.target.value)}} />

                            <hr className="hr"  />

                            <p>Preço</p>
                            <input type="text" value={price} onChange={(event)=>{setPrice(event.target.value)}} />

                            <div className="br"></div>
                        </div>
                    </div>
                </div>

                <div className="titlebar">
                    <div className="titlebar_item">
                    </div>
                    <div className="titlebar_item">
                        <button className="btn" onClick={(event)=>updateProduct(event)}>
                            Salvar
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Edit