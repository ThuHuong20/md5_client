import { useDispatch, useSelector } from 'react-redux'
import './listProduct.scss'
import { FormEvent, useEffect, useState } from 'react'
import api from '@/services/api'
import { StoreType } from '@/stores'
import { Products, productActions } from '@/stores/slices/product.slice'
import { useParams } from 'react-router-dom'
import { Option } from '@/interfaces/product.interface'
import { message } from 'antd'

export default function ProductOption() {

  const { productId } = useParams();

  const dispatch = useDispatch();
  const [optionValue, setOptionValue] = useState('');
  const [priceValue, setPriceValue] = useState('');


  function handleCreateOption(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let newOption = {
      productId: productId,
      option: optionValue,
      price: priceValue,
    }
    api.productApi.createOption(newOption)
      .then(res => {
        dispatch(productActions.insertOptionProduct(res.data))
        message.success('Add Product Option success')
      })
  }
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === 'option') {
      setOptionValue(value);
    } else if (name === 'price') {
      setPriceValue(value);
    }
  }

  return (
    <div className='productOption_container'>
      <div className='add_option'>Add ProductOption</div>
      <div className='option_input'>
        <label >Option: </label>
        <input type="text" name='option' value={optionValue} onChange={handleInputChange} /><br />
        <label >Price: </label>
        <input type="text" name='price' value={priceValue} onChange={handleInputChange} />
      </div>
      <div className='button'>
        <button onClick={(e: any) => {
          handleCreateOption(e)
        }}>Add</button>
      </div>
    </div>
  );
}
