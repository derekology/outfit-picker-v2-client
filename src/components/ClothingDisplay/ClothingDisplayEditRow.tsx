import { useState, useRef } from 'react';
import axios from 'axios';

import { VIEWIMAGEICON, ADDIMAGEICON, CONFIRMEDIT, CANCELEDIT, DELETEITEM } from '../../assets/ClothingIcons.tsx';

import { ClothingExisting } from '../../interfaces/ClothingExisting.tsx';

export function ClothingDisplayEditRow(props: {
  shadeRow: string,
  item: ClothingExisting,
  editClothingId: string,
  handleSetEditClothingId: Function
}) {
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null);

  const newType = useRef<HTMLSelectElement>(null);
  const newArticle = useRef<HTMLInputElement>(null);
  const newColour = useRef<HTMLInputElement>(null);
  const newWeight = useRef<HTMLSelectElement>(null);
  const newIsAvailable = useRef<HTMLInputElement>(null);

  const handleImageUpload = () => {
    window.cloudinary.openUploadWidget(
      { cloud_name: 'wooprojects', upload_preset: 'op_newimg' },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          setNewImageUrl(result.info.secure_url);
        }
      }).open();
  };

  const handleClearImageUrl = () => {
    setNewImageUrl(null)
  }

  const handleClearCurrentImage = () => {
    setNewImageUrl('')
  }

  const resetEditfields = () => {
    props.handleSetEditClothingId(null);
  }

  const handleEditConfirm = async () => {
    let updatedAttributes: { type?: string, article?: string, colour?: string, weight?: string, isAvailable?: boolean, imageUrl?: string } = {};

    if (newType.current && props.item.type !== newType.current.value) {
      updatedAttributes['type'] = newType.current.value;
    }

    if (newArticle.current && props.item.article !== newArticle.current.value) {
      updatedAttributes['article'] = newArticle.current.value;
    }

    if (newColour.current && props.item.colour !== newColour.current.value) {
      updatedAttributes['colour'] = newColour.current.value;
    }

    if (newWeight.current && props.item.weight !== newWeight.current.value) {
      updatedAttributes['weight'] = newWeight.current.value;
    }

    if (newIsAvailable.current && newIsAvailable.current.checked !== !props.item.isAvailable) {
      updatedAttributes['isAvailable'] = !newIsAvailable.current.checked;
    }

    if (newImageUrl !== null) {
      updatedAttributes['imageUrl'] = newImageUrl;
    }

    await axios.post(`${import.meta.env.VITE_API_URL}/updateClothing`, { query: { id: props.editClothingId, update: updatedAttributes } });
    resetEditfields();
  };

  const handleDeleteClothing = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/deleteClothing`, { query: { id: props.editClothingId } });
    resetEditfields();
  };

  const handleEditCancel = () => {
    resetEditfields();
  };

  return (
    <>
      <td title={props.item._id}>
        <span onClick={handleDeleteClothing} style={{ cursor: 'pointer' }}>{DELETEITEM}</span>
      </td>
      <td>{
        <select style={{ width: '60px' }} defaultValue={props.item.type} data-target-attr='type' ref={newType}>
          <option value='Top'>Top</option>
          <option value='Bottom'>Bottom</option>
        </select>
      }
      </td>
      <td>{<input className='editFieldArticle' defaultValue={props.item.article} data-target-attr='article' ref={newArticle}></input>}</td>
      <td>{<input className='editFieldColour' defaultValue={props.item.colour} data-target-attr='colour' ref={newColour}></input>}</td>
      <td>{
        <select defaultValue={props.item.weight} data-target-attr='weight' ref={newWeight}>
          <option value='Light'>Light</option>
          <option value='Medium'>Medium</option>
          <option value='Heavy'>Heavy</option>
        </select>}
      </td>
      <td>{<input type='checkbox' defaultChecked={!props.item.isAvailable} data-target-attr='isAvailable' ref={newIsAvailable}></input>}</td>
      <td>{(newImageUrl ?
        <>
          <a style={{ cursor: 'pointer' }} href={props.item.imageUrl} target='_blank'>{VIEWIMAGEICON}</a>
          &nbsp;&nbsp;
          <span title='Cancel pending image update' onClick={handleClearImageUrl} style={{ cursor: 'pointer' }}>{CANCELEDIT}</span>
        </>
        :
        <>
          <a style={{ cursor: 'pointer' }} onClick={handleImageUpload}>{ADDIMAGEICON}</a>
          {(props.item.imageUrl !== '' && 
          <>&nbsp;&nbsp;
          <span title='Remove current image' onClick={handleClearCurrentImage} style={{ cursor: 'pointer' }}>{CANCELEDIT}</span>
          </> )}
        </>
      )}
      </td>
      <td>
        <span onClick={handleEditConfirm} style={{ cursor: 'pointer' }}>{CONFIRMEDIT}</span>
        &nbsp;&nbsp;
        <span onClick={handleEditCancel} style={{ cursor: 'pointer' }}>{CANCELEDIT}</span>
      </td>
    </>
  )
};