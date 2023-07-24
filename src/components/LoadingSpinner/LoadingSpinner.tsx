import './LoadingSpinner.css';

export function LoadingSpinner() {
    return (
        <div className='loadingContainer'>
            <span className='loader'></span>
            <div>Loading...
                <br/><em style={{fontSize: 'smaller'}}>(it can take a few minutes to spin up the server)</em>
            </div>
        </div>
    )
}