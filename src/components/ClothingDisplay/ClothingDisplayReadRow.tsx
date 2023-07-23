import { VIEWIMAGEICON, EDITICON } from '../../assets/ClothingIcons.tsx';

import { ClothingExisting } from '../../interfaces/ClothingExisting.tsx';

export function ClothingDisplayReadRow(props: { shadeRow: string, item: ClothingExisting, handleEditClick: React.MouseEventHandler<HTMLSpanElement> }) {
    return (
        <>
            <td title={props.item._id}></td>
            <td>{ props.item.type }</td>
            <td>{ props.item.article }</td>
            <td>{ props.item.colour }</td>
            <td>{ props.item.weight }</td>
            {/* <td><input type='checkbox' checked={!props.item.isAvailable} disabled={true} readOnly></input></td> */}
            <td>{!props.item.isAvailable && '✓'}</td>
            <td>{( props.item.imageUrl && <a href={props.item.imageUrl} target='_blank'>{ VIEWIMAGEICON }</a>)}
            </td>
            <td>
                <span
                data-edit-id={props.item._id}
                style={{ display: 'none' }}
                onClick={props.handleEditClick}
                >
                    {EDITICON}
                </span>
            </td>
        </>
    )
};