import React from 'react';

const Rank = ({rank}) => {
    return (
        <div>
            <div className='white f3'>
                {'achiya, your current rank is...'}
            </div>
            <div className='white f1'>
                {rank}
            </div>
        </div>
    )

}

export default Rank;