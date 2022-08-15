import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

import {AiOutlineEdit} from 'react-icons'


const List = ({items,handleEditbtn,handlDelete}) => {


  return (<>

  {items.map((item)=>{
            const { id, title } = item;

    return(
      <div className="grocery-item" key={id}>
         <p className='title'>{title}</p>
         <div className='btn-container'>
              <button
                type='button'
                className='edit-btn'
                onClick={() => handleEditbtn(id)}
            
              >
                <FaEdit />
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() => handlDelete(id)}
              >
                <FaTrash />
              </button>
            </div>
      </div>


    )

  })}
  
  </>)
}

export default List
