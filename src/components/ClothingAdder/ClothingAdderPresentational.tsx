import styles from './ClothingAdder.module.css'

export function ClothingAdderPresentational(props: {handleClothingTypeChange: React.ChangeEventHandler<HTMLInputElement>, handleClothingArticleChange: React.ChangeEventHandler<HTMLInputElement>, handleClothingColourChange: React.ChangeEventHandler<HTMLInputElement>, handleClothingWeightChange: React.ChangeEventHandler<HTMLSelectElement>, handleAddClothing: React.MouseEventHandler<HTMLButtonElement>, generateUploadButton: () => JSX.Element, handleLogOut: React.MouseEventHandler<HTMLParagraphElement>}) {
    return (
        <>
            <div className={`${styles.addClothingForm} toggled-form`}>
                <span>
                    <label htmlFor="clothingType">Type</label><br/>
                    <span>
                        <input id='top' type="radio" name="clothingType" value="Top" onChange={props.handleClothingTypeChange} />
                        <label htmlFor="top">Top</label>
                        &nbsp;&nbsp;
                        <input id='bottom' type="radio" name="clothingType" value="Bottom" onChange={props.handleClothingTypeChange} />
                        <label htmlFor="bottom">Bottom</label>
                    </span>
                </span>
        
                <span>
                    <label htmlFor="article">Article</label>
                    <br/>
                    <input type="text" name="article" onChange={props.handleClothingArticleChange} />
                </span>
                <span>
                    <label htmlFor="colour">Colour</label>
                    <br/>
                    <input type="text" name="colour" onChange={props.handleClothingColourChange} />
                </span>
                <span>
                    <label htmlFor="weight">Weight</label>
                    <br/>
                    <select className='editField' data-target-attr='weight' style={{ width: '177px' }} onChange={props.handleClothingWeightChange}>
                        <option value=''></option>
                        <option value='Light'>Light</option>
                        <option value='Medium'>Medium</option>
                        <option value='Heavy'>Heavy</option>
                    </select>
                </span>
                <span>
                    <props.generateUploadButton />
                </span>
                <span><button onClick={props.handleAddClothing}>Add</button></span>
                <span className={styles.logOutLink} onClick={props.handleLogOut}>Log Out</span>
            </div>
        </>
    )
}