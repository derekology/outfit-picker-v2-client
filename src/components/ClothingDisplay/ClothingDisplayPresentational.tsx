import './ClosingDisplay.css'

export function ClothingDisplayPresentational(props: {clothingRows: JSX.Element[]}) {
    return (
        <>
            <div id='clothesTable'>
                <table>
                    <thead>
                    <tr>
                        <th className='end-col'></th>
                        <th>Type</th>
                        <th>Article</th>
                        <th>Colour</th>
                        <th>Weight</th>
                        <th>In wash?</th>
                        <th>Image</th>
                        <th className='end-col'></th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.clothingRows}
                    </tbody>
                </table>
            </div>
        </>
    )
}