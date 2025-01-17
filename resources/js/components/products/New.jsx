import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const New = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");

    const changeHandler = (e) =>{
        let file = e.target.files[0];
        let reader = new FileReader();
        let limit = 1024 * 1024 * 2;
        if(file['size'] > limit){
            Swal.fire({
                type:'error',
                title: 'Oops...',
                text: 'Something went wrong',
                footer: 'Why do I have this issue?'
            })
        }
        reader.onloadend = (file) => {
            setPhoto(reader.result)
        }
        reader.readAsDataURL(file);
    }

    const createProduct = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', name);
        formData.append('description', description);
        formData.append('photo', photo);
        formData.append('type', type);
        formData.append('quantity', quantity);
        formData.append('price', price);

        await axios.post("/api/addProduct", formData)
        .then( ({data}) => {
            toast.fire({
                icon: "success",
                title: "Produto adicionado com sucesso"
            })
            navigate("/");
            
        } )
        .catch( ({response})=>{

        } )
    }
    
    return(
        <div className="container">
            <div className="products_create">

                <div className="titlebar">
                    <div className="titlebar_item">
                        <h1>Adicionar produto</h1>
                    </div>
                    <div className="titlebar_item">
                        <button className="btn" onClick={(event)=>createProduct(event)} >
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
                            <textarea cols="10" rows="5" value={description} onChange={(event)=>{setDescription(event.target.value)}}></textarea>

                            <div className="media">
                                <ul className="images_list">
                                    <li className="image_item">
                                        <div className="image_item-img">
                                            <img src={photo} width="117px" height="100px" />
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

                            <hr className="hr" />

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
                        <button className="btn" onClick={(event)=>createProduct(event)} >
                            Salvar
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default New