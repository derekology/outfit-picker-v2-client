import { useState, useEffect } from 'react';
import axios from 'axios';

import { ClothingDisplayPresentational } from './ClothingDisplayPresentational';
import { ClothingDisplayReadRow } from './ClothingDisplayReadRow.tsx';
import { ClothingDisplayEditRow } from './ClothingDisplayEditRow.tsx';

import { ClothingExisting } from '../../interfaces/ClothingExisting.tsx';

export function ClothingDisplay(props: { loggedInUid: string, updateMade: boolean }) {
    const [clothingRows, setClothingRows] = useState<JSX.Element[]>([]);
    const [editClothingId, setEditClothingId] = useState<string | null>(null);

    const handleEditClick = async (e: React.MouseEvent<HTMLElement>) => {
      const clothingOwner = e.currentTarget.dataset.owner_uid

      if (props.loggedInUid === 'demo' || clothingOwner === 'demo' ) {
          alert('Cannot edit demo clothing. Log in to add your own.')
      } else if (e.currentTarget.dataset.editId && props.loggedInUid === clothingOwner) {
          const editId: string = (e.currentTarget.dataset.editId);      
          setEditClothingId(editId);
      } else {
          alert('Unknown error. Please try again later.')
      }
    };

    const handleSetEditClothingId = (_id: string) => {
      setEditClothingId(_id);
    };

    const createClothingRows = async () => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/getClothing`, { query: {
          owner: props.loggedInUid,
        }});

        const clothingData = res.data;
  
        const cards = clothingData.map((item: ClothingExisting, index: number) => {
            const shadeRow = index % 2 === 0 ? 'even-row' : 'odd-row';

              return (
                  <tr
                    key={item._id}
                    className={shadeRow}
                    onMouseEnter={() => { document.querySelector(`[data-edit-id='${item._id}']`)?.setAttribute('style', 'display: unset; z-index: 999; cursor: pointer') }}
                    onMouseLeave={() => { document.querySelector(`[data-edit-id='${item._id}']`)?.setAttribute('style', 'display: none;') }}
                  >
                    { editClothingId !== item._id ? 
                        <ClothingDisplayReadRow shadeRow={shadeRow} item={item} handleEditClick={handleEditClick} />
                        : 
                        <ClothingDisplayEditRow
                          key={item._id}
                          shadeRow={shadeRow}
                          item={item}
                          editClothingId={editClothingId}
                          handleSetEditClothingId={handleSetEditClothingId}
                        />
                    }
                  </tr>
                )
        });
  
        setClothingRows(cards);
      } catch (error) {
        console.error('Error fetching clothing data:', error);
      }
    };

    useEffect(() => {
      createClothingRows();
    }, [props.updateMade, editClothingId, props.loggedInUid]);

    return (
        <>
            <ClothingDisplayPresentational clothingRows={clothingRows} />
        </>
    )
}