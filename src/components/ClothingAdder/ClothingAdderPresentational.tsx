import styles from './ClothingAdder.module.css'

export function ClothingAdderPresentational(props: {handleClothingTypeChange: React.ChangeEventHandler<HTMLInputElement>, handleClothingArticleChange: React.ChangeEventHandler<HTMLInputElement>, handleClothingColourChange: React.ChangeEventHandler<HTMLInputElement>, handleClothingWeightChange: React.ChangeEventHandler<HTMLSelectElement>, handleAddClothing: React.MouseEventHandler<HTMLButtonElement>, generateUploadButton: () => JSX.Element}) {
    return (
        <>
            <div className={`${styles.addClothingForm} toggled-form`}>
                <span className={`${styles.addClothingField} `}>
                    <label htmlFor="clothingType">Type</label><br/>
                    <span>
                        <input id='top' type="radio" name="clothingType" value="Top" onChange={props.handleClothingTypeChange} />
                        <label htmlFor="top">Top</label>
                        &nbsp;&nbsp;
                        <input id='bottom' type="radio" name="clothingType" value="Bottom" onChange={props.handleClothingTypeChange} />
                        <label htmlFor="bottom">Bottom</label>
                    </span>
                </span>
        
                <span className={`${styles.addClothingField}`}>
                    <label htmlFor="article">Article</label>
                    <br/>
                    <input type="text" name="article" placeholder='T-Shirt, Pants, etc.' onChange={props.handleClothingArticleChange} />
                </span>
                <span className={`${styles.addClothingField}`}>
                    <label htmlFor="colour">Colour</label>
                    <br/>
                    <input type="text" name="colour" onChange={props.handleClothingColourChange} />
                </span>
                <span className={`${styles.addClothingField}`}>
                    <label htmlFor="weight">Weight</label>
                    <br/>
                    <select className='editField' data-target-attr='weight' style={{ width: '177px' }} onChange={props.handleClothingWeightChange}>
                        <option value=''></option>
                        <option value='Light'>Light</option>
                        <option value='Medium'>Medium</option>
                        <option value='Heavy'>Heavy</option>
                    </select>
                </span>
                <span className={`${styles.addClothingField}`}>
                    <label>Image (optional)</label>
                    <br/>
                    <props.generateUploadButton />
                </span>
                <span className={`${styles.addClothingField}`}><button onClick={props.handleAddClothing}>Add</button></span>
            </div>
        </>
    )
}